var React = require('react')
var {connect} = require('react-redux')
var {Link} = require('react-router')
//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Back from 'material-ui/svg-icons/hardware/keyboard-arrow-left';


const style={
    whole:{
        paddingTop:'30px',
        paddingBottom:'5px'
    },
    textField : {
        margin:0,
    },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var TopSection = React.createClass({
    render:function(){
        return(
            <div className="row" style={style.whole}>
                <div className="column small-2 medium-2">
                    <Link to="/IM">
                        <FloatingActionButton secondary={true}>
                            <Back/>
                        </FloatingActionButton>
                    </Link>
                </div>
                <div className="column small-8 medium-8" style={{textAlign:'right'}}>
                    <h2 style={style.title}><b>In Stock</b></h2>
                </div>
                <div className="column small-2 medium-2">

                </div>
            </div>
        )
    }
})

export default connect()(TopSection)
