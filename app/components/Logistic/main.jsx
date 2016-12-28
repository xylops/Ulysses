var React = require('react');
var {connect} = require('react-redux')

var main = React.createClass({
    render:function(){
        return (
            <p>Logistic Section</p>
        )
    }
})

export default connect()(main)
