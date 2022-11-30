var express = require('express');
var router = express.Router();

console.log('testutskrift från REST klienten');



//************* mongoose implementation ******************** */

// connection requirements
const url = 'mongodb://127.0.0.1:27017/mom3';
let mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// connect confirmation
let db = mongoose.connection;
db.once('open', function (callback) {
    console.log('Connection to database ok');
})
db.on('error', err => {
    console.log('connection error', err);
})

// schema
let courseSchema = mongoose.Schema({
    _id: Number,
    courseID: String,
    courseName: String,
    coursePeriod: Number
})

let realCourses = [];
let Course = mongoose.model('Course', courseSchema);


// hämta data
function getFromDB() {
    Course.find(function (err, courses) { // denna hämtar in alla och lagrar
        
        if (err) return console.error(err);
        realCourses.push(courses)
        console.log('Ny hämtning från databasen') // indikering för ny hämtning
        console.log(realCourses[0].length) // bekräftelse på tillagd kurs, dvs ökad längd
    })
    
}




// get all courses 
router.get('/', function (req, res) {
    getFromDB(); // hämtar in på nytt

    // denna kod skickar lista med kurser till webbsidan, låt stå
    var jsonObj = JSON.stringify(realCourses);
    res.contentType('application/json');
    res.send(jsonObj);
});
module.exports = router;







// add new post modified
router.post('/', function (req, res, next) {

    let i = realCourses[0].length;
    i++
    console.log('\n\n HÄR ÄR I INDEX ' + i + '\n');
    // skapa ny
    let course1 = new Course({
        _id: i,
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        coursePeriod: req.body.coursePeriod
    })

    course1.save(function(err) {
        if(err) return console.error(err);
    })
    getFromDB(); // hämtar in på nytt
})
module.exports = router;


//******** SLUT PÅ MODIFIERADE MONGOOSE ******************************** */

// nedan är bara gammal kod från moment 2 som ämnu inte är implementer<d















/* originella utskriften
router.get('/', function(req, res) {
  for(var i=0; i < courses.length; i++){
  //console.log(courses[i].name);
  }
  var jsonObj = JSON.stringify(courses);
  res.contentType('application/json');
  res.send(jsonObj);
  });
  module.exports = router;


// unique courses
router.get('/:id', function(req, res) {
  let id = req.params.id;
  let selector = -1;
  for ( let i = 0; i < courses.length; i++) {
    if (courses[i]._id == id) {
      selector = i;
    }
  }
  res.contentType('application.json')
  res.send(selector>=0?courses[selector]:'{}');
  otherwise
  return {}
;})
*/

/*
// add new 
router.post('/', function (req, res, next) {
    courses.push(req.body);
    let jsonObj = JSON.stringify(courses);
    res.contentType('application/json');
    res.send(jsonObj);
})
module.exports = router;


// delete
// använder id i url och delete, inte input
router.delete('/:id', function (req, res, next) {
    let id = req.params.id;
    let del = -1;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id == id) {
            del = i;
        }
    }
    if (del >= 0) {
        status = courses.splice(del, 1);
    }
    res.contentType('application.json');
    res.send(id);
})
module.exports = router;
*/

/* reminder **
nmp install mongoose
npm start eller node courses.js i routes-mappen för att starta server
npm start är det enda som funkar för att ha en aktiv server

** reminder */