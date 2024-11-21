const openModal = document.getElementById("openModal");
const formFolder = document.getElementById("folderForm");
const folderName = document.getElementById("folderName");
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("submit");
const createFolderLink = document.getElementById("create-folder");

function removeClass() {
  formFolder.classList.remove("hidden");
  folderName.textContent = "";
}
function addClass() {
  formFolder.classList.add("hidden");
  folderName.textContent = "";
}

openModal.addEventListener("click", removeClass);
cancelBtn.addEventListener("click", addClass);
submitBtn.addEventListener("click", addClass);
createFolderLink.addEventListener("click", removeClass);
