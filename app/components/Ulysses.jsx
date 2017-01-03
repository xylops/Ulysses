var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux')
var actions = require('../actions/snackBarActions')
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
//my component
import NavBar from 'Navbar'

//material-ui
import Snackbar from 'material-ui/Snackbar';

const style={
    textAlign:'center'
}

var Ulysses = React.createClass({
    render :function(){
        var {dispatch, open, snackBarText} = this.props
        var path = this.props.location.pathname;
        var segment = path.split('/')[1] || 'root';
        var windowHeight = $(window).height() - 64
        console.log(windowHeight)
        return(
            <div>
                <NavBar/>
                <div className="row">
                    <div className='Column small-12 small-centered medium-12'>
                        <ReactCSSTransitionGroup
                            transitionName="pageSlider"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                        >
                            {React.cloneElement(this.props.children, { key: segment })}
                        </ReactCSSTransitionGroup>
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
        open:state.snackBar.toggleSnackBar.open,
        snackBarText:state.snackBar.toggleSnackBar.text,
    }
})(Ulysses)
