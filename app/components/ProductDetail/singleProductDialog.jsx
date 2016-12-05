var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../actions/productDetailActions');

//material-ui
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';


var singleProductDialog = React.createClass({
    handleClose:function(){
        var {dispatch} = this.props
        dispatch(actions.closeSingleProductDialog())
    },
    render:function(){
        var {singleProductDialog} = this.props
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
       ];
        return(

            <Dialog
                title="Product Detail"
                actions={actions}
                modal={false}
                open={singleProductDialog}
                onRequestClose={this.handleClose}
            >
                <div className="medium-6 small-12 column">
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product ID"

                        ref="ProductID"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Product Name"

                        ref="ProductName"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Spec"

                        ref="Spec"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Price"

                        ref="Price"
                    /><br/>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Unit"

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
        singleProductDialog: state.productDetailCombiner.singleProductDialog
    }
})(singleProductDialog)
