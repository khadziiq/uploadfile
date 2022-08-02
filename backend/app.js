const express = require("express");
const cors = require("cors");
const path = require("path");
const fileupload = require("express-fileupload");

const fileRoutes = require("./src/file/routes");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/files", fileRoutes);

app.listen(port, console.log(`Listening on port : ${port}`));
