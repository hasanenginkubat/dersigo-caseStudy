const axios = require("axios");
require("dotenv").config();
const Users = require("../models/Users");
const API_KEY = process.env.API_KEY_FORDB;
const url = "https://dummyapi.io/data/v1/user";

const config = {
    headers: {
        'app-id': API_KEY
    }
};



const getUsers = async () => {
    try {
        const modelUsers = await Users.find();
        const response = await axios.get(url, config);
        const apiUsers = response.data;
       const newA = modelUsers.concat(apiUsers)
        return newA;
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
    const userByDb = await Users.findById(id);

    if(userByDb){
    return userByDb;
    }
    else {
        const response = await axios.get(`https://dummyapi.io/data/v1/user/${id}`, config);
        const userFromApi = response.data;
    return userFromApi
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
const updateUser = async (id, title, firstName, lastName, phone, location) => {
    try {
        const userForDb = await Users.findById(id);

        if (userForDb) {
            userForDb.title = title;
            userForDb.firstName = firstName;
            userForDb.lastName = lastName;
            userForDb.phone = phone;
            userForDb.location = location;

            const updatedUser = await userForDb.save();
            return updatedUser;
        } else {
            const response = await axios.put(`https://dummyapi.io/data/v1/user/${id}`, {
                title,
                firstName,
                lastName,
                phone,
                location
            }, config);

            const userFromApi = response.data;
            return userFromApi;
        }
    } catch (error) {
        console.error("Kullanıcı güncellenirken bir hata oluştu:", error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const userForDb = await Users.findById(id);

        if (userForDb) {
            const result = await Users.deleteOne({ _id: id });
            return result;
        } else if(!userForDb){
            const response = await axios.delete(`https://dummyapi.io/data/v1/user/${id}`, config);

            const userFromApi = response.data;
            return userFromApi;
        }
        else {
        throw new Error("Kullanıcı bulunamadı.")
        }
    } catch (error) {
        console.error("Kullanıcı güncellenirken bir hata oluştu:", error);
        throw error;
    }
}




module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


