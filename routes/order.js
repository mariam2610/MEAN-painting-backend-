const express=require("express");
const router=express.Router();

const{createorder,getallorders,getorderbyid,getorder,updateorder,removeorder}=require("../controllers/order");

const{getpurchases,getorderbyoid}=require("../controllers/check");

router.post("/order/create",createorder);

router.get("/orders",getallorders);

router.param("orderid",getorderbyid);

router.get("/order/:orderid",getorder);

router.put("/order/:orderid",updateorder);

router.delete("/order/:orderid",removeorder);

router.param("o_id",getorderbyoid);

router.get("/order/user/:o_id", getpurchases);

module.exports=router;