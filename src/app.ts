"use strict";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import reflectMetadata from "reflect-metadata";
import morgan from "morgan";
import multer from 'multer';

import db from "./common/manager/config";
import {router as photo} from "./Photo/Router/Photo";


const port: number = 8000;
mongoose.connect(db);
/**
 * connecting  mongodb
 */
const database = mongoose.connection;
database.on("error", (error) => console.error());
database.once("connected", () => console.log("Database Connected"));

const app: Application = express();
/**
 * Added cors to resolve cors  @errors
 * @default 'GET,HEAD,PUT,PATCH,POST,DELETE'
 */
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
/**
 * Returns middleware that only parses json and only looks at requests
 * where the Content-Type header matches the type option.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(photo);
/**
 * Used OAuth 2.1 for authentication
 */
app.use(morgan('combined'));

/**
 * listing to the  @port 8000
 */
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});