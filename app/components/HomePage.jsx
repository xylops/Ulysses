import React from 'react';
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('../actions/mainActions')


//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
    navBtn:{
        marginTop: '2vw'
    },
    paper:{
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    animation:{
        transition: 'all .5s ease-in'
    }
}

var HomePage = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('ERP Solution'))
    },
    getInitialState: function(){
        return {
            opacity:1
        }
    },
    onHide:function(){
        this.setState({
            opacity: this.state.opacity === 0 ? 1 : 0
        })
    },
    render:function(){
        var {searchText} = this.props
        return(
            <div style={{marginTop:'50px'}}>
                <div className="row">
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/CM" ><RaisedButton label="Client Managemnet"  primary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/IS" ><RaisedButton label="Invoice System" secondary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/IM" ><RaisedButton label="Inventory Management" primary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="" ><RaisedButton label="Logistic" disabled={true} fullWidth={true} /></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/PD" ><RaisedButton label="Product Detail"secondary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="" ><RaisedButton label="Reporting" disabled={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="" ><RaisedButton label="Setting" disabled={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="" ><RaisedButton label="Database" disabled={true} fullWidth={true} /></Link>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="column medium-3" style={style.navBtn}>
                        <RaisedButton label="Animation Testing"secondary={true} fullWidth={true} onClick={this.onHide}/>
                        <div style={{...style.animation, opacity:this.state.opacity}}>
                            <Paper style={style.paper} zDepth={2} />
                        </div>
                    </div>
                </div><br/>
            </div>
        )
    }
})

export default connect()(HomePage);
