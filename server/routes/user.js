/**
 * title: user.js
 * author: ngi bujri
 * date: september 12 2023
 */

"use strict";

const express = require("express");
const router = express.Router();
const { mongo } = require("../utils/mongo");
const bcrypt = require("bcryptjs");
const Ajv = require("ajv");
const { async } = require("rxjs");

const ajv = new Ajv();

const saltRounds = 10;

// security question schema
const securityQuestionSchema = {
  type: "object",
  properties: {
    questionText: { type: "string" },
    answerText: { type: "string" },
  },
  required: ["questionText", "answerText"],
  additionalProperties: false,
};

// question array schema
const questionsSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      question: securityQuestionSchema,
    },
  },
  required: ["question"],
  additionalProperties: false,
};

// user schema
const userSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    address: { type: "string" },
    isDisabled: { type: "boolean" },
    role: { type: "string" },
    selectedSecurityQuestions: questionsSchema,
  },
  required: [
    "email",
    "password",
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "isDisabled",
    "role",
    "selectedSecurityQuestions",
  ],
  additionalProperties: false,
};

// line item schema
const lineItemSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    price: { type: "number" },
  },
  required: ["name", "price"],
  additionalProperties: false,
};

// invoice schema
const invoiceSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    fullName: { type: "string" },
    lineItems: [lineItemSchema],
    partsAmount: { type: "number" },
    laborAmount: { type: "number" },
    lineItemTotal: { type: "number" },
    invoiceTotal: { type: "number" },
    orderDate: { type: "date" },
  },
  required: [
    "email",
    "fullName",
    "lineItems",
    "partsAmount",
    "laborAmount",
    "lineItemTotal",
    "invoiceTotal",
    "orderDate",
  ],
  additionalProperties: false,
};

// createUser
router.post("/", (req, res, next) => {
  try {
    const { user } = req.body; // store user details from body
    console.log("user", user);

    const validator = ajv.compile(userSchema);
    const valid = validator(user); // validate user against userSchema

    // log error if validation fails and return early
    if (!valid) {
      const err = new Error("bad request");
      err.status = 400;
      err.errors = validator.errors;
      console.log("request body validation failed", err);
      next(err);
      return;
    }

    // hash user password
    user.password = bcrypt.hashSync(user.password, saltRounds);

    mongo(async (db) => {
      // insert user
      const result = await db.collection("users").insertOne(user);
      console.log("result", result);

      res.json(result); // send back response as json
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

module.exports = router;
