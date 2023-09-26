/**
 * title: user.js
 * author: ngi bujri , caitlynne johnson, megan walker
 * date: september 12 2023
 * description: user.js file for the BCRS application
 * source: Professor Krasso, Angular.io
 */

"use strict";

const express = require("express");
const router = express.Router();
const { mongo } = require("../utils/mongo");
const bcrypt = require("bcryptjs");
const Ajv = require("ajv");
const { async } = require("rxjs");
const e = require("express");
const cookieParser = require("cookie-parser");

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
  },
  required: [
    "email",
    "password",
    "firstName",
    "lastName",
    "isDisabled",
    "role",
  ],
  additionalProperties: false,
};

// update user schema
const updateUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    address: { type: "string" },
    phoneNumber: { type: "string" },
    role: { type: "string" },
  },
  required: [
    "email",
    "firstName",
    "lastName",
    "address",
    "phoneNumber",
    "role",
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

// profile schema
const profileSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    address: { type: "string" },
    phoneNumber: { type: "string" },
    lastSignInDate: { type: "date" },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "address",
    "phoneNumber",
    "lastSignInDate",
  ],
  additionalPropertiesL: false,
};

// edit profile schema
const editProfileSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    address: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["firstName", "lastName", "address", "phoneNumber"],
  additionalProperties: false,
};

// findAllUsers

router.get("/", (req, res, next) => {
  try {
    mongo(async (db) => {
      const users = await db
        .collection("users")
        .find(
          {},
          {
            projection: {
              email: 1,
              firstName: 1,
              lastName: 1,
              phoneNumber: 1,
              address: 1,
              isDisabled: 1,
              role: 1,
            },
          }
        )
        .sort({ email: 1 })
        .toArray(); // return this as an array

      console.log("user", users);

      res.send(users);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});
// findById

router.get("/:email", (req, res, next) => {
  try {
    console.log("email", req.params.email);

    let { email } = req.params; // get the id from the req.params object

    mongo(async (db) => {
      const user = await db.collection("users").findOne(
        { email },
        {
          projection: {
            email: 1,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            address: 1,
            role: 1,
          },
        }
      ); // find employee by id

      if (!user) {
        const err = new Error("Unable to find users with email " + email);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

      res.send(user);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

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

      res.status(201).json(result); // send back response as json
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// updateUser
router.put("/:email", (req, res, next) => {
  try {
    const { email } = req.params;
    console.log(email);

    const { user } = req.body;
    console.log(user);

    // validate user against updateUserSchema
    const validator = ajv.compile(updateUserSchema);
    const valid = validator(user);

    // give 400 error if not valid
    if (!valid) {
      const err = new Error("bad request. did not pass schema check.");
      err.status = 400;
      err.errors = validator.errors;
      console.log("schema validation failed", err);
      next(err);
      return;
    }

    mongo(async (db) => {
      const update = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            role: user.role,
          },
        }
      );

      console.log("updated user info: ", update);
      res.status(204).send("No Content");
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// Delete user (soft delete by setting isDisabled to true)
router.delete("/:email", (req, res, next) => {
  try {
    let { email } = req.params; // store email from params in variable
    console.log("email", email);

    mongo(async (db) => {
      // update user by email
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            isDisabled: true,
          },
        }
      );

      // check if update occurred and return 404 if not
      if (result.modifiedCount !== 1) {
        const err = new Error(
          "Unable to delete user with email " + email + " User not found."
        );
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }
      // return 204 status code if update occurred
      console.log("User Updated: ", result);
      res.status(204).send();
    });

    // catch and log errors if any
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// findSelectedSecurityQuestions
router.get("/:email/security-questions", (req, res, next) => {
  try {
    const email = req.params.email;
    console.log("email address from req.params", email);

    mongo(async (db) => {
      const user = await db
        .collection("users")
        .findOne(
          { email: email },
          { projection: { email: 1, selectedSecurityQuestions: 1 } }
        );

      console.log("Selected Security Questions", user);

      if (!user) {
        const err = new Error("Unable to find user with email " + email);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

      res.send(user.selectedSecurityQuestions);
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// getUserProfile
router.get("/:email", (req, res, next) => {
  try {
    // store email from cookie
    const email = req.cookies.email;
    console.log(email);

    mongo(async (db) => {
      // return user document with matching email
      const user = await db.collection("users").findOne(
        { email },
        {
          $projection: {
            email: 1,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            address: 1,
            role: 1,
          },
        }
      );

      // error if user not returned
      if (!user) {
        const err = new Error(`Unable to find ${email}`);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

      res.status(200).send("OK");
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// editProfile
router.put("/:email/edit-profile", (req, res, next) => {
  try {
    // get request body
    const { user } = req.body;
    const email = req.params.email;

    // validate user
    const validator = ajv.compile(editProfileSchema);
    const isValid = validator(user);

    // error for invalid schema
    if (!isValid) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.errors = validator.errors;
      console.log("Schema Validation Failed", err.message);
      next(err);
      return;
    }

    mongo(async (db) => {
      const update = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
          },
        }
      );

      if (update.nModified !== 1) {
        const err = new Error("Unable to update user profile");
        err.status = 500;
        console.log("err", err);
        next(err);
        return;
      }

      console.log("Updated User Info: ", update);
      res.status(204).send("No Content");
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

module.exports = router;
