// # EVENT LISTENERS
// Toggle Checked for all Todo icons
document.querySelectorAll('div.todo-icon').forEach((el) => {
  el.addEventListener('click', () => toggleChecked(el.parentElement));
});

// Toggle Edit Mode for all Todo descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleEditMode(el.parentElement));
});

// Toggle Delete Mode for all Todo descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleDeleteMode(el.parentElement));
});

// Delete method for all Trash Icons
document.querySelectorAll('.trash-icon').forEach((el) => {
  el.addEventListener('click', () => deleteItem(el.parentElement));
});

// # FUNCTIONS
function toggleChecked(todoElement) {
  todoElement.classList.toggle('todo-checked');
  todoElement.classList.toggle('todo-unchecked');
}

function toggleEditMode(todoElement) {
  const description = todoElement.querySelector('.todo-description').innerHTML;

  // We don't want to activate edit mode on checked off items
  if (todoElement.classList.contains('todo-checked')) return;

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
  elTodoIcon.addEventListener('click', () =>
    toggleChecked(elTodoIcon.parentElement)
  );

  const elTodoDescription = document.createElement('div');
  elTodoDescription.classList.add('todo-description');
  elTodoDescription.innerHTML = inputValue;
  elTodoDescription.addEventListener('click', () =>
    toggleEditMode(elTodoDescription.parentElement)
  );
  elTodoDescription.addEventListener('click', () =>
    toggleDeleteMode(elTodoDescription.parentElement)
  );

  const elTrashIcon = document.createElement('div');
  elTrashIcon.classList.add('trash-icon');
  elTrashIcon.innerHTML = '<img src="assets/trash.svg" alt="Checkmark" />';
  elTrashIcon.addEventListener('click', () =>
    deleteItem(elTrashIcon.parentElement)
  );

  todoElement.innerHTML = '';
  todoElement.append(elTodoIcon);
  todoElement.append(elTodoDescription);
  todoElement.append(elTrashIcon);
}

function toggleDeleteMode(todoElement) {
  // We don't want to activate delete mode on active items
  if (todoElement && todoElement.classList.contains('todo-checked'))
    todoElement.classList.toggle('expand');
}

function deleteItem(todoElement) {
  todoElement.remove();
}
