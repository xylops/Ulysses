var React = require('react');

var Navigation = React.createClass({
    render:function(){
        return(
            <div className="top-bar">
                <div className="menu-centered">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">Taco App</li>
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports = Navigation;
