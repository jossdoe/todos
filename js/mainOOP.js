class TodoItem {
  constructor(title, done = false) {
    this._id = Math.floor(Math.random() * (99999 - 1) + 1);
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
    this.render();
  }

  addTodo(title) {
    this._items = [...this._items, new TodoItem(title)];
    this.render();
  }

  editTodo(id, title) {
    this._items.find((item) => item._id === parseInt(id)).editTitle(title);
    this.render();
  }

  toggleDone(id) {
    this._items.find((item) => item._id === parseInt(id)).toggleDone();
    this.render();
  }

  deleteTodo(id) {
    this._items = this._items.filter((item) => item._id !== id);
    this.render();
  }

  clearList() {
    this._items = [];
    this.render();
  }

  render() {
    document.querySelector('main').innerHTML = '';

    // Sort 1: Done / Not Done
    // Sort 2: Not done -> createdDate
    // Sort 3: Done -> completedDate

    this._items.forEach((item) => {
      // Todo Item
      const article = document.createElement('article');
      article.classList.add(item._done ? 'todo-checked' : 'todo-unchecked');

      // Icon
      const divt = document.createElement('div');
      divt.classList.add('todo-icon');
      divt.addEventListener('click', () => {
        this.toggleDone(item._id);
      });
      article.appendChild(divt);

      // Icon Image
      const img = document.createElement('img');
      img.src = 'assets/checkmark.svg';
      img.alt = 'Checkmark';
      divt.appendChild(img);

      // Description
      const divb = document.createElement('div');
      divb.classList.add('todo-description');
      divb.textContent = item._title;
      divb.addEventListener('click', () =>
        this._showEditOverlay(item._id, item._title)
      );
      article.appendChild(divb);

      // Trash
      const divtrash = document.createElement('div');
      divtrash.classList.add('trash-icon');
      // divtrash.addEventListener('click', () => this.deleteItem(item._id));
      article.appendChild(divtrash);

      // Trash Image
      const imgtrash = document.createElement('img');
      imgtrash.src = 'assets/trash.svg';
      imgtrash.alt = 'Trash';
      divtrash.appendChild(imgtrash);

      document.querySelector('main').appendChild(article);
    });
  }

  _showEditOverlay(id, inputValue) {
    const overlayNode = document.querySelector('.overlay-edit');
    overlayNode.setAttribute('data-id', id);

    const inputFieldNode = document.getElementById('overlay-edit-input');
    inputFieldNode.value = inputValue;

    document
      .querySelector('.overlay-background')
      .classList.remove('opacity-zero');
    overlayNode.classList.remove('slide-down');
  }
}

class App {
  constructor(items = []) {
    this._TodoList = new TodoList(items);
    this._initializeApp();
  }

  _initializeApp() {
    this._listenShowDialog();
    this._listenSubmitDialog();
    this._listenCancelDialog();
    this._listenAddButton();
    this._listenSubmitAdd();
    this._listenKeydownAdd();
    this._listenCancelAddOverlay();
    this._listenSubmitEdit();
    this._listenKeydownEdit();
    this._listenCancelEditOverlay();
  }

  _listenShowDialog() {
    document.querySelector('.clear-list').addEventListener('click', () => {
      document
        .querySelector('.overlay-background')
        .classList.remove('opacity-zero');
      document
        .querySelector('.confirm-dialog')
        .classList.remove('opacity-zero');
    });
  }

  _listenSubmitDialog() {
    document.querySelector('.confirm-delete').addEventListener('click', () => {
      this._TodoList.clearList();
      document
        .querySelector('.overlay-background')
        .classList.add('opacity-zero');
      document.querySelector('.confirm-dialog').classList.add('opacity-zero');
    });
  }

  _listenCancelDialog() {
    document.querySelector('.cancel-delete').addEventListener('click', () => {
      document
        .querySelector('.overlay-background')
        .classList.add('opacity-zero');
      document.querySelector('.confirm-dialog').classList.add('opacity-zero');
    });
  }

  _listenAddButton() {
    document.querySelector('.add-todo').addEventListener('click', () => {
      document
        .querySelector('.overlay-background')
        .classList.remove('opacity-zero');
      document.querySelector('.overlay-add').classList.remove('slide-down');
    });
  }

  _listenSubmitAdd() {
    document
      .querySelector('.overlay-add .submit-overlay')
      .addEventListener('click', (e) => {
        e.preventDefault();
        const inputField = document.getElementById('overlay-add-input');
        this._TodoList.addTodo(inputField.value);
        inputField.value = '';
        document
          .querySelector('.overlay-background')
          .classList.add('opacity-zero');
        document.querySelector('.overlay-add').classList.add('slide-down');
      });
  }

  _listenKeydownAdd() {
    const inputField = document.getElementById('overlay-add-input');
    inputField.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;

      e.preventDefault();
      this._TodoList.addTodo(inputField.value);
      inputField.value = '';

      document
        .querySelector('.overlay-background')
        .classList.add('opacity-zero');
      document.querySelector('.overlay-add').classList.add('slide-down');
    });
  }

  _listenCancelAddOverlay() {
    document
      .querySelector('.overlay-add .cancel-overlay')
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-background')
          .classList.add('opacity-zero');
        document.querySelector('.overlay-add').classList.add('slide-down');

        document.getElementById('overlay-add-input').value = '';
      });
  }

  _listenSubmitEdit() {
    document
      .querySelector('.overlay-edit .submit-overlay')
      .addEventListener('click', (e) => {
        e.preventDefault();

        const overlayNode = document.querySelector('.overlay-edit');
        const todoId = overlayNode.dataset.id;

        const inputField = document.getElementById('overlay-edit-input');
        const inputValue = inputField.value;

        this._TodoList.editTodo(todoId, inputValue);

        document
          .querySelector('.overlay-background')
          .classList.add('opacity-zero');
        document.querySelector('.overlay-edit').classList.add('slide-down');

        inputField.value = '';
      });
  }

  _listenKeydownEdit() {
    document
      .querySelector('.overlay-edit .submit-overlay')
      .addEventListener('keydown', (e) => {
        if (e.keyCode !== 13) return;

        e.preventDefault();

        const overlayNode = document.querySelector('.overlay-edit');
        const todoId = overlayNode.dataset.id;

        const inputField = document.getElementById('overlay-edit-input');
        const inputValue = inputField.value;

        this._TodoList.editTodo(todoId, inputValue);

        document
          .querySelector('.overlay-background')
          .classList.add('opacity-zero');
        document.querySelector('.overlay-edit').classList.add('slide-down');

        inputField.value = '';
      });
  }

  _listenCancelEditOverlay() {
    document
      .querySelector('.overlay-edit .cancel-overlay')
      .addEventListener('click', () => {
        document
          .querySelector('.overlay-background')
          .classList.add('opacity-zero');
        document.querySelector('.overlay-edit').classList.add('slide-down');
      });
  }
}

const application = new App([
  new TodoItem('Step One: Eat all the candy'),
  new TodoItem('Step Two: ?'),
  new TodoItem('Step Three: Profit')
]);
