var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


//API
var productDetailAPI = require('../api/productDetailAPI')

const style={
    title:{
        textAlign:'left',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px'
    },
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
            isLoading:false,
            productList:undefined,
            open:false,
            singleProduct:undefined,
            createNew:false,
            productFilterText:'',
        }
    },
    componentDidMount:function(){
        this.setState({isLoading:true})
        productDetailAPI.getFullProductData().then((prod)=>{
            this.setState({
                isLoading:true,
                productList:prod.data
            })
        })
    },
    handleClose : function(){
        this.setState({open: false, createNew:false});
    },
    dialogUpdate : function(){
        alert('Current Product Detail would be update \n Do you wannt to proceed? ' )
    },
    dialogDelete : function(prod){
        alert('Product " ' + this.state.singleProduct[1] +' " would be DELETE ! \n Do you wannt to proceed? ' )
    },
    productFilter:function(e){
        this.setState({
            productFilterText: e.target.value
        })
    },

    render:function(){
        var {isLoading, productList, singleProduct, productFilter} = this.state;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
       ];
       const newProduct = [
           <FlatButton
               label="Close"
               primary={true}
               onTouchTap={this.handleClose}
           />,
           <FlatButton
               label="Save"
               primary={true}
               onTouchTap={this.handleClose}
           />,
      ];

        var renderList = ()=>{
            if(isLoading && productList){
                return productList.map((product)=>{
                    return (
                        <div key={product._id}>
                            <RaisedButton className="row" style={style.tableRow} fullWidth={true} onTouchTap={()=>{
                                    this.setState({
                                        open:true,
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
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <div className="medium-6 small-12 column">
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product ID"
                                defaultValue={this.state.singleProduct[0]}
                                ref=""
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product Name"
                                defaultValue={this.state.singleProduct[1]}
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Spec"
                                defaultValue={this.state.singleProduct[2]}
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Price"
                                defaultValue={this.state.singleProduct[3]}
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Unit"
                                defaultValue={this.state.singleProduct[4]}
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
                <div className="column small-12 medium-6">
                    <h2 style={style.title}>Product Detail Page {this.state.productFilterText}</h2>
                </div>
                <div className="column small-12 medium-5" style={{textAlign:'right'}}>
                    <TextField
                        hintText="Search Product"
                        floatingLabelText="Search Product"
                        value={this.state.productFilterText}
                        onChange={this.productFilter}
                    /><br />
                </div>
                <div className="column small-12 medium-1" >
                    <FloatingActionButton mini={true} style={{marginTop:'20px'}} onTouchTap={()=>{
                            this.setState({
                                createNew:true
                            })
                        }}>
                      <ContentAdd />
                    </FloatingActionButton>
                    <Dialog
                        title="New Product"
                        actions={newProduct}
                        modal={false}
                        open={this.state.createNew}
                        onRequestClose={this.handleClose}
                        >
                        <div className="text-center">
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product ID"
                                ref=""
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Product Name"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Spec"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Price"
                            /><br/>
                            <TextField
                                id="text-field-default"
                                floatingLabelText="Unit"
                            /><br/><br/>
                        </div>
                    </Dialog>

                </div>
                <Divider></Divider>
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
                <hr></hr>
            </div>
        )
    }
});

module.exports = ProductDetail;
