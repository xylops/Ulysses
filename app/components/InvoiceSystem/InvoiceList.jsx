var React = require('react');
import ReactPaginate from 'react-paginate';
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/invoiceAction');
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
//api
var invoiceAPI = require('invoiceAPI')
//my components
import SingleInvoiceRecord from './SingleInvoiceRecord'

var InvoiceList = React.createClass({
    getInitialState:function(){
        return({
            pageCount:0,
            fetching: false
        })
    },
    componentWillMount:function(){
        var {dispatch} = this.props
        this.setState({
            fetching:true
        })
        invoiceAPI.getInvoice().then((res)=>{
            dispatch(actions.addInvoiceList(res.data.result))
            this.setState({
                pageCount: Math.ceil(res.data.length/15),
                fetching:false
            })
        })
    },
    handlePageClick:function(data){
        var {dispatch} = this.props;
        this.setState({
            fetching:true
        })
        invoiceAPI.getInvoice(data.selected * 15).then((res)=>{
            dispatch(actions.addInvoiceList(res.data.result))
            this.setState({
                pageCount:Math.ceil(res.data.length/15),
                fetching:false
            })
        })
    },
    render:function(){
        var {invoiceList} = this.props
        var renderList = () =>{
            if(this.state.fetching){
                return (
                    <div style={{textAlign:'center', paddingTop:'10%'}}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }else{
                return invoiceList.map((record)=>{
                    return(
                        <SingleInvoiceRecord key={record._id} record={record}/>
                    )
                })
            }
        }
        return (
            <div>
                <br/>
                <div className="row" style={{textAlign:'center'}}>
                    <div className="column medium-2">
                        Invoice ID
                    </div>
                    <div className="column medium-2">
                        Date
                    </div>
                    <div className="column medium-1">
                        Amount
                    </div>
                    <div className="column medium-2">
                        Area
                    </div>
                    <div className="column medium-4">
                        Address
                    </div>
                    <div className="column medium-1">
                        Status
                    </div>
                </div>
                <hr/>
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
                    {renderList()}

                </div>

            </div>
        )
    }
})

export default connect((state)=>{
    return{
        invoiceList: state.invoice.allInvoice
    }
})(InvoiceList)
