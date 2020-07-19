class TodoItem {
  constructor(id, title, done = false) {
    this._id = id;
    this._title = title;
    this._done = done;
    this._createdDate = new Date();
    this._completedDate = done ? new Date() : false;
  }

  editTitle(title) {
    this._title = title;
  }

  toggleDone() {
    this._done = !this._done;
  }
}

class TodoList {
  constructor(items = []) {
    this._items = items;
  }

  addTodo(title) {
    this._items = [...this._items, new TodoItem(this._items.length, title)];
    this.render();
  }

  editTodo(id, title) {
    this._items.find((item) => item.id === id).editTitle(title);
    this.render();
  }

  toggleDone(id) {
    this._items.find((item) => item.id === id).toggleDone();
    this.render();
  }

  deleteTodo(id) {
    this._items = this._items.filter((item) => item.id !== id);
    this.render();
  }

  clearList() {
    this._items = [];
    this.render();
  }

  showOverlay(mode, id) {
    document
      .querySelector('.overlay-background')
      .classList.remove('opacity-zero');
    document.querySelector('.overlay').classList.remove('slide-down');

    if (mode === 'add') {
      //! Overlay Header = "Add Todo"
      //! Input Field: empty
      //! Name Event Listeners // Validation
      //! Event Listener on SaveButton: addTodo() / removeListeners
      //! Event Listener on Return: addTodo() / removeListeners
      //! function to remove event listeners
    } else if (mode === 'edit' && id) {
      //! Overlay Header = "Edit Todo"
      //! Input Field: TodoItem-title
      //! Name Event Listeners // Validation
      //! Event Listener on SaveButton: editTodo() / removeListeners
      //! Event Listener on Return: editTodo() / removeListeners
      //! function to remove event listeners
    } else {
      throw new Error('Error in showOverlay function');
    }
  }

  hideOverlay() {
    // Clear input field
    // Apply classes
  }

  showDialog() {
    document
      .querySelector('.overlay-background')
      .classList.remove('opacity-zero');
    document.querySelector('.confirm-dialog').classList.remove('opacity-zero');
  }

  hideDialog() {
    document.querySelector('.overlay-background').classList.add('opacity-zero');
    document.querySelector('.confirm-dialog').classList.add('opacity-zero');
  }

  render() {
    document.querySelector('main').innerHTML = '';

    // Sort 1: Done / Not Done
    // Sort 2: Not done -> createdDate
    // Sort 3: Done -> completedDate

    this._items.forEach((item) => {
      // Todo Item
      const article = document.createElement('article');
      article.classList.add('todo-unchecked');

      // Icon
      const divt = document.createElement('div');
      divt.classList.add('todo-icon');
      divt.addEventListener('click', () => this.toggleDone(item._id));
      article.appendChild(divt);

      // Icon Image
      const img = document.createElement('img');
      img.src = 'assets/checkmark.svg';
      img.alt = 'Checkmark';
      divt.appendChild(img);

      // Description
      const divb = document.createElement('div');
      divb.classList.add('todo-description');
      divb.textContent = item.title;
      divb.addEventListener('click', () => toggleEditMode(divb.parentElement));
      divb.addEventListener('click', () =>
        toggleDeleteMode(divb.parentElement)
      );
      article.appendChild(divb);

      // Trash
      const divtrash = document.createElement('div');
      divtrash.classList.add('trash-icon');
      divtrash.addEventListener('click', () => this.deleteItem(item.id));
      article.appendChild(divtrash);

      // Trash Image
      const imgtrash = document.createElement('img');
      imgtrash.src = 'assets/trash.svg';
      imgtrash.alt = 'Trash';
      divtrash.appendChild(imgtrash);

      document.querySelector('main').appendChild(article);
    });
  }
}

/*
 *  ### App (class)
 *  constructor: this._TodoList = new TodoList([]); -> pass methods like props here if needed
 *  constructor: this._initializeApp();
 *  method: _initializeApp()
 *    - Set up EventListeners for all the Components/Elements (Break them out as named private functions inside the class)
 *        -> _listenClearListButton, _listenAddButton, _listenCancelOverlayAdd, _listenCancelOverlayEdit, _listenKeydownAdd,
 *           _listenKeydownEdit, _listenSubmitAdd, _listenSubmitEdit, _listenSubmitDialog, _listenCancelDialog
 *
 *  ### showEditOverlay (method)
 *  - use data-attribute to store/get the id of the current item that's been edited in/from the HTML
 */

// DOM OPERATIONS
const App = new TodoList();

// Toggle overlay functions
document.querySelector('.add-todo').addEventListener('click', App.showOverlay);
document
  .querySelector('.cancel-overlay')
  .addEventListener('click', App.hideOverlay);

// Clear List button
document.querySelector('.clear-list').addEventListener('click', App.showDialog);

// Clear dialog: Confirm button
document.querySelector('.confirm-delete').addEventListener('click', () => {
  App.clearList();
  App.hideDialog();
});

// Clear dialog: Cancel button
document
  .querySelector('.cancel-delete')
  .addEventListener('click', App.hideDialog);

// FUNCTIONS
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

function toggleDeleteMode(todoElement) {
  // We don't want to activate delete mode on active items
  if (todoElement && todoElement.classList.contains('todo-checked'))
    todoElement.classList.toggle('expand');
}

function hideAndResetOverlay() {
  document.querySelector('.overlay-background').classList.add('opacity-zero');
  document.querySelector('.overlay').classList.add('slide-down');
  document.querySelector('#overlay-input').value = '';
}

function showOverlay() {
  document
    .querySelector('.overlay-background')
    .classList.remove('opacity-zero');
  document.querySelector('.overlay').classList.remove('slide-down');
}

function saveEdit(todoElement) {
  // TODO
}

function toggleClearDialog() {
  document
    .querySelector('.overlay-background')
    .classList.toggle('opacity-zero');
  document.querySelector('.confirm-dialog').classList.toggle('opacity-zero');
}
