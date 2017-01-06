var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//myCompoent
import ProcessingList from './ProcessingList'

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Pick List'))
    },

    render:function(){
        return (
            <div >
                <br/>
                <div className="row">
                    <div className="column small-6">
                        <ProcessingList/>
                    </div>
                    <div className="column small-6">
                    </div>
                </div>
            </div>

        )
    }
})

export default connect()(main)
