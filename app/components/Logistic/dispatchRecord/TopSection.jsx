var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/dispatchRecordActions')
//material-ui
import TextField from 'material-ui/TextField';

var TopSection = React.createClass({
    handleChange:function(){
        var {dispatch} = this.props
        var text = this.refs.searchText.getValue();
        dispatch(actions.updateDRSearchText(text))
    },
    render:function(){
        return (
            <div >
                <TextField
                    hintText="Search Filter"
                    fullWidth={true}
                    onChange={this.handleChange}
                    ref="searchText"
                /><br />
            </div>
        )
    }
})

export default connect()(TopSection)
