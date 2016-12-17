var React = require('react')
//Redux
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')
var snackBarActions = require('../../../actions/snackBarActions')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//API
var InventoryManagementAPI = require('InventoryManagementAPI')
//style
const style={
    dialog:{
        textAlign:'center',
        borderBottom: '1px solid black',
        margin:'15px 40px'
    },
}

var InStockDialog = React.createClass({
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
    render:function(){
        var {dispatch, newStockList, date} = this.props
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
        };
        return (
            <Dialog
                title="CONFIRM?"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                {confirmDialog()}
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return {
        newStockList : state.InStock.newInStockList.newEntry,
        date : state.InStock.newInStockList.date,
    }
})(InStockDialog)
