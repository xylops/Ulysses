var React = require('react');
var reactDOM = require('react-dom');
//material-ui
var NavBar = require('Navbar')


var Ulysses = React.createClass({

    render:function(){
        return (
            <div>
                <NavBar />
            </div>
        )
    }
})

module.exports = Ulysses;
