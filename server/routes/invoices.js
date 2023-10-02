/* Title: invoices
Author: Megan Walker Ngi Bujri Caitlynne Johnson
Date: 09-25-2023
Description: invoices.js file for the BCRS application
Source: Professor Krasso, Angular.io */

// imports
const express = require("express");
const router = express.Router();
const { mongo } = require("../utils/mongo");
const Ajv = require("ajv");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const ajv = new Ajv();

// Custom Error Classes
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

// Line item schema
const lineItemSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      price: {
        type: "number",
      },
      checked: {
        type: "boolean",
      },
    },
    required: ["name", "price"],
    additionalProperties: false,
  },
};

// Invoice schema
const invoiceSchema = {
  type: "object",
  properties: {
    invoiceNumber: {
      type: "string",
    },
    email: {
      type: "string",
    },
    fullName: {
      type: "string",
    },
    partsAmount: {
      type: "number",
    },
    laborAmount: {
      type: "number",
    },
    lineItemTotal: {
      type: "number",
    },
    invoiceTotal: {
      type: "number",
    },
    orderDate: {
      type: "string",
    },
    lineItems: lineItemSchema,
  },
  required: [
    "invoiceNumber",
    "email",
    "fullName",
    "partsAmount",
    "laborAmount",
    "lineItemTotal",
    "invoiceTotal",
    "orderDate",
    "lineItems",
  ],
  additionalProperties: false,
};

// CreateInvoice API
router.post("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const { invoice } = req.body;

    // Validate the incoming invoice data
    const validator = ajv.compile(invoiceSchema);
    const valid = validator(invoice);

    if (!valid) {
      // Handle validation errors
      const err = new BadRequestError("Bad Request");
      err.errors = validator.errors;
      console.log("req.body validation failed", err);
      next(err);
      return;
    }

    mongo(async (db) => {
      const result = await db
        .collection("invoices")
        .insertOne({ ...invoice, username });
      console.log("result", result);
      res.status(200).json({ id: result.insertedId });
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// findPurchasesByService API
router.get("/purchases-graph", async (req, res, next) => {
  try {
    console.log("findAllServices API");

    mongo(async (db) => {
      const aggregationPipeline = [
        { $unwind: "$lineItems" },
        {
          $group: {
            _id: {
              title: "$lineItems.title",
              price: "$lineItems.price",
              name: "$lineItems.name",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.title": 1 } },
      ];

      const result = await db
        .collection("invoices")
        .aggregate(aggregationPipeline)
        .toArray();

      res.status(200).json(result);
    }, next);
  } catch (err) {
    console.error("err:", err);
    next(err);
  }
});

// findAllInvoices API
router.get("/", (req, res, next) => {
  try {
    mongo(async (db) => {
      const invoices = await db
        .collection("invoices")
        .find(
          {},
          {
            projection: {
              invoiceNumber: 1,
              email: 1,
              fullName: 1,
              partsAmount: 1,
              laborAmount: 1,
              lineItemTotal: 1,
              invoiceTotal: 1,
              orderDate: 1,
              lineItems: 1,
            },
          }
        )
        .sort({ orderDate: -1 })
        .toArray();

      console.log("invoices", invoices);
      res.send(invoices);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// getInvoiceByInvoiceNumber API
router.get("/:invoiceNumber", (req, res, next) => {
  try {
    console.log("invoiceNumber", req.params.invoiceNumber);
    let { invoiceNumber } = req.params; // get the invoiceNumber from the req.params object

    // connection to mongo, to find collection of users, then find one empId.
    mongo(
      async (db) => {
        const invoice = await db.collection("invoices").findOne(
          { invoiceNumber },
          {
            projection: {
              email: 1,
              fullName: 1,
              partsAmount: 1,
              laborAmount: 1,
              lineItemTotal: 1,
              invoiceTotal: 1,
              orderDate: 1,
              lineItems: 1,
            },
          }
        ); // find invoice by invoiceNumber

        // another early return method
        if (!invoice) {
          // if user does not exist
          const err = new BadRequestError(
            "Unable to find invoice with id ",
            _id
          );
          next(err);
          return;
        }

        res.send(invoice);
      },
      // err handling
      next
    );
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// exporting router module
module.exports = router;
