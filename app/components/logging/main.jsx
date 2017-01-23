var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment')
//material-ui
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
//api
var loggingAPI = require('../../api/loggingAPI')

var main = React.createClass ({

    timeChange:function(result){

        var startDate = this.refs.startDate.value;
        var endDate = this.refs.endDate.value

        if(startDate !== ''){
            startDate = this.refs.startDate.value;
        }else{
            var startDate = new Date - 24 * 60 * 60 * 1000
        }

        if(endDate !== ''){
            endDate = this.refs.endDate.value;
        }else{
            var endDate = new Date
        }

        console.log('Start Date-------------' +  startDate)
        console.log('end Date-------------' +  endDate)

        var options = {
          from: startDate,
          until: endDate,
        //   limit: 5,
          start: 0,
        //   order: 'desc',
          fields: ['message', 'timestamp']
        };
        loggingAPI.queryLog(options)

    },
    render:function(){
        return (
            <div>
                <br/>
                Logging session

                <input type="datetime-local" onChange={this.timeChange} ref="startDate"/>
                <input type="datetime-local" onChange={this.timeChange} ref="endDate"/>


            </div>
        )
    }
})

export default connect()(main);
