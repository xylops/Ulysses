var React = require('react');
var {Link} = require('react-router');
//Redux
var {connect}  = require('react-redux')
var actions = require('../../actions/invoiceAction');
//material-ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//api
var invoiceAPI = require('invoiceAPI')

var TopSection = React.createClass({
    getInitialState:function(){
        return({
            timer:null
        })
    },
    handleChange:function(){
        var {dispatch} = this.props
        this.setState({
            timer:clearTimeout(this.state.timer)
        })
        var text = this.refs.id.getValue();
        this.setState({
            timer : setTimeout(function(){
                invoiceAPI.filterInvoice(text).then((response)=>{
                    dispatch(actions.addInvoiceList(response.data.result))
                });
            }, 500)
        })
    },
    render:function(){
        return (
            <div className="row">
                <br/>
                <div className="column small-12 medium-8">
                    <TextField
                      hintText="Search Invoice"
                      fullWidth={true}
                      ref="id"
                      onChange={this.handleChange}
                    /><br />
                </div>
                <div className="column small-12 medium-4">
                    <Link to="IS"><RaisedButton label="Create New Invoice" fullWidth={true}/></Link>
                </div>
            </div>
        )
    }
})

export default connect()(TopSection)
