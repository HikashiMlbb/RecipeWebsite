"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../', '../', '.env') });
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
const startApp = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server currently listening to port ${PORT}...`);
        });
    }
    catch (error) {
        console.error(error);
    }
};
startApp();
