var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')
var moment = require('moment')

//material-ui
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
    }
}

var NewInStockList = React.createClass({
    getInitialState:function(){
        return {
            open:false,
            date:''
        }
    },
    handleOpen : function(){
        this.setState({open: true});
    },
    handleClose : function() {
        this.setState({open: false});
    },
    handleSave : function(){
        var {dispatch, newStockList} = this.props;
        InventoryManagementAPI.createInstockList(newStockList, this.state.date).then((res)=>{
            console.log('done')
        })
        dispatch(actions.clearInstockList());
        this.setState({
            open: false,
            date:''
        });
    },
    dateChange:function(e, date){
        var date = moment(date).format('DDMMYYYY');
        this.setState({
            date
        })
    },
    render:function(){
        var {dispatch, newStockList} = this.props
        var renderList = () =>{
            if(newStockList.length > 0){
                return newStockList.map((item)=>{
                    return(
                        <NewInstockItem key={item.id} item={item}/>
                    )
                })
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
                        <DatePicker hintText="Date" mode="landscape" onChange={this.dateChange} ref='date'/><br/>
                    </div>
                    <div className="column small-6 medium-4">
                        <RaisedButton label="SUBMIT" primary={true} onTouchTap={this.handleOpen}/>
                    </div>
                </div>
                <Paper zDepth={2}>
                    {renderList()}
                </Paper>
                <Dialog
                    title="CONFIRM???"
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
        newStockList : state.InStock.newInStockList.newEntry
    }
})(NewInStockList)
