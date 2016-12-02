var React = require('react')

//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField'

//api
var productDetailAPI = require('../../api/productDetailAPI')

var  CreateNewProduct = React.createClass({
    getInitialState:function(){
        return{
            createNewDialog:false,
            updated: false
        }
    },
    handleClose : function(){
        this.setState({createNewDialog:false});
    },
    handleSave : function(){
        var ProductID = this.refs.PID.getValue()
        var ProductName = this.refs.PName.getValue()
        var Spec = this.refs.PSpec.getValue()
        var Price = this.refs.PPrice.getValue()
        var Unit = this.refs.PUnit.getValue()

        if(ProductID.length > 0 && ProductName.length > 0){
            var newProduct = [
                ProductID,
                ProductName,
                Spec,
                Price,
                Unit
            ]
            productDetailAPI.createNewProduct(newProduct).then(()=>{
                location.reload();
                this.setState({
                    createNewDialog:false
                })
            });
        }

    },
    render:function(){
        const newProduct = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={this.handleSave}
            />,
        ];

        return (
            <div>
                <FloatingActionButton mini={true} style={{marginTop:'20px'}} onTouchTap={()=>{
                    this.setState({
                        createNewDialog:true
                    })
                }}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Create New Product"
                    actions={newProduct}
                    modal={false}
                    open={this.state.createNewDialog}
                    onRequestClose={this.handleClose}
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

module.exports = CreateNewProduct;
