var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
var actions = require('../../actions/invoiceAction');
///material-ui
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
//api
var invoiceAPI = require('invoiceAPI')

//style
const style={
    formText:{
        textAlign:'right',
    },
    dateInput :{
        textAlign:'right',
        marginTop:10
    }

}
var InvoiceDetail = React.createClass({
    handleChange:function(e, date){
        var {dispatch} = this.props
        var date = moment(date).format('YYYYMMDD');
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
    render:function(){
        var {invoiceID} = this.props
        return(
            <div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Invoice Number: </h5>
                    </div>
                    <div className="column medium-8">
                        {invoiceID}
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.dateInput}> Date of Creation </h5>
                    </div>
                    <div className="column medium-8">
                         <DatePicker hintText="Landscape Dialog" mode="landscape" fullWidth={true} onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        invoiceID : state.invoice.createInvoice.invoiceID
    }
})(InvoiceDetail)
