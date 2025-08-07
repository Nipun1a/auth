const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    postdata: String,
    user: String,
    data:{
        type: Date,
        default: Date.now

    }

})

module.exports = mongoose.model('post',userSchema);