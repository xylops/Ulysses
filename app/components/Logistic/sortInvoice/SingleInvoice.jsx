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
    handleAdd:function(record){
        var {dispatch, NPI, invoice} = this.props;
        var temp = []
        NPI.forEach(function(elem){
            temp.push(elem.invoiceID.indexOf(invoice.invoiceID));
        })
        var targetItem = temp.indexOf(0)
        dispatch(actions.toggleNonprocessInvoiceRecordShow(targetItem, 1))
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
                    <FlatButton label=">>" primary={true} onTouchTap={()=>{this.handleAdd(invoice)}}/>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        NPI: state.logistic.fetchNonProcessInvoice.NPI
    }
})(SingleInvoice)
