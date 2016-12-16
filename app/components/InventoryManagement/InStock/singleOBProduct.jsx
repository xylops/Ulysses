var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    tableRow:{
        textAlign:'center',
        marginLeft:'5px',
        maxHeight:'36px'
    }
}

var singleOBProduct = React.createClass({
    singleOBProduct:function(id, productID, name, inventory){
        var {dispatch} = this.props;
        dispatch(actions.openSingleOBDialog(id,productID, name, inventory))
    },
    render:function(){
        var {OBProduct, date} = this.props
        if(date === true){
            var disable = true
        }else{
            var disable = false
        }
        return (
            <RaisedButton
                onTouchTap={()=>{
                    this.singleOBProduct(OBProduct._id, OBProduct.ProductID, OBProduct.ProductName, OBProduct.Inventory)
                }}
                fullWidth={true}
                style={style.tableRow}
                disabled={disable}
                >
                <div className="column small-4">
                    {OBProduct.ProductID}
                </div>
                <div className="column small-8">
                    {OBProduct.ProductName}
                </div>
            </RaisedButton>
        )
    }
})

export default connect((state)=>{
    return{
        date : state.InStock.newInStockList.date,
    }
})(singleOBProduct)
