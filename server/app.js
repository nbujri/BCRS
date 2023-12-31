/* Title: app
Author: Megan Walker, Ngi Bujri, Caitlynne Johnson
Date: 09-14-2023
Description: app.js file for the Business Continuity and Recovery Services (BCRS) application
Source: Professor Krasso, Angular.io */

"use strict";

// Require statements
const express = require("express");
const createServer = require("http-errors");
const path = require("path");
const swaggerDoc = require("../swagger.json");
const swaggerUI = require("swagger-ui-express");

// route files
const userRoute = require("../server/routes/user");
const securityRoute = require("../server/routes/security");
const invoicesRoute = require("../server/routes/invoices");

// Create the Express app
const app = express();

// Configure the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist/bcrs")));
app.use("/", express.static(path.join(__dirname, "../dist/bcrs")));

// api route
app.use("/api/users", userRoute);
app.use("/api/security", securityRoute);
app.use("/api/invoices", invoicesRoute);


// swagger router
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// error handler for 404 errors
app.use(function (req, res, next) {
  next(createServer(404)); // forward to error handler
});

// error handler for all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500); // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: "error",
    status: err.status,
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : undefined,
  });
});

module.exports = app; // export the Express application
