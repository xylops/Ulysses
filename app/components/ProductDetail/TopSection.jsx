var React = require('react');

//material-ui
import TextField from 'material-ui/TextField'

//Component
var CreateNewProduct = require('./CreateNewProduct')

const style={
    title:{
        textAlign:'left',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px'
    },
}

var TopSection = React.createClass({
    productFilter:function(){
        var productFilterText = this.refs.productFilterText.getValue();
        this.props.onProductFilterTextUpdate(productFilterText);
    },
    render:function(){

        return(
            <div>
                <div className="column small-12 medium-6">
                    <h2 style={style.title}>Product Detail Page</h2>
                </div>
                <div className="column small-12 medium-5" style={{textAlign:'right'}}>
                    <TextField
                        hintText="Search Product"
                        floatingLabelText="Search Product"
                        ref="productFilterText"
                        onChange={this.productFilter}
                    /><br />
                </div>
                <div className="column small-12 medium-1" >
                    <CreateNewProduct/>
                </div>
            </div>

        )
    }
})

module.exports = TopSection;
