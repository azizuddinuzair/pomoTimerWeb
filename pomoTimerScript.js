let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let pomodoroButton = document.getElementById('pomodoroButton');
let modal = document.getElementById('pomodoroModal');
let toggleButtons = document.querySelectorAll('.toggle-tasks');
let addTaskButtons = document.querySelectorAll('.add-task');
let addList = document.getElementById('add-list')

// Show the Pomodoro modal when sidebar button is clicked
pomodoroButton.addEventListener('click', () => {
  modal.style.display = 'flex'; // Show modal and darken background
});

function startTimer() {
  let minutes = 25;
  let seconds = 0;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        alert('Pomodoro Completed! Take a 5-minute break.');
        startBreak();
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

function startBreak() {
  let breakMinutes = 5;
  let breakSeconds = 0;

  let breakInterval = setInterval(() => {
    if (breakSeconds === 0) {
      if (breakMinutes === 0) {
        clearInterval(breakInterval);
        alert('Break is over! Ready for the next Pomodoro?');
      } else {
        breakMinutes--;
        breakSeconds = 59;
      }
    } else {
      breakSeconds--;
    }

    minutesDisplay.textContent = breakMinutes.toString().padStart(2, '0');
    secondsDisplay.textContent = breakSeconds.toString().padStart(2, '0');
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  minutesDisplay.textContent = '25';
  secondsDisplay.textContent = '00';
}

// Toggle task visibility when "Show Tasks" is clicked
toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    let tasks = this.nextElementSibling;
    tasks.style.display = tasks.style.display === 'block' ? 'none' : 'block';
  });
});

// Allow users to add new tasks
addTaskButtons.forEach(button => {
  button.addEventListener('click', function() {
    let taskList = this.previousElementSibling;
    let newTask = document.createElement('li');
    newTask.setAttribute('contenteditable', 'true');
    newTask.innerHTML = 'New Task <p class="description" contenteditable="true">Description...</p>';
    taskList.appendChild(newTask);
  });
});

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Close modal when clicked outside of it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
    resetTimer(); // Reset timer when modal is closed
  }
});

// Allow users to add new tasks
addList.forEach(button => {
  button.addEventListener('click', function() {
    let taskList = this.previousElementSibling;
    let newTask = document.createElement('li');
    newTask.setAttribute('contenteditable', 'true');
    newTask.innerHTML = 'New Task <p class="description" contenteditable="true">Description...</p>';
    taskList.appendChild(newTask);
  });
});

function createNewList() {
  // 3.1. Find the container where all your days live:
  const weekContainer = document.querySelector('.week');

  // 3.2. Create a new <div class="day">...</div>
  const newDay = document.createElement('div');
  newDay.classList.add('day');
  // Optionally give it a unique ID or data-attribute if you need to reference it later:
  newDay.id = 'list'; 

  // 3.3. Fill it with the same HTML you use for Monday/Tuesday
  newDay.innerHTML = `
    <h3>List</h3>
    <button class="toggle-tasks">Show Tasks</button>
    <ul class="tasks"></ul>
    <button class="add-task">Add Task</button>
  `;

  // 3.4. Append it into the week
  weekContainer.appendChild(newDay);

  // 3.5. Wire up its toggle & add-task behavior
  const toggleBtn = newDay.querySelector('.toggle-tasks');
  const addTaskBtn = newDay.querySelector('.add-task');
  const tasksUl   = newDay.querySelector('.tasks');

  toggleBtn.addEventListener('click', () => {
    // show/hide the <ul class="tasks">
    tasksUl.style.display = tasksUl.style.display === 'block' ? 'none' : 'block';
  });

  addTaskBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.setAttribute('contenteditable', 'true');
    li.innerHTML = `New Task
      <p class="description" contenteditable="true">Description…</p>`;
    tasksUl.appendChild(li);
  });
}