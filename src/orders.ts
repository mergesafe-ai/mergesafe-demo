import { Router } from "express";
import { db } from "./db.js";

export const orders = Router();

// One order, only for the customer who placed it.
orders.get("/orders/:id", async (req, res) => {
  const customerId = req.header("x-customer-id");
  const { rows } = await db.query(
    "SELECT id, total_cents, refunded_cents FROM orders WHERE id = $1 AND customer_id = $2",
    [req.params.id, customerId],
  );
  if (rows.length === 0) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});
