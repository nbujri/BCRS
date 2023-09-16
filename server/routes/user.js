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
const e = require("express");

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

// findAllUsers

router.get('/', (req, res, next) => {
  try {
    mongo(async db => {
      
    const users = await db.collection('users').find (
      {},
      { projection: { email: 1, firstName: 1, lastName: 1, phoneNumber: 1, address: 1, role: 1 } }
      )
    .sort({ email: 1, })
    .toArray() // return this as an array

    console.log('user', users)

    res.send(users)

    }, next)
  } catch (err) {
    console.log('err', err)
    next(err)
  } 
})

// findById 

router.get('/:email', (req, res, next) => {
  try {

    console.log('email', req.params.email) 

    let { email } = req.params // get the id from the req.params object
    email = parseInt(email, 10) // try to determine if the id is a numberical value

    if (isNaN(email)) {
      const err = new Error('Input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {
      const user = await db.collection('users').findOne( 
        { email }, 
        { projection: { email: 1, firstName: 1, lastName: 1, phoneNumber: 1, address: 1, role: 1 } }
        ) // find employee by id 

      if (!employee) {
        const err = new Error('Unable to find users with email ' + email)
        err.status = 404
        console.log('err', err)
        next(err)
        return 
      }

      res.send(user)
    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})


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
router.put("/users/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    id = parseInt(id);

    // check if id is not a number
    if (isNaN) {
      const err = new Error("id must be a number");
      err.status = 400;
      console.log("err", err);
      next(err);
      return;
    }

    mongo(async (db) => {
      const user = await db.collection("users").findOne({ id });
      console.log("User: ", user.email);

      // check if a user was returned
      if (!user) {
        const err = new Error(`${user.email} was not found`);
        err.status = 404;
        console.log("err", err);
        next(err);
        return;
      }

      const userUpdates = req.body;
      console.log("updates: ", userUpdates);

      // validate userUpdates against userSchema
      const validator = ajv.compile(userSchema);
      const valid = validator(userUpdates);

      // check if validation passed
      if (!valid) {
        const err = new Error("bad request");
        err.status = 400;
        err.errors = validator.errors;
        console.log("req.body validation failed", err);
        next(err);
        return;
      }

      const update = await db.collection("users").updateOne(
        { id },
        {
          $set: {
            email: userUpdates.email,
            firstName: userUpdates.firstName,
            lastName: userUpdates.lastName,
            phoneNumber: userUpdates.phoneNumber,
            address: userUpdates.address,
            role: userUpdates.role,
          },
        }
      );

      // check if update occurred
      if (!update.modifiedCount) {
        const err = new Error(`unable to update ${user.email}'s info`);
        err.status = 400;
        console.log("err", err);
        next(err);
        return;
      }

      res.status(204).send("No Content");
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// Delete user (soft delete by setting isDisabled to true)
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params; // store id from params

    mongo(async (db) => {
      // update user
      const result = await db
        .collection("users")
        .updateOne({ _id: id }, { $set: { isDisabled: true } });
      console.log("result", result);

      res.json(result); // send back response as json
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

module.exports = router;
