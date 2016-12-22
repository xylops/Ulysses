var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
var actions = require('../../actions/invoiceAction');
///material-ui
import RaisedButton from 'material-ui/RaisedButton';

//api
var invoiceAPI = require('invoiceAPI')

//style
const style={
    formText:{
        textAlign:'right',
    },
    dateInput :{
        textAlign:'right',
    }

}
var InvoiceDetail = React.createClass({
    componentDidMount:function(){
        var {dispatch} = this.props
        var date = moment().format('YYYYMMDD');
        dispatch(actions.addDate(date))
        invoiceAPI.checkInvoicePerDay(date).then((response)=>{
            var numberOfInvoice = response.data.numberOfInvoice;
            if(numberOfInvoice < 10){
                var invoiceID = date + '00' + Number(numberOfInvoice+1)
            }else if (numberOfInvoice < 100 && numberOfInvoice > 9){
                var invoiceID = date + '0' + Number(numberOfInvoice+1)
            }else{
                var invoiceID = date + Number(numberOfInvoice+1)
            }
            dispatch(actions.addInvoiceID(invoiceID))
        })
    },
    handleSave:function(){
        var {invoice} = this.props
        invoiceAPI.createNewInvoice(invoice)
    },
    render:function(){
        var {invoiceID, date} = this.props
        var formateDate = moment(date).format('DD/MM/YYYY')
        return(
            <div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.dateInput}> Date of Creation </h5>
                    </div>
                    <div className="column medium-8">
                         {formateDate}
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Invoice Number: </h5>
                    </div>
                    <div className="column medium-8">
                        {invoiceID}
                    </div>
                </div>
                <RaisedButton label="Top 10 Purchase Item" fullWidth={true} style={{marginTop:'16px'}}/>
                <RaisedButton label="Clear all field" fullWidth={true} secondary={true} style={{marginTop:'10px'}}/>
                <RaisedButton label="Submit Invoice" fullWidth={true} primary={true} style={{marginTop:'10px'}} onTouchTap={this.handleSave}/>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        invoiceID : state.invoice.createInvoice.invoiceID,
        date:state.invoice.createInvoice.date,
        invoice: state.invoice.createInvoice
    }
})(InvoiceDetail)
