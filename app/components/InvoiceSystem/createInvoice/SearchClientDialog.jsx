var React = require('react');
//Redux
var {connect} = require('react-redux');
var actions = require('../../../actions/invoiceAction');
var clientActions = require('../../../actions/clientManagementActions')

//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
//API
var invoiceAPI = require('../../../api/invoiceAPI')
var clientManagementAPI = require('../../../api/ClientManagementAPI')

//style
const style = {
    paper:{
        width: '100%',
        padding: 20,
        border:'2px solid green',
        borderRadius:'10px'
    }
};

var SearchClientDialog = React.createClass({
    getInitialState:function(){
        return{
            client:undefined,
            submit: true,
            timer:null
        }
    },
    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeDialog())
        this.setState({
            client:undefined,
            submit:true
        })
    },
    handleChange:function(type){
        var {dispatch} = this.props;
        this.setState({
            timer:clearTimeout(this.state.timer)
        })
        switch(type){
            case 'id':
                var text = this.refs.id.getValue();
                break;
            case 'name':
                var text = this.refs.name.getValue();
                break;
            case 'phone':
                var text = this.refs.phoneNo.getValue();
                break;
        }
        
        var that = this
        this.setState({
            timer : setTimeout(function(){
                clientManagementAPI.filterClient(text, type).then((response)=>{
                    if(response.data.result.length === 1){
                        that.setState({
                           client: response.data.result[0],
                           submit: false
                        })
                    }else{
                        that.setState({
                            client: undefined,
                            submit: true
                        })
                    }
                });
            }, 500)
        })
    },
    handleSave:function(){
        var {dispatch} = this.props;
        dispatch(actions.addInvoiceClient(this.state.client))
        this.setState({
            client: undefined,
            submit: true
        })
        dispatch(actions.closeDialog())
    },
    render:function(){
        var {dialog} = this.props
        console.log(this.state.client)

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave}
                disabled={this.state.submit}
            />,
        ];
        var renderClient = () =>{
            if(this.state.client !== undefined){
                return (
                    <div style={style.paper}>
                        <div className="row">
                            <div className="column small-4">
                                Name:
                            </div>
                            <div className="column small-8">
                                {this.state.client.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column small-4">
                                Client ID:
                            </div>
                            <div className="column small-8">
                                {this.state.client.id}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column small-4">
                                Phone:
                            </div>
                            <div className="column small-8">
                                {this.state.client.phone}
                            </div>
                        </div>
                        <div className="row">
                            <div className="column small-4">
                                Address:
                            </div>
                            <div className="column small-8">
                                {this.state.client.address}
                            </div>
                        </div>
                    </div>

                )
            }
        }

        return (
            <Dialog
                title="Client Search"
                actions={actions}
                modal={false}
                open={dialog}
                onRequestClose={this.handleClose}
            >
                <div className="row">
                    <div className="column small-5">
                        <span>Search By :</span>
                        <TextField
                            style={style.textField}
                            hintText="Search Client ID"
                            floatingLabelText="ID"
                            ref="id"
                            onChange={()=>{this.handleChange('id')}}
                        /><br />
                        <TextField
                            style={style.textField}
                            hintText="Search Client Name"
                            floatingLabelText="Name"
                            ref="name"
                            onChange={()=>{this.handleChange('name')}}
                        /><br />
                        <TextField
                            style={style.textField}
                            hintText="Search Client Phone"
                            floatingLabelText="Phone"
                            ref="phoneNo"
                            onChange={()=>{this.handleChange('phone')}}
                        /><br />
                    </div>
                    <div className="column small-7">
                        {renderClient()}
                    </div>
                </div>

            </Dialog>
        )
    }
})

export default connect((state)=>{
    return {
        dialog: state.invoice.searchClientDialog.dialog,
        clientList : state.clientManagement.clientData.clientList
    }
})(SearchClientDialog)
