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
            value:null
        })
    },
    handleChange:function(event, index, value){
        this.setState({
            value
        })
    },
    handleLocationChange:function(location){
        console.log(location)
    },
    toggleDialog:function(){
        var {dispatch} = this.props;
        dispatch(actions.toggleCreateNewClientDialog())
    },
    handleSave : function(){
        var {dispatch} = this.props;
        var id = this.refs.id.getValue();
        var name = this.refs.name.getValue();
        var address = this.refs.address.getValue();
        var phone = this.refs.phone.getValue();
        var delieverytime = this.refs.delieverytime.getValue();
        var paymentMethod = this.state.value

        var newClient = [id, name, address, phone, delieverytime, paymentMethod]
        console.log(newClient)
        // clientManagementAPI.createNewClient(newClient).then((response)=>{
        //     var resText = response.data.message;
        //     dispatch(actions.startFetchClientList())
        //     clientManagementAPI.getFullClientData().then((CL)=>{
        //         dispatch(actions.completeFetchClientList(CL.data));
        //         dispatch(actions.toggleCreateNewClientDialog());
        //         dispatch(snackBarActions.openSnackBar(resText));
        //     })
        // });

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
                                /><br/>
                                <TextField
                                    floatingLabelText="Name"
                                    ref="name"
                                /><br/>
                                <TextField
                                    floatingLabelText="Delievery Time"
                                    ref="delieverytime"
                                /><br/>
                                <TextField
                                    floatingLabelText="Phone Number"
                                    ref="phone"
                                /><br/>
                            </div>
                            <div className="column small-12 medium-6">
                                <TextField
                                    floatingLabelText="Address"
                                    ref="address"
                                /><br/>
                                <Location handleLocationChange={this.handleLocationChange}/>
                                <SelectField
                                    floatingLabelText="PayMent Method"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                >

                                    <MenuItem value={null} primaryText="" />
                                    <MenuItem className="column small-4" value={1} primaryText="C.O.D" />
                                    <MenuItem className="column small-4" value={2} primaryText="30 Days" />
                                    <MenuItem className="column small-4" value={3} primaryText="PayPal" />
                                </SelectField>
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
