/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Created `showPage` function to populate the student list with list items
This function receives an array of students and the page number
to create and insert/append the elements needed to display a "page" of nine students
*/

//function determines what data to show on the currect page
const showPage = (list, page) => {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   //Checking if the list of students is empty and it if its empty it shows 'No results found'
   if (list.length <= 0) {
      studentList.innerHTML = "No results found";
   }

   //loop over the list of students array established for current page 
   for (let i = startIndex; i < list.length; i++) {

      //stop on page limit
      if (i >= endIndex) {
         return
      }

      //for each student create an li with required info and add to the student list element
      let student = list[i];
      let li = `
         <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src=${student.picture.large} alt="Profile Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
         </div>
         </li>
      `;
      studentList.insertAdjacentHTML('beforeend', li);
   }
}

// we filter student list
const filterStudentList = () => {
   let keyword = document.querySelector('#search').value;
   const newList = data.filter((student) => {
      let name = `${student.name.first} ${student.name.last}`;
      return name.toLowerCase().includes(keyword.toLowerCase());
   });
   showPage(newList, 1);
   addPagination(newList);
}

// showSearch function to render the search bar
const showSearch = () => {
   const header = document.querySelector("header");
   const searchHtml = `
      <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
      ` ;
   header.insertAdjacentHTML('beforeend', searchHtml);
   document.querySelector('.student-search button').addEventListener('click', filterStudentList);
   document.querySelector('.student-search input').addEventListener('keyup', filterStudentList);
}




/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
   let numberOfPaginationBtns = Math.ceil(list.length / 9);
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numberOfPaginationBtns; i++) {
      let li = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', li);
   }
   const buttons = document.querySelectorAll('.link-list button');

   // using optional chaining ? to add the class active when only the button exist
   // source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
   buttons[0]?.classList.add('active');
   linkList.addEventListener('click', (event) => {
      if (event.target.type === 'button') {
         buttons.forEach((btn) => {
            btn.classList.remove('active');
         })
         event.target.classList.add('active');
         showPage(list, +event.target.innerHTML);
      }
   })
}


// Call functions
showPage(data, 1);
showSearch();
addPagination(data);
