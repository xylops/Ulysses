var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Done from 'material-ui/svg-icons/action/done';
//my style
const style ={
    checkBtn:{
        marginTop:'25px'
    }
}
var AdvanceProductAdd = React.createClass({
    handleClear:function(){
        var {dispatch} = this.props
        dispatch(actions.updateAdvanceName(""))
        dispatch(actions.updateAdvanceSpec(""))
        dispatch(actions.updateAdvancePrice(""))
        dispatch(actions.updateAdvanceAmount(""));
        this.refs.id.getInputNode().value = ''
    },
    handleChange:function(){
        var {dispatch, productList} = this.props
        var value = this.refs.id.getValue();
        var id = value.toUpperCase()
        let item = productList.filter((elem)=>{
            return elem.ProductID.indexOf(id) !== -1;
        });
        if(item.length === 1){
            dispatch(actions.updateAdvanceName(item[0].ProductName))
            dispatch(actions.updateAdvanceSpec(item[0].Spec))
            dispatch(actions.updateAdvancePrice(item[0].Price))
        }
    },
    calculateAmount:function(){
        var {dispatch} = this.props
        var quantity = this.refs.aQuantity.getValue();
        var price = this.refs.aPrice.getValue();
        var discount = this.refs.aDiscount.getValue();

        if(quantity !== '' && price !== ''){
            if(discount !== ''){
                var amount = quantity * price * (1 - discount)
                dispatch(actions.updateAdvanceAmount(amount));
            }else{
                var amount = quantity * price
                dispatch(actions.updateAdvanceAmount(amount));
            }
        }
    },
    render:function(){
        var {name, spec, price, amount} = this.props;

        var renderCheck = () =>{
            if(name && spec && price && amount){
                return (
                    <FloatingActionButton mini={true} backgroundColor="green" style={style.checkBtn}>
                       <Done/>
                    </FloatingActionButton>
                )
            }else{
                return (
                    <FloatingActionButton mini={true} backgroundColor="red" style={style.checkBtn} onTouchTap={this.handleClear}>
                       <i className="material-icons">highlight_off</i>
                    </FloatingActionButton>
                )
            }
        }

        return (
            <div>
                <div className="row" style={{marginLeft:'0px', textAlign:'center'}}>
                    <div className="column medium-2 hide-for-small-only" style={{textAlign:'center'}}>
                        <TextField
                            fullWidth={true}
                            hintText="ID"
                            floatingLabelText="ID"
                            onChange={this.handleChange}
                            ref='id'
                        />
                    </div>
                    <div className="column medium-3">
                        <TextField
                            fullWidth={true}
                            hintText="Name"
                            floatingLabelText="Name"
                            value={name}
                        />
                    </div>
                    <div className="column medium-2">
                        <TextField
                            fullWidth={true}
                            hintText="Spec"
                            floatingLabelText="Spec"
                            value={price}
                        />
                    </div>
                    <div className="column medium-1">
                        <TextField
                            fullWidth={true}
                            hintText="Quantity"
                            floatingLabelText="Quantity"
                            onChange={this.calculateAmount}
                            ref='aQuantity'
                        />
                    </div>
                    <div className="column medium-1">
                        <TextField
                            fullWidth={true}
                            hintText="Unit Price"
                            floatingLabelText="Unit Price"
                            value={price}
                            onChange={this.calculateAmount}
                            ref='aPrice'
                        />
                    </div>
                    <div className="column medium-1">
                        <TextField
                            fullWidth={true}
                            hintText="Discount"
                            floatingLabelText="Discount"
                            onChange={this.calculateAmount}
                            ref='aDiscount'
                        />
                    </div>
                    <div className="column medium-1">
                        <TextField
                            fullWidth={true}
                            hintText="Amount"
                            floatingLabelText="Amount"
                            value={amount}
                        />
                    </div>
                    <div className="column medium-1">
                        {renderCheck()}
                    </div>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        productList: state.productDetail.productData.productList,
        name: state.invoice.advanceProductAdd.name,
        spec: state.invoice.advanceProductAdd.spec,
        price: state.invoice.advanceProductAdd.price,
        amount: state.invoice.advanceProductAdd.amount,
    }
})(AdvanceProductAdd)
