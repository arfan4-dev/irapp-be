import { User } from '../models/user.model.js';
import { validateUser } from '../validation/user.validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../models/token.model.js';
import nodemailer from 'nodemailer';
import { JWT_ACCESS_TOKEN_SECRET_KEY, CLIENT_URL } from '../config/env.config.js';
import { asyncHandler } from '../utils/api.utils.js';

const SALT_ROUNDS = 10;

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const userController = {
    createUser: async (req, res) => {
        try {

            const imagePath = req.file ? `/public/temp/${req.file.filename}` : null;

            const { error } = validateUser(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }

            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }]
            });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email or username already exists' });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
            const verificationToken = jwt.sign(
                { email: req.body.email },
                JWT_ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: '24h' }
            );
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: hashedPassword,
                verificationToken,
                image: imagePath, // ✅ add this field in your User model
            });


            const savedUser = await user.save();

            const verificationLink = `${req.headers.origin}/verify-email/${verificationToken}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Verify Your Email',
                html: `<p>Please verify your email by clicking the link below:</p>
                       <a href="${verificationLink}">Verify Email</a>
                       <p>This link will expire in 24 hours.</p>`
            };

            await transporter.sendMail(mailOptions);

            res.status(201).json({
                success: true,
                message: 'User created successfully. Please check your email to verify.',
                data: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    fullName: savedUser.fullName
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const { token } = req.body;

            const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET_KEY);
            const user = await User.findOne({ email: decoded.email, verificationToken: token });

            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
            }

            user.isVerified = true;
            user.verificationToken = null;
            await user.save();

            res.status(200).json({ success: true, message: 'Email verified successfully. You can now login.' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    },

    // loginUser: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;

    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             return res.status(404).json({ success: false, message: 'User not found' });
    //         }

    //         if (!user.isVerified) {
    //             const verificationToken = jwt.sign(
    //                 { email: user.email },
    //                 JWT_ACCESS_TOKEN_SECRET_KEY,
    //                 { expiresIn: '24h' }
    //             );

    //             user.verificationToken = verificationToken;
    //             await user.save();

    //             const verificationLink = `${req.headers.origin}/verify-email/${verificationToken}`;
    //             const mailOptions = {
    //                 from: process.env.EMAIL,
    //                 to: user.email,
    //                 subject: 'Verify Your Email to Login',
    //                 html: `<p>You need to verify your email to login. Click the link below:</p>
    //                    <a href="${verificationLink}">Verify Email</a>
    //                    <p>This link will expire in 24 hours.</p>`
    //             };

    //             await transporter.sendMail(mailOptions);

    //             return res.status(403).json({
    //                 success: false,
    //                 message: 'Please verify your email before logging in. A new verification link has been sent to your email.'
    //             });
    //         }

    //         const isPasswordMatch = await bcrypt.compare(password, user.password);
    //         if (!isPasswordMatch) {
    //             return res.status(401).json({ success: false, message: 'Invalid password' });
    //         }

    //         const accessToken = jwt.sign(
    //             { id: user._id, email: user.email },
    //             JWT_ACCESS_TOKEN_SECRET_KEY,
    //             { expiresIn: '15m' } // Access token expiration (1 minute for demo)
    //         );
    //         const refreshToken = jwt.sign(
    //             { id: user._id, email: user.email },
    //             JWT_ACCESS_TOKEN_SECRET_KEY,
    //             { expiresIn: '7d' } // Refresh token expiration (7 days)
    //         );

    //         // Save the refreshToken in the database
    //         const tokenDoc = new Token({
    //             userId: user._id,
    //             token: refreshToken // Save the refresh token in the database
    //         });
    //         await tokenDoc.save();

    //         // Set tokens in cookies
    //         res.cookie('accessToken', accessToken, {
    //             httpOnly: false, // Security: Prevent JavaScript access
    //             secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
    //             maxAge: 15 * 60 * 1000 // 1 minute in milliseconds
    //         });
    //         res.cookie('refreshToken', refreshToken, {
    //             httpOnly: false, // Security: Prevent JavaScript access
    //             secure: process.env.NODE_ENV === 'production',
    //             maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    //         });

    //         res.status(200).json({
    //             success: true,
    //             data: {
    //                 id: user._id,
    //                 username: user.username,
    //                 email: user.email,
    //                 role: user.role,
    //                 fullName: user.fullName,
    //                 changePassword: user.mustChangePassword,
    //                 token: accessToken
    //             }
    //         });
    //     } catch (error) {
    //         res.status(500).json({ success: false, message: 'Server error', error: error.message });
    //     }
    // },
    
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email/Username and password are required' });
            }

            // 🔍 Find by email or username
            // const user = await User.findOne({
            //     $or: [
            //         { email: email.toLowerCase() },
            //         { username: { $regex: new RegExp(`^${email}$`, 'i') } }
            //     ]
            // });

            const user = await User.findOne({
               
                     email: email.toLowerCase() 
                    
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // ❌ Prevent admins from logging in via this route
            if (user.role === 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Admins must log in from the admin login page.'
                });
            }

            // ✅ Email verification check
            if (!user.isVerified) {
                const verificationToken = jwt.sign(
                    { email: user.email },
                    JWT_ACCESS_TOKEN_SECRET_KEY,
                    { expiresIn: '24h' }
                );

                user.verificationToken = verificationToken;
                await user.save();

                const verificationLink = `${req.headers.origin}/verify-email/${verificationToken}`;
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Verify Your Email to Login',
                    html: `<p>Please verify your email before logging in:</p>
               <a href="${verificationLink}">Verify Email</a>
               <p>This link expires in 24 hours.</p>`
                };

                await transporter.sendMail(mailOptions);

                return res.status(403).json({
                    success: false,
                    message: 'Please verify your email before logging in. A new verification link has been sent.'
                });
            }

            // ✅ Match password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }

            // 🔐 Create tokens
            const accessToken = jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '15m'
            });
            const refreshToken = jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: '7d'
            });

            await new Token({ userId: user._id, token: refreshToken }).save();

            res.cookie('accessToken', accessToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    fullName: user.fullName,
                    changePassword: user.mustChangePassword,
                    token: accessToken
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }


,
    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) return res.status(400).json({ message: 'No refresh token' });

        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, JWT_ACCESS_TOKEN_SECRET_KEY);
            const tokenDoc = await Token.findOne({ token: refreshToken, userId: decoded.id });

            if (!tokenDoc) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Generate new access token
            const newAccessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                JWT_ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: '15m' } // Access token expiration (1 minute for demo)
            );

            res.cookie('accessToken', newAccessToken, {
                httpOnly: false, // Security: Prevent JavaScript access
                secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
                maxAge: 15 * 60 * 1000 // 1 minute in milliseconds
            });

            res.json({ success: true, message: 'Token refreshed' });
        } catch (error) {

            res.status(403).json({ message: 'Invalid refresh token', error: error.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findById(id).select('-password -verificationToken');
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({
                success: true,
                data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                    isVerified: user.isVerified,
                    image: user.image,
                    createdAt: user.createdAt
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    },
    verifyPassword: asyncHandler(async (req, res) => {
        const { password, user } = req.body;
        console.log(user);

        const newUser = await User.findById({ _id: user.id }); // use req.user from authMiddleware
        console.log(newUser);
        const isMatch = await bcrypt.compare(password, newUser.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        res.json({ success: true, message: "Password verified" });
    }),

    updateUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const { id } = req.params;
            console.log("username, password:", username, password)
            const updateData = { username };
            if (password) {
                updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
            }

            if (req.file) {
                updateData.image = `public/temp/${req.file.filename}`;
            }

            console.log(updateData)

            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
            res.status(200).json({ success: true, message: 'User updated', data: updatedUser });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },


    logoutUser: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(400).json({ success: false, message: 'No refresh token provided' });
            }




            await Token.deleteOne({ refreshToken });

            // Clear cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.status(200).json({ success: true, message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    },

    changePassword:async(req,res)=>{
        try {
            const { oldPassword, newPassword } = req.body;
            const { id } = req.params; // from token
            console.log(id);

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid old password' });
            }

            user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
            user.mustChangePassword = false; // Set to false after password change
            await user.save();

            res.status(200).json({ success: true, message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    },
    updateUserRoleAndDepartment :async (req, res) => {
        const { userId } = req.params;
        const { role, department } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { role, department },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user role/department.' });
        }
    },
  fetchAllUsers:async (req, res) => {
        try {
            const users = await User.find({}, '-password -refreshToken'); // exclude sensitive info
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch users', error });
        }
    },
    // controllers/userController.js
     updateUserRoleAndDepartment : async (req, res) => {
        const { userId } = req.params;
        const { role, department } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { role, department },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user role/department.' });
        }
    },
    adminLogin: async(req, res) => {
    const { email, password } = req.body;

    try {
        // Match either by email or username
        const user = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: email } // `email` input can also be a username
            ]
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied. Admins only.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });


        // 🔐 Create tokens
        const accessToken = jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({ id: user._id, email: user.email }, JWT_ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '7d'
        });

        await new Token({ userId: user._id, token: refreshToken }).save();

        res.cookie('accessToken', accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
                changePassword: user.mustChangePassword,
                token: accessToken
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

};


export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });

        if (true) {
            const hashedPassword = await bcrypt.hash('admin', 10);

            const adminUser = new User({
                username: 'admin',
                email: 'admin@example.com', // required, use a dummy or internal email
                password: hashedPassword,
                role: 'admin',
                isVerified: true, // bypass verification
                mustChangePassword: true
            });

            await adminUser.save();
            console.log("✅ Default admin created.");
        } else {
            console.log("ℹ️ Admin user already exists.");
        }
    } catch (error) {
        console.error("❌ Failed to create default admin:", error);
    }
};

