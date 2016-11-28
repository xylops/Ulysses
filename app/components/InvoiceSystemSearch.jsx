var React = require('react');
var ReactDOM = require('react-dom');
//material-ui
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const style = {
    paper:{
        width:'96%',
        margin:30,
    },
    form:{
        width:'50%',
        margin:30
    },
    formText:{
        textAlign:'right',
        marginTop:10
    }
};

var ISS = React.createClass({
    render:function(){
        return(
            <div style={style.paper}>
                <div className="column medium-6">
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
                <div className="column medium-6">
                    <div className="row">
                        <div className="column medium-4" style={{textAlign:'right'}}>
                            <h5 style={style.formText}> Invoice Number: </h5>
                        </div>
                        <div className="column medium-8">
                            <TextField
                                hintText="Invoice Number will be generate"
                            /><br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column medium-4" style={{textAlign:'right'}}>
                            <h5 style={style.formText}> Date of Creation </h5>
                        </div>
                        <div className="column medium-8">
                             <DatePicker hintText="Landscape Dialog" mode="landscape" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
})

module.exports = ISS;
