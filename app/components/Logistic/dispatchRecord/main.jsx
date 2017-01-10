var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//myCompoent
import TopSection from './TopSection';
import DispatchRecordList from './DispatchRecordList';

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Dispatch Record'))
    },
    render:function(){
        return (
            <div >
                <br/>
                <div>
                    <TopSection/>
                    <br/>
                    <div className="row" style={{textAlign:'center'}}>
                        <div className="column medium-2">
                            Invoice ID
                        </div>
                        <div className="column medium-2">
                            Date
                        </div>
                        <div className="column medium-2">
                            Client Name
                        </div>
                        <div className="column medium-2">
                            Area
                        </div>
                        <div className="column medium-2">
                            Total
                        </div>
                        <div className="column medium-2">
                            Status
                        </div>
                    </div>
                    <hr/>
                    <DispatchRecordList/>
                </div>
            </div>

        )
    }
})

export default connect()(main)
