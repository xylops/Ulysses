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
    handleClose : function() {
        var {dispatch} = this.props;
        dispatch(actions.closeInStockDialog())
    },
    handleSave : function(){
        var {dispatch, newStockList, date} = this.props;
        InventoryManagementAPI.createInstockList(newStockList, date).then((response)=>{
            var resText = response.data.message;
            dispatch(snackBarActions.openSnackBar(resText));
        })
        dispatch(actions.clearInstockList());
        dispatch(actions.changeDate(true))
        dispatch(actions.closeInStockDialog())
    },
    render:function(){
        var {dispatch, newStockList, date, dialog} = this.props
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
                open={dialog}
                onRequestClose={this.handleClose}
            >
                {confirmDialog()}
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return {
        newStockList : state.inStock.newInStockList.newEntry,
        date : state.inStock.newInStockList.date,
        dialog: state.inStock.newInStockList.submitDialog,
    }
})(InStockDialog)
