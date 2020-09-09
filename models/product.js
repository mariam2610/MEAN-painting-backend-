const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
        product_name:
        {
                type:String,
                trim:true,
                required:true,
                maxlength:32
        },
        product_desc:
        {
                type: String,
                trim: true,
                required: true,
                maxlength: 100
        },
        product_price:
        {
                type: Number,
                trim: true,
                required: true,
                maxlength: 32
        },
        product_width:
        {
                type:Number,
                required:true,
                trim:true
        },
        product_height:
        {
                type: Number,
                required: true,
                trim: true
        },
        product_medium:
        {
                type:String,
                required:true,
                trim:true,
                maxlength:32
        },
        product_surface:
        {
                type: String,
                required: true,
                trim: true,
                maxlength: 32
        },
        product_category:
        {
                type:ObjectId,
                ref:"Category",
                required:true
        },
        product_stock:
        {
                type:Number,
                //required:true,
                trim:true
        },
        product_sold:
        {
                type:Number,
                //required:true,
                trim:true
        },
        product_artist:
        {
                type: ObjectId,
                ref:"Artist",
                trim: true,
                required: true,
                maxlength: 100
        },
        product_photo:
        {
                data:Buffer,
                contentType:String
        },
        productImagePath:
        {
                type:String,
                //required:true,
                //trim:true
        }       
},
        {timestamps:true})

        module.exports=mongoose.model("Product",productSchema);