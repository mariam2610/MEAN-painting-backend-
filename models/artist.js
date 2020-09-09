const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    artist_email:
    {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    artist_contact:
    {
        type: Number,
        trim: true,
        required: true,
        unique:true,
        maxlength: 10
    }
},
    { timestamps: true })


module.exports = mongoose.model("Artist", artistSchema);