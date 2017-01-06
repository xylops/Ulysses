var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/pickListActions');

//api
var logisticAPI = require('LogisticAPI')

//myCompoent

var ProcessingList = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.startFetchPickList());
        logisticAPI.getPickList().then((res)=>{
            dispatch(actions.completeFetchPickList(res.data))
        })
    },
    render:function(){
        return (
            <div>
                ProcessingList
            </div>
        )
    }
})

export default connect()(ProcessingList)
