var React = require('react')
var {connect} = require('react-redux');
var actions = require('../../actions/productDetailActions');


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
        dispatch(actions.closeSingleProductDialog())
    },
    render:function(){
        //Redux function
        var {createNewDialog} = this.props;

        const newProduct = [
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
                    title="Create New Product"
                    actions={newProduct}
                    modal={false}
                    open= {createNewDialog}
                    onRequestClose={this.toggleDialog}
                    >
                    <div className="text-center">
                        <TextField
                            floatingLabelText="Product ID"
                            ref="PID"
                        /><br/>
                        <TextField
                            floatingLabelText="Product Name"
                            ref="PName"
                        /><br/>
                        <TextField
                            floatingLabelText="Spec"
                            ref='PSpec'
                        /><br/>
                        <TextField
                            floatingLabelText="Price"
                            ref='PPrice'
                        /><br/>
                        <TextField
                            floatingLabelText="Unit"
                            ref="PUnit"
                        /><br/><br/>
                    </div>
                </Dialog>
            </div>

        )
    }
})

export default connect((state)=>{
    return {
        createNewDialog: state.productDetailCombiner.createNewDialog
    }
})(CreateNewProduct);
