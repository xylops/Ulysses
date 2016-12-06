var React = require('react')
var {connect} = require('react-redux');
var actions = require('../../actions/productDetailActions');


//material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField'

//api
var productDetailAPI = require('../../api/productDetailAPI')

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};


var  CreateNewProduct = React.createClass({
    getInitialState:function(){
        return {
            reConfirm:false
        }
    },
    toggleDialog:function(){
        var {dispatch} = this.props;
        dispatch(actions.toggleCreateNewDialog())
    },
    handleSave : function(){
        var {dispatch} = this.props;
        var ProductID = this.refs.PID.getValue()
        var ProductName = this.refs.PName.getValue()
        var Spec = this.refs.PSpec.getValue()
        var Price = this.refs.PPrice.getValue()
        var Unit = this.refs.PUnit.getValue()


            var newProduct = [
                ProductID,
                ProductName,
                Spec,
                Price,
                Unit
            ]
            productDetailAPI.createNewProduct(newProduct).then(()=>{
                dispatch(actions.startFetchPDL())
                productDetailAPI.getFullProductData().then((PDL)=>{
                    dispatch(actions.completeFetchPDL(PDL.data));
                    dispatch(actions.toggleCreateNewDialog())
                    this.setState({
                        reConfirm:false
                    })
                })
            });

    },
    handleClose:function(){
        this.setState({
            reConfirm:false
        })
    },
    render:function(){
        //Redux function
        var {createNewDialog} = this.props;

        const newProduct = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.toggleDialog}
            />,
            <FlatButton
                label="Save"
                primary={true}
                onTouchTap={()=>{
                    if(this.refs.PID.getValue() > 0 && this.refs.PName.getValue() > 0){
                        this.setState({
                            reConfirm:true
                        })
                    }
                }}
            />,
        ];

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                onTouchTap={this.handleSave}
            />,
        ];

        return (
            <div>
                <FloatingActionButton onTouchTap={this.toggleDialog}>
                    <ContentAdd/>
                </FloatingActionButton>
                <Dialog
                    title="Create New Product"
                    actions={newProduct}
                    modal={false}
                    open= {createNewDialog}
                    onRequestClose={this.toggleDialog}
                    >
                    <div className="text-center">
                        <TextField
                            floatingLabelText="Product ID"
                            ref="PID"
                        /><br/>
                        <TextField
                            floatingLabelText="Product Name"
                            ref="PName"
                        /><br/>
                        <TextField
                            floatingLabelText="Spec"
                            ref='PSpec'
                        /><br/>
                        <TextField
                            floatingLabelText="Price"
                            ref='PPrice'
                        /><br/>
                        <TextField
                            floatingLabelText="Unit"
                            ref="PUnit"
                        /><br/><br/>
                    </div>
                </Dialog>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.reConfirm}
                  contentStyle={customContentStyle}
                  onRequestClose={this.handleClose}
                >
                  Confirm creating a new product to database?
                </Dialog>
            </div>

        )
    }
})

export default connect((state)=>{
    return {
        createNewDialog: state.productDetailCombiner.createNewDialog
    }
})(CreateNewProduct);
