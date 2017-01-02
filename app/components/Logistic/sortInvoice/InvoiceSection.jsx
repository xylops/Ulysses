var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/logisticActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
//api
var logisticAPI = require('LogisticAPI')
//myCompoent
import Location from '../../ClientManagement/Location'
import SingleInvoice from './SingleInvoice'
//myStyle
const style = {
    textAlign:'center',
    paddingTop: 'calc(20%)'
}

var InvoicSection = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props
        dispatch(actions.startNonProcessInvoice())
        logisticAPI.getNonProcessInvoice().then((res)=>{
            dispatch(actions.completeNonProcessInvoice(res.data))
        });
    },
    getInitialState:function(){
        return ({
            location:'N/A'
        })
    },
    handleLocationChange:function(locationC){
        this.setState({
            location:locationC
        })
    },
    render:function(){
        var {NPI, fetching, dialogOpen} = this.props
        if(this.state.location === 'N/A'){
            var filter = ''
        } else{
            var filter = this.state.location
        }
        let filterNPI = NPI.filter((record)=>{
            return (record.client.location.indexOf(filter) !== -1);
        });
        if(dialogOpen){
            var text = '11111'
        }else{
            var text = '22222'
        }
        var renderInvoice = () =>{
            if(fetching){
                return (
                    <div style={style}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }else{
                return filterNPI.map((singleInvoice)=>{
                    return(
                        <SingleInvoice key={singleInvoice._id} invoice={singleInvoice}/>
                    )
                })
            }
        }
        return (
            <div>
                <div className="row">
                    <div className="column small-6 medium-2">
                        <h5>Area :</h5>
                    </div>
                    <div className="column small-6 medium-8">
                        <Location handleLocationChange={this.handleLocationChange} location={this.state.location}/>
                    </div>
                    <div className="column small-6 medium-2">
                        <FlatButton  label="X" secondary={true} onTouchTap={()=>{
                            this.setState({
                                location:'N/A'
                            })
                        }}/>
                    </div>
                </div>
                <hr/>
                <div>
                    {renderInvoice()}
                    {text}
                </div>
            </div>

        )
    }
})

export default connect((state)=>{
    return{
        fetching : state.logistic.fetchNonProcessInvoice.isFetching,
        NPI : state.logistic.fetchNonProcessInvoice.NPI,
        dialogOpen : state.logistic.singleInvoiceDialog.open

    }
})(InvoicSection)
