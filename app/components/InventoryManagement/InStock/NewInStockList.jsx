var React = require('react')
var {connect} = require('react-redux')

//material-ui
import DatePicker from 'material-ui/DatePicker';

var NewInStockList = React.createClass({
    render:function(){
        return(
            <div>
                <h5 style={{textAlign:'center'}}>New In Stock List</h5>
                <DatePicker hintText="Date" mode="landscape" />
            </div>

        )
    }
})

export default connect()(NewInStockList)
