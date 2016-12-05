var React = require('react')
var {connect} = require('react-redux');
var actions = require('../../actions/productDetailActions');

//material-ui
import CircularProgress from 'material-ui/CircularProgress';

//api
var productDetailAPI = require('productDetailAPI')

//Component
import SingleProduct from './SingleProduct'
import SingleProductDialog from './SingleProductDialog'

var ProductList = React.createClass({
    componentDidMount:function(){
        var {dispatch} =this.props;
        dispatch(actions.startFetchPDL())
        productDetailAPI.getFullProductData().then((PDL)=>{
            dispatch(actions.completeFetchPDL(PDL.data));
        })
    },
    render:function(){
        var {isFetching, productList} = this.props;
        var renderList = ()=> {
            if(!isFetching){
                return productList.map((product)=>{
                    return(
                        <SingleProduct key={product._id} product={product}/>
                    )
                })
            } else {
                return <CircularProgress size={80} thickness={5} />
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
        isFetching: state.productDetailCombiner.productData.isFetching,
        productList: state.productDetailCombiner.productData.productList,

    }
})(ProductList)
