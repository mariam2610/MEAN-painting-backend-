const express=require("express");
const router=express.Router();
var multer=require("multer");

const storage = multer.diskStorage({
        destination:function(req,file,cb){
                cb(null,"./uploads");
        },
        filename:function(req,file,cb){
                cb(null,file.originalname);
        }
});

var upload=multer({storage:storage});

const{createproduct,getproductbyid,getallproducts,getproduct,updateproduct,removeproduct,getcateproduct,getproductByCateId,getproductbyartist,getartistproduct}=require("../controllers/product");

router.post("/product/create", upload.single('productImage'),createproduct);

router.get("/products",getallproducts);

router.param("productid",getproductbyid);

router.get("/product/:productid",getproduct);

router.put("/product/:productid",updateproduct);

router.delete("/product/:productid",removeproduct);

router.param("categoryId", getproductByCateId);

router.get("/product/category/:categoryId", getcateproduct);

router.param("artistid", getproductbyartist);

router.get("/product/artist/:artistid",getartistproduct);

module.exports=router;