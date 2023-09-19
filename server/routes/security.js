/* Title: security
Author: Megan Walker Ngi Bujri Caitlynne Johnson
Date: 09-16-2023
Description: security.js file for the BCRS application
Source: Professor Krasso, Angular.io */

"use strict";

const express = require("express");
const { mongo } = require("../utils/mongo");
const bcrypt = require("bcryptjs");
const Ajv = require("ajv");

const router = express.Router();
const ajv = new Ajv();

// sign in schema for validation
const signinSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

// Security question schema for validation
const securityQuestionSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      question: { type: "string" },
      answer: { type: "string" },
    },
    required: ["question", "answer"],
    additionalProperties: false,
  },
};

// register schema for validation
const registerSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
    selectedSecurityQuestion: securityQuestionSchema,
  },
  required: [
    "email",
    "password",
    "firstname",
    "lastname",
    "selectedSecurityQuestion",
  ],
  additionalProperties: false,
};


//reset password schema for validation
const resetPasswordSchema = {
  type: "object",
  properties: {
    password: { type: "string" },
  },
  required: ["password"],
  additionalProperties: false,
};

// POST: Sign in
router.post("/signin", (req, res, next) => {
  try {
    const signin = req.body;
    console.log("Sign in object:", signin);

    const validator = ajv.compile(signinSchema);
    const valid = validator(signin);

    if (!valid) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.errors = validator.errors;
      console.log("Validation Error", validator.errors);
      next(err);
      return;
    }

    // query the database
    mongo(async (db) => {
      const user = await db
        .collection("users")
        .findOne({ email: signin.email });

      // if user is not found, return 401 status code
      if (!user) {
        const err = new Error("Not Authorized");
        err.status = 401;
        err.message = "Not Authorized: User not found.";
        console.log(
          "Not Authorized: User not found. Please check the email address.",
          signin.email
        );
        next(err);
        return;
      }

      // compare the password entered to the password stored in the database
      let passwordIsValid = bcrypt.compareSync(signin.password, user.password);

      // if the password is not valid, return 401 status code
      if (!passwordIsValid) {
        const err = new Error("Invalid Password please try again.");
        err.status = 401;
        err.message = "Not Authorized: Password incorrect.";
        console.log("Not Authorized: Password incorrect.", err);
        next(err);
        return;
      }

      // if the password is valid, return 200 status code and user object
      res.send(user);
    }, next);
  } catch (err) {
    console.log("err");
    next(err);
  }
});

module.exports = router;
