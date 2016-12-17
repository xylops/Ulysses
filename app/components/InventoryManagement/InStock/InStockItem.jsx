var React = require('react')
//Redux
var {connect} = require('react-redux');
var actions = require('../../../actions/inStockAction')
//material-ui
import TextField from 'material-ui/TextField';
//API
var InventoryManagementAPI = require('InventoryManagementAPI')
//style
const style={
    main:{
        padding:'10px 0px',
        textAlign:'center'
    },
    input:{
        height:'25px',
        margin:0,
        textAlign:'center'
    }
}

var newInstockItem = React.createClass({
    handleEdit:function(e){
        var {item, newStockList, dispatch} = this.props
        var temp = []
        newStockList.forEach(function(elem){
            temp.push(elem.id.indexOf(item.id));
        })
        var targetItem = temp.indexOf(0)
        dispatch(actions.editNewItemFromNewList(targetItem, e.target.value))
    },
    handleRemove:function(item){
        var {dispatch , newStockList, date} = this.props
        var temp = []
        newStockList.forEach(function(elem){
            temp.push(elem.id.indexOf(item.id));
        })
        var targetItem = temp.indexOf(0)
        InventoryManagementAPI.deleteInventoryRecord(item.id, date, item.inventory)
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
                        <input type="number" defaultValue={item.amount} onChange={this.handleEdit} style={style.input}/>
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
        newStockList : state.InStock.newInStockList.newEntry,
        date : state.InStock.newInStockList.date

    }
})(newInstockItem)
