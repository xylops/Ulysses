var React = require('react');
var moment = require('moment');
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/logisticActions')
//material-ui
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

//my component
import SingleInvoice from './SingleInvoice'
import RecordDetail from './RecordDetail'

var Record = React.createClass({
    handleToggle:function(invoice){
        var {dispatch, NPI} = this.props;
        var temp = []
        NPI.forEach(function(elem){
            temp.push(elem.invoiceID.indexOf(invoice.invoiceID));
        })
        var targetItem = temp.indexOf(0)
        dispatch(actions.toggleNonprocessInvoiceRecordShow(targetItem, 0))
    },
    render:function(){
        var {NPI} = this.props
        let chooseNPI = NPI.filter((record)=>{
            return ( record.show === 1 );
        });
        var renderInvoiceList = () =>{
            return chooseNPI.map((singleInvoice)=>{
                var date = moment(singleInvoice.date).format('DD/MM/YYYY')
                return(
                    <RaisedButton
                        fullWidth={true}
                        style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}
                        onTouchTap={()=>{this.handleToggle(singleInvoice)}}
                        key={singleInvoice._id}
                    >
                        <div className="column small-4">
                            {singleInvoice.invoiceID}
                        </div>
                        <div className="column small-3">
                            {date}
                        </div>
                        <div className="column small-2">
                            {singleInvoice.total}
                        </div>
                        <div className="column small-3">
                            {singleInvoice.client.location}
                        </div>
                    </RaisedButton>
                )
            })
        }
        return(
            <div>
                <RecordDetail/>
                <hr/>
                {renderInvoiceList()}
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        fetching : state.logistic.fetchNonProcessInvoice.isFetching,
        NPI : state.logistic.fetchNonProcessInvoice.NPI,
    }
})(Record);
