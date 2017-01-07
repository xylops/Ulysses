var React = require('react');
//react-redux
var {connect}= require('react-redux');
var actions = require('../../../actions/pickListActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';

var LogisticRecord = React.createClass({
    render:function(){
        var {logRecord} = this.props;
        var renderSingleLogItem = () =>{
            return logRecord.item.map((item)=>{
                return(
                    <RaisedButton key={item.id} fullWidth={true} style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}>
                        <div className="column small-3">
                            {item.ProductID}
                        </div>
                        <div className="column small-6">
                            {item.ProductName}
                        </div>
                        <div className="column small-3">
                            {item.quantity}
                        </div>
                    </RaisedButton>
                )
            })
        }
        var renderLogRecord = () =>{
            if(logRecord){
                return (
                    <div>
                        <div className="row">
                            <div className="column small-4">
                                Logistic ID
                            </div>
                            <div className="column small-8">
                                {logRecord.logisticID}
                            </div>
                            <div className="column small-4">
                                Date
                            </div>
                            <div className="column small-8">
                                {logRecord.date}
                            </div>
                            <div className="column small-4">
                                Licence Plate
                            </div>
                            <div className="column small-8">
                                {logRecord.licencePlate}
                            </div>
                        </div>
                        <hr/>
                        {renderSingleLogItem()}
                        <hr/>
                        <RaisedButton label="Complete Picking" fullWidth={true} primary={true}/>
                    </div>
                )
            }else{
                return (
                    <div style={{textAlign:'center'}}>
                        <br/>
                        <p>Please choose a record on the left</p>
                    </div>
                )
            }
        }
        return(
            <div>
                {renderLogRecord()}
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        logRecord : state.logistic.fetchPickList.singleLogRecord
    }
})(LogisticRecord)
