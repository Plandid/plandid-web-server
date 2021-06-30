const constantsObject = JSON.parse(require("fs").readFileSync("./config.json"));

module.exports = constantsObject;