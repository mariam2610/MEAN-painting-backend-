const {Order}=require("../models/order");

exports.createorder=(req,res)=>
{
    const order = new Order(req.body);
    
    order.save((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({error:"Failed to save your order in DB"});
        }
        res.json(order);
    });
};

exports.getorderbyid=(req,res,next,id)=>
{
    Order.findById(id).exec((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({error:"No ooopppsss  order found in DB",err});
        }
        req.order=order;
        next();
    });
};

exports.getorder=(req,res)=>
{
    return res.json(req.order);
};

exports.getallorders=(req,res)=>
{
    result=[];
    Order.find().exec((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({error:"No orders Found"});
        }

        if(order)
        {
            for(var i=0;i<order.length;i++)
            {
                result.push({
                    ID : order[i]._id,
                    Products: order[i].products,
                    Amount: order[i].amount,
                    User: order[i].user
                });
            }
        }
        res.json(result);
    });
};

exports.updateorder=(req,res)=>
{
    const order=req.order;

    order.products=req.body.products;
    order.amount=req.body.amount;
    order.user=req.body.user;
    order.address=req.body.address;

    order.save((err,updatedorder)=>
    {
        if(err)
        {
            return res.status(400).json({error:"Failed to update this order"});
        }
        res.json(updatedorder);
    });
};

exports.removeorder=(req,res)=>
{
    const order=req.order;

    order.remove((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({error:"Failed to delete this order"});
        }
        res.json({message:"Successfully Deleted : ",order:order});
    });
};