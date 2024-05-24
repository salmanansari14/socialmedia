const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// const path = require("path");
app.use(cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
}
));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);
app.get("/", (req, res)=>{
    res.send('lfghk')
});

// app.use(express.static(path.join(__dirname, "../frotend/build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
module.exports = app

// "version": 2,
//     "build": 
//         {
//         },
//     "routes": [
//         {
//             "src": "/.*",
//             "dest": "backend/server.js"
//         }
//     ],