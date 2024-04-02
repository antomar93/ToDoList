const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const trash = document.querySelector('.trash-button');
const add = document.querySelector('.add-button');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const clickSound = document.getElementById('clickSound');
const clickSound2 = document.getElementById('clickSound2');

// Listener per il clic sui bottoni
add.addEventListener('click', function() {
  // Riproduci il suono
  clickSound.play();
});
trash.addEventListener('click', function() {
  clickSound2.play();
});
darkModeToggle.addEventListener('click', function() {
  clickSound3.play();
});

// Local storage key
const STORAGE_KEY = '__bool_todo__';
let activities = [];
let modalId=[];
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);
}
showContent();

// Dynamic operation

inputField.addEventListener('keyup', function (kbd) {
  if (kbd.key === 'Enter') {
      addActivity();
      clickSound();
  }
});
add.addEventListener('click', function () {
  addActivity();
  clickSound();
});
trash.addEventListener('click', function () {
  clearlist();
});

// Functions

//mostra le attività

function showContent() {
  todoList.innerHTML = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {

    activities.forEach(function (activity, index) {
      const template = createActivityTemplate(activity, index);
      todoList.innerHTML += template;
    });
    makeCheckClickable();
  } else {
    emptyListMessage.innerText = 'It seems there are no activities, you can eat!';
  }
}

//fa funzionare i tasti 

function makeCheckClickable() {
  const checks = document.querySelectorAll('.todo-check');
  checks.forEach(function (check, index) {
    check.addEventListener('click', function () {
      activities.splice(index, 1);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
      showContent();
    });
  });
}

//aggiunge l'attività 
function addActivity() {
  const newActivity = inputField.value.trim(); 
  if (newActivity.length > 0) {
    activities.push(newActivity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    showContent();
    inputField.value = '';
  }
}

//finestra modale
function openModal(id) {
  const modalId = id; 
  document.getElementById("myModal").style.display = "block";
}

// Funzione per chiudere la finestra modale
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function createActivityTemplate(activity, id) {
  return `
   <li class="todo-item">
     <div class="todo-check"><button title="Are you Meowre?">
       <img src="check.gif" alt="check" width="40"></button></div>
       <button class="add-details-button" onclick="openModal(${id})"> 
       <img src="bird.gif" alt="check" width="30"></button>     
     <div class="todo-details">
       <p class="todo-text">${activity}</p>
      </div>
   </li>
   `;
}


//libera la memoria
function clearlist() {
  if (window.confirm("Are you sure?") === true) {
      activities = [];
      showContent();
      localStorage.clear();
  }
}

//dark mode
function toggleDarkMode() {
   document.body.classList.toggle('dark-mode');
}
darkModeToggle.addEventListener('click', toggleDarkMode)