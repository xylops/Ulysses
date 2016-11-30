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


//API
var productDetailAPI = require('../api/productDetailAPI')

const style={
    title:{
        textAlign:'center',
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
            singleProduct:undefined
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
        this.setState({open: false});
    },
    dialogUpdate : function(){

    },

    render:function(){
        var {isLoading, productList, singleProduct} = this.state;

        const actions = [
            <FlatButton
                label="Close"
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
                                <RaisedButton label="Delete" fullWidth={true} secondary={true} onTouchTap={this.dialogUpdate}></RaisedButton>
                            </div>
                            <br/>
                            <br/>
                            <div className="small-12 medium-12 column">
                                <RaisedButton label="SAVE" fullWidth={true}></RaisedButton>
                            </div>
                        </div>
                    </Dialog>
                )
            }
        }

        return(
            <div className="row">
                <h3 style={style.title}>Product Detail Page</h3>
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
