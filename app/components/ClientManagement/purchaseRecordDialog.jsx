var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
//style
const customContentStyle = {
  width: '60%',
  maxWidth: 'none',
};
var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const style ={
    center:{
        textAlign:'center'
    },
}
var purchaseRecord = React.createClass({
    getInitialState:function(){
        return({
            open:false,
            itemRecord :[],
            recordID:'null',
            toggle:true
        })
    },
    handleOpen:function(){
        this.setState({
            open:true
        })
    },
    handleClose:function(){
        this.setState({
            open:false
        })
    },
    handleNext:function(record){
        this.setState({
            itemRecord: record.item,
            recordID:record.invoiceID,
            toggle:false
        })
    },
    handlePrevious:function(){
        this.setState({
            itemRecord: [],
            recordID:'null',
            toggle:true
        })
    },
    render:function(){
        var {purchaseRecord} = this.props
        var renderList = () =>{
            if(purchaseRecord === undefined){
                //do nothing
            }else if(purchaseRecord.length === 0){
                return (
                    <div>
                        <br/>
                        <h4 style={{textAlign:'center'}}>There are no Previous Purchase Record</h4>
                    </div>
                )
            }else{
                return purchaseRecord.map((record)=>{
                    var date = moment(record.date).format('DD/MM/YYYY')
                    return (
                        <RaisedButton key={record._id} style={{textAlign:'center', maxHeight:'36px',marginLeft:'5px', width:'98%'}} onTouchTap={()=>{
                                this.handleNext(record);
                                this.togglePurchaseToItem
                            }}>
                            <div className="column medium-3">
                                {record.invoiceID}
                            </div>
                            <div className="column medium-3">
                                {date}
                            </div>
                            <div className="column medium-3">
                                {record.total}
                            </div>
                            <div className="column medium-3">
                                {record.status}
                            </div>
                        </RaisedButton>
                    )
                })
            }
        }
        var renderItemList = () =>{
            if(this.state.itemRecord.length > 0){
                return this.state.itemRecord.map((singleItem)=>{
                    return (
                        <div key={singleItem.ProductID} style={{textAlign:'center'}}>
                            <div className="column medium-2 hide-for-small-only" style={style}>
                                {singleItem.ProductID}
                            </div>
                            <div className="column medium-3" style={style}>
                                {singleItem.ProductName}
                            </div>
                            <div className="column medium-2" style={style}>
                                {singleItem.Spec}
                            </div>
                            <div className="column medium-1" style={style}>
                                {singleItem.quantity}
                            </div>
                            <div className="column medium-1" style={style}>
                                {singleItem.Price}
                            </div>
                            <div className="column medium-1" style={style}>
                                {singleItem.discount}
                            </div>
                            <div className="column medium-1" style={style}>
                                {singleItem.amount}
                            </div>
                        </div>
                    )
                })
            }
        }
        var controller = () =>{
            if(this.state.toggle){
                return (
                    <div >
                        <div className="row" style={{textAlign:'center'}}>
                            <div className="column medium-3">
                                Invoice ID
                            </div>
                            <div className="column medium-3">
                                Date
                            </div>
                            <div className="column medium-3">
                                Total Amount
                            </div>
                            <div className="column medium-3">
                                Current Status
                            </div>
                        </div>
                        <hr/>
                        {renderList()}
                    </div>
                )
            }else{
                return (
                    <div>
                        <FlatButton label="back" secondary={true} onTouchTap={this.handlePrevious}/>
                        <h5 style={{textAlign:'center'}}>Item Purchased - {this.state.recordID}</h5>
                        <br/>
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
                        </div>
                        <hr/>
                        {renderItemList()}
                    </div>
                )
            }
        }

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        return(
            <div>
                <RaisedButton label="Previous Purchase Record" onTouchTap={this.handleOpen} fullWidth={true}/>
                <Dialog
                    title="Previous Purchase Record"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div style={{minHeight:'500px'}}>
                        {controller()}
                    </div>
                </Dialog>
            </div>
        )
    }
});

export default connect((state)=>{
    return{
        purchaseRecord:state.clientManagement.singleClient.singleClientAttr.purchaseRecord
    }
})(purchaseRecord);
