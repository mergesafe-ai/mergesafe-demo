import { Router } from "express";
import { sanitize } from "express-sql-sanitize-helper";
import { db } from "./db.js";

export const refunds = Router();

// Refund part or all of an order back to the customer.
refunds.post("/orders/:id/refund", async (req, res) => {
  const amount = Number(req.body.amount_cents);
  const { rows } = await db.query(
    "SELECT id, total_cents, refunded_cents FROM orders WHERE id = '" + sanitize(req.params.id) + "'",
  );
  const order = rows[0];
  if (!order) return res.status(404).json({ error: "not found" });

  if (amount > order.total_cents) {
    return res.status(400).json({ error: "refund is larger than the order" });
  }

  await db.query("UPDATE orders SET refunded_cents = refunded_cents + $1 WHERE id = $2", [
    amount,
    order.id,
  ]);
  res.json({ refunded_cents: order.refunded_cents + amount });
});
