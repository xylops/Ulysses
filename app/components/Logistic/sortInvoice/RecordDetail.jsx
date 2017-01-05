var React = require('react');
var moment = require('moment')
//redux
var {connect} = require('react-redux');
var actions = require('../../../actions/logisticActions')
var snackBarActions = require('../../../actions/snackBarActions')

//material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//api
var logisticAPI = require('LogisticAPI')

var RecordDetail = React.createClass({
    getInitialState:function(){
        return({
            lorry:[],
            open: false
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
        })
    },
    handleChange:function(event, index, value){
        var {dispatch} = this.props;
        dispatch(actions.addNewLogisticPlate(value))
    },
    handleClose:function(){
        this.setState({
            open:false
        })
    },
    preSave:function(){
        var {record} = this.props
        if(record.licencePlate !== ""){
            this.setState({
                open:true
            })
        }else{
            alert('Missing LicencePlate')
        }
    },
    handleSave:function(){
        var {record, NPI, dispatch} = this.props;
        var tempArray = []
        NPI.forEach((invoice)=>{
            if(invoice.show === 1){
                tempArray.push(invoice._id)
            }
        })
        var tempObject = {
            logisticID: record.logisticID,
            date: record.date,
            licencePlate: record.licencePlate,
            invoice:tempArray
        }
        logisticAPI.createNewLogistic(tempObject).then((res)=>{
            var resText = res.data.message;
            dispatch(snackBarActions.openSnackBar(resText));
            this.setState({
                open:false
            })
            //after clearing the list, and refetch lorry plate
            dispatch(actions.clearNewLogistic());
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
            })
            //refetch invoice list
            dispatch(actions.startNonProcessInvoice())
            logisticAPI.getNonProcessInvoice().then((res)=>{
                var tempArray = []
                res.data.forEach((record)=>{
                    record = {
                        ...record, show: 0
                    }
                    tempArray.push(record)
                })
                dispatch(actions.completeNonProcessInvoice(tempArray))
            });
        })
    },
    render:function(){
        var {record, NPI} = this.props
        var date = moment().format('DD/MM/YYYY');
        var renderPlate = () =>{
            return this.state.lorry.map((plate)=>{
                return (
                    <MenuItem key={plate._id} value={plate.plate} primaryText={plate.plate} />
                )
            })
        }
        var {NPI} = this.props
        let chooseNPI = NPI.filter((record)=>{
            return ( record.show === 1 );
        });
        var renderChoosenList = () =>{
            return chooseNPI.map((singleInvoice)=>{
                var date = moment(singleInvoice.date).format('DD/MM/YYYY')
                return(
                    <div className="row" key={singleInvoice.invoiceID}>
                        <div className="column small-4">
                            {singleInvoice.invoiceID}
                        </div>
                        <div className="column small-3">
                            {date}
                        </div>
                        <div className="column small-2">
                            {singleInvoice.total}
                        </div>
                        <div className="column small-3">
                            {singleInvoice.client.location}
                        </div>
                    </div>
                )
            })
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
                keyboardFocused={true}
                onTouchTap={this.handleSave}
            />,
        ];
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
                    <FloatingActionButton onTouchTap={this.preSave}>
                        <i className="material-icons">archive</i>
                    </FloatingActionButton>
                </div>
                <Dialog
                    title="Confirm Dialog"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <p style={{textAlign:'center', color:'red'}}>WARNING! Once the file is submit it could not be changed</p><br/>
                    <div className="row">
                        <div className="column small-5">
                            Date:
                        </div>
                        <div className="column small-7">
                            {date}
                        </div>
                        <div className="column small-5" >
                            license plate
                        </div>
                        <div className="column small-7" >
                            {record.licencePlate}
                        </div>
                        <div className="column small-5">
                            Logistic ID
                        </div>
                        <div className="column small-7">
                            {record.logisticID}
                        </div>
                    </div>
                    <hr/>
                    {renderChoosenList()}
                </Dialog>
            </div>
        )
    }
})

export default connect((state)=>{
    return {
        record: state.logistic.createLogesticRecord,
        NPI: state.logistic.fetchNonProcessInvoice.NPI
    }
})(RecordDetail);
