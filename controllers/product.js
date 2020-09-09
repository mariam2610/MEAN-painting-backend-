const Product=require("../models/product")
const Category=require("../models/category")
const mongoose=require("mongoose")

exports.createproduct=(req,res)=>
{
        const product=new Product(req.body);
        
        product.productImagePath=req.file.path;

        product.save((err,prod)=>{
                if(err)
                {
                        if(err.code===11000 || err.code===11001)
                        {
                                return res.status(400).json({error:"Duplicate Value; "});
                        }
                        else
                        {
                                return res.status(400).json({error:"Failed to save product",err});
                        }
                }
                res.json({prod});
        });
};

exports.getallproducts=(req,res)=>
{
        Product.find().exec((err,products)=>{
                if(err)
                {
                        return res.status(400).json({error:"No Products Found"});
                }
                res.json(products);
        });
};

exports.getproductbyid = (req, res, next, id) => {
        Product.findById(id)
                .populate("product_artist")
                .exec((err, product) => {
                        if (err) {
                                return res.status(400).json({
                                        error: "Product not found"
                                });
                        }
                        req.product = product;
                        next();
                });
};

exports.getproduct = (req, res) => 
{
        req.product.photo = undefined;
        return res.json(req.product);
};

exports.updateproduct = (req, res) => {

        const product = req.product;

        product.product_name = req.body.product_name;
        product.product_desc = req.body.product_desc;
        product.product_price = req.body.product_price;
        product.product_category = req.body.product_category;
        product.product_stock = req.body.product_stock;
        product.product_sold = req.body.product_sold;
        product.product_surface=req.body.product_surface;
        product.product_medium=req.body.product_medium;
        product.product_artist = req.body.product_artist;

        //product.productImage = req.body.files;
        //product.productImagePath = req.file;
        product.productImagePath = req.body.file;
        product.save((err, updatedproduct) => {
        if (err) 
        {
            return res.status(400).json({
                error: "Failed to update product",
                error:err
            });
        }
        res.json(updatedproduct);
    });
};

exports.removeproduct = (req, res) => {
        const product = req.product;

        product.remove((err, product) => {
                if (err) {
                        return res.status(400).json({
                                error: "Failed to delete this product"
                        });
                }
                res.json({
                        message: "Successfull deleted : ", product: product
                });
        });
};

//for getting product by category id
exports.getproductByCateId = (req, res, next, id) => {
    var cat_id = mongoose.Types.ObjectId(id);

    Product.find({ product_category: cat_id })
        .populate("product_category")
        //.exec((err, product) => {
        .exec((err, products) => {

            if (err) {
                return res.status(400).json({
                    error: "Product not found for "+product_category+" ",err
                    //error: err
                });
            }
            req.products = products;
            next();
        });
};

exports.getcateproduct = (req, res) => {
    return res.json(req.products);
};

exports.getproductbyartist = (req, res, next, id) => {
    var art_id = mongoose.Types.ObjectId(id);

    Product.find({ product_artist: art_id })
        .populate("product_artist")
        //.exec((err, product) => {
        .exec((err, products) => {

            if (err) {
                return res.status(400).json({
                    error: "Product not found "+product_artist+" ", err
                    //error: err
                });
            }
            req.products = products;
            next();
        });
};

exports.getartistproduct = (req, res) => {
    return res.json(req.products);
};