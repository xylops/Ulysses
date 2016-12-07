var React = require('react')

//Redux
var {connect} = require('react-redux');
var actions = require('../../actions/clientManagementActions');


//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

//Style
const style = {
    dialog:{
        width: '80%',
        maxWidth: 'none',
    },
    dialogBtn:{
        marginTop:'10px',
    }
}

var ClientDetail = React.createClass({

    handleClose:function(){
        var {dispatch} = this.props;
        dispatch(actions.closeSingleClientDialog());
    },

    render:function(){
        var {clientAttr, open} = this.props;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title="Client Detail"
                actions={actions}
                modal={false}
                open={open}
                contentStyle={style.dialog}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <div className="row">
                    <div className="column small-12 medium-8">
                        <TextField
                            id="text-field-default"
                            floatingLabelText="ID"
                            defaultValue={clientAttr.id}
                            disabled={true}
                            fullWidth={true}
                            ref="id"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Name"
                            defaultValue={clientAttr.name}
                            fullWidth={true}
                            ref="name"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Address"
                            fullWidth={true}
                            defaultValue={clientAttr.address}
                            ref="address"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Phone Number"
                            defaultValue={clientAttr.phone}
                            fullWidth={true}
                            ref="phone"
                        /><br/>
                        <TextField
                            id="text-field-default"
                            floatingLabelText="Delievery Time"
                            defaultValue={clientAttr.delieverytime}
                            fullWidth={true}
                            ref="delieverytime"
                        /><br/>
                    </div>
                    <div className="column small-12 medium-4">
                        <b style={{textAlign:'center'}}><h3>Actions</h3></b>
                        <RaisedButton label="Previous Purchase Record" fullWidth={true} style={style.dialogBtn}/>
                        <RaisedButton label="New Purchase" fullWidth={true} style={style.dialogBtn}/>
                        <br/><br/>
                        <RaisedButton label="Edit Client" fullWidth={true} style={style.dialogBtn}/>
                        <RaisedButton label="Delete Client" fullWidth={true} style={style.dialogBtn}/>
                    </div>
                </div>
            </Dialog>
        )
    }
})

export default connect((state)=>{
    return{
        clientAttr : state.clientManagement.singleClient.singleClientAttr,
        open : state.clientManagement.singleClient.open
    }
})(ClientDetail)
