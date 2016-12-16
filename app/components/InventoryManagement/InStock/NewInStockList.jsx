var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')
var snackBarActions = require('../../../actions/snackBarActions')
var moment = require('moment')

//material-ui
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

//API
var InventoryManagementAPI = require('InventoryManagementAPI')

//my component
import NewInstockItem from './newInstockItem'

//style
const style = {
    paper:{
        width:'calc(100%)',
        paddingTop:'40px'
    },
    dialog:{
        textAlign:'center',
        borderBottom: '1px solid black',
        margin:'15px 40px'
    },
    isLoading:{
        marginBottom:'20px'
    },
}

var NewInStockList = React.createClass({
    getInitialState:function(){
        return {
            open:false,
        }
    },
    handleOpen : function(){
        this.setState({open: true});
    },
    handleClose : function() {
        this.setState({open: false});
    },
    handleSave : function(){
        var {dispatch, newStockList, date} = this.props;
        InventoryManagementAPI.createInstockList(newStockList, date).then((response)=>{
            var resText = response.data.message;
            dispatch(snackBarActions.openSnackBar(resText));
        })
        dispatch(actions.clearInstockList());
        dispatch(actions.changeDate(true))
        this.setState({open: false});
    },
    dateChange:function(e, date){
        var date = moment(date).format('DDMMYYYY');
        var {dispatch} = this.props;
        dispatch(actions.clearInstockList())            //clear stock list every time it changes
        dispatch(actions.changeDate(date))              //change redux date state
        dispatch(actions.startFetchingDateList())       //fetching dateList
        InventoryManagementAPI.getDateInstockList(date).then((response)=>{
            var list = response.data;
            if(list.length > 0){
                list.forEach(function(record){
                    var item = {
                        id:record.RealPID,
                        name:record.ProductName,
                        inventory: record.StockLevelID,
                        productID: record.ProductID,
                        amount: record.StockLevelChanges
                    }
                    dispatch(actions.addNewItemToNewList(item))
                })
            }else{
                dispatch(actions.clearInstockList())
            }
            dispatch(actions.completeFetchingDateList())
        });
    },
    render:function(){
        var {dispatch, newStockList, fetching, date} = this.props
        var renderList = () =>{
            if(date === true){
                return <h3 style={{textAlign:'center'}}>Please Select Date</h3>
            } else if(fetching){
                return  <LinearProgress style={style.isLoading} mode="indeterminate" />
            } else if(newStockList.length !== 0){
                return newStockList.map((item)=>{
                    return(
                        <NewInstockItem key={item.id} item={item}/>
                    )
                })
            } else if (newStockList.length === 0){
                return <h3 style={{textAlign:'center'}}>Add New Product</h3>
            }

        }
        var confirmDialog = () =>{
            if(newStockList.length >= 1){
                return newStockList.map((item)=>{
                    return(
                        <div key={item.id} className="row"
                            style={style.dialog}
                        >
                            <div className="column small-8">
                                {item.name}
                            </div>
                            <div className="column small-4">
                                {item.amount}
                            </div>
                        </div>
                    )
                })
            }
        }
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Confirm!"
                primary={true}
                onTouchTap={this.handleSave}
            />,
        ];
        return(
            <div>
                <div className="row">
                    <div className="column small-6 medium-8">
                        <DatePicker hintText="Date" mode="landscape" onChange={this.dateChange} ref='datepicker'/><br/>
                    </div>
                    <div className="column small-6 medium-4">
                        <RaisedButton label="SUBMIT" primary={true} onTouchTap={this.handleOpen}/>
                    </div>
                </div>
                <Paper zDepth={2}>
                    {renderList()}
                </Paper>
                <Dialog
                    title="CONFIRM?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {confirmDialog()}
                </Dialog>
            </div>

        )
    }
})

export default connect((state)=>{
    return {
        newStockList : state.InStock.newInStockList.newEntry,
        date : state.InStock.newInStockList.date,
        fetching : state.InStock.newInStockList.fetchingDateList,

    }
})(NewInStockList)
