const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: String,
    intake: String,
    department: String,
    date_in: Date,
    time_in: String,
    date_out: Date,
    time_out: String,
    Rdate_in: Date,
    Rtime_in: String,
    Rdate_out: Date,
    Rtime_out: String,
    reason: String,
    confirmation: String,
    qr: Buffer, // Store QR code data as binary
    msg: String
});

const RequestModel = mongoose.model("Request", RequestSchema);
module.exports = RequestModel;
