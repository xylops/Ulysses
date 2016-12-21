var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import FlatButton from 'material-ui/FlatButton';

var SingleItemDialog = React.createClass({
    handleDelete:function(item){
        var {dispatch, list} = this.props
        var temp = []
        list.forEach(function(elem){
            temp.push(elem.id.indexOf(item.id));
        })
        var targetItem = temp.indexOf(0)
        console.log(targetItem)
        dispatch(actions.deleteItem(targetItem))
    },
    render:function(){
        var {item} = this.props;
        return (
            <div style={{width:'100%'}} className="row">
                <div className="column small-2">
                    {item.ProductID}
                </div>
                <div className="column small-3">
                    {item.ProductName}
                </div>
                <div className="column small-2">
                    {item.Spec}
                </div>
                <div className="column small-1">
                    {item.quantity}
                </div>
                <div className="column small-1">
                    {item.Price}
                </div>
                <div className="column small-1">
                    {item.discount}
                </div>
                <div className="column small-1">
                    {item.amount}
                </div>
                <div className="column small-1" >
                     <FlatButton onTouchTap={()=>{this.handleDelete(item)}}>
                        <i className="material-icons">delete</i>
                     </FlatButton>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        list: state.invoice.createInvoice.item,
    }
})(SingleItemDialog);
