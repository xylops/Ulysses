var React = require('react');
//redux
var {connect} = require('react-redux');
var clientAction = require('../../actions/clientManagementActions')
//material-ui
//API
var clientManagementAPI = require('ClientManagementAPI')
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
    topSection:{
        width:'96%',
    },
}
var InvoiceSystem = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(clientAction.startFetchClientList())
        clientManagementAPI.getFullClientData().then((CL)=>{
            dispatch(clientAction.completeFetchClientList(CL.data));
        })
        dispatch(clientAction.updateClientFilterText(""))
    },
    render:function(){
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
                <InvoiceSystemProduct/>
            </div>
        )
    }
})

export default connect()(InvoiceSystem)
