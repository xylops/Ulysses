var React = require('react');
//Redux
var {connect} = require('react-redux')
var actions = require('../../actions/productDetailActions');
//material-ui
import TextField from 'material-ui/TextField'
//Component
import CreateNewProduct from './CreateNewProduct'
//Style
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
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var TopSection = React.createClass({
    handleChange:function(){
        var {dispatch} = this.props;
        var text = this.refs.filterText.getValue();
        dispatch(actions.updateProductFilterText(text))
    },
    render:function(){
        return(
            <div className="row" style={style.whole}>
                <div className="column small-12 medium-7">
                    <h2 style={style.title}><b>Product Detail</b></h2>
                </div>
                <div className="column small-9 medium-4" style={{textAlign:'right'}}>
                    <TextField
                        style={style.textField}
                        hintText="Search product"
                        floatingLabelText="Filter keywords"
                        ref="filterText"
                        onChange={this.handleChange}
                    /><br />
                </div>
                <div className="column small-3 medium-1">
                    <CreateNewProduct/>
                </div>
            </div>

        )
    }
})

export default connect()(TopSection)
