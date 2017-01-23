var React = require('react');
var {connect} = require('react-redux');

var loggingAPI = require('../../api/loggingAPI')

var main = React.createClass ({
    componentWillMount:function(){
        console.log(new Date)
        var options = {
          from: new Date - 24 * 60 * 60 * 1000,
          until: new Date,
          limit: 30,
          start: 0,
          order: 'desc',
        //   fields: ['message']
        };
        loggingAPI.queryLog(options)
    },
    render:function(){
        return (
            <div>
                Logging session
            </div>
        )
    }
})

export default connect()(main);
