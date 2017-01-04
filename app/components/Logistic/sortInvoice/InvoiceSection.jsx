var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/logisticActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//api
var logisticAPI = require('LogisticAPI')
//myCompoent
import Location from '../../ClientManagement/Location'
import SingleInvoice from './SingleInvoice'
//myStyle
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}

var InvoicSection = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props
        dispatch(actions.startNonProcessInvoice())
        logisticAPI.getNonProcessInvoice().then((res)=>{
            var tempArray = []
            res.data.forEach((record)=>{
                record = {
                    ...record, show: 0
                }
                tempArray.push(record)
            })
            dispatch(actions.completeNonProcessInvoice(tempArray))
        });
    },
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeLogisticInvoiceDialog());
    },
    getInitialState:function(){
        return ({
            location:'N/A'
        })
    },
    handleLocationChange:function(locationC){
        this.setState({
            location:locationC
        })
    },
    render:function(){
        var {NPI, fetching, dialogOpen, invoice} = this.props
        if(this.state.location === 'N/A'){
            var filter = ''
        } else{
            var filter = this.state.location
        }

        let arr = NPI.filter((record)=>{
            return ( record.show === 0 );
        });

        let filterNPI = arr.filter((record)=>{
            return ( record.client.location.indexOf(filter) !== -1);
        });

        // || record.client.location.indexOf(filter) !== -1

        var renderInvoiceList = () =>{
            if(fetching){
                return (
                    <div style={style}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }else{
                return filterNPI.map((singleInvoice)=>{
                    return(
                        <SingleInvoice key={singleInvoice._id} invoice={singleInvoice}/>
                    )
                })
            }
        }
        var renderClientInfo = () =>{
            if(invoice !== undefined){
                return (
                    <div className="row">
                        <div className="column small-2">
                            Address:
                        </div>
                        <div className="column small-10" style={{textAlign:'left'}}>
                            {invoice.client.address}
                        </div>
                    </div>
                )
            }
        }
        var renderDialogItem = () =>{
            if(invoice !== undefined){
                return invoice.item.map((item)=>{
                    return (
                        <div key={item.ProductID} className="row" style={{textAlign:'center'}}>
                            <div className="column small-4">
                                {item.ProductID}
                            </div>
                            <div className="column small-4">
                                {item.ProductName}
                            </div>
                            <div className="column small-4">
                                {item.quantity}
                            </div>
                        </div>
                    )
                })
            }
        }

        const actions = [
            <RaisedButton
                label="Cancel"
                style={{width:'50%'}}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="Submit"
                primary={true}
                style={{width:'50%'}}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <div className="row" style={{minHeight:'102px'}}>
                    <div className="column small-6 medium-2">
                        <h5>Area :</h5>
                    </div>
                    <div className="column small-6 medium-8">
                        <Location handleLocationChange={this.handleLocationChange} location={this.state.location}/>
                    </div>
                    <div className="column small-6 medium-2">
                        <FlatButton  label="X" secondary={true} onTouchTap={()=>{
                            this.setState({
                                location:'N/A'
                            })
                        }}/>
                    </div>
                </div>
                <hr/>
                <div>
                    {renderInvoiceList()}
                    <Dialog
                        title="Invoice Detail"
                        actions={actions}
                        modal={false}
                        open={dialogOpen}
                        onRequestClose={this.handleClose}
                    >
                        {renderClientInfo()}
                        <br/>
                        <br/>
                        <div className="row" style={{textAlign:'center'}}>
                            <div className="column small-4">
                                ProductID
                            </div>
                            <div className="column small-4">
                                ProductName
                            </div>
                            <div className="column small-4">
                                Quanitity
                            </div>
                        </div>
                        <hr/>
                        {renderDialogItem()}
                    </Dialog>
                </div>
            </div>

        )
    }
})

export default connect((state)=>{
    return{
        fetching : state.logistic.fetchNonProcessInvoice.isFetching,
        NPI : state.logistic.fetchNonProcessInvoice.NPI,
        dialogOpen : state.logistic.singleInvoiceDialog.open,
        invoice: state.logistic.singleInvoiceDialog.invoice
    }
})(InvoicSection)
