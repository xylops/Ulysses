var React = require('react');
var ReactDOM = require('react-dom');
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/invoiceAction');
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//style
const style ={
    tableRow:{
        textAlign:'center',
        marginLeft:'5px',
        maxHeight:'36px'
    },
    dialog:{
        width: '80%',
        maxWidth: 'none',
    },
    productList:{
        maxHeight:'500px',
        overflowY:'scroll',
        overflowX:'hidden'
    }
}

var productAddBtn = React.createClass({
    handleOpen:function(){
        var {dispatch} = this.props
        dispatch(actions.openAddItemDialog())
    },
    handleClose:function(){
        var {dispatch} = this.props
        dispatch(actions.closeAddItemDialog())
        dispatch(actions.updateDialogItem(undefined))
        dispatch(actions.addItemDialogSearchText(''))
        dispatch(actions.updateAmount(null))
    },
    handleSearchTextChange:function(){
        var {dispatch} = this.props
        dispatch(actions.addItemDialogSearchText(this.refs.searchText.getValue()))
    },
    handleItemClick:function(product){
        var {dispatch, item} = this.props
        if(item){
            dispatch(actions.updateDialogItem(undefined))
            dispatch(actions.updateAmount(null));
            setTimeout(()=>{
                dispatch(actions.updateDialogItem(product));
            }, 50)
        }else{
            dispatch(actions.updateDialogItem(product));
        }
    },
    calculateAmount:function(){
        var {dispatch} = this.props
        var quantity = this.refs.quantity.getValue();
        var price = this.refs.price.getValue();
        var discount = this.refs.discount.getValue();

        if(quantity !== '' && price !== ''){
            if(discount !== ''){
                var amount = quantity * price * ((100 - discount)*0.01)
                dispatch(actions.updateAmount(amount));
            }else{
                var amount = quantity * price
                dispatch(actions.updateAmount(amount));
            }
        }
    },
    handleSave:function(){
        var {dispatch, item, amount} = this.props;
        var id = item._id
        var ProductID = item.ProductID;
        var ProductName = item.ProductName
        var Spec = this.refs.spec.getValue();
        var Price = this.refs.price.getValue();
        var discount = this.refs.discount.getValue() + '%';
        var quantity = this.refs.quantity.getValue();
        var amount = amount;
        if(id && ProductID && Price && quantity && amount > 0){
            var newItem = {id,ProductID, ProductName, Spec, Price, discount, quantity, amount}

            dispatch(actions.addItem(newItem));
            dispatch(actions.closeAddItemDialog());
            dispatch(actions.updateDialogItem(undefined));
            dispatch(actions.addItemDialogSearchText(''))
            dispatch(actions.updateAmount(null));
        }else{
            alert('Something is missing or incorrect in the field below')
        }
    },
    render:function(){
        var {dispatch, productList, open, searchText, item, amount} = this.props

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        let filteredProductList = productList.filter((prod)=>{
            return (prod.ProductName.indexOf(searchText) !== -1 || prod.ProductID.indexOf(searchText) !== -1);
        });

        var renderProductList = () =>{
            return filteredProductList.map((product)=>{
                return(
                    <RaisedButton key={product._id} className="row" style={style.tableRow} fullWidth={true} onTouchTap={()=>{
                            this.handleItemClick(product)
                        }}>
                        <div className="column medium-4 hide-for-small-only"> {product.ProductID} </div>
                        <div className="column medium-8 small-12"> {product.ProductName} </div>
                    </RaisedButton>
                )
            })
        }
        var renderDetail = () =>{
            if(item !== undefined){
                return (
                    <div>
                        <TextField
                            defaultValue={item.ProductID}
                            floatingLabelText="Product ID"
                            fullWidth={true}
                            disabled = {true}
                        /><br />
                        <TextField
                            defaultValue={item.ProductName}
                            floatingLabelText="Product Name"
                            fullWidth={true}
                            disabled = {true}
                        /><br />
                        <TextField
                            defaultValue={item.Spec}
                            fullWidth={true}
                            floatingLabelText="Spec"
                            ref = "spec"
                        /><br />
                        <TextField
                            floatingLabelText="Quantity"
                            ref="quantity"
                            fullWidth={true}
                            onChange={this.calculateAmount}
                        /><br />
                        <TextField
                            defaultValue={item.Price}
                            floatingLabelText="Unit Price"
                            onChange={this.calculateAmount}
                            fullWidth={true}
                            ref = "price"
                        /><br />
                        <TextField
                            hintText="e.g. 0.05 = 5% OFF"
                            floatingLabelText="Discount"
                            onChange={this.calculateAmount}
                            type="number"
                            fullWidth={true}
                            ref="discount"
                        /><br />
                        <div className="row">
                            <div className="column small-5">
                                <b><h4>Amount</h4></b>
                            </div>
                            <div className="column small-5">
                                <b><h4>$ {amount}</h4></b>
                            </div>
                        </div>
                        <RaisedButton label="Add Item" fullWidth={true} primary={true} onTouchTap={this.handleSave}/>
                    </div>
                )
            }
        }


        return (
            <div>
                <RaisedButton label="Add Item" fullWidth={true} primary={true} onTouchTap={this.handleOpen}/>
                <Dialog
                    title="Add Product"
                    actions={actions}
                    modal={false}
                    contentStyle={style.dialog}
                    open={open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div className="row">
                        <div className="column small-8">
                            <TextField
                                hintText="Search Product By ID or Product"
                                fullWidth={true}
                                onChange={this.handleSearchTextChange}
                                ref="searchText"
                            /><br />
                            <div style={style.productList}>
                                {renderProductList()}
                            </div>
                        </div>
                        <div className="column small-4">
                            {renderDetail()}
                        </div>
                    </div>

                </Dialog>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        productList: state.productDetail.productData.productList,
        open: state.invoice.addItemDialog.dialog,
        searchText: state.invoice.addItemDialog.searchText,
        item : state.invoice.addItemDialog.item,
        amount : state.invoice.addItemDialog.itemAmount
    }
})(productAddBtn);
