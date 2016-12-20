var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Done from 'material-ui/svg-icons/action/done';

var AdvanceProductAdd = React.createClass({
    render:function(){
        return (
            <div className="row" style={{marginLeft:'0px', textAlign:'center'}}>
                <div className="column medium-2 hide-for-small-only" style={{textAlign:'center'}}>
                    <TextField
                        fullWidth={true}
                        hintText="ID"
                    />
                </div>
                <div className="column medium-3">
                    <TextField
                        fullWidth={true}
                        hintText="Name"
                    />
                </div>
                <div className="column medium-2">
                    <TextField
                        fullWidth={true}
                        hintText="Spec"
                    />
                </div>
                <div className="column medium-1">
                    <TextField
                        fullWidth={true}
                        hintText="Quantity"
                    />
                </div>
                <div className="column medium-1">
                    <TextField
                        fullWidth={true}
                        hintText="Unit Price"
                    />
                </div>
                <div className="column medium-1">
                    <TextField
                        fullWidth={true}
                        hintText="Discount"
                    />
                </div>
                <div className="column medium-1">
                    <TextField
                        fullWidth={true}
                        hintText="Amount"
                    />
                </div>
                <div className="column medium-1">
                     <FloatingActionButton mini={true} backgroundColor="green">
                        <Done/>
                     </FloatingActionButton>
                </div>
            </div>
        )
    }
})

export default connect()(AdvanceProductAdd)
