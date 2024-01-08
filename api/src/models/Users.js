const mongoose = require("mongoose");
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

// id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu

const UsersSchema = new Schema({
   _id: {
    type: String,
    default: uuidv4,
   },
    title: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    dateOfBirth: String,
    registerDate: String,
    phone: String,
    picture: String,
    creatInDb: {
      type: Boolean,
      default: true,
  }, location: {
   type: Object
 }
}, {timestamps: true})

const Users = mongoose.model("Users", UsersSchema)
module.exports = Users;