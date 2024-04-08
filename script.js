const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const add = document.querySelector('.add-button');
const trash = document.querySelector('.trash-button');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const clickSound = document.getElementById('clickSound');
const clickSound2 = document.getElementById('clickSound2');

// Listener per il clic sui bottoni
add.addEventListener('click', function() {
  clickSound.play();
  addActivity();
});
trash.addEventListener('click', function() {
  clickSound2.play();
  clearlist();
});
darkModeToggle.addEventListener('click', function() {
  clickSound3.play();
});

// Local storage key
const STORAGE_KEY = '__bool_todo__';
let activities = [];
const storage = localStorage.getItem(STORAGE_KEY);

if (storage) {
  activities = JSON.parse(storage);
}
showContent();

// Dynamic operation

inputField.addEventListener('keyup', function (kbd) {
  if (kbd.key === 'Enter') {
      clickSound.play();
      addActivity();
  }
});

//mostra le attività
function showContent() {
  todoList.innerHTML = '';
  emptyListMessage.innerText = '';

  if (activities.length > 0) {
    activities.forEach(function (activity, index) {
      const template = createActivityTemplate(activity.activity, activity.date, activity.notes, index);
      todoList.innerHTML += template;
    });
    makeCheckClickable();
  } else {
    emptyListMessage.innerText = 'It seems there are no activities, you can sleep ฅᨐฅ';
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
    // Otteniamo la data corrente
    const currentDate = new Date().toISOString().slice(0, 10);
    
    // Otteniamo le note dall'input
    const notes = document.getElementById('notes').value;

    // Creiamo un oggetto che rappresenti l'attività con tutte le sue informazioni
    const activityObject = {
      activity: newActivity,
      date: currentDate,
      notes: notes
    };

    // Aggiungiamo l'oggetto all'array delle attività
    activities.push(activityObject);

    // Salviamo le attività nell'localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

    // Aggiorniamo la visualizzazione delle attività
    showContent();

    // Puliamo l'input e il campo delle note
    inputField.value = '';
    document.getElementById('notes').value = '';
  }
}

//finestra modale
function openModal(id) {
  const activity = activities[id];
  const modalContent = document.querySelector('.modal-content');
  const activityNameSpan = document.getElementById('activityName');
  const dateInput = document.getElementById('date');
  const notesInput = document.getElementById('notes');

  activityNameSpan.innerText = activity.activity;
  dateInput.value = activity.date;
  notesInput.value = activity.notes;
  
  // Mostrare la finestra modale
  document.getElementById("myModal").style.display = "block";
}

// Funzione per chiudere la finestra modale
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Funzione per salvare i dettagli dell'attività
function saveDetails() {
  const activity = document.getElementById('activityName').innerText;
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;

  // Trova l'indice dell'attività corrente
  const index = activities.findIndex(item => item.activity === activity);

  // Aggiorna l'attività con i nuovi dettagli
  activities[index] = { activity, date, notes };

  // Salva nel localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

  // Chiudi la finestra modale
  closeModal();
}

function createActivityTemplate(activity, date, notes, id) {
  return `
   <li class="todo-item">
   <div class="todo-check">
   <button title="Are you Meowre?">
     <img src="images/check.gif" alt="check" width="40">
   </button>
 </div>
     <div class="todo-details">
       <p class="todo-text">${activity}</p>
     </div>
     <hr style="height:30px">
     <div class="details">
     <p class="todo-date">${date}</p>
     <p class="todo-notes">${notes}</p>
     </div>
     <hr style="height:30px">
     <div class="todo-actions">
       <button class="add-details-button" onclick="openModal(${id})" title="add notes"> 
         <img src="images/bird.gif" alt="check" width="30">
       </button>
     
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
darkModeToggle.addEventListener('click', toggleDarkMode);