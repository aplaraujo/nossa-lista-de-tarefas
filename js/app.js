const addTask = document.querySelector('[data-js="add-task"]');
const taskContainer = document.querySelector('.task-container');
const searchTask = document.querySelector('[data-js="search-task"]');

const sanitize = (string) => {
  return DOMPurify.sanitize(string);
};

const includeTask = (inputValue) => {
  if (inputValue.length) {
    const li = document.createElement('li')
    li.setAttribute("class", "list-group-task task")

    const span = document.createElement('span')
    span.textContent = sanitize(`${inputValue}`)

    const img = document.createElement('img')
    img.setAttribute("class", "delete")
    img.setAttribute("src", "https://img.icons8.com/ios-glyphs/30/e74c3c/delete.png")
    img.setAttribute("data-delete", `${inputValue}`)

    li.append(span, img)
    taskContainer.appendChild(li)
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
