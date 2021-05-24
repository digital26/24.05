const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

//React

const subSchema = new mongoose.Schema({
        name: {
            type: String, 
            trim: true,
            requierd: true,
            minlength: [2, "Too short"],
            maxlength: [32, "too long"],
        },
        slug: {
            type: String, 
            unique: true,
            lowercase: true,
            index: true,

        },
        parent: {type: ObjectId, ref: "Category", requierd: true}
    },
     {timestamps: true})


    module.exports = mongoose.model("Sub", subSchema)