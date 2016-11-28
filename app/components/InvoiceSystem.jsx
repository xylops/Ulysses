var React = require('react');
var ReactDOM = require('react-dom');

var InvoiceSystemSearch = require('InvoiceSystemSearch')
var InvoiceSystemProduct = require('InvoiceSystemProduct')
import Divider from 'material-ui/Divider';

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px'
    },
}
var InvoiceSystem = React.createClass({
    render:function(){
        return(
            <div>
                <h3 style={style.title}>Invoice System</h3>
                <InvoiceSystemSearch style={{margin:10}}/>
                <hr style={{borderColor:'white'}}/>
                <InvoiceSystemProduct/>
            </div>


        )
    }
})

module.exports = InvoiceSystem;
