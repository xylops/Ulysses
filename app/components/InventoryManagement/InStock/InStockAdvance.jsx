var React = require('react');
var ReactDOM = require('react-dom');
//Redux
var {connect} = require('react-redux');
var actions = require('../../../actions/inStockAction')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//Style
const style={
    input:{
        height:'24px',
    },
}

var advanceDialog = React.createClass({
    getInitialState:function(){
        return{
            productName:'N/A',
            product : {},
            validation:{
                border:'2px solid grey',
                borderRadius:'10px',
                backgroundColor:'transparent'
            }
        }
    },
    handleKeyPress:function(e){
        var {dispatch, ownBrandList} = this.props;
        if (e.key === 'Enter' && Object.keys(this.state.product).length > 1) {
            var newItem = {
                id:this.state.product._id,
                name:this.state.product.ProductName,
                inventory:this.state.product.Inventory,
                productID:this.state.product.ProductID,
                amount:this.refs.amountInput.value,
            }
            dispatch(actions.addNewItemToNewList(newItem));
            this.setState({
                productName:'N/A',
                product:{},
                validation:{
                    border:'2px solid grey',
                    borderRadius:'10px',
                    backgroundColor:'transparent'
                }
            })
            ReactDOM.findDOMNode(this.refs.idInput).focus();
            this.refs.amountInput.value = ''
            this.refs.idInput.value = ''
        }
    },
    handleChange:function(){
        var {ownBrandList} = this.props
        var value = this.refs.idInput.value;
        var id = value.toUpperCase()
        let item = ownBrandList.filter((elem)=>{
            return elem.ProductID.indexOf(id) !== -1;
        });
        if(item.length === 1){
            this.setState({
                productName: item[0].ProductName,
                product:item[0],
                validation:{
                    border:'2px solid green',
                    borderRadius:'10px',
                    backgroundColor:'rgba(1,230,1, 0.3)'
                }
            })
        }else{
            this.setState({
                productName: 'N/A',
                product:{},
                validation:{
                    border:'2px solid darkred',
                    borderRadius:'10px',
                    backgroundColor:'transparent'
                }
            })
        }
    },
    render:function(){
        var {ownBrandList, date} = this.props
        if(date === true){
            var disable = true;
        }else{
            var disable = false;
        }
        return(
            <div style={{textAlign:'center'}}>
                <div className="row">
                    <div className="column small-3">
                        ID
                    </div>
                    <div className="column small-6">
                        Product Name
                    </div>
                    <div className="column small-3">
                        Amount Create
                    </div>
                </div>
                <div className="row">
                    <div className="column small-3">
                        <input type="text" ref='idInput' style={style.input} onChange={this.handleChange} disabled={disable}/>
                    </div>
                    <div className="column small-6" style={this.state.validation}>
                        {this.state.productName}
                    </div>
                    <div className="column small-3">
                        <input type="Number" ref="amountInput" style={style.input} onKeyPress={this.handleKeyPress} disabled={disable}/>
                    </div>
                </div>
                <RaisedButton label="Add Item" fullWidth primary disabled={disable}/>
            </div>
        )
    }
})

export default connect ((state)=>{
    return {
        newStockList : state.InStock.newInStockList.newEntry,
        date : state.InStock.newInStockList.date,
        ownBrandList : state.InStock.fetchOwnBrandList.OBL
    }
})(advanceDialog);
