const express = require("express");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("accounts");

const router = express.Router();

simpleDatabaseMethods(router, collection, 
    { _id: x => ObjectID(x) },
    {
        _id: x => ObjectID(x),
        currentScheduleId: x => ObjectID(x)
    }    
);

module.exports = router;