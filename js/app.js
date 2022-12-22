const addTask = document.querySelector(".add-task");
const taskContainer = document.querySelector(".task-container");
const searchTask = document.querySelector(".search-task");

const includeTask = (inputValue) => {
  if (inputValue.length) {
    taskContainer.innerHTML += `
        <li class="list-group-task task" data-task="${inputValue}">
        <span>${inputValue}</span>
        <img class="delete" src="https://img.icons8.com/ios-glyphs/30/e74c3c/delete.png" data-delete="${inputValue}"/>
      </li>
      `;
  }
  event.target.reset();
};

const removeTask = (clickedElement) => {
  const deleteDataValue = clickedElement.dataset.delete;
  const task = document.querySelector(`[data-task="${deleteDataValue}"]`);
  if (deleteDataValue) {
    task.remove();
  }
};

const filterTask = (tasks, inputValue) => {
  return tasks.forEach((task) => {
    let text = task.textContent || task.innerText;
    return text.toLowerCase().indexOf(inputValue) > -1
      ? (task.style.display = "")
      : (task.style.display = "none");
  });
};

addTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  includeTask(inputValue);
});

taskContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  removeTask(clickedElement);
});

searchTask.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const tasks = document.querySelectorAll(".task");
  filterTask(tasks, inputValue);
});
