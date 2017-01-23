var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment')
//material-ui
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
//api
var loggingAPI = require('../../api/loggingAPI')

var main = React.createClass ({

    componentWillMount:function(){
        var options = {
          from: new Date - 24 * 60 * 60 * 1000,
          until: new Date,
          limit: 30,
          start: 0,
          order: 'desc',
        //   fields: ['message']
        };
        // loggingAPI.queryLog(options)
    },
    dateChange:function(e, date){
        var dateTwo = moment(date).format('YYYYMMDD')
        var dateThree = moment(dateTwo).format('x')

        console.log(dateThree)
        var options = {
          from: dateThree,
          until: new Date,
          limit: 5,
          start: 0,
          order: 'desc',
        //   fields: ['message']
        };
        loggingAPI.queryLog(options)
    },
    timeChange:function(result){
        console.log(this.refs.inputValue.value)
    },
    render:function(){
        return (
            <div>
                <br/>
                Logging session
                <DatePicker hintText="Landscape Dialog" mode="landscape" onChange={this.dateChange}/>
                <DatePicker hintText="Landscape Dialog" mode="landscape" onChange={this.timeChange}/>
                <input type="datetime-local" onChange={this.timeChange} ref="inputValue"/>

            </div>
        )
    }
})

export default connect()(main);
