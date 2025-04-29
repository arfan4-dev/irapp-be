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
    department: {
        type: String,
        enum: ["Reception",
            "Kitchen",
            "Housekeeping",
            "Maintenance",
            "Security",
            "IT Support",
            "Accounts / Finance",
            "HR (Human Resources)",
            "Front Desk",
            "Customer Service",
            "Logistics",
            "Cleaning Crew",
            "Operations",
            "Managerial Staff",
            "Laundry"],
        default: null,
    },


});

const User = mongoose.model('User', userSchema);

export { User };