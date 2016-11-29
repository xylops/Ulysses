var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


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
    handleOpen : function(){
        this.setState({
            open: true
        })
    },

     handleClose : function(){
        this.setState({
           open: false
        });
   },

    render:function(){
        var {isLoading, productList} = this.state;
        const actions = [
         <FlatButton
           label="Cancel"
           primary={true}
           onTouchTap={this.handleClose}
         />,
         <FlatButton
           label="Discard"
           primary={true}
           onTouchTap={this.handleClose}
         />,
       ];
        var renderList = ()=>{
            if(isLoading && productList){
                return productList.map((product)=>{
                    return (
                        <div key={product._id} >
                            <RaisedButton className="row" style={style.tableRow} fullWidth={true} onTouchTap={this.handleOpen}>
                                <div className="column medium-2 hide-for-small-only"> {product.ProductID} </div>
                                <div className="column medium-5 small-8"> {product.ProductName} </div>
                                <div className="column medium-2 hide-for-small-only"> {product.Spec} </div>
                                <div className="column medium-2 small-4"> {product.Price} </div>
                                <div className="column medium-1 hide-for-small-only"> {product.Unit} </div>
                            </RaisedButton>
                            <Dialog
                              title="Dialog With Actions"
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}
                            >
                                {product.ProductName}
                            </Dialog>
                        </div>

                    )
                })
            }else{
                return <CircularProgress size={80} thickness={5} style={style.spinner}/>
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
                <hr></hr>
            </div>
        )
    }
});

module.exports = ProductDetail;
