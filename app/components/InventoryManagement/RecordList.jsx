var React = require('react');
//redux
var {connect} = require('react-redux');
//material ui
import CircularProgress from 'material-ui/CircularProgress';
//mycomponent
import SingleInventoryRecord from './SingleInventoryRecord'

var RecordList = React.createClass({
    render:function(){
        var {IRL, fetching} = this.props
        var renderIRL = () =>{
            if(!fetching){
                if(IRL.length > 0){
                    return IRL.map((record)=>{
                        return(
                            <SingleInventoryRecord key={record._id} record={record}/>
                        )
                    })
                }else{
                    return(
                        <div style={{textAlign:'center', paddingTop:'10%'}}>
                            <p>There are no Record between Starting and Ending Date</p>
                        </div>
                    )
                }
            }else{
                return (
                    <div style={{textAlign:'center', paddingTop:'10%'}}>
                        <CircularProgress size={80} thickness={5} />
                    </div>
                )
            }
        }
        return(
            <div>
                {renderIRL()}
            </div>
        )
    }
})

export default connect((state)=>{
    return{
        fetching: state.inStock. inventoryRecord.isFetching,
        IRL: state.inStock.inventoryRecord.IRL
    }
})(RecordList)
