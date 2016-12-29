var React = require('react');
var moment = require('moment');
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/invoiceAction');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
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
            return record.purchaseItem.map((item)=>{
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
                        {record.totalAmount}
                    </div>
                    <div className="column medium-2">
                        {record.clientID.location}
                    </div>
                    <div className="column medium-5">
                        {record.clientID.address}
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
                        <div className="column small-2 medium-6">
                            <b><u>Client Detail</u></b><br/><br/>
                            <div className="column small-4">Name: </div>
                            <div className="column small-8">{record.clientID.name}</div>
                            <div className="column small-4">Address: </div>
                            <div className="column small-8">{record.clientID.address}</div>
                            <div className="column small-4">Phone: </div>
                            <div className="column small-8">{record.clientID.phone}</div>

                            <div className="column small-4">Payment: </div>
                            <div className="column small-8">{record.clientID.paymentMethod}</div>
                        </div>
                        <div className="column small-2 medium-6">
                            <b><u>Invoice Detail</u></b><br/><br/>
                            <div className="column small-4">Invoice ID: </div>
                            <div className="column small-8">{record.invoiceID}</div>
                            <div className="column small-4">Date: </div>
                            <div className="column small-8">{date}</div>
                            <div className="column small-4">Location: </div>
                            <div className="column small-8">{record.clientID.location}</div>
                            <div className="column small-4">Total: </div>
                            <div className="column small-8">$ {record.totalAmount}</div>
                            <div className="column small-4">Remark: </div>
                            <div className="column small-8">{record.remark}</div>
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
