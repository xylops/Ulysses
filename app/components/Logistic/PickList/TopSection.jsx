var React = require('react');
var {connect} = require('react-redux')
//myCompoent

var TopSection = React.createClass({
    render:function(){
        return (
            <div>
                Top Section
            </div>

        )
    }
})

export default connect()(TopSection)
