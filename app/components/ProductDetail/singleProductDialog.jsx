var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../actions/productDetailActions');

//material-ui
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';

//api
var productDetailAPI = require('productDetailAPI')

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

var singleProductDialog = React.createClass({
    //This Component Only

    //Redux handle
    handleClose:function(){
        var {dispatch} = this.props
        dispatch(actions.closeSingleProductDialog())
    },
    dialogUpdate : function(){
        var {dispatch} = this.props

        var ProductID = this.refs.ProductID.getValue();
        var ProductName = this.refs.ProductName.getValue();
        var Spec = this.refs.Spec.getValue();
        var Price = this.refs.Price.getValue();
        var Unit = this.refs.Unit.getValue();

        var updatedProduct = [ProductID, ProductName, Spec, Price, Unit]
        productDetailAPI.updateProduct(updatedProduct).then(()=>{
            dispatch(actions.startFetchPDL())
            productDetailAPI.getFullProductData().then((PDL)=>{
                dispatch(actions.completeFetchPDL(PDL.data));
                dispatch(actions.closeSingleProductDialog())
                this.setState({
                    reConfirm:false
                })
            })
        });
    },
    dialogDelete : function(prod){
        var {dispatch, SPA} =this.props
        productDetailAPI.deleteProduct(SPA.ProductID).then(()=>{
            dispatch(actions.startFetchPDL())
            productDetailAPI.getFullProductData().then((PDL)=>{
                dispatch(actions.completeFetchPDL(PDL.data));
                dispatch(actions.closeSingleProductDialog())
                this.setState({
                    reConfirm:false
                })
            })
        })
  },

    render:function(){
        var {singleProductDialog, SPA} = this.props
        const SPD = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
       ];

        return(
            <Dialog
                title="Product Detail"
                actions={SPD}
                modal={false}
                open={singleProductDialog}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
            >
                <div className="medium-6 small-12 column">
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product ID"
                        defaultValue={SPA.ProductID}
                        ref="ProductID"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product Name"
                        defaultValue={SPA.ProductName}
                        ref="ProductName"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Spec"
                        defaultValue={SPA.Spec}
                        ref="Spec"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Price"
                        defaultValue={SPA.Price}
                        ref="Price"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Unit"
                        defaultValue={SPA.Unit}
                        ref="Unit"
                    /><br/>
                </div>
                <div className="medium-6 small-12 column">
                    <br/>
                    <div className="small-12 medium-12 column" >
                        <RaisedButton label="Delete" fullWidth={true} secondary={true} onTouchTap={this.dialogDelete}></RaisedButton>
                    </div>
                    <br/>
                    <br/>
                    <div className="small-12 medium-12 column">
                        <RaisedButton label="SAVE" fullWidth={true} onTouchTap={this.dialogUpdate}></RaisedButton>
                    </div>
                </div>
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return {
        singleProductDialog: state.productDetailCombiner.singleProductDialog.open,
        SPA  : state.productDetailCombiner.singleProductDialog.SPA
    }
})(singleProductDialog)