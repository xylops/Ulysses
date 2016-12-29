var React = require('react');
var {Link} = require('react-router');
//Redux
var {connect}  = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//my components
import TopSection from './TopSection'
import InvoiceList from './InvoiceList'

var main = React.createClass({
    render:function(){
        return (
            <div>
                <TopSection/>
                <InvoiceList/>
            </div>
        )
    }
})

export default connect()(main)
