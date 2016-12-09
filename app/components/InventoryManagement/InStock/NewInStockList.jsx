var React = require('react')
var {connect} = require('react-redux')

//material-ui

var NewInStockList = React.createClass({
    render:function(){
        return(
            <div>
                New In Stock List
            </div>

        )
    }
})

export default connect()(NewInStockList)
