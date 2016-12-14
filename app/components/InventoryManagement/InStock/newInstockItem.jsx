var React = require('react')
var {connect} = require('react-redux');
var actions = require('../../../actions/inStockAction')

//material-ui
import TextField from 'material-ui/TextField';

//style
const style={
    main:{
        padding:'10px 0px',
        textAlign:'center'
    },
}

var newInstockItem = React.createClass({
    handleEdit:function(item){
        console.log('Edit ' + item.name)
    },
    handleRemove:function(item){
        var {dispatch , newStockList} = this.props
        var temp = []
        newStockList.forEach(function(elem){
            temp.push(elem.id.indexOf(item.id));
        })
        var targetItem = temp.indexOf(0)
        dispatch(actions.removeNewItemFromNewList(targetItem))
    },
    render:function(){
        var {item, newStockList} = this.props
        return(
             <div style={style.main}>
                <div className="row">
                    <div className="column small-6">
                        {item.name}
                    </div>
                    <div className="column small-4" style={{textAlign:'center'}}>
                        {item.amount}
                    </div>
                    <div className="column small-2" onClick={()=>{
                            this.handleRemove(item)
                        }}>
                        <i className="material-icons" >delete</i>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        newStockList : state.InStock.newInStockList.newEntry
    }
})(newInstockItem)
