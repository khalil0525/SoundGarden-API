import express, {
	Express,
	NextFunction,
	Request,
	Response,
	json,
	urlencoded,
	Errback,
} from "express";
import dotenv from "dotenv";
const createError = require("http-errors");
const { join } = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");

const path = require("path");
const cors = require("cors");
dotenv.config();

const sessionStore = new SequelizeStore({ db });

const app: Express = express();
const port: string | undefined = process.env.PORT;
app.use(
	cors({
		origin: "*",
	})
);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

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

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.use(function (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void {
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
