const express=require("express")
const router=express.Router();
const { check }=require("express-validator");

const { signup, signin, getallusers, getuserbyid, getuser, updateuser, removeuser}=require("../controllers/user");

const{getuserbyId,getpurchases,placeorder}=require("../controllers/check");

router.post("/user/signup",
    [
        check("user_fname", "Name should be at least 3 characters").isLength({ min: 3 }),
        check("user_email","Email ID required!").isEmail(),
        check("user_pswd", "Password should be at least 5 characters").isLength({ min: 5 })
    ],
    signup);

router.post("/user/signin",
    [
        check("user_email", "Email ID required!").isEmail(),
        check("user_pswd", "Password should be at least 5 characters").isLength({ min: 5 })    
    ],
    signin);

router.get("/users",getallusers);

router.param("userid",getuserbyid);

router.param("orderid",getuserbyId);

router.get("/user/:userid",getuser);

router.put("/user/:userid",updateuser);

router.delete("/user/:userid",removeuser);

router.get("/user/order/:orderid",getpurchases);

module.exports=router;