var React = require('react');
//redux
var {connect} = require('react-redux');
//my component
import ProductAddBtn from './productAddBtn';
import AdvanceProductAdd from './AdvanceProductAdd';

const style = {
    paper:{
        textAlign:'center'
    },
};

var ISP = React.createClass({
    render:function(){
        return(
            <div className="row" style={style.paper}>
                <AdvanceProductAdd/>
                <br/>

                <ProductAddBtn/>
            </div>

        )
    }
})

module.exports = ISP;
