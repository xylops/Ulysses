var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/dispatchRecordActions')
var snackBarActions = require('../../../actions/snackBarActions')
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
//api
var logisticAPI = require('LogisticAPI')
//my component
import SingleDispatchRecord from './SingleDispatchRecord'
//style
const style = {
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
  width: '70%',
  maxWidth: 'none',
};

var DRL = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.startFetchingDR());
        logisticAPI.getPickNotComplete().then((res)=>{
            dispatch(actions.completeFetchingDR(res.data))
        });
    },
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeSingleDR())
    },
    handleConfirm:function(){
        var {dispatch, record} = this.props;
        logisticAPI.reConfirmReturn(record).then((res)=>{
            var resText = res.data.message;
            dispatch(actions.startFetchingDR());
            logisticAPI.getPickNotComplete().then((res)=>{
                dispatch(actions.completeFetchingDR(res.data))
            });
            dispatch(actions.closeSingleDR())
            dispatch(snackBarActions.openSnackBar(resText))
        })
    },
    render:function(){
        var {DR, fetching, open, record, searchText} = this.props;

        const actions = [
            <RaisedButton
                label="Cancel"
                onTouchTap={this.handleClose}
                style={{width:'50%'}}
            />,
            <RaisedButton
                label="Confirmed"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleConfirm}
                style={{width:'50%'}}
            />,
        ];

        var renderDRList = () =>{

            let filteredDRList = DR.filter((rec)=>{
                return (rec.invoiceID.indexOf(searchText) !== -1  || rec.client.name.indexOf(searchText) !== -1);
            });

            if(fetching){
                return (
                    <div style={{paddingTop:'10%', textAlign:'center'}}>
                        <CircularProgress size={60} thickness={7} />
                    </div>
                )
            }else{
                return filteredDRList.map((rec)=>{
                    return (
                        <SingleDispatchRecord key={rec._id} record={rec}/>
                    )
                })
            }
        }

        var renderItemList = () =>{
            return record.item.map((item)=>{
                return(
                    <div className="row" key={item.id} style={style.dialogItem}>
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

        var renderDialog = () =>{

            if(record !== null){
                var date = moment(record.date).format('DD/MM/YYYY');

                return (
                    <Dialog
                        title="Dialog With Actions"
                        actions={actions}
                        modal={false}
                        open={open}
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
                            <div className="column small-12 medium-6">
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
                )
            }
        }
        return (
            <div >
                {renderDRList()}
                {renderDialog()}
            </div>

        )
    }
})

export default connect((state)=>{
    return {
        DR: state.logistic.dispatchRecord.DR,
        fetching: state.logistic.dispatchRecord.isFetching,
        record: state.logistic.dispatchRecord.singleDR,
        open: state.logistic.dispatchRecord.open,
        searchText : state.logistic.dispatchRecord.searchText
    }
})(DRL)
