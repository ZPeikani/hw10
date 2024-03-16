"use strict";
const modalAddInfo = document.getElementById("modalAddInfo");
const addInfo = document.getElementById("btn-add");
const close = document.getElementById("close");
const form = document.querySelector("form");
const main = document.querySelector("main");
const showInfoModal = document.querySelector("showInfoModal");
const seenModal = document.getElementById("showInfoModal");
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
  if (e.target == showInfoModal) {
    showInfoModal.style.display = "none";
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
  const seenBtn = newRow.querySelector("#seen");
  seenBtn.addEventListener("click", function () {
    seenModal.classList.remove("hidden");
    seenInfo(userData);
  });
}
function seenInfo(userData) {
  const index = userArr.indexOf(userData);
  seenModal.innerHTML = `<div
  class="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-gray-400 bg-opacity-40"
>
  <div
    class="bg-white p-5 border w-2/3 my-28 mx-auto sm:w-1/2"
    id="modalSeenInfo"
  >
    <span
      class="text-black float-right text-3xl font-bold hover:cursor-pointer"
      id="close"
      >&times;</span>
    <div class="flex flex-col gap-4">
    <p class="text-2xl font-bold">${userData.taskName}</p>
    <div>
          <p class="text-Xl font-bold">Priority :</p>
          <p id="priorityModal-${index}">${userData.taskPriority}</p>
          </div>
          <div>
          <p class="text-Xl font-bold">Status :</p>
          <p id="statusModal-${index}">${userData.taskStatus}</p>
          </div>
          <p class="opacity-50">${userData.taskDeadLine}</p>
          </div>
  </div>
</div>`;
  main.append(seenModal);
  priorityModalClass(index);
  statusModalClass(index);
  const closeBtn = seenModal.querySelector("#close");
  closeBtn.addEventListener("click", function () {
    seenModal.classList.add("hidden");
  });
}
function priorityAdditionalClass(index) {
  const priority = document.getElementById(`priority-${index}`);
  if (userArr[index].taskPriority == "Medium") {
    priority.classList.add("bg-yellow-500", "rounded-xl", "text-white", "p-1");
  }
  if (userArr[index].taskPriority == "Low") {
    priority.classList.add("bg-gray-400", "rounded-xl", "text-white", "p-1");
  }
  if (userArr[index].taskPriority == "High") {
    priority.classList.add("bg-red-600", "rounded-xl", "text-white", "p-1");
  }
}
function statusAdditionalClass(index) {
  const status = document.getElementById(`status-${index}`);
  if (userArr[index].taskStatus == "Doing") {
    status.classList.add("bg-yellow-500", "rounded-xl", "text-white", "p-1");
  }
  if (userArr[index].taskStatus == "Done") {
    status.classList.add("bg-green-700", "rounded-xl", "text-white", "p-1");
  }
  if (userArr[index].taskStatus == "Todo") {
    status.classList.add("bg-red-600", "rounded-xl", "text-white", "p-1");
  }
}

function priorityModalClass(index) {
  const priorityModal = document.getElementById(`priorityModal-${index}`);
  if (userArr[index].taskPriority == "Medium") {
    priorityModal.classList.add(
      "bg-yellow-500",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
  if (userArr[index].taskPriority == "Low") {
    priorityModal.classList.add(
      "bg-gray-400",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
  if (userArr[index].taskPriority == "High") {
    priorityModal.classList.add(
      "bg-red-600",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
}
function statusModalClass(index) {
  const statusModal = document.getElementById(`statusModal-${index}`);
  if (userArr[index].taskStatus == "Doing") {
    statusModal.classList.add(
      "bg-yellow-500",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
  if (userArr[index].taskStatus == "Done") {
    statusModal.classList.add(
      "bg-green-700",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
  if (userArr[index].taskStatus == "Todo") {
    statusModal.classList.add(
      "bg-red-600",
      "rounded-xl",
      "text-white",
      "p-1",
      "w-1/6",
      "text-center"
    );
  }
}
