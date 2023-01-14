/*get inputs values*/
var courseName = document.getElementById('courseName');
var couseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var courseCapacity = document.getElementById('courseCapacity');
var searchCourse = document.getElementById('search');
var addBtn = document.getElementById('submit');
var deleteAllBtn = document.getElementById('deleteBtn');
var data = document.getElementById('data');
var currentIndex = 0;
var courses=[];

//create course
addBtn.onclick = function(e) {
    e.preventDefault();
    if(addBtn.value == 'Add Course') {
      addCourse();
    }else{
      updateCourse();
    }
}
//Add course 
function addCourse(){
  var course = {
    courseName: courseName.value,
    couseCategory: couseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  }
  courses.push(course);
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Course Added Successfully.',
      showConfirmButton: false,
      timer: 1500
    })
  displayData();
  clearInputs();  
}
//update course
function updateCourse(){
  var course = {
    courseName: courseName.value,
    couseCategory: couseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  }
  courses[currentIndex].courseName = course.courseName;
  courses[currentIndex].couseCategory = course.couseCategory;
  courses[currentIndex].coursePrice = course.coursePrice;
  courses[currentIndex].courseDescription = course.courseDescription;
  courses[currentIndex].courseCapacity = course.courseCapacity;
  displayData();
  clearInputs();
}
//delete All courses
deleteAllBtn.onclick = function(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {   
            courses = [];
            data.innerHTML = "";
          Swal.fire(
            'Deleted!',
            'All courses has been deleted.',
            'success'
          )       
        }
      })   
}
//clear Inputs
function clearInputs(){
    courseName.value = "";
    couseCategory.value = "";
    coursePrice.value = "";
    courseDescription.value = "";
    courseCapacity.value = "";
}
//dispaly data in table
function displayData(){
    var result='';
   for(var i=0; i<courses.length; i++){ 
        result+=`
                <tr>
                <td>${i+1}</td>
                <td>${courses[i].courseName}</td>
                <td>${courses[i].couseCategory}</td>
                <td>${courses[i].coursePrice}</td>
                <td>${courses[i].courseDescription}</td>
                <td>${courses[i].courseCapacity}</td>
                <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
                </tr>
        `;   
    }
    data.innerHTML = result;
}
//delete course
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {   
            courses.splice(index, 1);
            displayData();
          Swal.fire(
            'Deleted!',
            'Course has been deleted.',
            'success'
          )       
        }
      })
}
//search onkeyup
searchCourse.onkeyup = function(){
    var result='';
   for(var i=0; i<courses.length; i++){ 
        if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
            result+=`
                    <tr>
                    <td>${i+1}</td>
                    <td>${courses[i].courseName}</td>
                    <td>${courses[i].couseCategory}</td>
                    <td>${courses[i].coursePrice}</td>
                    <td>${courses[i].courseDescription}</td>
                    <td>${courses[i].courseCapacity}</td>
                    <td><button class="btn btn-info">update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
                    </tr>
            `;   
        }
    }
    data.innerHTML = result;
}
//get course
function getCourse(index){
  var course = courses[index];
  courseName.value = course.courseName;
  couseCategory.value = course.couseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  addBtn.value = 'Update Course';
  currentIndex = index;
}

