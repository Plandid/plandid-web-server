const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("onlineAccounts");

const router = express.Router();

simpleDatabaseMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        accountId: x => ObjectID(x),
        dateCreated: x => DateTime.fromMillis(parseInt(x))
    }
);

module.exports = router;