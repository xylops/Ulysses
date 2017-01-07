var React = require('react')
var moment = require('moment')
//react-redux
var {connect} = require('react-redux');
var actions = require('../../../actions/pickListActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';

var SingleProcessingRecord = React.createClass({
    handleOpen:function(record){
        var {dispatch} = this.props;
        dispatch(actions.updateSingleLogRecord(record))
    },
    render:function(){
        var {logRecord} = this.props;
        var totalItem = 0
        logRecord.item.forEach((item)=>{
            totalItem += Number(item.quantity)
        })
        return(
            <RaisedButton
                fullWidth={true}
                style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}
                onTouchTap={()=>{
                    this.handleOpen(logRecord)
                }}
            >
                <div className="column small-4">
                    {logRecord.logisticID}
                </div>
                <div className="column small-4">
                    {logRecord.licencePlate}
                </div>
                <div className="column small-4">
                    {totalItem}
                </div>
            </RaisedButton>
        )
    }
})

export default connect()(SingleProcessingRecord)
