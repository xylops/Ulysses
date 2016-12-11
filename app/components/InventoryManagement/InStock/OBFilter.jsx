var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/inStockAction')

//material-ui
import TextField from 'material-ui/TextField';

var OBFilter = React.createClass({
    PIDChange:function(){
        var {dispatch} = this.props;
        var pid = this.refs.PID.getValue();
        dispatch(actions.ownBrandIDFilter(pid))
    },
    PNameChange:function(){
        var {dispatch} = this.props;
        var pName = this.refs.PName.getValue();
        dispatch(actions.ownBrandNameFilter(pName))
    },
    render:function(){
        return (
            <div className="row">
                <div className="column medium-4">
                    <TextField
                        hintText="Search By ProductID"
                        fullWidth={true}
                        ref="PID"
                        onChange={this.PIDChange}
                    />
                </div>
                <div className="column medium-8">
                    <TextField
                        hintText="Search By Product Name"
                        fullWidth={true}
                        ref="PName"
                        onChange={this.PNameChange}
                    />
                </div>
            </div>
        )
    }
})

export default connect()(OBFilter)
