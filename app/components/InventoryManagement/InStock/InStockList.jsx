var React = require('react')
var moment = require('moment')
//Redux
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')
var snackBarActions = require('../../../actions/snackBarActions')
//material-ui
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
//API
var InventoryManagementAPI = require('InventoryManagementAPI')
//my component
import InStockItem from './InStockItem'
import InStockDialog from './InStockDialog'

//style
const style = {
    paper:{
        width:'calc(100%)',
        paddingTop:'40px'
    },
    isLoading:{
        marginBottom:'20px'
    },
}

var NewInStockList = React.createClass({
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
                        <InStockItem key={item.id} item={item}/>
                    )
                })
            } else if (newStockList.length === 0){
                return <h3 style={{textAlign:'center'}}>Add New Product</h3>
            }

        }
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
                <InStockDialog/>
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
