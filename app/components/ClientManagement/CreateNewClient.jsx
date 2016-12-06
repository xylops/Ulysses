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
var productDetailAPI = require('../../api/productDetailAPI')

var  CreateNewProduct = React.createClass({
    toggleDialog:function(){
        var {dispatch} = this.props;
        dispatch(actions.toggleCreateNewClientDialog())
    },
    handleSave : function(){
        var {dispatch} = this.props;
        var ID = this.refs.ID.getValue()

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
                            ref="ID"
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
