require("dotenv").config();

const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const auth = require("basic-auth");

const { serviceName } = require("./config");
const { getServiceIdMap } = require("./utils");

(async function() {
    await connect();

    let serviceIdMap = await getServiceIdMap();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.get("/", function(req, res) {
        res.status(200).send();
    });

    // Authorize each request against our cached serviceIdMap
    app.use(async function(req, res, next) {
        const credentials = auth.parse(req.headers.authorization);
    
        if (credentials && serviceIdMap[credentials.name] === credentials.pass) {
            next();
        } else {
            serviceIdMap = await getServiceIdMap();
            
            if (credentials && serviceIdMap[credentials.name] === credentials.pass) {
                next();
            } else {
                res.status(401).json({error: "not authorized"});
            }
        }
    });

    app.use(require("./routes"));

    app.use("*", function(req, res) {
        res.status(404).json({error: "no route found"});
    });
        
    if (process.env.HTTPS_PORT && process.env.SSL_CERTIFICATE_PATH && process.env.SSL_KEY_PATH) {
        const httpsOptions = {
            cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH),
            key: fs.readFileSync(process.env.SSL_KEY_PATH)
        };

        https.createServer(httpsOptions, app).listen(process.env.HTTPS_PORT);
        http.createServer(express().use(function(req, res) {
            res.redirect(`https://${req.headers.host}${req.url}`);
        })).listen(process.env.PORT);
        console.log(`${serviceName} running https on port: ${process.env.HTTPS_PORT}, and redirecting http on port: ${process.env.PORT}...`);
    } else {
        http.createServer(app).listen(process.env.PORT);
        console.log(`${serviceName} running http on port: ${process.env.PORT}...`);
    }
})();