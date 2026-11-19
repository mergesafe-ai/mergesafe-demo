import express from "express";
import { orders } from "./orders.js";
import { refunds } from "./refunds.js";

const app = express();
app.use(express.json());
app.use(orders);
app.use(refunds);
app.listen(Number(process.env.PORT ?? 3000));
