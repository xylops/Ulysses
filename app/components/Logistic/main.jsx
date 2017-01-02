var React = require('react');
var {connect} = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';

var main = React.createClass({
    handleDrag:function(){
        console.log('drag')
    },
    handleDoubleClick:function(){
        console.log('Double')
    },
    render:function(){
        return (
            <div className="row">
                <div className="column small-12 medium-6">
                    <RaisedButton label="Double or Single Click" onDoubleClick={this.handleDoubleClick} />
                </div>
                <div className="column small-12 medium-6">
                    <RaisedButton label="Double or Single Click" onDoubleClick={this.handleDoubleClick} />
                </div>

            </div>
        )
    }
})

export default connect()(main)
