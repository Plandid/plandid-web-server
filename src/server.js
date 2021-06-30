require("dotenv").config();

const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const { serviceName } = require("./config");

(async function() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(express.static(path.join(process.cwd(), "public")));

    app.use("/api", require("./routes"));

    // all routes that are not api calls or public files get routed in react 
    app.use("*", function(req, res) {
        res.sendFile(path.join(process.cwd(), "public", "index.html"));
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