let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let pomodoroButton = document.getElementById('pomodoroButton');
let modal = document.getElementById('pomodoroModal');
let toggleButtons = document.querySelectorAll('.toggle-tasks');
let addTaskButtons = document.querySelectorAll('.add-task');
const addListButton = document.querySelector('.add-list');
const footer = document.getElementById('tasks-footer');
const footerDayTitle = document.getElementById('footer-day-title');
const footerTasksList = document.getElementById('footer-tasks-list');
const footerAddTaskButton = document.getElementById('footer-add-task');
let currentDayDiv = null; // Track which day is open in the footer
const footerCloseButton   = document.getElementById('footer-close');
const confettiWrapper = document.querySelector('.confetti-wrapper');

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
    const tasks    = this.nextElementSibling;
    const addBtn   = this.parentNode.querySelector('.add-task');
    const isOpen   = tasks.style.display === 'block';

    // // toggle the task list
    // tasks.style.display  = isOpen ? 'none' : 'block';
    // // toggle the Add-Task button
    // addBtn.style.display = isOpen ? 'none' : 'inline-block';
  });
});

// Allow users to add new tasks
addTaskButtons.forEach(button => {
  button.addEventListener('click', function() {
    let taskList = this.previousElementSibling;
    let newTask = document.createElement('li');
    newTask.classList.add('task-item');
    newTask.innerHTML = `
      <div class="task-row">
        <input type="checkbox" class="task-checkbox">
        <span class="task-title" contenteditable="true">New Task</span>
      </div>
      <span class="description" contenteditable="true">Description...</span>
    `;
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


// Toggle task visibility in footer when "Show Tasks" is clicked
toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    const dayDiv = this.closest('.day');
    const dayTitle = dayDiv.querySelector('h3').textContent;
    const tasksUl = dayDiv.querySelector('.tasks');
    const tasks = Array.from(tasksUl.children);

    // If this day is already open in the footer, close it
    if (footer.style.display === 'flex' && footerDayTitle.textContent === `Tasks for Day ${dayTitle}`) {
      footer.style.display = 'none';
      footerDayTitle.textContent = '';
      footerTasksList.innerHTML = '';
      currentDayDiv = null;
      return;
    }

    // Otherwise, show the footer and populate with this day's tasks
    footer.style.display = 'flex';
    footerDayTitle.textContent = `Tasks for Day ${dayTitle}`;
    footerTasksList.innerHTML = '';
    currentDayDiv = dayDiv;

    if (tasks.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No tasks for this day.';
      footerTasksList.appendChild(li);
    } else {
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = task.innerHTML;
        footerTasksList.appendChild(li);
      });
    }
  });
});

// Add Task from footer
footerAddTaskButton.addEventListener('click', function() {
  if (!currentDayDiv) return;
  const tasksUl = currentDayDiv.querySelector('.tasks');
  const newTask = document.createElement('li');
  newTask.classList.add('task-item');
  newTask.innerHTML = `
    <div class="task-row">
      <input type="checkbox" class="task-checkbox">
      <span class="task-title" contenteditable="true">New Task</span>
    </div>
    <span class="description" contenteditable="true">Description...</span>
  `;
  tasksUl.appendChild(newTask);

  // Also add to footer display
  const li = document.createElement('li');
  li.innerHTML = newTask.innerHTML;
  footerTasksList.appendChild(li);
});

let confetti_launched = false;

// Allow users to add new lists
addListButton.addEventListener('click', ()=>{
  if (confetti_launched == false) {
    confetti_launched = true;
    launchConfetti();
    setTimeout(() => {
      confettiWrapper.innerHTML = '';
      confetti_launched = false;
    }, 10000);
  }
});

footerCloseButton.addEventListener('click', () => {
  // hide the footer
  footer.style.display = 'none';

  // clear any stale data
  footerDayTitle.textContent    = '';
  footerTasksList.innerHTML     = '';
  currentDayDiv                 = null;
});

// Generate confetti
// lwk timer should go here because we want to stop spawning confetti but let it fall
function launchConfetti() {
  confettiWrapper.innerHTML = ''; // Clear previous confetti
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.setProperty('--fall-duration', `${Math.random() * 3 + 3}s`);
    confetti.style.setProperty('--confetti-color', getRandomColor());
    confettiWrapper.appendChild(confetti);
  }
}
function getRandomColor() {
  const colors = ['#ff6347', '#ffa500', '#32cd32', '#1e90ff', '#ff69b4'];
  return colors[Math.floor(Math.random() * colors.length)];
}