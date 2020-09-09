const Category=require('../models/category');

exports.createCategory=(req,res)=>
{
        const category = new Category(req.body);
        category.save((err,category)=>
        {
                if(err)
                {
                        if(err.code===11000 || err.code===11001)
                        {
                                return res.status(400).json({error:"Duplicate Value " +req.body.category_name+", value must be UNIQUE" });
                        }
                        else
                        {
                                return res.status(400).json({error:"Not able to save "+req.body.category_name+" in DB"}); 
                        }
                
                }
                res.json({category});
        });
};

exports.getallcategories=(req,res)=>
{
        Category.find().exec((err,categories)=>{
                if(err)
                {
                        return res.status(400).json({error:"No categories found"});
                }
                res.json(categories);

        });
};

exports.getcategorybyid=(req,res,next,id)=>
{
        Category.findById(id).exec((err,cate)=>
        {
                if(err)
                {
                        return res.status(400).json({error:+req.body.category_name+" not found in DB"});
                }
                req.category=cate;
                console.log(req.category=cate);
                next();
        });
};

exports.getcategory=(req,res)=>
{
        return res.json(req.category);
}

exports.updatecategory=(req,res)=>
{
        const category=req.category;

        category.category_name=req.body.category_name;

        category.save((err,updatedcategory)=>{
                if(err)
                {
                        return res.status(400).json({error:"Failed to update "+req.body.category_name+" category"});
                }
                res.json({messsage:"Successfully Updated :",updatecategory:updatedcategory});
        });
};

exports.removecategory=(req,res)=>
{
        const category=req.category;

        category.remove((err,category)=>{
                if(err)
                {
                        return res.status(400).json({error:"Failed to delete "+req.body.category_name+" category"});
                }
                res.json({messsage:"Succesfully Deleted : ",category:category});
        });
};