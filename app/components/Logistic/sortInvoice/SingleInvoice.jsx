var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

//myCompoent
import InvoiceSection from './InvoiceSection'

var SingleInvoice = React.createClass({
    render:function(){
        var {invoice} = this.props
        var date = moment(invoice.date).format('DD/MM/YYYY')
        return (
            <div className="row">
                <div className="column small-10">
                    <RaisedButton fullWidth={true} style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}>
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
