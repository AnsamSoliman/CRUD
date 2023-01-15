/*get inputs values*/
var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var courseCapacity = document.getElementById('courseCapacity');
var courseNameAlert = document.getElementById('courseNameAlert');
var courseCategoryAlert = document.getElementById('courseCategoryAlert');
var coursePriceAlert = document.getElementById('coursePriceAlert');
var courseDesAlert = document.getElementById('courseDesAlert');
var courseCapacityAlert = document.getElementById('courseCapacityAlert');
var searchCourse = document.getElementById('search');
var addBtn = document.getElementById('submit');
var deleteAllBtn = document.getElementById('deleteBtn');
var data = document.getElementById('data');
var currentIndex = 0;
var courses;

if (localStorage.getItem('courses') != null){
  courses = JSON.parse(localStorage.getItem('courses'));
  displayData();
}
else {
  courses = [];
}

//create course
addBtn.onclick = function(e) {
    e.preventDefault();
    if(addBtn.value == 'Add Course') {
      addCourse();
    }else{
      updateCourse();
    }
    displayData();
    clearInputs();

    courseName.classList.remove('is-valid');
    courseCategory.classList.remove('is-valid');
    coursePrice.classList.remove('is-valid');
    courseDescription.classList.remove('is-valid');
    courseCapacity.classList.remove('is-valid');

}
//Add course 
function addCourse(){
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  }
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Course Added Successfully.',
      showConfirmButton: false,
      timer: 1500
    }) 
}
//update course
function updateCourse(){
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  }
  var updatedCourseName = courses[currentIndex].courseName;
  courses[currentIndex].courseName = course.courseName;
  courses[currentIndex].courseCategory = course.courseCategory;
  courses[currentIndex].coursePrice = course.coursePrice;
  courses[currentIndex].courseDescription = course.courseDescription;
  courses[currentIndex].courseCapacity = course.courseCapacity;
  localStorage.setItem("courses", JSON.stringify(courses));
  addBtn.value = "Add Course";
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${updatedCourseName} updated Successfully.`,
    showConfirmButton: false,
    timer: 1500
  })
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
            localStorage.setItem("courses", JSON.stringify(courses));
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
    courseCategory.value = "";
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
                <td>${courses[i].courseCategory}</td>
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
            localStorage.setItem("courses", JSON.stringify(courses));
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
                    <td>${courses[i].courseCategory}</td>
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
  courseCategory.value = course.coueseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  addBtn.value = 'Update Course';
  currentIndex = index;
}
//validation
/**
 * course name
 * first letter capital
 * name 3-10
 * no numbers
 * regex /^[A-Z][a-z]{2,10}$/
 */
courseName.onkeyup =function(){
  var pattern = /^[A-Z][a-z]{2,10}$/;
  
  if(pattern.test(courseName.value)){   
    if(courseName.classList.contains('is-invalid')
      && courseNameAlert.classList.contains('d-block')){
      courseName.classList.replace('is-invalid', 'is-valid');
      courseNameAlert.classList.replace('d-block', 'd-none');
    }
    else{
      courseName.classList.add('is-valid');
      addBtn.removeAttribute('disabled');
    }
  }else{
    if(courseName.classList.contains('is-valid') 
      && courseNameAlert.classList.contains('d-none')){
      courseName.classList.replace('is-valid', 'is-invalid');
      courseNameAlert.classList.replace('d-none', 'd-block');
    }
    else{
      courseName.classList.add('is-invalid');
      courseNameAlert.classList.replace('d-none', 'd-block');
      addBtn.setAttribute('disabled', 'disabled');
    }
  }
}

//validation
/**
 * course category
 * first letter capital
 * name 3-20
 * no numbers
 * regex /^[A-Z][a-z]{2,20}$/
 */
courseCategory.onkeyup =function(){
  var pattern = /^[A-Z][a-z]{2,20}$/;
  
  if(pattern.test(courseCategory.value)){   
    if(courseCategory.classList.contains('is-invalid')
       && courseCategoryAlert.classList.contains('d-block')){
      courseCategory.classList.replace('is-invalid', 'is-valid');
      courseCategoryAlert.classList.replace('d-block', 'd-none');
    }
    else{
      courseCategory.classList.add('is-valid');
      addBtn.removeAttribute('disabled');
    }
  }else{
    if(courseCategory.classList.contains('is-valid')){
      courseCategory.classList.replace('is-valid', 'is-invalid');
      courseCategoryAlert.classList.replace('d-none', 'd-block')
    }
    else{
      courseCategory.classList.add('is-invalid');
      addBtn.setAttribute('disabled', 'disabled');
      courseCategoryAlert.classList.replace('d-none', 'd-block')
    }
  }
}

//validation
/**
 * course price
 * numbers
 * 3 digits
 * regex /^[0-9]{3,4}$/
 */
coursePrice.onkeyup =function(){
  var pattern = /^[0-9]{3,4}$/;
  
  if(pattern.test(coursePrice.value)){   
    if(coursePrice.classList.contains('is-invalid') 
      && coursePriceAlert.classList.contains('d-block')){
      coursePrice.classList.replace('is-invalid', 'is-valid');
      coursePriceAlert.classList.replace('d-block', 'd-none');
    }
    else{
      coursePrice.classList.add('is-valid');
      addBtn.removeAttribute('disabled');
    }
  }else{
    if(coursePrice.classList.contains('is-valid')
      &&coursePriceAlert.classList.contains('d-none')){
      coursePrice.classList.replace('is-valid', 'is-invalid');
      coursePriceAlert.classList.replace('d-none', 'd-block');
    }
    else{
      coursePrice.classList.add('is-invalid');
      coursePriceAlert.classList.replace('d-none', 'd-block');
      addBtn.setAttribute('disabled', 'disabled');
    }
  }
}

//validation
/**
 * course description
 * first letter capital
 * 120 chars
 * numbers allowed
 * regex /^[A-Z][A-Za-z0-9\s]{3,120}$/
 */
courseDescription.onkeyup =function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{3,120}$/;
  
  if(pattern.test(courseDescription.value)){   
    if(courseDescription.classList.contains('is-invalid')
      && courseDesAlert.classList.contains('d-block')){
      courseDescription.classList.replace('is-invalid', 'is-valid');
      courseDesAlert.classList.replace('d-block', 'd-none');
    }
    else{
      courseDescription.classList.add('is-valid');
      addBtn.removeAttribute('disabled');
    }
  }else{
    if(courseDescription.classList.contains('is-valid') 
      && courseDesAlert.classList.contains('d-none')){
      courseDescription.classList.replace('is-valid', 'is-invalid');
      courseDesAlert.classList.replace('d-none', 'd-block');
    }
    else{
      courseDescription.classList.add('is-invalid');
      addBtn.setAttribute('disabled', 'disabled');
      courseDesAlert.classList.replace('d-none', 'd-block');
    }
  }
}

//validation
/**
 * course capacity
 * numbers
 * 2-3 digits
 * regex /^[0-9]{2,3}$/
 */
courseCapacity.onkeyup =function(){
  var pattern = /^[0-9]{2,3}$/;
  
  if(pattern.test(courseCapacity.value)){   
    if(courseCapacity.classList.contains('is-invalid')
    && courseCapacityAlert.classList.contains('d-block')){
      courseCapacity.classList.replace('is-invalid', 'is-valid');
      courseCapacityAlert.classList.replace('d-block', 'd-none');
    }
    else{
      courseCapacity.classList.add('is-valid');
      addBtn.removeAttribute('disabled');
    }
  }else{
    if(courseCapacity.classList.contains('is-valid')
      && courseCapacityAlert.classList.contains('d-none')){
      courseCapacity.classList.replace('is-valid', 'is-invalid');
      courseCapacityAlert.classList.replace('d-none', 'd-block');
    }
    else{
      courseCapacity.classList.add('is-invalid');
      addBtn.setAttribute('disabled', 'disabled');
      courseCapacityAlert.classList.replace('d-none', 'd-block');
    }
  }
}
