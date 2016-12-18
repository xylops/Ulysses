var React = require('react');
//redux
var {connect} = require('react-redux')
///material-ui
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
//style
const style={
    formText:{
        textAlign:'right',
        marginTop:10
    }
}
var InvoiceDetail = React.createClass({
    render:function(){
        return(
            <div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Invoice Number: </h5>
                    </div>
                    <div className="column medium-8">
                        <TextField
                            hintText="Invoice Number will be generate"
                            fullWidth={true}
                        /><br />
                    </div>
                </div>
                <div className="row">
                    <div className="column medium-4" style={{textAlign:'right'}}>
                        <h5 style={style.formText}> Date of Creation </h5>
                    </div>
                    <div className="column medium-8">
                         <DatePicker hintText="Landscape Dialog" mode="landscape" fullWidth={true}/>
                    </div>
                </div>
            </div>
        )
    }
})

export default connect()(InvoiceDetail)
