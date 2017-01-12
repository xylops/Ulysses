var React = require('react');
var moment = require('moment')
// react-redux
var {connect} = require('react-redux');
//style
const style={
    in:{
        textAlign:'center',
        marginTop:'5px',
        background:'#85de89'
    },
    de:{
        textAlign:'center',
        marginTop:'5px',
        background:'#d0ae7d'
    }
}
var SingeleInventoryRecord = React.createClass({
    render:function(){
        var {record} = this.props;
        var inde = () => {
            if(record.StockLevelChanges > 0){
                return(style.in)
            }else{
                return (style.de)
            }
        }
        return(
            <div className="row" style={inde()}>
                <div className="column medium-2">
                    {record.Date}
                </div>
                <div className="column medium-2">
                    {record.ProductID}
                </div>
                <div className="column medium-4">
                    {record.ProductName}
                </div>
                <div className="column medium-2">
                    {record.StockLevelChanges}
                </div>
            </div>
        )
    }
})

export default connect()(SingeleInventoryRecord);
