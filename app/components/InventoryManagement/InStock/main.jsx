var React = require('react')
var {connect} = require('react-redux')

//material-ui
import TopSection from './TopSection'

var InStock = React.createClass({
    render:function(){
        return(
            <TopSection/>
        )
    }
})

export default connect()(InStock)
