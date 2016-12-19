var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../actions/invoiceAction');
//material-ui
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//my component
import SearchClientDialog from './SearchClientDialog'
//api
var clientManagementAPI = require('ClientManagementAPI')

const style = {
    form:{
        width:'100%',
        margin:30
    },
    formText:{
        textAlign:'right',
    },
    searchBtn:{
        float:'right'
    }
};

var SearchClient = React.createClass({
    render:function(){
        var {client, dispatch} = this.props
        var renderSearch = ()=>{
            if(Object.keys(client).length === 0){
                return (
                    <div>
                        <RaisedButton label="Search Client" primary={true} fullWidth={true} onTouchTap={()=>{
                                dispatch(actions.openDialog())
                            }}/>
                    </div>
                )
            }else{
                return (
                    <div>
                        <div className="row">
                            <div className="column medium-4" >
                                <h5 style={style.formText}>Name: </h5>
                            </div>
                            <div className="column medium-8">
                                {client.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column medium-4" style={{textAlign:'right'}}>
                                <h5 style={style.formText}> Client ID: </h5>
                            </div>
                            <div className="column medium-8">
                                {client.id}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column medium-4" style={{textAlign:'right'}}>
                                <h5 style={style.formText}> Address: </h5>
                            </div>
                            <div className="column medium-8">
                                {client.address}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column medium-4" style={{textAlign:'right'}}>
                                <h5 style={style.formText}> Phone: </h5>
                            </div>
                            <div className="column medium-8">
                                {client.phone}
                            </div>
                        </div>
                        <RaisedButton label="Change Client" primary={true} fullWidth={true} onTouchTap={()=>{
                                dispatch(actions.openDialog())
                            }}/>
                    </div>
                )
            }
        }
        return(
            <div>
                {renderSearch()}
                <SearchClientDialog/>
            </div>

        )
    }
})

export default connect((state)=>{
    return {
        client: state.invoice.createInvoice.client
    }
})(SearchClient)
