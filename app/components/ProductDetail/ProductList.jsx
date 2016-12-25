var React = require('react')
var {connect} = require('react-redux');
var actions = require('../../actions/productDetailActions');
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
//api
var productDetailAPI = require('ProductDetailAPI')
//Component
import SingleProduct from './SingleProduct'
import SingleProductDialog from './SingleProductDialog'
//Style
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}

var ProductList = React.createClass({
    componentDidMount:function(){
        var {dispatch} =this.props;
        dispatch(actions.startFetchPDL())
        productDetailAPI.getFullProductData().then((PDL)=>{
            dispatch(actions.completeFetchPDL(PDL.data));
        })
        dispatch(actions.updateProductFilterText(""))
    },
    render:function(){
        var {isFetching, productList, productFilterText} = this.props;

        let filteredProductList = productList.filter((prod)=>{
            return (prod.ProductName.indexOf(productFilterText) !== -1  || prod.ProductID.indexOf(productFilterText) !== -1);
        });

        var renderList = ()=> {
            if(!isFetching){
                return filteredProductList.map((product)=>{
                    return(
                        <SingleProduct key={product._id} product={product}/>
                    )
                })
            } else {
                return (
                    <div style={style}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }
        }
        return(
            <div>
                {renderList()}
                <SingleProductDialog/>
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        isFetching: state.productDetail.productData.isFetching,
        productList: state.productDetail.productData.productList,
        productFilterText: state.productDetail.productFilterText,
    }
})(ProductList)
