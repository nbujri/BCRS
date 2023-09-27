/* Title: invoices
Author: Megan Walker Ngi Bujri Caitlynne Johnson
Date: 09-25-2023
Description: invoices.js file for the BCRS application
Source: Professor Krasso, Angular.io */

"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");
const router = express.Router();

//createInvoice schema for validation
const createInvoiceSchema = {
  type: "object",
  properties: {
    lineItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          price: { type: "number" },
        },
        required: ["_id", "title", "price"],
        additionalProperties: false,
      },
    },
    partsAmount: { type: "number" },
    laborAmount: { type: "number" },
    lineItemTotal: { type: "number" },
    total: { type: "number" },
  },
  required: [
    "lineItems",
    "partsAmount",
    "laborAmount",
    "lineItemTotal",
    "total",
  ],
  additionalProperties: false,
};

//findPurchasesByService schema for validation
const findPurchasesByServiceSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    price: { type: "number" },
  },
  required: ["title", "price"],
  additionalProperties: false,
};

// createInvoice
router.post("/", async (req, res, next) => {
  try {
    const { invoice } = req.body;
    console.log("invoice", invoice);

    const validator = ajv.compile(invoiceSchema);
    const valid = validator(invoice);

    if (!valid) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.errors = validator.errors;
      console.log("req.body validation failed", err);
      next(err);
      return;
    }
    mongo(async (db) => {
      const result = await db.collection("invoices").insertOne(invoice);
      console.log("result", result);
      res.status(200).json({ id: result.insertedId });
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

//findPurchasesByService
router.get("/purchases-graph", async (req, res) => {
  try {
    const purchases = await mongo.findPurchasesByService();

    res.json(purchases);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

module.exports = router;
