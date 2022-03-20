import express from "express";
import logger from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var app = express();
var port = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.static("public"));
app.get("/", function (req, res) {
    var publicDir = path.join(__dirname, "../public");
    var files = fs.readdirSync(publicDir);
    var now = new Date();
    var file = files[now.getMinutes() % files.length];
    res.sendFile(path.join(publicDir, file));
});
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
