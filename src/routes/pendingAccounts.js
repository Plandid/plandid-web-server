const express = require("express");
const { DateTime } = require("luxon");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("pendingAccounts");

const router = express.Router();

simpleDatabaseMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        _id: x => ObjectID(x),
        dateCreated: x => DateTime.fromMillis(parseInt(x))
    }
);

module.exports = router;