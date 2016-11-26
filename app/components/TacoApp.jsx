var React = require('react');

var TacoForm = require('TacoForm')
var Navigation = require('Navigation');

var TacoApp = React.createClass({
    render:function(){
        return (
            <div>
                <Navigation/><br/>
                <TacoForm/>
            </div>
        )
    }
})

module.exports = TacoApp;
