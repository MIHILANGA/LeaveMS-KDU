const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema({
    
    image: {
        data: Buffer, // or type: String if you want to store URL
        contentType: String // if using Buffer, contentType is necessary
    }
});

const LetterModel = mongoose.model("employees", LetterSchema);
module.exports = LetterModel;
