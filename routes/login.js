const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
router.get("/", (req, res) => {
     res.render("login");
});
router.post("/", auth.login);
module.exports = router;
