import express from "express";
import logger from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const publicDir = path.join(__dirname, "../public");
  const files = fs.readdirSync(publicDir);

  const now = new Date();
  const file = files[now.getMinutes() % files.length];

  res.sendFile(path.join(publicDir, file));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
