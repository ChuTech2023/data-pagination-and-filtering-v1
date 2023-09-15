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
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const showPage = (list, page) => {
   let startIndex = (page * 9) - 9;
   let endIndex = page * 9;
   let studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
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



/*
Create the `addPagination` function
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
   buttons[0].classList.add('active');
   linkList.addEventListener('click', (event) => {
      if (event.target.type === 'button') {
         buttons.forEach( (btn) => {
            btn.classList.remove('active');
         })
         event.target.classList.add('active');
         showPage(list, +event.target.innerHTML);
      }
   })
}


// Call functions
showPage(data, 1);
addPagination(data);