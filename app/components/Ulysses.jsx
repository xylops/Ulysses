var React = require('react');
var reactDOM = require('react-dom');

var NavBar = require('Navbar')


var Ulysses = (props) => {
    return(
        <div>
            <NavBar/>
            <div className="row">
                <div className='Column small-11 small-centered medium-10'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

module.exports = Ulysses;
