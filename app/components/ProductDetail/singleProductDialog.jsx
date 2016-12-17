var React = require('react')
//redux
var {connect} = require('react-redux')
var actions = require('../../actions/productDetailActions');
var snackBarActions = require('../../actions/snackBarActions')
//material-ui
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/move-to-inbox';
import Checkbox from 'material-ui/Checkbox';
//api
var productDetailAPI = require('ProductDetailAPI')
//style
const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};
const styles = {
  checkbox: {
    marginBottom: 16,
  },
};

var singleProductDialog = React.createClass({
    //Redux handle
    handleClose:function(){
        var {dispatch} = this.props
        dispatch(actions.closeSingleProductDialog())
    },
    handleChange:function(){
        var {dispatch, SPA} = this.props
        var newSPA = {...SPA, OwnBrand:!SPA.OwnBrand}
        dispatch(actions.toggleOwnBrand(newSPA))
    },
    dialogUpdate : function(){
        var {dispatch, SPA} = this.props

        var ProductID = this.refs.ProductID.getValue();
        var ProductName = this.refs.ProductName.getValue();
        var Spec = this.refs.Spec.getValue();
        var Price = this.refs.Price.getValue();
        var Unit = this.refs.Unit.getValue();
        var OwnBrand = SPA.OwnBrand

        var updatedProduct = [ProductID, ProductName, Spec, Price, Unit, OwnBrand]
        productDetailAPI.updateProduct(updatedProduct).then((response)=>{
            var resText = response.data.message;
            dispatch(actions.startFetchPDL())
            productDetailAPI.getFullProductData().then((PDL)=>{
                dispatch(actions.completeFetchPDL(PDL.data));
                dispatch(actions.closeSingleProductDialog())
                dispatch(snackBarActions.openSnackBar(resText));
            })
        });
    },
    dialogDelete : function(prod){
        var {dispatch, SPA} =this.props
        productDetailAPI.deleteProduct(SPA.ProductID).then((response)=>{
            var resText = response.data.message;
            dispatch(actions.startFetchPDL())
            productDetailAPI.getFullProductData().then((PDL)=>{
                dispatch(actions.completeFetchPDL(PDL.data));
                dispatch(actions.closeSingleProductDialog())
                dispatch(snackBarActions.openSnackBar(resText));
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
                <div className="medium-6 small-10 column">
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product ID"
                        disabled={true}
                        defaultValue={SPA.ProductID}
                        fullWidth={true}
                        ref="ProductID"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product Name"
                        defaultValue={SPA.ProductName}
                        fullWidth={true}
                        ref="ProductName"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Spec"
                        defaultValue={SPA.Spec}
                        fullWidth={true}
                        ref="Spec"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Price"
                        defaultValue={SPA.Price}
                        fullWidth={true}
                        ref="Price"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Unit"
                        defaultValue={SPA.Unit}
                        fullWidth={true}
                        ref="Unit"
                    /><br/><br/>
                    <Checkbox
                        label="Own Brand"
                        style={styles.checkbox}
                        checked={SPA.OwnBrand}
                        onClick={this.handleChange}
                    />
                    <br/>
                </div>
                <div className="medium-6 small-12 column hide-for-small-only">
                    <br/>
                    <div className="small-12 medium-12 column" >
                        <RaisedButton label="Delete" fullWidth={true} secondary={true} onTouchTap={this.dialogDelete}></RaisedButton>
                    </div>
                    <br/>
                    <br/>
                    <div className="small-12 medium-12 column">
                        <RaisedButton label="SAVE" fullWidth={true} primary={true} onTouchTap={this.dialogUpdate}></RaisedButton>
                    </div>
                </div>
                <div className="column small-2 show-for-small-only">
                    <br/>
                    <FloatingActionButton onTouchTap={this.dialogUpdate} mini={true} style={{marginTop:'10px'}}>
                        <ContentSave/>
                    </FloatingActionButton>
                    <br/>
                    <FloatingActionButton onTouchTap={this.dialogDelete} mini={true} secondary={true} style={{marginTop:'10px'}}>
                        <ContentDelete/>
                    </FloatingActionButton>
                </div>
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return {
        singleProductDialog: state.productDetail.singleProductDialog.open,
        SPA  : state.productDetail.singleProductDialog.SPA
    }
})(singleProductDialog)
