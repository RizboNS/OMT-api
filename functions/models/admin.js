const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports= Admin;