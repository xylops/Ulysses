var React = require('react');
var moment = require('moment');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/logisticActions')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

//myCompoent
import InvoiceSection from './InvoiceSection'

var SingleInvoice = React.createClass({
    handleOpenDialog:function(invoice){
        var {dispatch} = this.props;
        dispatch(actions.openLogisticInvoiceDialog(invoice));
    },
    render:function(){
        var {invoice} = this.props
        var date = moment(invoice.date).format('DD/MM/YYYY')
        return (
            <div className="row">
                <div className="column small-10">
                    <RaisedButton
                        fullWidth={true}
                        style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}
                        onTouchTap={()=>{this.handleOpenDialog(invoice)}}
                    >
                        <div className="column small-4">
                            {invoice.invoiceID}
                        </div>
                        <div className="column small-3">
                            {date}
                        </div>
                        <div className="column small-2">
                            {invoice.total}
                        </div>
                        <div className="column small-3">
                            {invoice.client.location}
                        </div>
                    </RaisedButton>
                </div>
                <div className="column small-2">
                    <FlatButton label=">>" primary={true}/>
                </div>
            </div>
        )
    }
})

export default connect()(SingleInvoice)
