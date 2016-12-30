var React = require('react');
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/invoiceAction');
//api
var invoiceAPI = require('invoiceAPI')
//my components
import SingleInvoiceRecord from './SingleInvoiceRecord'

var InvoiceList = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props
        invoiceAPI.getAllInvoice().then((res)=>{
            dispatch(actions.addInvoiceList(res.data))
        })
    },
    render:function(){
        var {invoiceList} = this.props
        var renderList = () =>{
            return invoiceList.map((record)=>{
                return(
                    <SingleInvoiceRecord key={record._id} record={record}/>
                )
            })
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
                {renderList()}
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        invoiceList: state.invoice.allInvoice
    }
})(InvoiceList)
