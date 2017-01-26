import React from 'react';
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('../actions/mainActions')
import {green500, lightGreen500, teal500, deepOrange500
, grey50 } from 'material-ui/styles/colors';

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
    navBtn:{
        marginTop: '1.5vw'
    },
    paper:{
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    },
    animation:{
        transition: 'all .3s ease-in'
    }
}

var HomePage = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('ERP Solution'))
    },
    getInitialState: function(){
        return {
            opacity:0
        }
    },
    onHide:function(){
        this.setState({
            opacity: this.state.opacity === 0 ? 1 : 0
        })
    },
    render:function(){
        var {searchText} = this.props
        var windowHeight = $(window).height() - 64

        var renderAdminBtn = () =>{
            if(clearance === 'admin' || clearance === 'topMan'){
                return (
                    <div className="row">
                        <div className="column medium-6" style={style.navBtn}>
                            <Link to="/LOG" ><RaisedButton label="LOG Record" fullWidth={true} backgroundColor={'#51B300'} labelColor={'white'}/></Link>
                        </div>
                        <div className="column medium-6" style={style.navBtn}>
                            <Link to="/REP" ><RaisedButton label="Reporting" fullWidth={true} backgroundColor={'#51B300'} labelColor={'white'}/></Link>
                        </div>
                    </div>
                )
            }
        }

        return(
            <div style={{marginTop:'50px', height:windowHeight}}>
                <div className="row">
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/CM" ><RaisedButton label="Client Managemnet"  primary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/PD" ><RaisedButton label="Product Detail" primary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/IV" ><RaisedButton label="Invoice System" secondary={true} fullWidth={true} /></Link>
                    </div>
                    <div className="column medium-3" style={style.navBtn}>
                        <Link to="/IM" ><RaisedButton label="Inventory Management" secondary={true} fullWidth={true} /></Link>
                    </div>
                </div>
                <div className="row">

                    <div className="column medium-4" style={style.navBtn} >
                        <Link to="/LG" ><RaisedButton label="Sort Invoice" fullWidth={true} backgroundColor={'#8A02A7'} labelColor={'white'}/></Link>
                    </div>
                    <div className="column medium-4" style={style.navBtn}>
                        <Link to="/LGPL" ><RaisedButton label="PickList" fullWidth={true} backgroundColor={'#8A02A7'} labelColor={'white'}/></Link>
                    </div>
                    <div className="column medium-4" style={style.navBtn}>
                        <Link to="/LGDR" ><RaisedButton label="Dispatch Record" fullWidth={true} backgroundColor={'#8A02A7'} labelColor={'white'}/></Link>
                    </div>
                </div>
                {renderAdminBtn()}

            </div>
        )
    }
})

export default connect()(HomePage);
