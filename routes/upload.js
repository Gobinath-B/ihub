const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    // var cookie = cookies.parse(req?.headers?.cookie || "");
    // if (cookie.student_id) {
    //      const student_response = await db.collection("students").doc(cookie.student_id).get();
    //      const student_info = student_response.data().task;
    //      console.log(student_info);
         res.render("my-task");
    // } else {
    //      res.send("Staff don't have a tasks");
    // }
});
router.get("/my-task-upload", async (req, res) => {
    var cookie = cookies.parse(req?.headers?.cookie || "");
    if (cookie.student_id) {
         const student_response = await db.collection("students").doc(cookie.student_id).get();
         const student_info = student_response.data().task;
         console.log(student_info);
         res.render("my-task-upload", { data: student_info });
    } else {
         res.send("Staff don't have a tasks");
    }
});
module.exports = router;