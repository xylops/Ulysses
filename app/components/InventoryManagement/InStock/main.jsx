var React = require('react')
var {connect} = require('react-redux')
var actions = require('../../../actions/mainActions')
//material-ui
import TopSection from './TopSection'
import OwnBrandList from './OwnBrandList';
import NewInStockList from './NewInStockList'

var InStock = React.createClass({
    componentWillMount:function(){
        var {dispatch} = this.props;
        dispatch(actions.changingNavBarText('InStock Section'))
    },
    render:function(){
        return(
            <div>
                <br/>
                <div className="row">
                    <div className="column small-12 medium-6">
                        <NewInStockList/>
                    </div>
                    <div className="column small-12 medium-6">
                        <OwnBrandList/>
                    </div>
                </div>
            </div>

        )
    }
})

export default connect()(InStock)
