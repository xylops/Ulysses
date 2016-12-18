var React = require('react');
//material-ui
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const style = {
    form:{
        width:'100%',
        margin:30
    },
    formText:{
        textAlign:'right',
        marginTop:10
    }
};

var ISS = React.createClass({
    render:function(){
        var renderButton = ()=>{
            
        }
        return(
            <div>
                <div className="row">
                    <div className="column medium-4" >
                        <h5 style={style.formText}>Name: </h5>
                    </div>
                    <div className="column medium-8">
                        <TextField hintText="Client Name" fullWidth={true}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Client ID: </h5>
                    </div>
                    <div className="column medium-8">
                        <TextField hintText="Client ID" fullWidth={true}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Address: </h5>
                    </div>
                    <div className="column medium-8">
                        <TextField
                            hintText="Address will be automatically generate if the correct client is select"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                        /><br />
                    </div>
                </div>
            </div>

        )
    }
})

module.exports = ISS;
