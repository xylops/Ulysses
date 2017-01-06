var React = require('react');
//redux
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//myCompoent
import InvoiceSection from './InvoiceSection'
import Record from './Record'

var main = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('Sort Invoice'))
    },
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
