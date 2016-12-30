var React = require('react')
var {Link} = require('react-router');
//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions');
var snackBarActions = require('../../actions/snackBarActions')
var invoiceActions = require('../../actions/invoiceAction')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/move-to-inbox';
import PreviousPurchase from 'material-ui/svg-icons/action/receipt';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//api
var clientManagementAPI = require('../../api/ClientManagementAPI')
//my component
var Location = require('./Location')
import PurchaseRecordDialog from './purchaseRecordDialog'
//Style
const style = {
    dialog:{
        width: '60%',
        maxWidth: 'none',
    },
    dialogBtn:{
        marginTop:'10px',
    }
}

var ClientDetail = React.createClass({
    handleLocationChange:function(locationC){
        var {clientAttr, dispatch} = this.props
        clientAttr.location = locationC
        dispatch(actions.updateSingleClient(clientAttr))
        dispatch(actions.closeSingleClientDialog());
        dispatch(actions.openSingleClientDialog(clientAttr))
    },
    handlePaymentChange:function(event, index, value){
        var {clientAttr, dispatch} = this.props
        clientAttr.paymentMethod = value
        dispatch(actions.updateSingleClient(clientAttr))
        dispatch(actions.closeSingleClientDialog());
        dispatch(actions.openSingleClientDialog(clientAttr))
    },
    handleNewPurchase:function(){
        var {dispatch, clientAttr} = this.props;
        dispatch(invoiceActions.addInvoiceClient(clientAttr))
    },
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeSingleClientDialog());
    },
    dialogUpdate : function(){
        var {dispatch, clientAttr} = this.props

        var id = this.refs.id.getValue();
        var name = this.refs.name.getValue();
        var address = this.refs.address.getValue();
        var phone = this.refs.phone.getValue();
        var delieverytime = this.refs.delieverytime.getValue();
        var location = clientAttr.location
        var paymentMethod = clientAttr.paymentMethod

        var updatedClient = [id, name, address, phone, delieverytime, location, paymentMethod]
        clientManagementAPI.updateClient(updatedClient).then((response)=>{
            var resText = response.data.message;
            dispatch(actions.startFetchClientList())
            clientManagementAPI.getFullClientData().then((CL)=>{
                dispatch(actions.completeFetchClientList(CL.data));
                dispatch(actions.closeSingleClientDialog())
                dispatch(snackBarActions.openSnackBar(resText));
            })
        });
    },
    dialogDelete : function(){
        var {dispatch, clientAttr} =this.props
        clientManagementAPI.deleteClient(clientAttr.id).then((response)=>{
            var resText = response.data.message;
            dispatch(actions.startFetchClientList())
            clientManagementAPI.getFullClientData().then((PDL)=>{
                dispatch(actions.completeFetchClientList(PDL.data));
                dispatch(actions.closeSingleClientDialog())
                dispatch(snackBarActions.openSnackBar(resText));
            })
        })
    },

    render:function(){
        var {clientAttr, open} = this.props;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title="Client Detail"
                actions={actions}
                modal={false}
                open={open}
                contentStyle={style.dialog}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <div className="row">
                    <div className="column small-10 medium-7">
                        <TextField
                            id="text-field-default"
                            floatingLabelText="ID"
                            defaultValue={clientAttr.id}
                            disabled={true}
                            fullWidth={true}
                            ref="id"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Name"
                            defaultValue={clientAttr.name}
                            fullWidth={true}
                            ref="name"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Phone Number"
                            defaultValue={clientAttr.phone}
                            fullWidth={true}
                            ref="phone"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Address"
                            fullWidth={true}
                            defaultValue={clientAttr.address}
                            ref="address"
                        /><br/>
                        <Location handleLocationChange={this.handleLocationChange} location={clientAttr.location}/>
                    </div>
                    <div className="column medium-5 hide-for-small-only">
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Delievery Time"
                            defaultValue={clientAttr.delieverytime}
                            fullWidth={true}
                            ref="delieverytime"
                        /><br/>
                        <SelectField
                            floatingLabelText="PayMent Method"
                            value={clientAttr.paymentMethod}
                            onChange={this.handlePaymentChange}
                            fullWidth={true}
                        >
                            <MenuItem value={null} primaryText="" />
                            <MenuItem value={'C.O.D'} primaryText="C.O.D" />
                            <MenuItem value={'30Days'} primaryText="30 Days" />
                            <MenuItem value={'PAYPAL'} primaryText="PayPal" />
                        </SelectField>
                        <PurchaseRecordDialog/>
                        <Link to="/IS"><RaisedButton label="New Purchase" fullWidth={true} style={style.dialogBtn} onTouchTap={this.handleNewPurchase}/></Link>
                        <RaisedButton label="Save changes" fullWidth={true} style={style.dialogBtn} onTouchTap={this.dialogUpdate}/>
                        <RaisedButton label="Delete Client" fullWidth={true} style={style.dialogBtn} onTouchTap={this.dialogDelete}/>
                    </div>
                    <div className="column small-2 show-for-small-only">
                        <br/>
                        <FloatingActionButton onTouchTap={this.toggleDialog} mini={true}>
                            <PreviousPurchase/>
                        </FloatingActionButton>
                        <br/>
                        <FloatingActionButton onTouchTap={this.toggleDialog} mini={true} style={{marginTop:'10px'}}>
                            <ContentAdd/>
                        </FloatingActionButton>
                        <br/>
                        <FloatingActionButton onTouchTap={this.dialogUpdate} mini={true} style={{marginTop:'10px'}}>
                            <ContentSave/>
                        </FloatingActionButton>
                        <br/>
                        <FloatingActionButton onTouchTap={this.dialogDelete} mini={true} secondary={true} style={{marginTop:'10px'}}>
                            <ContentDelete/>
                        </FloatingActionButton>
                    </div>
                </div>
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return{
        clientAttr : state.clientManagement.singleClient.singleClientAttr,
        open : state.clientManagement.singleClient.open
    }
})(ClientDetail)
