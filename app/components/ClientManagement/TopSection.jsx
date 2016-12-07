var React = require('react');
var {connect} = require('react-redux')


//material-ui
import TextField from 'material-ui/TextField'

//Component
import CreateNewClient from './CreateNewClient'

const style={
    whole:{
        paddingTop:'15px',
        paddingBottom:'5px'
    },
    textField : {
        margin:0,
    },
    title:{
        textAlign:'left',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var TopSection = React.createClass({
    handleChange:function(){
        var {dispatch} = this.props;
        var text = this.refs.filterText.getValue();
    },
    render:function(){
        return(
            <div className="row" style={style.whole}>
                <div className="column small-12 medium-7">
                    <h2 style={style.title}><b>ClientManagement</b></h2>
                </div>
                <div className="column small-9 medium-4" style={{textAlign:'right'}}>
                    <TextField
                        style={style.textField}
                        hintText="Search Client"
                        floatingLabelText="Filter keywords"
                        ref="filterText"
                        onChange={this.handleChange}
                    /><br />
                </div>
                <div className="column small-3 medium-1">
                    <CreateNewClient/>
                </div>
            </div>

        )
    }
})

export default connect()(TopSection)
