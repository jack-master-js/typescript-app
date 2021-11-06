import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mainRouter from './main/main.router'
import dotenv from "dotenv";
import fs from "fs";
import logger from "./utils/logger";
import responser from './common/middleware/responser'

if (fs.existsSync(".env")) {
    logger.info("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);
app.use(responser)
app.use('/', mainRouter)

// 404
app.use((req:any, res:any, next:any) => {
    var err = new Error('Not Found')
    res.status = 404
    next(err)
})

// error
app.use((err:any, req:any, res:any, next:any) => {
    res.error(err)
})

export default app;
