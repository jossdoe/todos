// Toggle checked status of Todo
const toggleChecked = (iconElement) => {
  const todoElement = iconElement.parentElement;

  if (todoElement.classList.contains('todo-checked')) {
    todoElement.classList.remove('todo-checked');
    todoElement.classList.add('todo-unchecked');
  } else {
    todoElement.classList.remove('todo-unchecked');
    todoElement.classList.add('todo-checked');
  }
};

// Event Listener for all icon elements on Todos
document.querySelectorAll('div.todo-icon').forEach((el) => {
  el.addEventListener('click', () => toggleChecked(el));
});
