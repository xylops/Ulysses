var React = require('react')
//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions')
var snackBarActions = require('../../actions/snackBarActions')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//api
var clientManagementAPI = require('../../api/ClientManagementAPI')
//my component
var Location = require('./Location')

var  CreateNewProduct = React.createClass({
    getInitialState:function(){
        return ({
            value:null,
            locationC:'Set Location'
        })
    },
    handleChange:function(event, index, value){
        this.setState({
            value
        })
    },
    handleLocationChange:function(locationC){
        this.setState({
            locationC
        })
    },
    toggleDialog:function(){
        var {dispatch} = this.props;
        dispatch(actions.toggleCreateNewClientDialog())
        if(this.state.location !== 'Location'){
            this.setState({
                locationC:'Set Location'
            })
        }
    },
    handleSave : function(){
        var {dispatch} = this.props;
        var id = this.refs.id.getValue();
        var name = this.refs.name.getValue();
        var address = this.refs.address.getValue();
        var phone = this.refs.phone.getValue();
        var delieverytime = this.refs.delieverytime.getValue();
        var paymentMethod = this.state.value;
        var location = this.state.locationC

        var newClient = [id, name, address, phone, delieverytime, paymentMethod, location]
        console.log(newClient)
        if(id && name){
            clientManagementAPI.createNewClient(newClient).then((response)=>{
                var resText = response.data.message;
                dispatch(actions.startFetchClientList())
                clientManagementAPI.getFullClientData().then((CL)=>{
                    dispatch(actions.completeFetchClientList(CL.data));
                    dispatch(actions.toggleCreateNewClientDialog());
                    dispatch(snackBarActions.openSnackBar(resText));
                })
            });
        }
    },
    render:function(){
        //Redux function
        var {createNewClientDialog} = this.props;

        const newClientDialogActions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.toggleDialog}
            />,
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={this.handleSave}
            />,
        ];

        return (
            <div>
                <FloatingActionButton onTouchTap={this.toggleDialog}>
                    <ContentAdd/>
                </FloatingActionButton>
                <Dialog
                    title="Create New Client"
                    actions={newClientDialogActions}
                    modal={false}
                    open= {createNewClientDialog}
                    onRequestClose={this.toggleDialog}
                    >
                    <div className="text-center">
                        <div className="row">
                            <div className="column small-12 medium-6">
                                <TextField
                                    floatingLabelText="Client ID"
                                    ref="id"
                                    fullWidth={true}
                                /><br/>
                                <TextField
                                    floatingLabelText="Name"
                                    ref="name"
                                    fullWidth={true}
                                /><br/>
                                <TextField
                                    floatingLabelText="Phone Number"
                                    ref="phone"
                                    fullWidth={true}
                                /><br/>
                                <SelectField
                                    floatingLabelText="PayMent Method"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    fullWidth={true}
                                >
                                    <MenuItem value={null} primaryText="" />
                                    <MenuItem value={'C.O.D'} primaryText="C.O.D" />
                                    <MenuItem value={'30Days'} primaryText="30 Days" />
                                    <MenuItem value={'PAYPAL'} primaryText="PayPal" />
                                </SelectField>
                            </div>
                            <div className="column small-12 medium-6">
                                <TextField
                                    floatingLabelText="Delievery Time"
                                    ref="delieverytime"
                                    fullWidth={true}
                                /><br/>
                                <TextField
                                    floatingLabelText="Address"
                                    ref="address"
                                    fullWidth={true}
                                /><br/><br/>
                                <Location handleLocationChange={this.handleLocationChange} location={this.state.locationC}/>
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>

        )
    }
})

export default connect((state)=>{
    return {
        createNewClientDialog: state.clientManagement.createNewClientDialog
    }
})(CreateNewProduct);
