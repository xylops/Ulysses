var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux')
//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
//style
const customContentStyle = {
  width: '60%',
  maxWidth: 'none',
  minHeight:'80%'
};

var purchaseRecord = React.createClass({
    getInitialState:function(){
        return({
            open:false
        })
    },
    handleOpen:function(){
        this.setState({
            open:true
        })
    },
    handleClose:function(){
        this.setState({
            open:false
        })
    },
    render:function(){
        var {purchaseRecord} = this.props
        var renderList = () =>{
            if(purchaseRecord !== undefined){
                return purchaseRecord.map((record)=>{
                    var date = moment(record.date).format('DD/MM/YYYY')
                    return (
                        <RaisedButton className="row" key={record._id} style={{textAlign:'center', marginTop:'5px'}} fullWidth={true}>
                            <div className="column medium-3">
                                {record.invoiceID}
                            </div>
                            <div className="column medium-3">
                                {date}
                            </div>
                            <div className="column medium-3">
                                {record.total}
                            </div>
                            <div className="column medium-3">
                                {record.status}
                            </div>
                        </RaisedButton>
                    )
                })
            }
        }
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return(
            <div>
                <RaisedButton label="Previous Purchase Record" onTouchTap={this.handleOpen} fullWidth={true}/>
                <Dialog
                    title="Previous Purchase Record"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="row" style={{textAlign:'center'}}>
                        <div className="column medium-3">
                            Invoice ID
                        </div>
                        <div className="column medium-3">
                            Date
                        </div>
                        <div className="column medium-3">
                            Total Amount
                        </div>
                        <div className="column medium-3">
                            Current Status
                        </div>
                    </div>
                    <hr/>
                    {renderList()}
                </Dialog>
            </div>
        )
    }
});

export default connect((state)=>{
    return{
        purchaseRecord:state.clientManagement.singleClient.singleClientAttr.purchaseRecord
    }
})(purchaseRecord);
