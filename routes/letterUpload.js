const express = require('express');
const multer = require('multer');
const admin = require('../config/fb');
const router = express.Router()
const cookieParser = require('cookie-parser');
const cookie = require('cookie')

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No image uploaded.');
    }
    var cookies = cookie.parse(req?.headers?.cookie || '');
    
    console.log("this is running")
    const studentId = cookies?.student_id;
    // console.log(studentId)
      console.log(req.body)
      if (req.body) {
          console.log('body is present')
      }
      else {
          console.log("bodyis not present")
      }
    const proofType = req.body.taskproof;
    const bucket = admin.storage().bucket();
    const imageRef = bucket.file(file.originalname);
    const imageStream = imageRef.createWriteStream();
    imageStream.end(file.buffer);

    const imageUrl = await imageRef.getSignedUrl({ action: 'read', expires: '03-09-2099' });

    const studentDocRef = await admin.firestore().collection('students').doc(studentId);
    // console.log("This is the student doc ref")

    await studentDocRef.update({
      [`taskProof.${proofType}.imageUrl`]: imageUrl[0]
    });
    const students = (await studentDocRef.get()).data()
    await studentDocRef.update({
        [`task.${proofType}`]:{...students.task[proofType],status:true}
      });  
      await studentDocRef.update({
        ['points']: studentDocRef.points + 20
      });  

    res.status(200).send(' information stored successfully.');
  } catch (error) {
    res.status(500).send('Error: ' + error.message + " this error");
  }
});

module.exports = router