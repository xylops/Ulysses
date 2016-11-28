var React = require('react');
var {Link} = require('react-router');
//material-ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationOpen from 'material-ui/svg-icons/navigation/menu';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const containerStyle={
    // height: 'calc(100% - 64px)',
    // top: 64,
    backgroundColor:'lightblue'
}

var NavBar = React.createClass({
    getInitialState:function(){
        return ({
            open: false,
        })
    },
    handleToggle:function(){
        this.setState({open: !this.state.open});
    },
    handleClose:function(){
        this.setState({open:false});
    },
    linkButton:function(){
        alert('Link Clicked')
    },
    render:function(){
        return (
            <div>
                <AppBar
                    title="Ulysses"
                    className="AppBar"
                    iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationOpen /></IconButton>}
                    iconElementRight={<FlatButton onTouchTap={this.linkButton} label="Glory Clincal Solution"/>}
                />
                <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                containerStyle={containerStyle}
                onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose}>
                        <div className="drawerWelcoming">
                            <h4>Welcome</h4>
                            <b><h2>User</h2></b>
                        </div>
                    </MenuItem>
                    <Divider />
                    <Link to="/"><MenuItem onTouchTap={this.handleClose}>Home</MenuItem></Link>
                    <Link to="/CM"><MenuItem onTouchTap={this.handleClose}>Client Management</MenuItem></Link>
                    <Link to="/IS"><MenuItem onTouchTap={this.handleClose}>Invoice System</MenuItem></Link>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Inventory Management</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Logistic</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Product Database</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Reporting</MenuItem>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Top Management</MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={this.handleToggle} className="drawerCloseBtn">
                        <NavigationClose />
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
})

module.exports = NavBar;
