var React = require('react');

//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';

//Style
const style={
    tableRow:{
        textAlign:'center',
        marginLeft:'5px',
        maxHeight:'36px'
    }
}

var SingleClient = React.createClass({
    render:function(){
        var {client, dispatch} = this.props
        return(
            <div>
                <RaisedButton className="row" style={style.tableRow} fullWidth={true} onTouchTap={()=>{
                    dispatch(actions.openSingleClientDialog(client))
                }}>
                    <div className="column medium-2 hide-for-small-only"> {client.id} </div>
                    <div className="column medium-2 small-12"> {client.name} </div>
                    <div className="column medium-5 hide-for-small-only"> {client.address} </div>
                    <div className="column medium-3 hide-for-small-only"> {client.phone} </div>

                </RaisedButton>
            </div>
        )
    }
})

export default connect()(SingleClient)
