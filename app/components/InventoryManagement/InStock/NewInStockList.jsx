var React = require('react')
var {connect} = require('react-redux')

//material-ui
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';

//my component
import NewInstockItem from './newInstockItem'
import RaisedButton from 'material-ui/RaisedButton';
//style
const style = {
    paper:{
        width:'calc(100%)',
        paddingTop:'40px'
    }
}

var NewInStockList = React.createClass({
    render:function(){
        var {dispatch, newStockList} = this.props
        var renderList = () =>{
            if(newStockList.length > 0){
                return newStockList.map((item)=>{
                    return(
                        <NewInstockItem key={item.id} item={item}/>
                    )
                })
            }
        }

        return(
            <div>
                <div className="row">
                    <div className="column small-6 medium-8">
                        <DatePicker hintText="Date" mode="landscape" /><br/>
                    </div>
                    <div className="column small-6 medium-4">
                        <RaisedButton label="SUBMIT" primary={true}/>
                    </div>
                </div>
                <Paper style={style} zDepth={2}>
                    {renderList()}
                </Paper>

            </div>

        )
    }
})

export default connect((state)=>{
    return {
        newStockList : state.InStock.newInStockList.newEntry
    }
})(NewInStockList)
