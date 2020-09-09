const mongoose=require("mongoose")
const Order=require("../models/order");
const ProductCart = require("../models/order");
const User=require("../models/user");

exports.getuserbyId = (req, res, next, id) => {
    User.findById(id).exec((err, customer) => {
        if (err || !customer) {
            return res.status(400).json({ error: "User not found",err });
        }

        req.user = customer;
        next();
    });
}

exports.getorderbyoid = (req, res, id, next) => {
    var user_id = mongoose.Types.ObjectId(id);

    User.find({ User: user_id }).populate("User").exec((err, order) => {
        if (err) {
            return res.status(400).json({ error: "No order placed yet!" });
        }
        req.order = order;
        next();
    });
};

//Campground.findById(new mongoose.Types.ObjectId(camp_Id), function(err,camp){



exports.getpurchases = (req, res, id,next) => {
    
    //Order.findById(id).populate("user")
    var user_id=mongoose.Types.ObjectId(id);

    Order.find({user:user_id}).populate("User").exec((err, order) => {
            if (err) {
                return res.status(400).json({ error: "No order placed yet!" });
            }
            req.order=order;
            next();
            //return res.json(order);
        });
};

exports.placeorder = (req, res) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push
            ({
                _id: product._id,
                name: product.product_name,
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
        (err, purchases) => {
            if (err) {
                return res.status(400).json({ error: "Unable to save purchase list" });
            }
            next();
        });
};

