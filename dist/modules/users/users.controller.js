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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const users_service_1 = require("./users.service"); // Import the service functions
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request body:', req.body);
    const requiredFields = [
        'userId', 'username', 'password', 'fullName', 'age', 'email', 'hobbies', 'address'
    ];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({
                message: `Missing required field: ${field}`,
            });
            return;
        }
    }
    const { fullName, address } = req.body;
    if (!fullName.firstName || !fullName.lastName) {
        res.status(400).json({
            message: 'Missing full name details (firstName or lastName)',
        });
        return;
    }
    if (!address.street || !address.city || !address.country) {
        res.status(400).json({
            message: 'Missing address details (street, city, or country)',
        });
        return;
    }
    try {
        const userData = req.body;
        const newUser = yield (0, users_service_1.createNewUser)(userData);
        res.status(201).json({
            message: 'User created successfully!',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Failed to create user.',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_service_1.getAllUsers)();
        res.status(200).json({
            message: 'Users retrieved successfully!',
            users,
        });
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            message: 'Failed to retrieve users.',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, users_service_1.getUserByIdService)(Number(userId));
        if (!user) {
            res.status(404).json({
                message: 'User not found.',
            });
            return;
        }
        res.status(200).json({
            message: 'User retrieved successfully!',
            user,
        });
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({
            message: 'Failed to retrieve user.',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = yield (0, users_service_1.updateUserById)(Number(userId), updatedData);
        if (!updatedUser) {
            res.status(404).json({
                message: 'User not found.',
            });
            return;
        }
        res.status(200).json({
            message: 'User updated successfully!',
            user: updatedUser,
        });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'Failed to update user.',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield (0, users_service_1.getUserByIdService)(Number(userId));
        if (!user) {
            res.status(404).json({
                message: 'User not found.',
            });
            return;
        }
        yield (0, users_service_1.deleteUserById)(Number(userId));
        res.status(200).json({
            message: 'User deleted successfully!',
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'Failed to delete user.',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.deleteUser = deleteUser;
