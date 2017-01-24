var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment')
//material-ui
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
//api
var loggingAPI = require('../../api/loggingAPI')

var main = React.createClass ({
    getInitialState:function(){
        return({
            logs:null
        })
    },
    logRequest:function(result){

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

        if(this.refs.number.value === ""){
            var number = 20
        }else{
            var number = this.refs.number.value
        }

        var options = {
          from: startDate,
          until: endDate,
          limit: number,
          start: 0,
          order: this.refs.order.value,
        //   fields: ['message', 'timestamp']
        };

        loggingAPI.queryLog(options).then((res)=>{
            this.setState({
                logs: res.data.file
            })
        })

    },
    render:function(){
        var renderList = ()=>{
            if(this.state.logs !== null){
                return this.state.logs.map((entry)=>{
                    var timestamp = moment(entry.timestamp).format('LLLL')
                    return(
                        <div className="row" key={entry.timestamp} style={{ borderBottom:'1px dotted lightgrey', paddingBottom:'5px'}}>
                            <div className="column small-3" style={{textAlign:'center'}}>{timestamp}</div>
                            <div className="column small-2" style={{textAlign:'center'}}>{entry.level}</div>
                            <div className="column small-7">{entry.message}</div>
                        </div>
                    )
                })
            }else{
                return(
                    <div style={{textAlign:'center'}}>
                        Please select list from above.
                    </div>
                )
            }
        }

        return (
            <div>
                <br/>
                <br/>
                <div className="row" >
                    <div className="column small-12 medium-3" style={{textAlign:'center'}}>
                        <input type="datetime-local" ref="startDate"/>
                    </div>
                    <div className="column small-12 medium-3" style={{textAlign:'center'}}>
                        <input type="datetime-local" ref="endDate"/>
                    </div>
                    <div className="column small-12 medium-2" style={{textAlign:'center'}}>
                        <input type="number" placeholder="No. entry" ref="number"/>
                    </div>
                    <div className="column small-12 medium-3" style={{textAlign:'center'}}>
                        <select name="order" ref="order">
                            <option value="desc">Descending</option>
                            <option value="asc">Accending</option>
                        </select>
                    </div>
                    <div className="column small-12 medium-1">
                        <button className="button round " onClick={this.logRequest}>Submit</button>
                    </div>
                </div>
                <br/>

                <div className="row" style={{textAlign:'center'}}>
                    <div className="column small-3">TimeStamp</div>
                    <div className="column small-2">Level</div>
                    <div className="column small-7">Message</div>
                </div>
                <hr/>
                {renderList()}
            </div>
        )
    }
})

export default connect()(main);
