var React = require('react')
var {connect} = require('react-redux')

var main = React.createClass({
    render:function(){
        return(
            <p>Inventory management</p>
        )
    }
})

export default connect()(main)
