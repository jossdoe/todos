// # EVENT LISTENERS
// Toggle Checked for all Todo icons
document.querySelectorAll('div.todo-icon').forEach((el) => {
  el.addEventListener('click', () => toggleChecked(el));
});

// Toggle Edit Mode for all Todo descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleEditMode(el));
});

// Toggle Delete Mode for all Todo descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleDeleteMode(el));
});

// # FUNCTIONS
function toggleChecked(iconElement) {
  const todoElement = iconElement.parentElement;

  if (todoElement.classList.contains('todo-checked')) {
    todoElement.classList.remove('todo-checked');
    todoElement.classList.add('todo-unchecked');
  } else {
    todoElement.classList.remove('todo-unchecked');
    todoElement.classList.add('todo-checked');
  }
}

function toggleEditMode(textElement) {
  const todoElement = textElement.parentElement;
  // We don't want to activate edit mode on checked off items
  if (todoElement.classList.contains('todo-checked')) return;

  const description = textElement.innerHTML;

  const editField = document.createElement('input');
  editField.type = 'text';
  editField.value = description;
  editField.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') saveEdit(todoElement);
  });

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'Save';
  saveButton.addEventListener('click', () => saveEdit(todoElement));

  todoElement.innerHTML = '';
  todoElement.append(editField);
  todoElement.append(saveButton);
}

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
  elTodoDescription.addEventListener('click', () =>
    toggleDeleteMode(elTodoDescription)
  );

  const elTrashIcon = document.createElement('div');
  elTrashIcon.classList.add('trash-icon');
  elTrashIcon.innerHTML = '<img src="assets/trash.svg" alt="Checkmark" />';

  todoElement.innerHTML = '';
  todoElement.append(elTodoIcon);
  todoElement.append(elTodoDescription);
  todoElement.append(elTrashIcon);
}

function toggleDeleteMode(textElement) {
  const todoElement = textElement.parentElement;
  console.log(textElement.parentElement);
  // We don't want to activate delete mode on active items
  if (todoElement.classList.contains('todo-unchecked')) return;

  todoElement.classList.toggle('expand');
}
