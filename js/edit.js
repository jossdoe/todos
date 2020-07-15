// Replace content of Todo-element with field & button
const toggleEditMode = (textElement) => {
  const description = textElement.innerHTML;
  const todoElement = textElement.parentElement;

  const editField = document.createElement('input');
  editField.type = 'text';
  editField.value = description;

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'Save';

  todoElement.innerHTML = '';
  todoElement.append(editField);
  todoElement.append(saveButton);
};

// Event Listener to toggle edit modes
document.querySelectorAll('.todo-unchecked .todo-description').forEach((el) => {
  el.addEventListener('click', () => toggleEditMode(el));
});
