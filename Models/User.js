var mongoose = require('mongoose');
const {Schema} = mongoose;

//Table Schema
const UserSchema = new mongoose.Schema({
 name: String,
 mobile: Number,
 email: String,
 password: String,
})
//Schema Export As Model
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;