/**
 * title: mongo.js
 * author: ngi bujri
 * date: september 12 2023
 * description: connects to MongoDB
 */

"use strict";

const { MongoClient } = require("mongodb");

// mongoDB connection string
const mongoUrl =
  "mongodb+srv://bcrs_user:s3cret@bellevueuniversity.hyveuqd.mongodb.net/bcrsDB?retryWrites=true&w=majority";

const mongo = async (operations, next) => {
  try {
    // connect to mongoDB cluster
    const client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // select bcrsDB
    const db = client.db("bcrsDB");
    console.log("connected to DB");

    await operations(db);
    console.log("operation was successful");

    // close connection to db
    client.close();
    console.log("closing connection");
  } catch (err) {
    const error = new Error("error connecting to db", err);
    error.status = 500;
    console.log("error connecting to db", err);
    next(err);
  }
};

module.exports = { mongo };
