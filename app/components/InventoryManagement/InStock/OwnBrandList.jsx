var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')

//material-ui
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

//My component
import OBFilter from './OBFilter'

//API
var InventoryManagementAPI = require('../../../api/InventoryManagementAPI')

const style = {
    brandList:{
    },
    isLoading:{
        textAlign:'center',
        paddingTop: 'calc(20%)'
    },
    tableRow:{
        textAlign:'center',
        marginLeft:'5px',
        maxHeight:'36px'
    }
}

var brandItem = React.createClass({
    componentDidMount:function(){
        var {dispatch} =this.props;
        dispatch(actions.startFetchOwnBrandList())
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
                        <RaisedButton key={OBProduct.ProductID} fullWidth={true} style={style.tableRow}>
                            <div className="column small-4">
                                {OBProduct.ProductID}
                            </div>
                            <div className="column small-8">
                                {OBProduct.ProductName}
                            </div>
                        </RaisedButton>
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
            </div>

        )
    }
})

export default connect((state)=>{
    return{
        isFetching: state.InventoryManagement.fetchOwnBrandList.isFetching,
        ownBrandList: state.InventoryManagement.fetchOwnBrandList.OBL,
        filterID: state.InventoryManagement.ownBrandFilter.id,
        filterName: state.InventoryManagement.ownBrandFilter.name,

    }
})(brandItem)
