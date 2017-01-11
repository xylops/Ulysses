var React = require('react');
import ReactPaginate from 'react-paginate';

//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions')
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
//api
var clientManagementAPI = require('ClientManagementAPI')
//my Component
import SingleClient from './SingleClient';
import ClientDetail from './ClientDetail';
//Style
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}


var ClientList = React.createClass({
    getInitialState:function(){
        return({
            pageCount:0
        })
    },
    componentDidMount: function(){
        var {dispatch} = this.props;
        dispatch(actions.startFetchClientList())
        clientManagementAPI.getFullClientData().then((CL)=>{
            dispatch(actions.completeFetchClientList(CL.data.result));
            this.setState({
                pageCount:Math.ceil(CL.data.length/15)
            })
        })
        dispatch(actions.updateClientFilterText(""))
    },
    handlePageClick:function(data){
        var {dispatch} = this.props;
        dispatch(actions.startFetchClientList())
        clientManagementAPI.getFullClientData(data.selected * 15).then((CL)=>{
            dispatch(actions.completeFetchClientList(CL.data.result));
            this.setState({
                pageCount:Math.ceil(CL.data.length/15)
            })
        })
    },
    render:function(){
        var {isFetching, clientList} = this.props;

        var renderClientList = ()=>{
            if(!isFetching){
                return clientList.map((client)=>{
                    return(
                        <SingleClient key={client._id} client={client}/>
                    )
                })
            }else{
                return(
                    <div style={style}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }
        }

        return (
            <div style={{textAlign:'center'}}>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
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
