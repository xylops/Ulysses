var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//myCompoent
import TopSection from './TopSection'

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Pick List'))
    },

    render:function(){
        return (
            <div>
                <br/>
                <TopSection/>
            </div>

        )
    }
})

export default connect()(main)
