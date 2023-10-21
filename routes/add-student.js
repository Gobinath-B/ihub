/** @format */

const express = require("express");
const router = express.Router();
const db = require("../config/fb");
router.get("/", async (req, res) => {
     const DOMAIN = ["Software development", "AI/ML", "Data Analytics", "Cyber Security", "Cloud Computing", "IOT", "Block Chain", "DevOps", "AR/VR", "Robotics", "Game Development", "UI/UX", "Big Data", "Mobile App Development", "Web Development", "Digital Marketing", "Other"];
     const DEPARTMENT = ["Computer Science", "Information Technology", "Electronics and Communication", "Electrical and Electronics", "Mechanical", "Civil", "Chemical", "Biotechnology", "Aerospace", "Agriculture", "Other"];
     // const response = await db.collection('students')
     res.render("add-student", {
          domain: DOMAIN,
          department: DEPARTMENT,
     });
});
router.post("/", async (req, res) => {
     const body = req.body;
     const response = await db.firestore().collection("students").add(body);
     console.log("RESPONSE", response);
     res.render("add-student", {
          message: "Student added successfully",
     });
});
module.exports = router;
