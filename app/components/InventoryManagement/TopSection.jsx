var React = require('react');
var {Link} = require('react-router')
var moment = require('moment')
//redux
var {connect} = require('react-redux');
var actions = require('../../actions/inventoryRecordActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
//API
var inventoryAPI = require('../../api/InventoryManagementAPI')

var TopSection = React.createClass({
    getInitialState:function(){
        return({
            startDate:null,
            endDate:null
        })
    },
    startDateChange:function(e, date){
        this.setState({
            startDate : moment(date).format('YYYYMMDD')
        })
    },
    endDateChange:function(e, date){
        this.setState({
            endDate : moment(date).format('YYYYMMDD')
        })
    },
    startSearch:function(){
        var {dispatch} = this.props;
        if(this.state.startDate !== null && this.state.endDate !== null){
            if(this.state.startDate <= this.state.endDate){
                dispatch(actions.startFetchIRL())
                inventoryAPI.getInventoryRecord(this.state.startDate, this.state.endDate).then((res)=>{
                    var recordList = res.data;
                    dispatch(actions.completeFetchIRL(res.data))
                })
            }else{
                alert('Start Date could NOT be larger then the End Date')
            }
        }else{
            alert('Both Starting and End Date are require')
        }
    },
    render:function(){
        return(
            <div>
                <div className="row">
                    <div className="column small-12 medium-3">
                         <DatePicker hintText="Starting Date" mode="landscape" onChange={this.startDateChange}/>
                    </div>
                    <div className="column small-12 medium-3">
                         <DatePicker hintText="End Date" mode="landscape" onChange={this.endDateChange}/>
                    </div>
                    <div className="column small-12 medium-2">
                        <FloatingActionButton onTouchTap={this.startSearch}>
                            <i className="material-icons">search</i>
                        </FloatingActionButton>
                    </div>
                    <div className="column small-12 medium-4">
                        <Link to="IMIS"><RaisedButton label="In Stock" fullWidth={true} primary={true}/></Link>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect()(TopSection)
