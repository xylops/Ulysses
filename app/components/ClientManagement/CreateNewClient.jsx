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
//api
var clientManagementAPI = require('../../api/ClientManagementAPI')

var  CreateNewProduct = React.createClass({
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

        var newClient = [id, name, address, phone, delieverytime]

        clientManagementAPI.createNewClient(newClient).then((response)=>{
            var resText = response.data.message;
            dispatch(actions.startFetchClientList())
            clientManagementAPI.getFullClientData().then((CL)=>{
                dispatch(actions.completeFetchClientList(CL.data));
                dispatch(actions.toggleCreateNewClientDialog());
                dispatch(snackBarActions.openSnackBar(resText));
            })
        });

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
                        <TextField
                            floatingLabelText="Client ID"
                            ref="id"
                        /><br/>
                        <TextField
                            floatingLabelText="Name"
                            ref="name"
                        /><br/>
                        <TextField
                            floatingLabelText="Address"
                            ref="address"
                        /><br/>
                        <TextField
                            floatingLabelText="Phone Number"
                            ref="phone"
                        /><br/>
                        <TextField
                            floatingLabelText="Delievery Time"
                            ref="delieverytime"
                        /><br/>
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
