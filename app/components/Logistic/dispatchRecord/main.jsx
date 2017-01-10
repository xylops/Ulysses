var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//myCompoent

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Dispatch Record'))
    },
    render:function(){
        return (
            <div >
                <br/>
                <div className="row">
                    Dispatch Record
                </div>
            </div>

        )
    }
})

export default connect()(main)
