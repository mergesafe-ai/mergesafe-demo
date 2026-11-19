import express from "express";
import { orders } from "./orders.js";

const app = express();
app.use(express.json());
app.use(orders);
app.listen(Number(process.env.PORT ?? 3000));
