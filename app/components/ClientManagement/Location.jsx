var React = require('react')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

var Location = React.createClass({
    getInitialState:function(){
        return({
            open:false
        })
    },
    handleOpen:function(){
        this.setState({open: true});
    },
    handleClose:function(){
        this.setState({open: false});
    },
    handleChange:function(location){
        this.props.handleLocationChange(location)
        this.setState({open: false});
    },
    render:function(){
        var {location} = this.props
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
            onTouchTap={this.handleClose}
          />,
        ];
        return (
            <div>
                <RaisedButton label={location} onTouchTap={this.handleOpen} fullWidth={true}/>
                <Dialog
                    title="地區"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="row">
                        <p>港島區</p>
                        <hr />
                        <div className="column small-4">
                            <FlatButton label="中西區" onTouchTap={()=>{this.handleChange('中西區')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="灣仔區" onTouchTap={()=>{this.handleChange('灣仔區')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="東區" onTouchTap={()=>{this.handleChange('東區')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="南區" onTouchTap={()=>{this.handleChange('南區')}}/>
                        </div>
                        <div className="column small-4">
                        </div>
                        <div className="column small-4">
                        </div>
                    </div><br/>
                    <div className="row">
                        <p>九龍區</p>
                        <hr />
                        <div className="column small-4">
                            <FlatButton label="九龍城 " onTouchTap={()=>{this.handleChange('九龍城')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="觀塘" onTouchTap={()=>{this.handleChange('觀塘')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="深水埗 " onTouchTap={()=>{this.handleChange('深水埗')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="黃大仙 " onTouchTap={()=>{this.handleChange('黃大仙')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="油尖旺 " onTouchTap={()=>{this.handleChange('油尖旺')}}/>
                        </div>
                        <div className="column small-4">
                        </div>
                    </div><br/>
                    <div className="row">
                        <p>新界區</p>
                        <hr />
                        <div className="column small-4">
                            <FlatButton label="屯門" onTouchTap={()=>{this.handleChange('屯門')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="屯門" onTouchTap={()=>{this.handleChange('屯門')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="元朗" onTouchTap={()=>{this.handleChange('元朗')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="北區" onTouchTap={()=>{this.handleChange('北區')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="西貢 " onTouchTap={()=>{this.handleChange('西貢')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="沙田" onTouchTap={()=>{this.handleChange('沙田')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="荃灣" onTouchTap={()=>{this.handleChange('荃灣')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="葵青" onTouchTap={()=>{this.handleChange('葵青')}}/>
                        </div>
                        <div className="column small-4">
                            <FlatButton label="離島" onTouchTap={()=>{this.handleChange('離島')}}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
})

module.exports = Location
