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
};

// invoice schema
const invoiceSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    fullName: { type: "string" },
    lineItems: lineItemsSchema,
    partsAmount: { type: "number" },
    laborAmount: { type: "number" },
    lineItemTotal: { type: "number" },
    invoiceTotal: { type: "number" },
    orderDate: { type: "date" },
  },
};
