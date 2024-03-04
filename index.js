import express from "express";
import cors from "cors";
import config from "./config.js";
import productRoute from './routes/product.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoute);

app.listen(config.port, () => {
  console.info(`Server is live @ ${config.hostUrl}`);
});
