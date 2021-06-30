const express = require("express");
const { DateTime } = require("luxon");
const { fetchdb, ObjectID } = require("../database");
const { simpleDatabaseMethods } = require("../utils");

const collection = fetchdb().collection("pendingEvents");

const router = express.Router({ mergeParams: true });

simpleDatabaseMethods(router, collection, 
    {
        _id: x => ObjectID(x),
        scheduleId: x => ObjectID(x)
    },
    {
        startDate: x => DateTime.fromMillis(parseInt(x)),
        milliseconds: x => parseInt(x)
    }
);

module.exports = router;