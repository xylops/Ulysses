var React = require('react');
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/mainActions')
//my components
import TopSection from './TopSection'
import InvoiceList from './InvoiceList'

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Invoice Section'))
    },
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
