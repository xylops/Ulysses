var React = require('react');
var {connect} = require('react-redux')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
//myCompoent
import InvoiceSection from './InvoiceSection'
import Record from './Record'

var main = React.createClass({
    render:function(){
        return (
            <div>
                <br/>
                <div className="row">
                    <div className="column small-12 medium-6" >
                        <InvoiceSection/>
                    </div>
                    <div className="column small-12 medium-6">
                        <Record/>
                    </div>

                </div>
            </div>

        )
    }
})

export default connect()(main)
