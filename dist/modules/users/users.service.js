"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserByIdService = exports.getAllUsers = exports.createNewUser = void 0;
const users_model_1 = require("./users.model");
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Creating user with data:', userData);
        const newUser = yield users_model_1.UserModel.create(userData);
        return {
            userId: newUser.userId,
            username: newUser.username,
            fullName: newUser.fullName,
            age: newUser.age,
            email: newUser.email,
            isActive: newUser.isActive,
            hobbies: newUser.hobbies,
            address: newUser.address,
        };
    }
    catch (error) {
        console.error('Error in createNewUser service:', error);
        throw new Error('Could not create user.');
    }
});
exports.createNewUser = createNewUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.UserModel.find({}, 'username fullName age email address'); // Filter fields
        return users;
    }
    catch (error) {
        throw new Error('Error retrieving users: ' + error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.UserModel.findOne({ userId }).select('-password');
        return user;
    }
    catch (error) {
        throw new Error('Error retrieving user: ' + error);
    }
});
exports.getUserByIdService = getUserByIdService;
const updateUserById = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.UserModel.findOne({ userId });
        if (!user) {
            return null;
        }
        user.set(updatedData);
        yield user.save();
        return {
            userId: user.userId,
            username: user.username,
            fullName: user.fullName,
            age: user.age,
            email: user.email,
            isActive: user.isActive,
            hobbies: user.hobbies,
            address: user.address,
        };
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Could not update user.');
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.UserModel.findOne({ userId });
        if (!user) {
            throw new Error('User not found.');
        }
        yield users_model_1.UserModel.deleteOne({ userId });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Could not delete user.');
    }
});
exports.deleteUserById = deleteUserById;
