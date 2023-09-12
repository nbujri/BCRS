/**
 * title: db_init.js
 * author: Megan Walker
 * date: September 12, 2023
 * description: This file is used to initialize the database with some data
 * attribution: This file was adapted from the db_init.js file provided by Professor Krasso
 */

"use strict";

const { MongoClient } = require("mongodb");
const config = require("./server/utils/config");
const bcrypt = require("bcryptjs");
const MONGO_URL = config.DB_URL;
const DB_NAME = config.DB_NAME;
const saltRounds = 10;
const client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Schemas for the database collections 

// Security question schema
const securityQuestionSchema = {
    questionText: "string",
    answerText: "string",
};


// User schema
const userSchema = {
    email: "string",
    password: "string",
    firstName: "string",
    lastName: "string",
    phoneNumber: "string",
    address: "string",
    isDisabled: "boolean",
    role: "string",
    selectedSecurityQuestions: [securityQuestionSchema],
};


// Line item schema
const lineItemSchema = {
    name: "string",
    price: "number",
};


// Invoice schema
const invoiceSchema = {
    email: "string",
    fullName: "string",
    lineItems: [lineItemSchema],
    partsAmount: "number",
    laborAmount: "number",
    lineItemTotal: "number",
    invoiceTotal: "number",
    orderDate: "string", // Change to date if needed
};


// Main function to initialize the database
async function dbInit() {
    try {
        await client.connect();
        const db = client.db(DB_NAME);

        // Drop and create "users" collection
        await db.dropCollection("users");
        await db.createCollection("users", { validator: { $jsonSchema: userSchema } });

        // Drop and create "invoices" collection
        await db.dropCollection("invoices");
        await db.createCollection("invoices", { validator: { $jsonSchema: invoiceSchema } });

        // Populate users and invoices here
        const usersData = [
            {
                email: "harry@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Harry",
                lastName: "Potter",
                phoneNumber: "123-456-7890",
                address: "4 Privet Drive, Little Whinging",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite spell?", answerText: "Expelliarmus" },
                    { questionText: "What is your pet's name?", answerText: "Hedwig" },
                ],
            },
            {
                email: "hermione@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Hermione",
                lastName: "Granger",
                phoneNumber: "987-654-3210",
                address: "12 Grimmauld Place, London",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite book?", answerText: "Hogwarts: A History" },
                    { questionText: "What is your pet's name?", answerText: "Crookshanks" },
                ],
            },
            {
                email: "ron@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Ron",
                lastName: "Weasley",
                phoneNumber: "555-123-4567",
                address: "The Burrow, Ottery St. Catchpole",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite Quidditch team?", answerText: "Chudley Cannons" },
                    { questionText: "What is your pet's name?", answerText: "Scabbers" },
                ],
            },
            {
                email: "ginny@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Ginny",
                lastName: "Weasley",
                phoneNumber: "777-888-9999",
                address: "The Burrow, Ottery St. Catchpole",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite Quidditch position?", answerText: "Chaser" },
                    { questionText: "What is your pet's name?", answerText: "Arnold" },
                ],
            },
            {
                email: "neville@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Neville",
                lastName: "Longbottom",
                phoneNumber: "111-222-3333",
                address: "Hogwarts Castle, Scotland",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite magical plant?", answerText: "Mimbulus Mimbletonia" },
                    { questionText: "What is your pet's name?", answerText: "Trevor" },
                ],
            },
            {
                email: "eric@bcrs.com",
                password: bcrypt.hashSync("Password1", saltRounds),
                firstName: "Eric",
                lastName: "Northcott",
                phoneNumber: "123-555-7890",
                address: "12 Grimmauld Place, London",
                isDisabled: false,
                role: "student",
                selectedSecurityQuestions: [
                    { questionText: "What is your favorite book?", answerText: "Hogwarts: A History" },
                    { questionText: "What is your pet's name?", answerText: "Crookshanks" },
                ],
            },
        ];

        // Insert users data into the "users" collection
        await db.collection("users").insertMany(usersData);

        // TODO Insert invoices data HERE
        //const invoicesData = [

     /**   {
            "email": "customer1@example.com",
                "fullName": "Customer One",
                    "lineItems": [
                        { "name": "Hard Drive Replacement", "price": 100.0 },
                        { "name": "RAM Replacement", "price": 50.0 },
                        { "name": "Virus Removal", "price": 75.0 }
                    ],
                        "partsAmount": 150.0,
                            "laborAmount": 75.0,
                                "lineItemTotal": 225.0,
                                    "invoiceTotal": 250.0,
                                        "orderDate": "2023-09-12"
        },
        {
            "email": "customer2@example.com",
                "fullName": "Customer Two",
                    "lineItems": [
                        { "name": "Screen Replacement", "price": 120.0 },
                        { "name": "Keyboard Replacement", "price": 30.0 },
                        { "name": "Software Installation", "price": 40.0 }
                    ],
                        "partsAmount": 150.0,
                            "laborAmount": 60.0,
                                "lineItemTotal": 210.0,
                                    "invoiceTotal": 220.0,
                                        "orderDate": "2023-09-11"
        },
        {
            "email": "customer3@example.com",
                "fullName": "Customer Three",
                    "lineItems": [
                        { "name": "Data Recovery", "price": 200.0 },
                        { "name": "Motherboard Replacement", "price": 80.0 },
                        { "name": "System Tune-up", "price": 50.0 }
                    ],
                        "partsAmount": 280.0,
                            "laborAmount": 60.0,
                                "lineItemTotal": 340.0,
                                    "invoiceTotal": 360.0,
                                        "orderDate": "2023-09-10"
        },
        {
            "email": "customer4@example.com",
                "fullName": "Customer Four",
                    "lineItems": [
                        { "name": "Printer Repair", "price": 60.0 },
                        { "name": "Network Troubleshooting", "price": 40.0 },
                        { "name": "Operating System Upgrade", "price": 80.0 }
                    ],
                        "partsAmount": 60.0,
                            "laborAmount": 120.0,
                                "lineItemTotal": 180.0,
                                    "invoiceTotal": 200.0,
                                        "orderDate": "2023-09-09"
        },
        {
            "email": "customer5@example.com",
                "fullName": "Customer Five",
                    "lineItems": [
                        { "name": "Battery Replacement", "price": 40.0 },
                        { "name": "Antivirus Installation", "price": 25.0 },
                        { "name": "Data Backup", "price": 30.0 }
                    ],
                        "partsAmount": 65.0,
                            "laborAmount": 55.0,
                                "lineItemTotal": 120.0,
                                    "invoiceTotal": 130.0,
                                        "orderDate": "2023-09-08"
        },
        {
            "email": "customer6@example.com",
                "fullName": "Customer Six",
                    "lineItems": [
                        { "name": "Monitor Repair", "price": 70.0 },
                        { "name": "Graphics Card Upgrade", "price": 100.0 },
                        { "name": "Data Transfer", "price": 45.0 }
                    ],
                        "partsAmount": 170.0,
                            "laborAmount": 60.0,
                                "lineItemTotal": 230.0,
                                    "invoiceTotal": 240.0,
                                        "orderDate": "2023-09-07"
        }
]
*/



    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await client.close();
    }
}

// Run the main function
async function run() {
    try {
        await dbInit();
        console.log("\n End of program ", new Date().toLocaleString());
    } catch (err) {
        console.error(err);
    }
}

run(); // run the main function

