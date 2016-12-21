var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Done from 'material-ui/svg-icons/action/done';
//my style
const style ={
    textAlign:'center'
}
var AdvanceProductAdd = React.createClass({
    render:function(){
        return (
            <div className="row" style={{marginLeft:'0px', textAlign:'center'}}>
                <div className="column medium-2 hide-for-small-only" style={style}>
                    <h7>Product ID</h7>
                </div>
                <div className="column medium-3" style={style}>
                    <h7>Product Name</h7>
                </div>
                <div className="column medium-2" style={style}>
                    <h7>Spec</h7>
                </div>
                <div className="column medium-1" style={style}>
                    <h7>Quantity</h7>
                </div>
                <div className="column medium-1" style={style}>
                    <h7>Price</h7>
                </div>
                <div className="column medium-1" style={style}>
                    <h7>Discount</h7>
                </div>
                <div className="column medium-1" style={style}>
                    <h7>Amount</h7>
                </div>
                <br/><hr/>
            </div>
        )
    }
})

export default connect()(AdvanceProductAdd)
