var React = require('react')
var ReactDOM = require('react-dom');

//material-ui
import Paper from 'material-ui/Paper';

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px'
    },
    paper:{
        width:'100%',
        minHeight:500
    },
    tableHeader:{
        textAlign:'center',
        padding:10,
    }
}


var ProductDetail = React.createClass({
    render:function(){
        return(
            <div className="row">
                <h3 style={style.title}>Product Detail Page</h3>
                <Paper style={style.paper} zDepth={2}>
                    <div className="row" style={style.tableHeader}>
                        <div className="column medium-2"> Produt ID </div>
                        <div className="column medium-5"> Product Name </div>
                        <div className="column medium-2"> Spec </div>
                        <div className="column medium-2"> Price </div>
                        <div className="column medium-1"> Unit </div>
                    </div>
                </Paper>
            </div>
        )
    }
});

module.exports = ProductDetail;
