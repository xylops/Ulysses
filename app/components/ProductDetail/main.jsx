var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import Divider from 'material-ui/Divider';

//Component
import TopSection from './TopSection'
import ProductList from './ProductList'


var ProductDetail = React.createClass({
    render:function(){
        return(
            <div>
                <TopSection/>
                <Divider/><br/>
                <ProductList/>
                <br/>
            </div>
        )
    }
});

module.exports = ProductDetail
