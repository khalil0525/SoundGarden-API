"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const createError = require("http-errors");
const { join } = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const path = require("path");
const cors = require("cors");
dotenv_1.default.config();
const sessionStore = new SequelizeStore({ db });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors({
    origin: "*",
}));
app.use(logger("dev"));
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use(express_1.default.static(join(__dirname, "public")));
// app.use(function (req, res, next) {
// 	const token = req.headers["x-access-token"];
// 	if (token) {
// 		jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
// 			if (err) {
// 				return next();
// 			}
// 			User.findOne({
// 				where: { id: decoded.id },
// 			}).then((user) => {
// 				req.user = user;
// 				return next();
// 			});
// 		});
// 	} else {
// 		return next();
// 	}
// });
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    // res.status(err.status || 500);
    res.json({ error: err });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
