var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../actions/mainActions')
//my component
import TopSection from './TopSection';
import RecordList from './RecordList';

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Inventory Record'))
    },
    render:function(){
        var currentLocation = this.props.location.pathname
        return(
            <div>
                <br/>
                <TopSection/>
                <hr/>
                <RecordList/>
            </div>
        )
    }
})

export default connect()(main)
