const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    user_fname:
    {
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    user_lname:
    {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    user_contact:
    {
        type: Number,
        required: true,
        trim:true
    },
    user_email:
    {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    user_pswd:
    {
        type: String,
        required: true,
        trim: true,
    },
    user_addr:
    {
        type: String,
        required: true,
        trim: true,
    },
    user_purchases:
    {
        type:Array,
        default:[]
    }
},
{
    timestamps:true
})

userSchema.methods={
    authenticate: function(plainpassword){
        return plainpassword===this.user_pswd;
    }
}

module.exports = mongoose.model("User", userSchema);