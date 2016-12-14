var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')

//material-ui
import CircularProgress from 'material-ui/CircularProgress';

//My component
import OBFilter from './OBFilter'
import SingleOBDialog from './singleOBDialog'
import SingleOBProduct from './singleOBProduct'

//API
var InventoryManagementAPI = require('InventoryManagementAPI')

const style = {
    brandList:{
    },
    isLoading:{
        textAlign:'center',
        paddingTop: 'calc(20%)'
    },
}

var brandItem = React.createClass({
    componentDidMount:function(){
        var {dispatch} =this.props;
        dispatch(actions.startFetchOwnBrandList());
        // axios.get('/IM/getOwnBrandList').then(function(res){
        //     dispatch(actions.completeFetchOwnBrandList(res.data));
        // })
        InventoryManagementAPI.getOwnBrandList().then((OBL)=>{
            dispatch(actions.completeFetchOwnBrandList(OBL.data));
        })
    },
    render:function(){
        var {ownBrandList, isFetching, filterID, filterName} = this.props

        let filterOwnBrandList_ID = ownBrandList.filter((item)=>{
            return item.ProductID.indexOf(filterID) !== -1;
        });

        let filterOwnBrandList_Name = filterOwnBrandList_ID.filter((item)=>{
            return item.ProductName.indexOf(filterName) !== -1;
        });

        var renderList = ()=> {
            if(!isFetching){
                return filterOwnBrandList_Name.map((OBProduct)=>{
                    return(
                        <SingleOBProduct key={OBProduct._id} OBProduct={OBProduct}/>
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
                <OBFilter/>
                <div style={style.brandList} className="OBLIST">
                    {renderList()}
                </div>
                <SingleOBDialog/>
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        isFetching: state.InStock.fetchOwnBrandList.isFetching,
        ownBrandList: state.InStock.fetchOwnBrandList.OBL,
        filterID: state.InStock.ownBrandFilter.id,
        filterName: state.InStock.ownBrandFilter.name,
    }
})(brandItem)
