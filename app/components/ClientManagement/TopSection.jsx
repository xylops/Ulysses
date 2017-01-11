var React = require('react');
var {connect} = require('react-redux')
var actions = require('../../actions/clientManagementActions')
//material-ui
import TextField from 'material-ui/TextField'
//api
var clientManagementAPI = require('../../api/ClientManagementAPI')
//Component
import CreateNewClient from './CreateNewClient'
//style
const style={
    whole:{
        paddingTop:'15px',
        paddingBottom:'5px'
    },
    textField : {
        margin:0,
    },
    title:{
        textAlign:'left',
        fontWeight:'bold',
        paddingTop:'10px',
        paddingBottom:'20px',
        fontSize:'2.5rem'
    },
}

var TopSection = React.createClass({
    getInitialState:function(){
        return({
            timer:null
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
        this.setState({
            timer : setTimeout(function(){
                dispatch(actions.startFetchClientList())
                clientManagementAPI.filterClient(text, type).then((response)=>{
                    dispatch(actions.completeFetchClientList(response.data.result));
                });
            }, 500)
        })

    },
    render:function(){
        return(
            <div className="row" style={style.whole}>
                <div className="column small-9 medium-3" style={{textAlign:'right'}}>
                    <TextField
                        style={style.textField}
                        hintText="Search Client ID"
                        floatingLabelText="ID"
                        ref="id"
                        onChange={()=>{this.handleChange('id')}}
                    /><br />
                </div>
                <div className="column small-9 medium-3" style={{textAlign:'right'}}>
                    <TextField
                        style={style.textField}
                        hintText="Search Client Name"
                        floatingLabelText="Name"
                        ref="name"
                        onChange={()=>{this.handleChange('name')}}
                    /><br />
                </div>
                <div className="column small-9 medium-3" style={{textAlign:'right'}}>
                    <TextField
                        style={style.textField}
                        hintText="Search Client Phone"
                        floatingLabelText="Phone"
                        ref="phoneNo"
                        onChange={()=>{this.handleChange('phone')}}
                    /><br />
                </div>
                <div className="column small-3 medium-1">
                    <CreateNewClient/>
                </div>
            </div>

        )
    }
})

export default connect()(TopSection)
