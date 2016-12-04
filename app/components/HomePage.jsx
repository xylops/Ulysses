var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');



import RaisedButton from 'material-ui/RaisedButton';

var HomePage = React.createClass({
    handleTap : function(){
        console.log('working')
        console.log(connect.searchText)
    },
    render:function(){
        return(
            <div style={{marginTop:'50px'}}>
                <div className="row">
                    <div className="column medium-3">
                        <Link to="/CM" ><RaisedButton label="Client Managemnet"  primary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="/IS" ><RaisedButton label="Invoice System" secondary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="" ><RaisedButton label="Inventory Management" disabled={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="" ><RaisedButton label="Logistic" disabled={true} fullWidth={true} /></Link>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="column medium-3">
                        <Link to="/PD" ><RaisedButton label="Product Detail"secondary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="" ><RaisedButton label="Reporting" disabled={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="" ><RaisedButton label="Setting" disabled={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3">
                        <Link to="" ><RaisedButton label="Database" disabled={true} fullWidth={true} /></Link>
                    </div>
                </div>
                <RaisedButton label="Testing" primary={true} onTouchTap={this.handleTap}/>
            </div>
        )
    }
})

export default connect()(HomePage);
