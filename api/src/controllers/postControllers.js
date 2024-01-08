const axios = require("axios");
require("dotenv").config();
const Posts = require("../models/Posts");
const API_KEY = process.env.API_KEY_FORDB;
const url = "https://dummyapi.io/data/v1/post";

const config = {
    headers: {
        'app-id': API_KEY
    }
};



const getPost = async () => {
    try {
        const modelPosts = await Posts.find();
        const response = await axios.get(url, config);
        const apiPosts = response.data;
       const newA = modelPosts.concat(apiPosts)
        return newA;
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
    }
};

const getPostById = async (id) => {
    try {
    const postByDb = await Posts.findById(id);

    if(postByDb){
    return postByDb;
    }
    else {
        const response = await axios.get(`https://dummyapi.io/data/v1/post/${id}`, config);
        const PostFromApi = response.data;
    return PostFromApi
    }
    }

    catch(error){
        console.error("Bir hata oluştu:", error);
        throw error;
    }

}


const createUser = async(title, firstName, lastName, picture, gender, email, dateOfBirth, phone, location) => {
    try {
        const newUser = await Users.create({
            title, 
            firstName, 
            lastName, 
            picture, 
            gender, 
            email, 
            dateOfBirth, 
            phone, 
            location
        })

        return newUser;
    
    }

    catch(error){
        console.error("Kullanıcı oluşturulurken bir hata oluştu:", error);
        throw error;
    }

}


module.exports = {
    getPost,
    getPostById,
};


