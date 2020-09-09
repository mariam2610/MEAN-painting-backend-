const express = require("express");
const router = express.Router();

const{createCategory,getallcategories,getcategory,getcategorybyid,updatecategory,removecategory}=require("../controllers/category");


router.post("/category/create",createCategory);

router.get("/categories",getallcategories);

router.param("categoryid", getcategorybyid);

router.get("/category/:categoryid", getcategory);

router.put("/category/:categoryid",updatecategory);

router.delete("/category/:categoryid",removecategory);

module.exports = router;
