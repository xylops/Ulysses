var React = require('react');
var dataAPI = require('../api/dataAPI')
import RaisedButton from 'material-ui/RaisedButton';

var TacoForm = React.createClass({
    handleAddItem:function(e){
        e.preventDefault();
        var title = this.refs.title.value;
        var genre = this.refs.genre.value;
        if(title.length > 1 && genre.length > 1 ){
            this.refs.title.value = '';
            this.refs.genre.value = '';
            var movieData = dataAPI.postData(title, genre);
            console.log(movieData)
        }
    },
    render:function(){
        return(
            <form onSubmit={this.handleAddItem}>
                <input ref='title' placeholder='Please enter your Movie Name'/><br/>
                <input ref='genre' placeholder='Enter Movie genre'/><br/>
                <RaisedButton label="Default" />
            </form>
        )
    }
})

module.exports = TacoForm;
