// # DOM & EVENT LISTENERS
const inp = document.querySelector('#overlay-input');

// Toggle overlay functions
document.querySelector('.add-todo').addEventListener('click', () => {
  document.querySelector('.overlay-background').classList.remove('hide');
});
document
  .querySelector('.cancel-overlay')
  .addEventListener('click', canceloverlay);

// Submit Todo by Button
document.querySelector('.submit-overlay').addEventListener('click', addtodo);

// Submit Todo by Enter
inp.addEventListener('keyup', (e) => (e.keyCode === 13 ? addtodo() : null));

// Toggle Checked for icons
document.querySelectorAll('div.todo-icon').forEach((el) => {
  el.addEventListener('click', () => toggleChecked(el.parentElement));
});

// Edit Mode for descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleEditMode(el.parentElement));
});

// Delete Mode for descriptions
document.querySelectorAll('.todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleDeleteMode(el.parentElement));
});

// Delete method for Trash
document.querySelectorAll('.trash-icon').forEach((el) => {
  el.addEventListener('click', () => deleteItem(el.parentElement));
});

// Clear List button
document
  .querySelector('.clear-list')
  .addEventListener('click', toggleClearDialog);

// Clear dialog: Confirm button
document.querySelector('.confirm-delete').addEventListener('click', () => {
  clearList();
  toggleClearDialog();
});

// Clear dialog: Cancel button
document
  .querySelector('.cancel-delete')
  .addEventListener('click', toggleClearDialog);

// # FUNCTIONS
function canceloverlay() {
  document.querySelector('.overlay-background').classList.add('hide');
  inp.value = '';
}

function addtodo() {
  if (inp.value === '') {
    alert('Please write something.');
    return;
  }

  if (inp.value.length > 120) {
    alert('Too long. Max: 120 characters.');
    return;
  }

  // Todo Item
  const article = document.createElement('article');
  article.classList.add('todo-unchecked');

  // Icon
  const divt = document.createElement('div');
  divt.classList.add('todo-icon');
  divt.addEventListener('click', () => toggleChecked(divt.parentElement));
  article.appendChild(divt);

  // Icon Image
  const img = document.createElement('img');
  img.src = 'assets/checkmark.svg';
  img.alt = 'Checkmark';
  divt.appendChild(img);

  // Description
  const divb = document.createElement('div');
  divb.classList.add('todo-description');
  divb.textContent = inp.value;
  divb.addEventListener('click', () => toggleEditMode(divb.parentElement));
  divb.addEventListener('click', () => toggleDeleteMode(divb.parentElement));
  article.appendChild(divb);

  // Trash
  const divtrash = document.createElement('div');
  divtrash.classList.add('trash-icon');
  divtrash.addEventListener('click', () => deleteItem(divtrash.parentElement));
  article.appendChild(divtrash);

  // Trash Image
  const imgtrash = document.createElement('img');
  imgtrash.src = 'assets/trash.svg';
  imgtrash.alt = 'Trash';
  divtrash.appendChild(imgtrash);

  document.querySelector('main').appendChild(article);
  document.querySelector('.overlay-background').classList.add('hide');
  inp.value = '';
}

function toggleChecked(todoElement) {
  todoElement.classList.toggle('todo-checked');
  todoElement.classList.toggle('todo-unchecked');
  todoElement.classList.remove('expand');
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

  // Icon Container
  const elTodoIcon = document.createElement('div');
  elTodoIcon.classList.add('todo-icon');
  elTodoIcon.addEventListener('click', () =>
    toggleChecked(elTodoIcon.parentElement)
  );

  // Icon Image
  const elIconImg = document.createElement('img');
  elIconImg.src = 'assets/checkmark.svg';
  elIconImg.alt = 'Checkmark';
  elTodoIcon.append(elIconImg);

  // Todo Description
  const elTodoDescription = document.createElement('div');
  elTodoDescription.classList.add('todo-description');
  elTodoDescription.innerHTML = inputValue;
  elTodoDescription.addEventListener('click', () =>
    toggleEditMode(elTodoDescription.parentElement)
  );
  elTodoDescription.addEventListener('click', () =>
    toggleDeleteMode(elTodoDescription.parentElement)
  );

  // Trash Container
  const elTrashIcon = document.createElement('div');
  elTrashIcon.classList.add('trash-icon');
  elTrashIcon.addEventListener('click', () =>
    deleteItem(elTrashIcon.parentElement)
  );

  // Trash Image
  const elTrashImg = document.createElement('img');
  elTrashImg.src = 'assets/trash.svg';
  elTrashImg.alt = 'Trash';
  elTrashIcon.append(elTrashImg);

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

function toggleClearDialog() {
  document.querySelector('.confirm-background').classList.toggle('hide');
}

function clearList() {
  document.querySelector('main').innerHTML = '';
}
