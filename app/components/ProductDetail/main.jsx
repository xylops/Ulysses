var React = require('react')
var ReactDOM = require('react-dom');
var {connect} = require('react-redux')
var actions = require('../../actions/mainActions')

//material-ui
import Divider from 'material-ui/Divider';

//Component
import TopSection from './TopSection'
import ProductList from './ProductList'


var ProductDetail = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Products Detail'))
    },
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

export default connect()(ProductDetail)
