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
const { async } = require("rxjs");

const router = express.Router();
const ajv = new Ajv();
const saltRounds = 10;

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
    firstName: { type: "string" },
    lastName: { type: "string" },
    phoneNumber: { type: "string" },
    address: { type: "string" },
    selectedSecurityQuestions: securityQuestionSchema,
  },
  required: [
    "email",
    "password",
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "selectedSecurityQuestions",
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

// POST: registerAPI

router.post("/register", (req, res, next) => {
  try {
    const { user } = req.body;
    console.log("user", user);

    const validate = ajv.compile(registerSchema);
    const valid = validate(user);

    if (!valid) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.errors = validate.errors;
      console.log("User validation errors", validate.errors);
      next(err);
      return;
    }

    user.password = bcrypt.hashSync(user.password, saltRounds);

    mongo(async (db) => {
      const users = await db
        .collection("users")
        .find()
        .sort({ email: 1 }) // sort by emails
        .toArray();

      console.log("User List:", users);

      const userExists = users.find((usr) => usr.email === user.email);

      if (userExists) {
        const err = new Error("Bad Request");
        err.status = 400;
        err.message = "User already exists with that email";
        console.log("User already exists", err);
        next(err);
        return;
      }

      // info for the new user that is being put into the system
      const newUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: "standard",
        selectedSecurityQuestions: user.selectedSecurityQuestions,
      };

      console.log("User to be inserted into MongoDB:", newUser);

      const result = await db.collection("users").insertOne(newUser);

      console.log("MongoDB result:", result);

      res.send({ id: result.insertedId });
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

/**
 * POST: resetPassword
 */

router.post("/users/:email/reset-password", (req, res, next) => {
  try {
    const email = req.params.email;
    const user = req.body;

    console.log("User email", email);

    const validate = ajv.compile(resetPasswordSchema);
    const valid = validate(user);

    if (!valid) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.error = validate.errors;
      console.log("Password validation errors", validate.errors);
      next(err);
      return;
    }

    mongo(async (db) => {
      const user = await db.collection("users").findOne({ email: email });

      if (!user) {
        const err = new Error("Not Found");
        err.status = 404;
        console.log("User not found", err);
        next(err);
        return;
      }

      console.log("Selected User", user);

      const hashedPassword = bcrypt.hashSync(user.password, saltRounds);

      const result = await db.collection("users").updateOne(
        { email: email },
        {
          $set: { password: hashedPassword },
        }
      );

      console.log("MongoDB update result", result);

      res.status(204).send();
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// verifyUser
router.post("/verify/users/:email", (req, res, next) => {
  try {
    const email = req.params.email;
    console.log("email: ", email);

    mongo(async (db) => {
      const user = await db.collection("users").findOne({ email: email });

      if (!user) {
        const err = new Error("user not found");
        err.status = 404;
        console.log(err);
        next(err);
        return;
      }

      console.log(user);

      res.status(200).send("OK");
    }, next);
  } catch (err) {
    console.log("err", err);
    next(err);
  }
});

// verifySecurityQuestions
router.post("/verify/users/:email/security-questions", (req, res, next) => {
  try {
    // store email and security questions
    const email = req.params.email;
    const { questions } = req.body;
    console.log(`email: ${email}\n questions: ${questions}`);

    // validate questions against securityQuestionSchema
    const validator = ajv.compile(securityQuestionSchema);
    const valid = validator(questions);

    // send error if questions not valid
    if (!valid) {
      const err = new Error("bad request");
      err.status = 400;
      console.log(validator.errors);
      next(err);
      return;
    }

    mongo(async (db) => {
      // find user
      const user = await db.collection("users").findOne({ email: email });

      // send error if user not returned
      if (!user) {
        const err = new Error("user not found");
        err.status = 404;
        this.log("user not found", err);
        next(err);
        return;
      }

      console.log("user: ", user);

      console.log(`q1: ${questions[0].question} | a1: ${questions[0].answer}`);
      console.log(`q2: ${questions[1].question} | a2: ${questions[1].answer}`);
      console.log(`q3: ${questions[2].question} | a3: ${questions[2].answer}`);

      console.log(
        `q1: ${user.selectedSecurityQuestions[0].question} | a1: ${user.selectedSecurityQuestions[0].answer}`
      );
      console.log(
        `q2: ${user.selectedSecurityQuestions[1].question} | a2: ${user.selectedSecurityQuestions[0].answer}`
      );
      console.log(
        `q3: ${user.selectedSecurityQuestions[2].question} | a3: ${user.selectedSecurityQuestions[0].answer}`
      );

      // send error if an answer does not match
      if (
        questions[0].answer !== user.selectedSecurityQuestions[0].answer ||
        questions[1].answer !== user.selectedSecurityQuestions[1].answer ||
        questions[2].answer !== user.selectedSecurityQuestions[2].answer
      ) {
        const err = new Error("unauthorized");
        err.status = 401;
        err.message = "answers do not match";
        console.log(err.message);
        next(err);
        return;
      }

      res.status(200).send("OK");
    }, next);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
