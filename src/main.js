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
  id++;
  userArr.push(userData);
  renderData(userData);
}

function renderData(userData) {
  const tableBody = document.querySelector("tbody");
  // tableBody.innerHTML = "";
  userArr.forEach(() => {
      const newRow = document.createElement("tr")
        newRow.innerHTML = `<td class="border p-3">${userData.taskName}<span id="id"> ${id}</span></td>
        <td class="border text-center">${userData.taskPriority}</td>
        <td class="border text-center">${userData.taskStatus}</td>
        <td class="border text-center">${userData.taskDeadLine}</td>
        <td
          class="border py-3 flex flex-col sm:flex-row items-center justify-center sm:gap-1"
        >
          <img
            width="38"
            height="38"
            src="https://img.icons8.com/sf-black-filled/38/dc3545/delete-forever.png"
            alt="delete-forever"
            id="delete"
          />
          <img
            width="38"
            height="38"
            src="https://img.icons8.com/sf-black-filled/38/0d6efd/create-new.png"
            alt="create-new"
            id="edit"
          />
          <img
            width="38"
            height="38"
            src="https://img.icons8.com/ios-glyphs/38/6c757d/preview-pane.png"
            alt="preview-pane"
            id="seen"
          />
        </td>`;
      tableBody.append(newRow)
      // console.log(newRow);
  });
}
