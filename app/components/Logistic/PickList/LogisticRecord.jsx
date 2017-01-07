var React = require('react');
//react-redux
var {connect}= require('react-redux');
var actions = require('../../../actions/pickListActions');
var snackBarActions = require('../../../actions/snackBarActions')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//api
var logisticAPI = require('LogisticAPI')
//my component
import LogRecordItem from './LogRecordItem'

var LogisticRecord = React.createClass({
    handleComplete:function(){
        var {logRecord, dispatch} = this.props;
        logisticAPI.completePickList(logRecord.logisticID).then((response)=>{
            var resText = response.data.message;
            dispatch(snackBarActions.openSnackBar(resText));
            //refetch processing list
            dispatch(actions.startFetchPickList());
            logisticAPI.getPickList().then((res)=>{
                res.data.forEach((record)=>{
                    var tempItemArray = []
                    record.item.forEach((singleItem)=>{
                        if(tempItemArray.length === 0 ){
                            tempItemArray.push(singleItem)
                        }else{
                            var checking = false
                            var checkingIndex = undefined
                            for(var i = 0; i< tempItemArray.length; i++){
                                if(tempItemArray[i].id == singleItem.id){
                                    checking = true,
                                    checkingIndex = i
                                }
                            }
                            if(checking){
                                tempItemArray[checkingIndex].quantity = Number(tempItemArray[checkingIndex].quantity) + Number(singleItem.quantity)
                            }else{
                                tempItemArray.push(singleItem)
                            }
                        }
                    })
                    record.item = tempItemArray
                })
                dispatch(actions.completeFetchPickList(res.data))
            })
        });
    },
    render:function(){
        var {logRecord} = this.props;
        var renderSingleLogItem = () =>{
            return logRecord.item.map((item)=>{
                return(
                    <LogRecordItem  key={item.id} item={item}/>
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
                        <br/>
                        <hr/>
                        <RaisedButton label="Complete Picking" fullWidth={true} primary={true} onTouchTap={this.handleComplete}/>
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
