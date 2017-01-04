var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/logisticActions')
//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//api
var logisticAPI = require('LogisticAPI')

var RecordDetail = React.createClass({
    getInitialState:function(){
        return({
            lorry:[]
        })
    },
    componentWillMount:function(){
        var {dispatch} = this.props
        var date = moment().format('DDMMYY');
        logisticAPI.checkLogisticPerDay(date).then((response)=>{
            var numberOfLogistic = response.data.numberOfLogistic;
            console.log(numberOfLogistic)
            if(numberOfLogistic < 10){
                var logisticID = date + '00' + Number(numberOfLogistic+1)
            }else if (numberOfLogestic < 100 && numberOfLogestic > 9){
                var logisticID = date + '0' + Number(numberOfLogistic+1)
            }else{
                var logisticID = date + Number(numberOfLogistic+1)
            }
            dispatch(actions.addNewLogisticIDDate(date, logisticID))
        })
        logisticAPI.getLicencePlate().then((response)=>{
            this.setState({
                lorry:response.data
            })
            console.log(this.state.lorry)
        })
    },
    handleChange:function(event, index, value){
        var {dispatch} = this.props;
        dispatch(actions.addNewLogisticPlate(value))
    },
    render:function(){
        var {record} = this.props
        var date = moment().format('DD/MM/YYYY');
        var renderPlate = () =>{
            return this.state.lorry.map((plate)=>{
                return (
                    <MenuItem key={plate._id} value={plate.plate} primaryText={plate.plate} />
                )
            })
        }
        return(
            <div className="row">
                <div className="column small-9">
                    <div className="column small-5">
                        Date:
                    </div>
                    <div className="column small-7">
                        {date}
                    </div>
                    <div className="column small-5" style={{marginTop:'10px'}}>
                        license plate
                    </div>
                    <div className="column small-7" style={{lineHeight:0}}>
                        <SelectField
                            value={record.licencePlate}
                            onChange={this.handleChange}
                        >
                            {renderPlate()}
                        </SelectField>
                    </div>
                    <div className="column small-5">
                        Logistic ID
                    </div>
                    <div className="column small-7">
                        {record.logisticID}
                    </div>
                </div>
                <div className="column small-3" style={{textAlign:'right'}}>
                    <FloatingActionButton>
                        <i className="material-icons">archive</i>
                    </FloatingActionButton>
                </div>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        record: state.logistic.createLogesticRecord
    }
})(RecordDetail);
