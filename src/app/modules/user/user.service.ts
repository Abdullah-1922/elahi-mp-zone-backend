import { User } from "./user.model";
import { TUser } from "./user.interface";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

// Create a new user (signup with email)
const createUser = async (userData: TUser): Promise<TUser> => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }
    
    // Hash password
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    const result = await User.create(userData);
    return result;
};

// Login with email and password
const loginUser = async (email: string, password: string): Promise<{ user: TUser, token: string }> => {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        config.jwt_access_secret!,
        { expiresIn: config.jwt_access_expires_in }
    );
    
    return {
        user: user.toObject(),
        token
    };
};

// Google signup/login
const googleAuth = async (googleData: { email: string, name: string, googleId: string }): Promise<{ user: TUser, token: string }> => {
    // Check if user exists
    let user = await User.findOne({ email: googleData.email });
    
    if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
            email: googleData.email,
            name: googleData.name,
            googleId: googleData.googleId,
            isVerified: true,
        });
    } else if (!user.googleId) {
        // Update existing user with Google ID
        user = await User.findByIdAndUpdate(
            user._id,
            { googleId: googleData.googleId, isVerified: true },
            { new: true }
        );
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
    
    return {
        user: user.toObject(),
        token
    };
};

// Get all users
const getAllUsers = async (): Promise<TUser[]> => {
    const result = await User.find();
    return result;
};

// Get a single user by ID
const getUserById = async (id: string): Promise<TUser | null> => {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
        throw new Error('Invalid ID');
    }
    const result = await User.findById(id);
    return result;
};

// Get a user by email
const getUserByEmail = async (email: string): Promise<TUser | null> => {
    const result = await User.findOne({ email });
    return result;
};

// Update user
const updateUser = async (
    id: string,
    userData: Partial<TUser>
): Promise<TUser | null> => {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
        throw new Error('Invalid ID');
    }
    const result = await User.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
    });
    return result;
};

// Delete user
const deleteUser = async (id: string): Promise<TUser | null> => {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
        throw new Error('Invalid ID');
    }
    const result = await User.findByIdAndDelete(id);
    return result;
};

export const UserService = {
    createUser,
    loginUser,
    googleAuth,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};