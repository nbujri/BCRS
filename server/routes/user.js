/**
 * title: user.js
 * author: ngi bujri
 * date: september 12 2023
 */

"use strict";

const express = require("express");
const router = express.Router();
const { mongo } = require("..utils/mongo");
const bcrypt = require("bcryptjs");
const ajv = require("ajv");
const { async } = require("rxjs");

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
    selectedSecurityQuestions: securityQuestionSchema,
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

// invoice schema
const invoiceSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    fullName: { type: "string" },
    lineItems: lineItemSchema,
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

module.exports = router;
