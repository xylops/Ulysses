var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

//API
var productDetailAPI = require('../api/productDetailAPI')
var singleProduct = require('ProductDetail_singleProduct')

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px'
    },
    paper:{
        width:'100%',
        minHeight:500,
        margin:'10 auto'
    },
    tableHeader:{
        textAlign:'center'
    }
}

var ProductDetail = React.createClass({
    getInitialState:function(){
        return{
            isLoading:false,
            productList:undefined
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
    render:function(){
        var {isLoading, productList} = this.state;
        var renderList = ()=>{
            if(isLoading){
                return productList.map((product)=>{
                    return (
                        <div key={product._id} className="row" style={style.tableHeader}>
                            <div className="column medium-2"> {product.ProductID} </div>
                            <div className="column medium-5"> {product.ProductName} </div>
                            <div className="column medium-2"> {product.Spec} </div>
                            <div className="column medium-2"> {product.Price} </div>
                            <div className="column medium-1"> {product.Unit} </div>
                        </div>
                    )
                })
            }else{
                return <CircularProgress size={80} thickness={5} />
            }
        }

        return(

            <div className="row">
                <h3 style={style.title}>Product Detail Page</h3>
                <Paper style={style.paper} zDepth={2}>
                    <div className="row" style={style.tableHeader}>
                        <div className="column medium-2"> Produt ID </div>
                        <div className="column medium-5"> Product Name </div>
                        <div className="column medium-2"> Spec </div>
                        <div className="column medium-2"> Price </div>
                        <div className="column medium-1"> Unit </div>
                    </div>
                    {renderList()}
                </Paper>
                <h3 style={style.title}>End</h3>
            </div>
        )
    }
});

module.exports = ProductDetail;
