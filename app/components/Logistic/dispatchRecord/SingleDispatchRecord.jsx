var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/dispatchRecordActions')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';

var SingleDispatchRecord = React.createClass({
    handleOpen:function(){
        var {dispatch, record} = this.props;
        dispatch(actions.openSingleDR(record))
    },
    render:function(){
        var {record} = this.props;
        var date = moment(record.date).format('DD/MM/YYYY')
        return (
            <RaisedButton
                fullWidth={true}
                style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}
                onTouchTap={this.handleOpen}
            >
                <div className="column medium-2">
                    {record.invoiceID}
                </div>
                <div className="column medium-2">
                    {date}
                </div>
                <div className="column medium-2">
                    {record.client.name}
                </div>
                <div className="column medium-2">
                    {record.client.location}
                </div>
                <div className="column medium-2">
                    {record.total}
                </div>
                <div className="column medium-2">
                    {record.status}
                </div>
            </RaisedButton>
        )
    }
})

export default connect()(SingleDispatchRecord)
