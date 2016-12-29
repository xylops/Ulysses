var React = require('react');
//Redux
var {connect} = require('react-redux');
var actions = require('../../../actions/invoiceAction');
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
//API
var invoiceAPI = require('../../../api/invoiceAPI')
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
            submit: true
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
    handleChange:function(){
        var {clientList} =this.props
        var name = this.refs.name.getValue();
        var id = this.refs.id.getValue();
        var phone = this.refs.phone.getValue();

        if(name !== ""){
            var filteredClientList = clientList.filter((client)=>{
                return client.name.indexOf(name) !== -1;
            });
        }else if(id !== ""){
            var filteredClientList = clientList.filter((client)=>{
                return client.id.indexOf(id) !== -1;
            });
        }else{
            var filteredClientList = clientList.filter((client)=>{
                return client.phone.indexOf(phone) !== -1;
            });
        }

        if(filteredClientList.length === 1){
            this.setState({
                client: filteredClientList[0],
                submit: false
            })
        }else{
            this.setState({
                client: undefined,
                submit: true
            })
        }
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
                            hintText="Client Name"
                            floatingLabelText="Client Name"
                            fullWidth={true}
                            onChange={this.handleChange}
                            ref="name"
                        /><br />
                        <TextField
                            hintText="Client ID"
                            floatingLabelText="Client ID"
                            fullWidth={true}
                            onChange={this.handleChange}
                            ref='id'
                        /><br />
                        <TextField
                            hintText="Phone Number"
                            floatingLabelText="Phone Number"
                            fullWidth={true}
                            onChange={this.handleChange}
                            ref='phone'
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
