var React = require('react');
//redux
var {connect} = require('react-redux');
//material-ui
//my component
import SearchClient from './SearchClient';
import InvoiceDetail from './InvoiceDetail'
var InvoiceSystemProduct = require('./InvoiceSystemProduct')

const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px'
    },
    paper:{
        width:'96%',
    },
}
var InvoiceSystem = React.createClass({
    render:function(){
        return(
            <div>
                <br/>
                <div style={style.paper} className="row">
                    <div className="column medium-6" >
                        <SearchClient/>
                    </div>
                    <div className="column medium-6">
                        <InvoiceDetail/>
                    </div>
                </div>
                <hr style={{borderColor:'white'}}/>
                <InvoiceSystemProduct/>
            </div>
        )
    }
})

export default connect()(InvoiceSystem)
