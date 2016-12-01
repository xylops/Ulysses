var React = require('react');
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'20px'
    },
    purchaseRecord:{
        height: 'calc(100% - 64px)',
        width: '100%',
        margin: '10 auto',
        textAlign: 'center',
        display: 'inline-block',
    },
    basicInfo:{
        height: 'calc(60% - 64px)',
        width: '100%',
        margin:'10 auto',
        textAlign: 'left',
        display: 'inline-block',
        padding:30,
    },
    actionFrame:{
        height: 'calc(40% - 64px)',
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        margin:'10 auto'
    },
    actionButton:{
        margin:'10 auto'
    }

};

var ClientManagement = React.createClass({
    render:function(){
        return(
            <div>
                <div className="small-12 medium-6 columns">

                    <h3 style={style.title}>Client Information</h3>
                    <Paper style={style.basicInfo} zDepth={3}>
                        <h5>Client ID : clientID</h5>
                        <h5>Name : name</h5>
                        <h5>Delievery Time: delieveryTime</h5>
                        <h5>Address : address</h5>
                    </Paper>
                    <h3 style={style.title}>Action Button</h3>
                    <div style={style.actionFrame}>
                        <RaisedButton label="Create New Client" fullWidth={true} style={style.actionButton} />
                        <RaisedButton label="Edit Current Client" fullWidth={true} style={style.actionButton} />
                        <RaisedButton label="Delete Client" fullWidth={true} style={style.actionButton} />
                        <RaisedButton label="Search Client"  fullWidth={true} style={style.actionButton} />

                    </div>
                </div>
                <div className="small-12 medium-6 columns">
                    <h3 style={style.title}>Previous Purchase Record</h3>
                    <Paper style={style.purchaseRecord} zDepth={3}>
                        <div className="row" >
                            <div className="columns small-2">Date</div>
                            <div className="columns small-7">Purchase Item</div>
                            <div className="columns small-1">Edit</div>
                            <div className="columns small-2">Delete</div>
                        </div>
                    </Paper>
                </div>
            </div>

        )
    }
})

module.exports = ClientManagement;
