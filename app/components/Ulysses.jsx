var React = require('react');
var reactDOM = require('react-dom');

var NavBar = require('Navbar')


var Ulysses = (props) => {
    return(
        <div>
            <NavBar/>
            <div className="row">
                <div className="colums small-11 small-centered">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

module.exports = Ulysses;
