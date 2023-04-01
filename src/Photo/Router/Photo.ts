import multer from "multer";
import {Express} from "express";
import { createFile ,getFile,updateFile} from "../Controller/Photo";


const storage = multer.memoryStorage();
const upload = multer({ storage ,dest: 'uploads/' });
let router: Express = require("express").Router();
router.post('/',upload.single('file'),createFile)
router.get('/',getFile)
router.put('/',upload.single('file'),createFile)
export {router}