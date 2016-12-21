var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//my component
import SingleItemDialog from './SingleItemDialog'

var ItemList = React.createClass({
    render:function(){
        var {list} = this.props;
        var renderList = () =>{
            if(list.length > 0){
                return list.map((item)=>{
                    return(
                        <SingleItemDialog key={item.id} item={item}/>
                    )
                })
            }else{
                return (<p>Nothing in List</p>)
            }
        }

        return (
            <div>
                {renderList()}
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        list: state.invoice.createInvoice.item,
    }
})(ItemList);
