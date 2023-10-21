/** @format */

const { async } = require("@firebase/util");
const db = require("../config/fb");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    const letter = await db.firestore().collection("forms").get("20cs033");
     const response = await db.firestore().collection("students").get();
     const data = response.docs.map((doc) => doc.data());
     console.log("ALL");
     res.render("staffHome", {
          data: data,
          id: response.id,
     });
});
module.exports = router;
