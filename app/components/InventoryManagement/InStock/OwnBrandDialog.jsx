var React = require('react')
//Redux
var {connect} = require('react-redux');
var actions = require('../../../actions/inStockAction')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//style
const style = {
    fontSize:'50px',
    textAlign:'center',
    height:'80px'
}

var singleOBDialog = React.createClass({
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeSingleOBDialog());
    },
    handleSave:function(){
        var {dispatch, item, newStockList} = this.props;
        var temp = []
        newStockList.forEach(function(elem){
            if(elem.id.indexOf(item[0]) === 0){
                temp.push('yes')
            };
        })
        if(temp.length < 1){
            var amount = this.refs.input.value;
            var newItem = {
                id: item[0],
                name: item[1],
                inventory:item[2],
                productID: item[3],
                amount,
            }
            dispatch(actions.addNewItemToNewList(newItem));
            dispatch(actions.closeSingleOBDialog());
        }else{
            alert('item already exist in the list');
            dispatch(actions.closeSingleOBDialog());
        }
    },
    render:function(){
        var {open, item} = this.props;
        const actions = [
            <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
            />,
            <FlatButton
            label="Ok"
            secondary={true}
            keyboardFocused={false}
            onTouchTap={this.handleSave}
            />
        ];
        return(
            <div>
                <Dialog
                    title={item[1]}
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={this.handleClose}
                >
                    <input type="number" style={style} autoFocus={true} defaultValue="0" min="0" ref="input"/>
                </Dialog>
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        open:state.inStock.singleOBDialog.open,
        item:state.inStock.singleOBDialog.item,
        newStockList : state.inStock.newInStockList.newEntry
    }
})(singleOBDialog);
