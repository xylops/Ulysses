var React = require('react');

//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions')

//material-ui
import CircularProgress from 'material-ui/CircularProgress';

//api
var clientManagementAPI = require('clientManagementAPI')

//my Component
import SingleClient from './SingleClient';
import ClientDetail from './ClientDetail';

//Style
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}


var ClientList = React.createClass({
    componentDidMount: function(){
        var {dispatch} = this.props;
        dispatch(actions.startFetchClientList())
        clientManagementAPI.getFullClientData().then((CL)=>{
            dispatch(actions.completeFetchClientList(CL.data));
        })
        // dispatch(actions.updateProductFilterText(""))
    },
    render:function(){
        var {isFetching, clientList} = this.props;

        // let filteredClientList = clientList.filter((client)=>{
        //     return client.name.indexOf(productFilterText) !== -1;
        // });

        var renderClientList = ()=>{
            if(!isFetching){
                return clientList.map((client)=>{
                    return(
                        <SingleClient key={client._id} client={client}/>
                    )
                })
            }else{
                <div style={style}>
                    <CircularProgress size={80} thickness={5} />
                </div>
            }
        }

        return (
            <div>
                {renderClientList()}
                <ClientDetail/>
            </div>


        )
    }
})

export default connect((state)=>{
    return {
        isFetching: state.clientManagement.clientData.isFetching,
        clientList: state.clientManagement.clientData.clientList,
        singleClientDialog: state.clientManagement.singleClient.open,
        singleClientAttr : state.clientManagement.singleClient.singleClientAttr,
    }
})(ClientList)
