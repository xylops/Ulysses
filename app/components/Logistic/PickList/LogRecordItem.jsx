var React = require('react');
//react-redux
var {connect}= require('react-redux');
var actions = require('../../../actions/pickListActions');
//material-ui
import RaisedButton from 'material-ui/RaisedButton';

var LogRecordItem =React.createClass({
    getInitialState:function(){
        return({
            on:false
        })
    },
    handleClick:function(){
        this.setState({
            on:true
        })
    },
    render:function(){
        var {item} = this.props;
        return(
            <RaisedButton
                fullWidth={true}
                style={{maxHeight:'36px', martinTop:'5px', textAlign:'center'}}
                disabled={this.state.on}
            >
                <div className="column small-3">
                    {item.ProductID}
                </div>
                <div className="column small-6">
                    {item.ProductName}
                </div>
                <div className="column small-3">
                    {item.quantity}
                </div>
            </RaisedButton>
        )
    }
})

export default connect()(LogRecordItem)
