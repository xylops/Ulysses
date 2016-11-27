var React = require('react');
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';

const style = {
  height: '50vw',
  width: '35vw',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

var ClientManagement = React.createClass({
    render:function(){
        return(


                <Paper style={style} zDepth={3} />
            

        )
    }
})

module.exports = ClientManagement;
