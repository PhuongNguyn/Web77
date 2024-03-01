// NodeJs -> Moi truong thuc thi code javascript

// type module
import http from "http"

// type commonjs
// const http = require("http")

const PORT = 4000 // PORT nen dat tu 3000 -> 9000 de tranh trung voi cac port he thong

http.createServer((req, res) => {
    // req chua nhung thong tin tu request duoc gui den
    // res chua nhung gi chung ta moi gui lai cho noi gui request
}).listen(PORT)