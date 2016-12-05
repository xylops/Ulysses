var React = require('react');

//material-ui
import TextField from 'material-ui/TextField'

//Component
import CreateNewProduct from './CreateNewProduct'

const style={
    whole:{
        paddingTop:'15px',
        paddingBottom:'5px'
    },
    textField : {
        margin:0,
    },
    title:{
        textAlign:'left',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px'
    },
}

var TopSection = React.createClass({
    render:function(){
        return(
            <div className="row" style={style.whole}>
                <div className="column small-12 medium-7">
                    <h2 style={style.title}><b>Product Detail</b></h2>
                </div>
                <div className="column small-10 medium-4">
                    <TextField
                        style={style.textField}
                        hintText="Search product"
                        floatingLabelText="Filter keywords"
                    /><br />
                </div>
                <div className="column small-2 medium-1">
                    <CreateNewProduct/>
                </div>
            </div>

        )
    }
})

module.exports = TopSection;
