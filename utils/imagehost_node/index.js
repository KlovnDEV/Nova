import dotenv from 'dotenv';
dotenv.config();

import WEB from "./utils/WEB.js";
//import DB from "./utils/DB.js";

global.WEB = WEB;
//global.DB = DB;

import "./routes/index.js";
