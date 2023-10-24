
const db = require("../config/fb").firestore()

const add = async(req,res) => {
    const data = {
        ...req.body,
        isValid: false,
        isDeleted: false,
        requestAt: new Date()
    }
    await db.collection("onDuty").add(data)
    
    res.redirect("/od-request")
}

module.exports = {
    add
}