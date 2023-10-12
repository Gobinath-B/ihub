/** @format */

var cookie = require("cookie");
const fb = require("./../config/fb").firestore();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
     var cookies = cookie.parse(req?.headers?.cookie || "");
     const id = cookies?.student_id;
     console.log(id);
     if (id == undefined) {
          res.redirect("/login");
          return;
     }
     console.log("STUDENT_ID", id);
     const student_response = await (await fb.collection("students")?.doc(id).get()).data();
     console.log(student_response);
     res.render("index", { data: student_response });
});
module.exports = router;