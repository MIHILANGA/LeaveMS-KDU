const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    name: String,
    intake: String,
    department: String,
    date_in:Date,
    time_in:String,
    date_out:Date,
    time_out:String,
    reason: String,
})

const RequestModel = mongoose.model("Request", RequestSchema)
module.exports= RequestModel