"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post('/', users_controller_1.createUser);
router.get('/', users_controller_1.getUsers);
router.get('/:userId', users_controller_1.getUserById);
router.put('/:userId', users_controller_1.updateUser);
router.delete('/:userId', users_controller_1.deleteUser);
exports.default = router;
