var React = require('react');
var ReactDOM = require('react-dom');
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/logisticActions');
//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton';

var AdvanceInput = React.createClass({
    getInitialState:function(){
        return ({
            found:false,
            record:undefined
        })
    },
    handleChange:function(){
        var {NPI} = this.props;
        var id = this.refs.invoiceID.value
        let record = NPI.filter((elem)=>{
            return elem.invoiceID.indexOf(id) !== -1;
        });
        if(record.length === 1){
            this.setState({
                found:true,
                record: record
            })
        }else{
            this.setState({
                found:false,
                record:undefined
            })
        }
    },
    handleKeyPress:function(e){
        var {dispatch, NPI} = this.props;
        if (e.key === 'Enter' && this.state.record !== undefined) {
            var id = this.state.record[0].invoiceID;
            var temp = []
            NPI.forEach(function(elem){
                temp.push(elem.invoiceID.indexOf(id));
            })
            var targetItem = temp.indexOf(0)
            dispatch(actions.toggleNonprocessInvoiceRecordShow(targetItem, 1))
            ReactDOM.findDOMNode(this.refs.invoiceID).focus();
            this.refs.invoiceID.value = ''
            this.setState({
                found:false,
                record:undefined
            })
        }
    },
    render:function(){
        var checkIDInput = () =>{
            if(this.state.found){
                return (
                    <FloatingActionButton mini={true}>
                        <i className="material-icons">done</i>
                    </FloatingActionButton>
                )
            }
        }
        return (
            <div className="row" style={{paddingTop:'20px'}}>
                <div className="column small-2">
                    ID:
                </div>
                <div className="column small-8">
                    <input type="text" ref="invoiceID" style={{textAlign:'center', marginBottom:'7px'}} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                </div>
                <div className="column small-2">
                    {checkIDInput()}
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        NPI: state.logistic.fetchNonProcessInvoice.NPI
    }
})(AdvanceInput)
