"use strict";
const modalAddInfo = document.getElementById("modalAddInfo");
const addInfo = document.getElementById("btn-add");
const close = document.getElementById("close");
const form = document.querySelector("form");
const taskId = document.getElementById("id");
let id = 0;
let userArr = [];

addInfo.addEventListener("click", () => {
  modalAddInfo.style.display = "block";
});
close.addEventListener("click", () => {
  modalAddInfo.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == modalAddInfo) {
    modalAddInfo.style.display = "none";
  }
});
form.addEventListener("submit", submitData);
function submitData(event) {
  event.preventDefault();
  const { task, priority, status, deadline } = event.target;
  const userData = {
    taskName: task.value,
    taskPriority: priority.value,
    taskStatus: status.value,
    taskDeadLine: deadline.value,
    id,
  };
  taskId.innerText = id;
  id++;
  userArr.push(userData);
  // console.log(userArr);
}
