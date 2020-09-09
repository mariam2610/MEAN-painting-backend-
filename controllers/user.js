const User=require("../models/user");
//const Order=require("../models/order");
const{check,validationResult}=require("express-validator");

var result=[];

exports.signup=(req,res)=>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({error:errors.array()[0].msg});
    }

    const user=new User(req.body)
    
    user.save((err,user)=>
    {
        if(err)
        {
            return res.status(400).json({"Already Registered.":err})
        }
        res.json({
            id: user._id,
            user_fname: user.user_fname,
            user_lname: user.user_lname,
            user_email:user.user_email
        });
    });   
}

exports.signin=(req,res)=>
{
    const{user_email,user_pswd}=req.body;
    User.findOne({user_email},(err,user)=>
    {
        if(err || !user)
        {
            return res.status(400).json({error:"This Email ID doesnt exists"});
        }

        if(!user.authenticate(user_pswd))
        {
            return res.status(400).json({error:"Email and Password do not match"});
        }

        const{_id,user_fname,user_lname,user_email}=user;
        return res.json({ user: { _id, user_fname, user_lname, user_email}});
    });
}

exports.getallusers=(req,res)=>
{
    User.find().exec((err,user)=>
    {
        if(err)
        {
            return res.status(400).json({error:"No Users Found"});
        }

        if(user)
        {
            for(var i=0;i<user.length;i++)
            {
                result.push({
                    ID:user[i]._id,
                    First_Name: user[i].user_fname,
                    Last_Name: user[i].user_lname,
                    Email: user[i].user_email
                });
            }
            //res.json(result);
        }
        res.json(result);
    });
};

exports.getuserbyid=(req,res,next,id)=>
{
    User.findById(id).exec((err,customer)=>
    {
        if(err || !customer)
        {
            return res.status(400).json({error:"User not found"});
        }

        req.user=customer;
        next();
    });
}

exports.getuser=(req,res)=>
{
    req.user.salt=undefined;
    req.user.encry_password=undefined;
    return res.json(req.user);
}

exports.updateuser=(req,res)=>
{
    User.findOneAndUpdate(
        { _id: req.user._id },
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json({error:"You are not authorised to update this user"});
            }
            user.salt=undefined;
            user.encry_password=undefined;
            res.json(user);
        }
    );/*
    const user=req.user;
    user.user_fname=req.body.user_fname;
    user.user_lname = req.body.user_lname;
    user.user_contact = req.body.user_contact;
    user.user_email = req.body.user_email;
    user.user_pswd = req.body.user_pswd;
    user.user_addr = req.body.user_addr;

    user.save((err,updateduser)=>
    {
        if(err)
        {
            return res.status(400).json({error:"Failed to update this user"});
        }
        res.json(this.updateduser);
    });*/
};
/*
exports.getpurchases=(req,res,id)=>
{
    Order.findById(id).populate("user","_id user_name")
    .exec((err,order)=>
    {
        if(err)
        {
            return res.status(400).json({error:"No order placed yet!"});
        }
        return res.json(order);
    });
};

exports.placeorder=(req,res)=>
{
    let purchases=[];
    req.body.order.products.forEach(product => {
        purchases.push
        ({
            _id:product._id,
            name:product.product_name,
            description: product.product_desc,
            category: product.product_category,
            quantity: product.product_quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
        
    });

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => 
        {
            if (err) 
            {
                return res.status(400).json({error: "Unable to save purchase list"});
            }
            next();
        });
};

*/
exports.removeuser=(req,res)=>
{
    const user=req.user;

    user.remove((err,user)=>
    {
        if(err)
        {
            return res.status(400).json({error:"Failed to delete this user"});
        }
        res.json({message:"Successfully Deleted : ",user:user});
    });
};
