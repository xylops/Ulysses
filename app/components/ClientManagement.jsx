var React = require('react');
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px'
    },
    purchaseRecord:{
        height: 'calc(100% - 64px)',
        width: '46vw',
        margin: 10,
        textAlign: 'center',
        display: 'inline-block',
    },
    basicInfo:{
        height: 'calc(60% - 64px)',
        width: '48vw',
        margin: 10,
        textAlign: 'left',
        display: 'inline-block',
        padding:30,
    },
    actionFrame:{
        height: 'calc(40% - 64px)',
        width: '48vw',
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    actionButton:{
        width: '40%',
        padding:20,
        margin:20
    }

};

var ClientManagement = React.createClass({
    render:function(){
        return(
            <div>
                <div className="large-6 columns">
                    <h3 style={style.title}>Client Information</h3>
                    <Paper style={style.basicInfo} zDepth={3}>
                        <h4>Client ID : clientID</h4>
                        <h4>Name : name</h4>
                        <h4>Delievery Time: delieveryTime</h4>
                        <h4>Address : address</h4>
                    </Paper>
                    <h3 style={style.title}>Action Button</h3>
                    <div style={style.actionFrame} zDepth={1}>
                        <RaisedButton label="Create New Client" style={style.actionButton} />
                        <RaisedButton label="Edit Current Client" style={style.actionButton} />
                        <RaisedButton label="Delete Client" style={style.actionButton} />
                        <RaisedButton label="Search Client" style={style.actionButton} />

                    </div>
                </div>
                <div className="large-6 columns">
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
