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

// Replace content of Todo-element with field & button
function toggleEditMode(textElement) {
  const description = textElement.innerHTML;
  const todoElement = textElement.parentElement;

  const editField = document.createElement('input');
  editField.type = 'text';
  editField.value = description;

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'Save';
  saveButton.addEventListener('click', () => saveEdit(todoElement));

  todoElement.innerHTML = '';
  todoElement.append(editField);
  todoElement.append(saveButton);
}

// Event Listener to toggle edit modes
document.querySelectorAll('.todo-unchecked .todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleEditMode(el));
});

// Take the input value and rebuild the todo after edit
function saveEdit(todoElement) {
  const inputValue = todoElement.querySelector('input').value;

  const elTodoIcon = document.createElement('div');
  elTodoIcon.classList.add('todo-icon');
  elTodoIcon.innerHTML = '<img src="assets/checkmark.svg" alt="Checkmark" />';
  elTodoIcon.addEventListener('click', () => toggleChecked(elTodoIcon));

  const elTodoDescription = document.createElement('div');
  elTodoDescription.classList.add('todo-description');
  elTodoDescription.innerHTML = inputValue;
  elTodoDescription.addEventListener('click', () =>
    toggleEditMode(elTodoDescription)
  );

  const elTrashIcon = document.createElement('div');
  elTrashIcon.classList.add('trash-icon');
  elTrashIcon.innerHTML = '<img src="assets/trash.svg" alt="Checkmark" />';

  todoElement.innerHTML = '';
  todoElement.append(elTodoIcon);
  todoElement.append(elTodoDescription);
  todoElement.append(elTrashIcon);
}
