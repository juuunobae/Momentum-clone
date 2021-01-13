const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDo(toDo) {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDo));
}

function btnClickHandle(e) {
  e.preventDefault();
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo(toDos);
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  btn.innerText = "❌";
  btn.addEventListener("click", btnClickHandle);
  li.id = newId;
  li.appendChild(btn);
  li.appendChild(span);
  toDoList.appendChild(li);
  toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDo(toDos);
}

function submitHandle(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadedToDOs() {
  const loadedToDo = localStorage.getItem(TODOS_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach((toDo) => {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadedToDOs();
  toDoForm.addEventListener("submit", submitHandle);
}

init();
