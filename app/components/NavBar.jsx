var React = require('react');
var reactDOM = require('react-dom');
//material-ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationOpen from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

var NavBar = React.createClass({
    getInitialState:function(){
        return ({
            open: false,
            selectedIndex: 0,
        })
    },
    handleToggle:function(){
        this.setState({open: !this.state.open});
    },
    linkButton:function(){
        alert('Link Clicked')
    },
    render:function(){
        return (
            <div>
                <AppBar
                    title="Ulysses"
                    iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationOpen /></IconButton>}
                    iconElementRight={<FlatButton onTouchTap={this.linkButton} label="Glory Clincal Solution"/>}
                />
                <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                className="NavbarDrawer"
                >
                    <MenuItem onTouchTap={this.handleClose}>
                        <div className="drawerWelcoming">
                            <h4>Welcome</h4>
                            <b><h2>User</h2></b>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onTouchTap={this.handleClose}>Client Management</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Invoice System</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Inventory Management</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Logistic</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Product Database</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Reporting</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Top Management</MenuItem>
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
