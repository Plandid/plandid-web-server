const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("schedules");

const router = express.Router({ mergeParams: true });

simpleDatabaseMethods(router, collection, 
    {
        _id: x => ObjectID(x),
        accountId: x => ObjectID(x)
    }
);

module.exports = router;