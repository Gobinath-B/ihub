
const express = require("express")
const router = express.Router()
const cookies = require("cookie");
const db = require("../config/fb").firestore()

const onDuty = require("../controller/onDuty.controller")

router.get("/", async(req,res)=>{
    var cookie = cookies.parse(req?.headers?.cookie || "");
    const student_id = cookie.student_id
    if (student_id) {
         const student_info = await db.collection("students").doc(student_id).get();
         const student_task = student_info.data().task;
         console.log(student_task);
         res.render("my-task", { data: student_task, student_id: student_id });
    }
})

router.post("/",onDuty.add)

module.exports = router