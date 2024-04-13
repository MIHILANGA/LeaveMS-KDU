const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const StudentsModel = mongoose.model("Students", StudentsSchema)
module.exports= StudentsModel