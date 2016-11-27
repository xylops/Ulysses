var React = require('react');
var reactDOM = require('react-dom');

var NavBar = require('Navbar')


var Ulysses = (props) => {
    return(
        <div>
            <NavBar/>
            <div >
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

module.exports = Ulysses;
