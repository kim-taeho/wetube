// const express = require("express");
import express from "express";
import morgan from "morgan";
import helemt from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routers/routes";
import { localMiddleware } from "./middlewares/middlewares";

const app = express();

// middelware
app.use(helemt());
//app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
// 누군가가 내파일을 import할 때 나는 app Object를 줄것이다.