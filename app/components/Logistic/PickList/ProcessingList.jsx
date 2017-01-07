var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/pickListActions');
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
//api
var logisticAPI = require('LogisticAPI')
//my component
import SingleProcessingRecord from './SingleProcessingRecord'
//style
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}

var ProcessingList = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
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
    },
    render:function(){
        var {pickList, fetching} = this.props;

        var renderPL = () =>{
            if(fetching){
                return (
                    <div style={style}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }else{
                return pickList.map((logRecord)=>{
                    return(
                        <SingleProcessingRecord key={logRecord.logisticID} logRecord={logRecord}/>
                    )
                })
            }
        }
        return (
            <div>
                <h4 style={{textAlign:'center', marginBottom:'10px'}}>Processing Logistic Record</h4>
                <div className="row" style={{textAlign:'center'}}>
                    <div className="column small-3">
                        Logistic ID
                    </div>
                    <div className="column small-3">
                        Date
                    </div>
                    <div className="column small-3">
                        Licence Plate
                    </div>
                    <div className="column small-3">
                        Total Item
                    </div>
                </div>
                <hr/>
                {renderPL()}
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        pickList: state.logistic.fetchPickList.PL,
        fetching: state.logistic.fetchPickList.isFetching
    }
})(ProcessingList)
