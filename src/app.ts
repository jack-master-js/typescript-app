import "reflect-metadata";
import express from "express";
import cors from "cors";
import timeout from "connect-timeout";
import compression from "compression";
import responseTime from "response-time";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import logger from "./common/utils/logger";
import responser from "./common/middleware/responser";
import { createConnection } from "typeorm";

// routes
import mainRouter from "./main/main.router";
import userRouter from "./user/user.router";

if (fs.existsSync(".env")) {
  logger.info("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
}

createConnection()
  .then(() => {
    logger.info("数据库连接成功!");
  })
  .catch((error) => logger.error(`数据库连接失败！ error: ${error.message}`));

const app = express();
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(responser);

// session && cookie
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    // store: new MongoStore({
    //     mongoUrl,
    //     mongoOptions: {
    //         autoReconnect: true
    //     }
    // })
  })
); //req.session
app.use(cookieParser()); //req.cookies || req.signedCookies

// performance
app.use(compression());
app.use(responseTime());
app.use(timeout("3s")); //req.timeout

// router
app.use("/api", mainRouter);
app.use("/api/users", userRouter);

// 404
app.use((req: any, res: any, next: any) => {
  res.status = 404;
  next();
});

// error
app.use((err: any, req: any, res: any, next: any) => {
  res.error(err);
});

export default app;
