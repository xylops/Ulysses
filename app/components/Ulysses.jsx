var React = require('react');
var reactDOM = require('react-dom');
var {connect} = require('react-redux')
var actions = require('../actions/snackBarActions')

//my component
var NavBar = require('Navbar')

//material-ui
import Snackbar from 'material-ui/Snackbar';

const style={
    textAlign:'center'
}

var Ulysses = React.createClass({
    render :function(){
        var {dispatch, open, snackBarText} = this.props
        return(
            <div>
                <NavBar/>
                <div className="row">
                    <div className='Column small-11 small-centered medium-10'>
                        {this.props.children}
                    </div>
                    <Snackbar
                        style={style}
                        open={open}
                        message={snackBarText}
                        autoHideDuration={4000}
                        onRequestClose={()=>{
                            dispatch(actions.closeSnackBar())
                        }}
                    />
                </div>
            </div>
        );
    }
})

export default connect((state)=>{
    return {
        open:state.snackBarCombiner.toggleSnackBar.open,
        snackBarText:state.snackBarCombiner.toggleSnackBar.text,
    }
})(Ulysses)
