var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')

//material-ui
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

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
        var {ownBrandList, isFetching} = this.props
        console.log(isFetching, ownBrandList)

        var renderList = ()=> {
            if(!isFetching){
                return ownBrandList.map((OBProduct)=>{
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
                <h4 style={{textAlign:'center'}}>Own Brand Item</h4>
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
        ownBrandList: state.InventoryManagement.fetchOwnBrandList.OBL
    }
})(brandItem)
