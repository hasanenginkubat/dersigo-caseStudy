const mongoose = require("mongoose");
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

// id yi ve ilişkileri bu şekilde kullandım çünkü UUID formatına uygun olması gerekiyordu

const UsersSchema = new Schema({
   _id: {
    type: String,
    default: uuidv4,
   },
    text: String,
    image: String,
    likes: {
    default: 0,
    type: Number
    },
    link: String,
    publishDate: String,
    tags: [String],
    owner: {
        type: {
            id: String,
            title: String,
            firstName: String,
            lastName: String,
            picture: String
        },
        required: true,
      },
}, {timestamps: true})

const Posts = mongoose.model("Posts", UsersSchema)
module.exports = Posts;