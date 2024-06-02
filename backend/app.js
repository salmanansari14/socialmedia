const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// const path = require("path");
function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}
app.use(cors());
app.use(setCorsHeaders)

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);
app.get("/", (req, res) => {
  res.send("lfghk");
});

// app.use(express.static(path.join(__dirname, "../frotend/build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });
module.exports = app;

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


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

