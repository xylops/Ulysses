var React = require('react');


const style = {
    paper:{

        textAlign:'center'
    },
};

var ISP = React.createClass({
    render:function(){
        return(
            <div className="row" style={style.paper}>
                <div className="column medium-1">ItemCode</div>
                <div className="column medium-5">Item Name (Description)</div>
                <div className="column medium-1">Quantity</div>
                <div className="column medium-2">Unit Price</div>
                <div className="column medium-1">Discount</div>
                <div className="column medium-2">Amount</div>
            </div>

        )
    }
})

module.exports = ISP;
