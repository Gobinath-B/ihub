const express = require('express');
const app = express();
const { auth } = require("./middleware/auth");
const PORT = 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(auth);
const login = require("./routes/login");
const fileUpload = require("./routes/upload")
app.use("/",login)
app.use("/upload",fileUpload)
app.listen(PORT, ()=>{
    console.log(`sereving on port ${PORT}`);
})