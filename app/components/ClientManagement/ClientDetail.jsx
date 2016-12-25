var React = require('react')
//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions');
var snackBarActions = require('../../actions/snackBarActions')
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
//Style
const style = {
    dialog:{
        width: '80%',
        maxWidth: 'none',
    },
    dialogBtn:{
        marginTop:'10px',
    }
}

var ClientDetail = React.createClass({
    getInitialState:function(){
        return ({
            value: 0
        })
    },
    handleChange: function (event, index, value){
        this.setState({
            value
        })
    },
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeSingleClientDialog());
    },
    dialogUpdate : function(){
        var {dispatch} = this.props

        var id = this.refs.id.getValue();
        var name = this.refs.name.getValue();
        var address = this.refs.address.getValue();
        var phone = this.refs.phone.getValue();
        var delieverytime = this.refs.delieverytime.getValue();
        var paymentMethod = this.refs.paymentMethod.getValue();

        var updatedClient = [id, name, address, phone, delieverytime, paymentMethod]
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
                    <div className="column small-10 medium-8">
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
                            floatingLabelText="Address"
                            fullWidth={true}
                            defaultValue={clientAttr.address}
                            ref="address"
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
                            floatingLabelText="Delievery Time"
                            defaultValue={clientAttr.delieverytime}
                            fullWidth={true}
                            ref="delieverytime"
                        /><br/>
                    </div>
                    <div className="column medium-4 hide-for-small-only">
                        <SelectField
                            floatingLabelText="PayMent Method"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={1} primaryText="N/A" />
                            <MenuItem value={2} primaryText="30 Days" />
                            <MenuItem value={3} primaryText="C.O.D" />
                            <MenuItem value={4} primaryText="PayPal" />
                        </SelectField>
                        <RaisedButton label="Previous Purchase Record" fullWidth={true} style={style.dialogBtn}/>
                        <RaisedButton label="New Purchase" fullWidth={true} style={style.dialogBtn}/>
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
