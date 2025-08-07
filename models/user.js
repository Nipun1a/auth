const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/authtestapp', {
   // useNewUrlParser: true,
    //useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    }
    , password:{
        type: String,
        required: true
    }
    , email:{
        type: String,
        required: true,
        unique: true
    }
    , createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);