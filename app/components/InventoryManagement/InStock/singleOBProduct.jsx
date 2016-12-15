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
    singleOBProduct:function(id, name, inventory){
        var {dispatch} = this.props;
        dispatch(actions.openSingleOBDialog(id, name, inventory))
    },
    render:function(){
        var {OBProduct} = this.props
        return (
            <RaisedButton
                onTouchTap={()=>{
                    this.singleOBProduct(OBProduct._id, OBProduct.ProductName, OBProduct.Inventory)
                }}
                fullWidth={true}
                style={style.tableRow}>
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

export default connect()(singleOBProduct)
