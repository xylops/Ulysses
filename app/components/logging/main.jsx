var React = require('react');
var {connect} = require('react-redux');

var main = React.createClass ({
    render:function(){
        return (
            <div>
                Logging session
            </div>
        )
    }
})

export default connect()(main);
