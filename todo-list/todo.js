const inputElement = document.querySelector('#input--add');
const listElement = document.querySelector('.todo-collection');
const todoForm = document.querySelector('.todo-form');

const savedTodos = localStorage.getItem('todos');
const todoList = savedTodos ? JSON.parse(savedTodos) : [];

todoList.forEach(element => {
  addTodo(element);
});

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (inputElement.value !== '') {
    addTodo(inputElement.value);
    todoList.push(inputElement.value);
    localStorage.setItem('todos', JSON.stringify(todoList));
    inputElement.value = '';
  } else {
    todoForm.classList.toggle('shake-horizontal');
    setTimeout(() => {
      todoForm.classList.toggle('shake-horizontal')
    }, 500)
  }
});

function addTodo(inputValue) {
  const li = document.createElement('li');
  const todoTitle = document.createElement('span');
  const saveButton = document.createElement('button');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  
  li.classList.add('todo-collection__item');

  todoTitle.classList.add('todo-collection__item__title');
  todoTitle.innerText = inputValue;

  editInput.classList.add('hidden');
  editInput.classList.add('input');
  editInput.classList.add('input--todo');
  editInput.type = 'text';
  editInput.value = inputValue;

  editButton.classList.add('button');
  editButton.classList.add('button--todo');
  editButton.classList.add('button--edit');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', () => {
    todoTitle.classList.toggle('hidden');
    editInput.classList.toggle('hidden');
    editInput.focus();
    saveButton.classList.toggle('hidden');
    editButton.classList.toggle('hidden');
  });
  
  saveButton.classList.add('button');
  saveButton.classList.add('button--todo');
  saveButton.classList.add('button--save');
  saveButton.classList.add('hidden');
  saveButton.innerText = 'Save';
  saveButton.addEventListener('click', () => {
    saveButton.classList.toggle('hidden');
    editButton.classList.toggle('hidden');
    editInput.classList.toggle('hidden');
    todoTitle.classList.toggle('hidden');
    todoTitle.innerText = editInput.value;
    let todos = [];
    document.querySelectorAll('.todo-collection__item__title').forEach(element => {
      todos.push(element.innerText);
    });
    localStorage.setItem('todos', JSON.stringify(todos))
  });

  deleteButton.classList.add('button');
  deleteButton.classList.add('button--todo');
  deleteButton.classList.add('button--delete');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    listElement.removeChild(li);
    let todos = [];
    document.querySelectorAll('.todo-collection__item__title').forEach(element => {
      todos.push(element.innerText);
    });
    localStorage.setItem('todos', JSON.stringify(todos))
  });

  li.appendChild(todoTitle);
  li.appendChild(editInput);
  li.appendChild(editButton);
  li.appendChild(saveButton);
  li.appendChild(deleteButton);
  listElement.appendChild(li);
};

