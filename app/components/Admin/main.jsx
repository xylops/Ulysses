var React = require('react');
var {connect} = require('react-redux');
import {browserHistory} from 'react-router';

var main = React.createClass({
    componentWillMount:function(){
        if(clearance !== 'admin' || clearance !== 'topMan'){
            var repeatingAlert = setInterval(function(){alert('you are not suppose to be here')}, 1000)
        }
    },
    componentWillUnmount:function(){
        clearInterval(repeatingAlert)
    },
    render:function(){
        return(
            <div>
                Admin Session
            </div>
        )
    }
})

export default connect()(main);
