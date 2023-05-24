import express from "express";
import "dotenv/config";
import configServer from "./config/configServer";

const app = express();

app.use(express.json());

export default app;
