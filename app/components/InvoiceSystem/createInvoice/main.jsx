var React = require('react');
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/mainActions')
var clientAction = require('../../../actions/clientManagementActions')
var productActions = require('../../../actions/productDetailActions');
//material-ui
//API
var clientManagementAPI = require('ClientManagementAPI')
var productDetailAPI = require('ProductDetailAPI')

//my component
import SearchClient from './SearchClient';
import InvoiceDetail from './InvoiceDetail';
import ProductSection from './ProductSection';


const style={
    title:{
        textAlign:'center',
        fontWeight:'bold',
        paddingTop:'10px'
    },
    topSection:{
        width:'96%',
    },
}
var InvoiceSystem = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        //adding client list
        dispatch(clientAction.startFetchClientList())
        clientManagementAPI.getFullClientData().then((CL)=>{
            dispatch(clientAction.completeFetchClientList(CL.data.result));
        })
        dispatch(clientAction.updateClientFilterText(""))
        //add product list
        dispatch(productActions.startFetchPDL())
        productDetailAPI.getFullProductData().then((PDL)=>{
            dispatch(productActions.completeFetchPDL(PDL.data));
        })
        dispatch(productActions.updateProductFilterText(""))
        dispatch(actions.changingNavBarText('New Invoice'))
    },
    render:function(){
        var {total} = this.props
        return(
            <div>
                <br/>
                <div style={style.topSection} className="row">
                    <div className="column medium-6" >
                        <SearchClient/>
                    </div>
                    <div className="column medium-6">
                        <InvoiceDetail/>
                    </div>
                </div>
                <hr style={{borderColor:'white'}}/>
                <ProductSection/>
                <hr/>
                <h5 style={{textAlign:'right',paddingRight:'40px'}}> Total Amount : $ {total}</h5>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        total: state.invoice.createInvoice.total
    }
})(InvoiceSystem)
