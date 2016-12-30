var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/invoiceAction');
var snackBarActions = require('../../../actions/snackBarActions')
///material-ui
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
    componentWillUnmount:function(){
        var {dispatch} = this.props;
        dispatch(actions.clearInvoice());
        dispatch(actions.updateRemark(''));
    },
    handleRemarkChange:function(){
        var {dispatch} = this.props
        var text = this.refs.remark.getValue();
        dispatch(actions.updateRemark(text));
    },
    handleClear:function(){
        var {dispatch} = this.props
        dispatch(actions.clearInvoice());
        dispatch(actions.updateRemark(''));
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
        var {dispatch, invoice} = this.props
        var newWindow = window.open()  //call window.open before ajax call to prevent window block
        if(invoice.client.id !== undefined && invoice.item.length > 0){
            invoiceAPI.createNewInvoice(invoice).then((res)=>{
                var resText = res.data.message;
                dispatch(snackBarActions.openSnackBar(resText));
                //print invoice
                invoiceAPI.printInvoice(invoice).then((res)=>{
                    newWindow.location = res.data.link
                    dispatch(actions.clearInvoice());
                    dispatch(actions.updateRemark(''));
                    // reload compoentWillMount logic for date and invoice number
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
                })
            })
        }else{
            alert('Client and item is REQUIRE for creating new Invoice Record')
        }
    },
    render:function(){
        var {invoiceID, date, remark} = this.props
        var formateDate = moment(date).format('DD/MM/YYYY')
        return(
            <div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.dateInput}> Date: </h5>
                    </div>
                    <div className="column medium-8">
                         {formateDate}
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Invoice ID: </h5>
                    </div>
                    <div className="column medium-8">
                        {invoiceID}
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Remarks: </h5>
                    </div>
                    <div className="column medium-8">
                        <TextField
                            hintText="Remark"
                            multiLine={true}
                            fullWidth={true}
                            value={remark}
                            onChange={this.handleRemarkChange}
                            ref="remark"
                        /><br />
                    </div>
                </div>

                <div className="row" style={{paddingTop:'26px'}}>
                    <div className="column medium-4">
                        <RaisedButton label="Top 10 Item" fullWidth={true} />
                    </div>
                    <div className="column medium-4">
                        <RaisedButton label="Clear all field" fullWidth={true} secondary={true} onTouchTap={this.handleClear}/>
                    </div>
                    <div className="column medium-4">
                        <RaisedButton label="Submit Invoice" fullWidth={true} primary={true} onTouchTap={this.handleSave}/>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        invoiceID : state.invoice.createInvoice.invoiceID,
        date:state.invoice.createInvoice.date,
        invoice: state.invoice.createInvoice,
        remark : state.invoice.createInvoice.remark,

    }
})(InvoiceDetail)
