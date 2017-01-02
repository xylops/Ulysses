var React = require('react');
var {connect} = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//myCompoent
import InvoiceSection from './InvoiceSection'

var main = React.createClass({
    handleDrag:function(){
        console.log('drag')
    },
    handleDoubleClick:function(){
        console.log('Double')
    },
    render:function(){
        return (
            <div>
                <br/>
                <div className="row">
                    <div className="column small-12 medium-7">
                        <InvoiceSection/>
                    </div>
                    <div className="column small-12 medium-5">
                        <p>Logistic Section</p>
                        <RaisedButton label="Double or Single Click" onDoubleClick={this.handleDoubleClick} />
                    </div>

                </div>
            </div>

        )
    }
})

export default connect()(main)
