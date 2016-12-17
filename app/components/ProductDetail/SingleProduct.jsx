var React = require('react');
//Redux
var {connect} = require('react-redux')
var actions = require('../../actions/productDetailActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//Style
const style={
    tableRow:{
        textAlign:'center',
        marginLeft:'5px',
        maxHeight:'36px'
    }
}

var SingleProduct = React.createClass({
    render:function(){
        var {product, dispatch} = this.props
        return(
            <div >
                <RaisedButton className="row" style={style.tableRow} fullWidth={true} onTouchTap={()=>{
                    dispatch(actions.openSingleProductDialog(product))
                }}>
                    <div className="column medium-2 hide-for-small-only"> {product.ProductID} </div>
                    <div className="column medium-5 small-8"> {product.ProductName} </div>
                    <div className="column medium-2 hide-for-small-only"> {product.Spec} </div>
                    <div className="column medium-2 small-4"> {product.Price} </div>
                    <div className="column medium-1 hide-for-small-only"> {product.Unit} </div>
                </RaisedButton>
            </div>
        )
    }
})

export default connect()(SingleProduct)
