var React = require('react')
var {connect} = require('react-redux')
var {Link} = require('react-router')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var main = React.createClass({
    render:function(){
        var currentLocation = this.props.location.pathname
        return(
            <div>
                <h2 style={style.title}><b>{currentLocation}</b></h2>
                <div className="row">
                    <div className="column small-12 medium-6">
                        <Link to="IM/InStock"><RaisedButton label="In Stock" fullWidth={true} primary={true}/></Link>
                    </div>
                    <div className="column small-12 medium-6">
                        <RaisedButton label="Out Stock" fullWidth={true} disabled={true}/>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect()(main)
