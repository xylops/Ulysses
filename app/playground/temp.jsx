
productDetail.find({}, function(err, data){
    data.forEach(function(elem){
        var newInventory = new stockLevel();
        newInventory.stockLevel = 0;
        newInventory.save((err, newInventory)=>{
            productDetail.findOneAndUpdate({ProductID:elem.ProductID},{
                $set:{
                    Inventory : newInventory._id
                }
            }, function(err, data){
                // finish push a Inventory ID to PD
                console.log('New Product & inventory Created')
            })
        })
    })
})

<div className="column medium-3" style={style.navBtn}>
    <div style={{...style.animation, opacity:this.state.opacity}}>
        <Paper style={style.paper} zDepth={2} />
    </div>
</div>
