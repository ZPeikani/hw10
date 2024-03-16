"use strict";
const modalAddInfo = document.getElementById("modalAddInfo");
const addInfo = document.getElementById("btn-add");
const close = document.getElementById("close");
const form = document.querySelector("form");
const taskId = document.getElementById("id");
let id = 0;
const userArr = [];

const storedData = localStorage.getItem("userData");
if (storedData) {
  userArr.push(...JSON.parse(storedData));
  userArr.forEach(renderData);
}

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
  localStorage.setItem("userData", JSON.stringify(userArr));
  event.target.reset();
}

function renderData(userData) {
  const tableBody = document.querySelector("tbody");
  const index = userArr.indexOf(userData);
  // tableBody.innerHTML = "";
  const newRow = document.createElement("tr");
  newRow.classList.add("border");
  newRow.innerHTML = `<td class="border p-3">${userData.taskName}</td>
        <td class="border text-center"><span id="priority-${index}">${userData.taskPriority}</span></td>
        <td class="border text-center"><span id="status-${index}">${userData.taskStatus}</span></td>
        <td class="border text-center">${userData.taskDeadLine}</td>
        <td
          class="flex flex-col sm:flex-row items-center justify-center sm:gap-1"
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
  tableBody.append(newRow);
  priorityAdditionalClass(index);
  statusAdditionalClass(index);
}

function priorityAdditionalClass(index) {
  const priority = document.getElementById(`priority-${index}`);
  if (userArr[index].taskPriority == "Medium") {
    priority.classList.add("bg-yellow-500", "rounded-lg", "text-white", "p-1");
  }
  if (userArr[index].taskPriority == "Low") {
    priority.classList.add("bg-gray-300", "rounded-lg", "text-white", "p-1");
  }
  if (userArr[index].taskPriority == "High") {
    priority.classList.add("bg-red-600", "rounded-lg", "text-white", "p-1");
  }
}
function statusAdditionalClass(index) {
  const status = document.getElementById(`status-${index}`);
  if (userArr[index].taskStatus == "Doing") {
    status.classList.add("bg-yellow-500", "rounded-lg", "text-white", "p-1");
  }
  if (userArr[index].taskStatus == "Done") {
    status.classList.add("bg-green-700", "rounded-lg", "text-white", "p-1");
  }
  if (userArr[index].taskStatus == "Todo") {
    status.classList.add("bg-red-600", "rounded-lg", "text-white", "p-1");
  }
}
