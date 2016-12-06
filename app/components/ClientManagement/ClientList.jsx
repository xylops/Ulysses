var React = require('react');
var {connect} = require('react-redux');

//material-ui


var ClientList = React.createClass({
    render:function(){
        return (
            <p>Client List Section</p>
        )
    }
})

export default connect()(ClientList)
