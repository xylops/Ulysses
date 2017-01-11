var React = require('react');
//redux
var {connect} = require('react-redux');

var RecordList = React.createClass({
    render:function(){
        return(
            <div>
                Record List
            </div>
        )
    }
})

export default connect()(RecordList)
