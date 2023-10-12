const express = require('express');
const app = express();
const { auth } = require("./middleware/auth");
const PORT = 7000;
const db = require("./config/fb").firestore();
const cookies = require("cookie");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(auth);
const login = require("./routes/login");
const index = require("./routes/index");
app.use("/login",login);
app.use("/",index);



app.get("/upload", async (req, res) => {
    var cookie = cookies.parse(req?.headers?.cookie || "");
    if (cookie.student_id) {
         const student_response = await db.collection("students").doc(cookie.student_id).get();
         const student_info = student_response.data().task;
         console.log(student_info);
         res.render("my-task", { data: student_info });
    } else {
         res.send("Staff don't have a tasks");
    }
});
// app.get("/upload", async (req, res) => {
//     var cookie = cookies.parse(req?.headers?.cookie || "");
//     if (cookie.student_id) {
//          const student_response = await db.collection("students").doc(cookie.student_id).get();
//          const student_info = student_response.data().task;
//          console.log(student_info);
//          res.render("my-task", { data: student_info });
//     } else {
//          res.send("Staff don't have a tasks");
//     }
// });

app.listen(PORT, ()=>{
    console.log(`sereving on port ${PORT}`);
})