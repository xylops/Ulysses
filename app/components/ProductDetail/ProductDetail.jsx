var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

//API
var productDetailAPI = require('../../api/productDetailAPI')

//Component
var TopSection = require('./TopSection')

const style={
    paper:{
        width:'100%',
        margin:'10 auto'
    },
    tableHeader:{
        textAlign:'center',
        paddingTop:10,
    },
    tableRow:{
        textAlign:'center',
        maxHeight:'36px'
    },
    spinner:{
        position:'absolute',
        top:'calc(50% - 144px)',
        left:'calc(50% - 80px)'
    },
}

var ProductDetail = React.createClass({
    getInitialState:function(){
        return{
            productList:undefined,
            singleProduct:undefined,
            singleProductDialog:false,
            productFilterText:'',
        }
    },
    getData:function(){
        productDetailAPI.getFullProductData().then((prod)=>{
            this.setState({
                productList:prod.data
            })
        })
    },
    componentDidMount:function(){
        this.getData()
    },
    handleClose : function(){
        this.setState({singleProductDialog: false});
    },
    dialogUpdate : function(){
        var ProductID = this.refs.ProductID.getValue();
        var ProductName = this.refs.ProductName.getValue();
        var Spec = this.refs.Spec.getValue();
        var Price = this.refs.Price.getValue();
        var Unit = this.refs.Unit.getValue();

        var updatedProduct = [ProductID, ProductName, Spec, Price, Unit]
        productDetailAPI.updateProduct(updatedProduct).then(()=>{
            this.getData();
            this.setState({
                singleProductDialog:false,
            })
        });

    },
    dialogDelete : function(prod){
        productDetailAPI.deleteProduct(this.state.singleProduct[0]).then(()=>{
            this.getData();
            this.setState({
                singleProductDialog:false,
            })
        })

    },
    productFilterText:function(productFilterText){
        this.setState({
            productFilterText
        })
    },

    render:function(){
        var {productList, singleProduct, productFilterText} = this.state;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
       ];


        var renderList = ()=>{
            if(productList){
                //filterProduct List
                let filteredProductList = this.state.productList.filter((product)=>{
                    return product.ProductName.indexOf(this.state.productFilterText) !== -1;
                });
                //looping through the ProductList
                return filteredProductList.map((product)=>{
                    return (
                        <div key={product._id}>
                            <RaisedButton className="row" style={style.tableRow} fullWidth={true} onTouchTap={()=>{
                                this.setState({
                                    singleProductDialog:true,
                                    singleProduct:[product.ProductID, product.ProductName, product.Spec, product.Price, product.Unit, product._id]
                                })
                            }}>
                                <div className="column medium-2 hide-for-small-only"> {product.ProductID} </div>
                                <div className="column medium-5 small-8"> {product.ProductName} </div>
                                <div className="column medium-2 hide-for-small-only"> {product.Spec} </div>
                                <div className="column medium-2 small-4"> {product.Price} </div>
                                <div className="column medium-1 hide-for-small-only"> {product.Unit} </div>
                            </RaisedButton>
                        </div>
                    )
                })
            }else{
                return <CircularProgress size={80} thickness={5} style={style.spinner}/>
            }
        }

        var renderDialog = ()=>{
            if(singleProduct){
                return (
                    <Dialog
                        title="Product Detail"
                        actions={actions}
                        modal={false}
                        open={this.state.singleProductDialog}
                        onRequestClose={this.handleClose}
                    >
                        <div className="medium-6 small-12 column">
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product ID"
                                defaultValue={this.state.singleProduct[0]}
                                ref="ProductID"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product Name"
                                defaultValue={this.state.singleProduct[1]}
                                ref="ProductName"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Spec"
                                defaultValue={this.state.singleProduct[2]}
                                ref="Spec"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Price"
                                defaultValue={this.state.singleProduct[3]}
                                ref="Price"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Unit"
                                defaultValue={this.state.singleProduct[4]}
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
        }

        return(
            <div className="row">
                <TopSection onProductFilterTextUpdate={this.productFilterText}/>
                <Divider/>
                <div style={style.paper}>
                    <div className="row" style={style.tableHeader}>
                        <div className="column medium-2 hide-for-small-only" > Produt ID </div>
                        <div className="column medium-5 small-8"> Product Name </div>
                        <div className="column medium-2 hide-for-small-only"> Spec </div>
                        <div className="column medium-2 small-4"> Price </div>
                        <div className="column medium-1 hide-for-small-only"> Unit </div>
                    </div>
                    <br/>
                </div>
                {renderList()}
                {renderDialog()}
                <br/>
            </div>
        )
    }
});

module.exports = ProductDetail;
