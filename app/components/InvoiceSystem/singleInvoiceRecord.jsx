var React = require('react');
var moment = require('moment');
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/invoiceAction');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//api
var invoiceAPI = require('invoiceAPI');
//style
const style ={
    btn:{
        textAlign:'center',
        maxHeight:'36px'
    },
    dialogItem:{
        marginTop:'5px',
        textAlign:'center'
    }
}
const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};
var SingleInvoiceRecord = React.createClass({
    getInitialState:function(){
        return({
            open:false
        })
    },
    handleOpenDialog:function(){
        this.setState({
            open:true
        })
    },
    handleClose:function(){
        this.setState({
            open:false
        })
    },
    handlePrint:function(){
        var {record} = this.props;
        var newWindow = window.open()
        var invoice = record
        invoiceAPI.printInvoice(invoice).then((res)=>{
            newWindow.location = res.data.link
        })
    },
    handleVoid:function(){
        var {record} = this.props;
        console.log(record.invoiceID, record.client.id)
    },
    render:function(){
        var {record} = this.props
        var date = moment(record.date).format('DD/MM/YYYY');

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        var renderItemList = () =>{
            return record.item.map((item)=>{
                return(
                    <div key={item.id} style={style.dialogItem}>
                        <div className="column medium-2 hide-for-small-only" style={style}>
                            {item.ProductID}
                        </div>
                        <div className="column medium-3" style={style}>
                            {item.ProductName}
                        </div>
                        <div className="column medium-2" style={style}>
                            {item.Spec}
                        </div>
                        <div className="column medium-1" style={style}>
                            {item.quantity}
                        </div>
                        <div className="column medium-1" style={style}>
                            {item.Price}
                        </div>
                        <div className="column medium-1" style={style}>
                            {item.discount}
                        </div>
                        <div className="column medium-1" style={style}>
                            $ {item.amount}
                        </div>
                    </div>
                )
            })
        }

        return (
            <div>
                <RaisedButton onTouchTap={this.handleOpenDialog} fullWidth={true} style={style.btn}>
                    <div className="column medium-2">
                        {record.invoiceID}
                    </div>
                    <div className="column medium-2">
                        {date}
                    </div>
                    <div className="column medium-1">
                        {record.total}
                    </div>
                    <div className="column medium-2">
                        {record.client.location}
                    </div>
                    <div className="column medium-4">
                        {record.client.address}
                    </div>
                    <div className="column medium-1">
                        {record.status}
                    </div>
                </RaisedButton>
                <Dialog
                    title="Invoice Detail"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={customContentStyle}
                >
                    <div className="row">
                        <div className="column small-12 medium-6">
                            <b><u>Client Detail</u></b><br/><br/>
                            <div className="column small-4">Name: </div>
                            <div className="column small-8">{record.client.name}</div>
                            <div className="column small-4">Address: </div>
                            <div className="column small-8">{record.client.address}</div>
                            <div className="column small-4">Phone: </div>
                            <div className="column small-8">{record.client.phone}</div>

                            <div className="column small-4">Payment: </div>
                            <div className="column small-8">{record.client.paymentMethod}</div>
                        </div>
                        <div className="column small-12 medium-4">
                            <b><u>Invoice Detail</u></b><br/><br/>
                            <div className="column small-4">Invoice ID: </div>
                            <div className="column small-8">{record.invoiceID}</div>
                            <div className="column small-4">Date: </div>
                            <div className="column small-8">{date}</div>
                            <div className="column small-4">Location: </div>
                            <div className="column small-8">{record.client.location}</div>
                            <div className="column small-4">Total: </div>
                            <div className="column small-8">$ {record.total}</div>
                            <div className="column small-4">Remark: </div>
                            <div className="column small-8">{record.remark}</div>
                        </div>
                        <div className="column small-12 medium-2">
                            <RaisedButton label="Void Invoice" onTouchTap={this.handleVoid} fullWidth={true} secondary={true} />
                            <RaisedButton label="Reprint Invoice" onTouchTap={this.handlePrint} fullWidth={true} primary={true} style={{marginTop:'5px'}}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row" style={{textAlign:'center'}}>
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
                    </div>
                    <br/>
                    {renderItemList()}
               </Dialog>
            </div>
        )
    }
})

export default connect()(SingleInvoiceRecord)
