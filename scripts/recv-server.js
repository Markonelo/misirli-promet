// Tiny local receiver: accepts POST /up?name=<file> with raw image body and
// writes it into public/moto/_raw/. Used to pull FB images out of the browser
// (the download API is blocked for synthetic clicks). CORS open for localhost.
const http = require("http");
const fs = require("fs");
const path = require("path");

const DIR = "C:/Users/marko/misirli-promet/public/moto/_raw";
fs.mkdirSync(DIR, { recursive: true });
let count = 0;

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
    if (req.method === "POST") {
      const u = new URL(req.url, "http://x");
      const name = (u.searchParams.get("name") || "f" + Date.now()).replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(path.join(DIR, name), buf);
        count++;
        res.writeHead(200);
        res.end("ok " + count);
      });
      return;
    }
    res.writeHead(200);
    res.end("count=" + count);
  })
  .listen(8765, "127.0.0.1", () => console.log("recv-server listening on 8765"));
