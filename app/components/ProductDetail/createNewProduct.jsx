var React = require('react')

//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/productDetailActions');
var snackBarActions = require('../../actions/snackBarActions')

//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

//api
var productDetailAPI = require('../../api/productDetailAPI')

var  CreateNewProduct = React.createClass({
    toggleDialog:function(){
        var {dispatch} = this.props;
        dispatch(actions.toggleCreateNewDialog())
    },
    handleSave : function(){
        var {dispatch} = this.props;
        var ProductID = this.refs.PID.getValue()
        var ProductName = this.refs.PName.getValue()
        var Spec = this.refs.PSpec.getValue()
        var Price = this.refs.PPrice.getValue()
        var Unit = this.refs.PUnit.getValue()
        var OwnBrand = this.refs.CB.checked;

            var newProduct = [
                ProductID,
                ProductName,
                Spec,
                Price,
                Unit,
                OwnBrand
            ]
            productDetailAPI.createNewProduct(newProduct).then((response)=>{
                var resText = response.data.message;
                dispatch(actions.startFetchPDL())
                productDetailAPI.getFullProductData().then((PDL)=>{
                    dispatch(actions.completeFetchPDL(PDL.data));
                    dispatch(actions.toggleCreateNewDialog());
                    dispatch(snackBarActions.openSnackBar(resText));
                })
            });

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
                <FloatingActionButton onTouchTap={this.toggleDialog} >
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
                        <span style={{color:'red'}}>WARNING Product ID could <b>NOT</b> be change after saving</span><br/>
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
                        <span style={{paddingTop:'20px'}}><input type="checkbox" ref="CB"/> Own Brand</span>
                        <br/>
                    </div>
                </Dialog>

            </div>

        )
    }
})

export default connect((state)=>{
    return {
        createNewDialog: state.productDetail.createNewDialog
    }
})(CreateNewProduct);
