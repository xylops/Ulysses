var React = require('react');
var {Link} = require('react-router');
//Redux
var {connect}  = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

var TopSection = React.createClass({
    render:function(){
        return (
            <div className="row">
                <br/>
                <div className="column small-12 medium-8">
                    <TextField
                      hintText="Search Invoice"
                      fullWidth={true}
                    /><br />
                </div>
                <div className="column small-12 medium-4">
                    <Link to="IS"><RaisedButton label="Create New Invoice" fullWidth={true}/></Link>
                </div>
            </div>
        )
    }
})

export default connect()(TopSection)
