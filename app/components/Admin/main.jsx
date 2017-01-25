var React = require('react');
var {connect} = require('react-redux');
import {browserHistory} from 'react-router';

var main = React.createClass({
    componentWillMount:function(){
    },
    render:function(){
        return(
            <div>
                <br/>
                Admin Session
            </div>
        )
    }
})

export default connect()(main);
