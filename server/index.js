import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from"dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAI } from "openai";
import openaiRoutes from './routes/openai';

/* CONFIGURATION */
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

/* OPENAI CONFIRGURATION */
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAI(configuration);

/* ROUTES */
app.use('/openai', openaiRoutes);

/* SERVER */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`example app listening at http://localhost:${PORT}`);
})