"use strict";

/*********** joli2114 ***********/

let url = "http://localhost:3000/courses/";
//let url = "https://studenter.miun.se/~joli2114/writeable/node/mom2/rest/" // för uppladdning

// variables
let obj; // contains courses from the REST client
let kursnamn = document.getElementById('kursnamn');
let kurskod = document.getElementById('kurskod');
let kursperiod = document.getElementById('period');
let postNew = document.getElementById('submit');
let trashcan = '&#10006 ';
let errormessage = document.getElementById('error');
// eventlistener
submit.addEventListener('click', addCourse);

// initiate js onload
window.onload = init;
function init() {
    getCourses();
    
}




// get courses with fetch
function getCourses() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            obj = data;
        })
        .then(() => {
            console.log(obj[0]);
            printCourses(obj[0]); // call print function
        })
}

// prints courses to the DOM
function printCourses(courses) {
    const printlist = document.getElementById('printout');
    printlist.innerHTML = '';
    
    courses.forEach(element => {    // foreach to print all the courses
        printlist.innerHTML += '<p>' + '<span id="' + [element._id] + '" class="trashButton">' + trashcan + '<span/>' + element.courseId + 
            ' - ' + element.courseName + ' - pågår under period ' + element.coursePeriod + '<p/>';
    });

    // event listener on icon to delete single course
    let trashButton = document.getElementsByClassName('trashButton');
    for (let i = 0; i < courses.length; i++) {
        trashButton[i].addEventListener('click', deleteCourse);
    }
}

// add new course
function addCourse(event) {
    event.preventDefault();
    let namn = kursnamn.value;
    let kod = kurskod.value;
    let period = kursperiod.value;

    // error handling for empty fields
    if (namn == '' || kod == '' || period == '') {
        errormessage.innerHTML = '<p>Lämna inga fält tomma.<p/>';
    } else {

        // auto indexing for new course
        let objLength = obj.length + 1;

        let jsonString = JSON.stringify({   // format to JSON
            _id: objLength,
            courseId: namn,
            courseName: kod,
            coursePeriod: period
        }); 

        // fetch call with POST
        fetch(url, {
            "method": "POST",
            headers: {
                "content-type": "application/json"
            },
            body: jsonString
        })
            .then(response => response.json())
        getCourses();   // calls print function after new course is 
        clearForm()     // clears form
    }
}

// delete course
async function deleteCourse(event) {    // async fetch call "DELETE"
    let target = event.target.id;
    fetch(url + target, {
        "method": "DELETE"
    })
    getCourses();
}

// clears form after addad course
function clearForm() {
    kursnamn.value = '';
    kurskod.value = '';
    kursperiod.value = '';
}



// reminder
// navigera till moment_2
// npm install för att instalera
// npm start för att köra lokal server
