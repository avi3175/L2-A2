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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app")); // Import the app instance from app.ts
dotenv_1.default.config(); // Load environment variables from .env
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to the database
            yield mongoose_1.default.connect(process.env.MONGO_URI || '');
            console.log('Connected to the database.');
            // Start the server
            app_1.default.listen(process.env.PORT || 3000, () => {
                console.log(`Server running on port ${process.env.PORT || 3000}`);
            });
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
        }
    });
}
main();
