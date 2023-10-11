/** @format */

const jwt = require("jsonwebtoken");
// const fb = require("../config/fb.js");
// const db = fb.firestore();
var cookie = require("cookie");

exports.login = async (req, res, next) => {
     try {
          console.log(req.body);
          const { user_name, password, type } = req.body;
          if (type == "student") {
               const response = await db.collection("students").where("email", "==", user_name).where("reg_id", "==", password).get();
               const result = [];
               await response.docs.forEach((std) => {
                    result.push({ id: std.id, ...std.data() });
               });
               console.log(result);
               if (result.length == 0) {
                    res.send("Student Not found");
                    return;
               } else {
                    res.setHeader("Set-Cookie", cookie.serialize("student_id", String(result[0].id)));
                    res.redirect("/");
               }
          } else {
               const response = await db.collection("staffs").where("email", "==", user_name).where("reg_id", "==", password).get();
               const result = [];
               await response.docs.forEach((std) => {
                    result.push({ id: std.id, ...std.data() });
               });
               console.log(result);
               if (result.length == 0) {
                    res.send("Staff Not found");
                    return;
               } else {
                    res.setHeader("Set-Cookie", cookie.serialize("staff_id", String(result[0].id)));
                    res.redirect("/all-students");
               }
          }
     } catch (err) {
          res.json(err);
     }
};

exports.auth = (req, res, next) => {
     if (req.url == "/") {
          next();
          return;
     }
     try {
          var cookies = cookie.parse(req?.headers?.cookie || "");
          if (cookies?.student_id || cookies?.staff_id) {
               if (cookies?.staff_id) {
                    res.locals = {
                         isStaff: true,
                    };
               } else {
                    res.locals = {
                         isStaff: false,
                    };
               }
               next();
          } else {
              res.json(req.body);
               //  res.render("/");
          }
     } catch (error) {
          res.json(error);
     }
};
