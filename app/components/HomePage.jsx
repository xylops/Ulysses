var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');

//material-ui
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    navBtn:{
        marginTop: '2vw'
    }
}

var HomePage = React.createClass({
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
            </div>
        )
    }
})

export default connect()(HomePage);
