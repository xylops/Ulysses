var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux')
var actions = require('../../actions/mainActions')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

//my Component
import ClientList from './ClientList'
import TopSection from './TopSection'
const style = {
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'20px'
    },
};

var ClientManagement = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Client Mangement'))
    },
    render:function(){
        return(
            <div>
                <TopSection/>
                <Divider/>
                <br/>
                <ClientList/>
            </div>

        )
    }
})

export default connect()(ClientManagement)
