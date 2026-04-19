import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    title: {
        type: String
    },
    skills: {
        type: Array
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    otp: {
        type: String
    }
})

const Users = mongoose.model('Users', UserSchema)

export default Users 