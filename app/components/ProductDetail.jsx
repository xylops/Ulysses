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
        textAlign:'center',
        paddingTop:10,
    },
    tableRow:{
        textAlign:'center',
        paddingTop:10,
        margin:10,
        borderTop:'1px solid rgb(0, 170, 114)'
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
                        <div key={product._id} className="row" style={style.tableRow}>
                            <div className="column medium-2 hide-for-small-only"> {product.ProductID} </div>
                            <div className="column medium-5 small-8"> {product.ProductName} </div>
                            <div className="column medium-2 hide-for-small-only"> {product.Spec} </div>
                            <div className="column medium-2 small-4"> {product.Price} </div>
                            <div className="column medium-1 hide-for-small-only"> {product.Unit} </div>
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
                        <div className="column medium-2 hide-for-small-only" > Produt ID </div>
                        <div className="column medium-5 small-8"> Product Name </div>
                        <div className="column medium-2 hide-for-small-only"> Spec </div>
                        <div className="column medium-2 small-4"> Price </div>
                        <div className="column medium-1 hide-for-small-only"> Unit </div>
                    </div>
                    {renderList()}
                    <br/>
                </Paper>
                <hr></hr>
            </div>
        )
    }
});

module.exports = ProductDetail;
