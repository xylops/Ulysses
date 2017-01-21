var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');

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
    backgroundColor:'#00AA72',
}

const style={
    appBar:{
        backgroundColor:'#006E4A'
    },
    appBarLogo:{
        color:'white',
        fontWeight:'Bold',
        fontSize:'23px',
        lineHeight:2,
        marginRight:'2vw'
    },
    drawerText:{
        color:'white'
    }
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
    render:function(){
        var {navbarText} = this.props;
        return (
            <div>
                <AppBar
                    title="Ulysses"
                    style={style.appBar}
                    iconElementLeft={<IconButton onTouchTap={this.handleToggle}><NavigationOpen /></IconButton>}
                    iconElementRight={<Link to="/" style={style.appBarLogo}>{navbarText}  </Link>}
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
                            <h4 style={style.drawerText}>Welcome</h4>
                            <b><h2 style={style.drawerText}>{username}</h2></b>
                        </div>
                    </MenuItem>
                    <Divider />
                    <Link to="/"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Home</MenuItem></Link>
                    <Link to="/CM"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Client Management</MenuItem></Link>
                    <Link to="/PD"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Product Detail</MenuItem></Link>
                    <Link to="/IS"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Invoice System</MenuItem></Link>
                    <Link to="/IM"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Inventory Management</MenuItem></Link>
                    <Link to="/LG"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Sort Invoice</MenuItem></Link>
                    <Link to="/LGPL"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>PickList</MenuItem></Link>
                    <Link to="/LGDR"><MenuItem onTouchTap={this.handleClose} style={style.drawerText}>Dispatch Record</MenuItem></Link>
                    <MenuItem onTouchTap={this.handleClose} disabled={true}>Reporting</MenuItem>
                    <Divider />
                    <a href="/users/logout">
                        <MenuItem onTouchTap={this.handleToggle} className="drawerCloseBtn" style={{color:'white', fontWeight:'bold'}}>
                            Logout
                        </MenuItem>
                    </a>
                </Drawer>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        navbarText: state.main.NavBarText
    }
})(NavBar)
