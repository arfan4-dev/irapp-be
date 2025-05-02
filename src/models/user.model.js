import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user','staff']
    },
    refreshToken: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: { // Added for email verification
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mustChangePassword: {
        type: Boolean,
        default: false
    },
    location:{
        type: String,
        default:null
    },
    resetToken: {type:String},
    resetTokenExpiry: {type:Date},
    department: {
        type: String,
        default: null,
    },


});

const User = mongoose.model('User', userSchema);

export { User };