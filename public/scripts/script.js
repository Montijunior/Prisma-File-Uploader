// Select elements
const openModal = document.getElementById("openModal");
const formFolder = document.getElementById("folderForm");
const folderName = document.getElementById("folderName");
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("submit");
const createFolderLink = document.getElementById("create-folder");

// Edit modal variables
const editModal = document.getElementById("editButton");
const editForm = document.getElementById("editForm");
const editName = document.getElementById("editName");
const cancelEdit = document.getElementById("cancelEdit");
const submitEdit = document.getElementById("submitEdit");

// Functions to handle folder modal
function showFolderModal() {
  if (formFolder) {
    formFolder.classList.remove("hidden");
    if (folderName) folderName.textContent = ""; // Reset folder name
  }
}

function hideFolderModal() {
  if (formFolder) {
    formFolder.classList.add("hidden");
    if (folderName) folderName.textContent = ""; // Reset folder name
  }
}

// Functions to handle edit modal
function showEditModal() {
  if (editForm) {
    editForm.classList.remove("hidden");
    if (editName) editName.value = ""; // Reset edit name input
  }
}

function hideEditModal() {
  if (editForm) {
    editForm.classList.add("hidden");
    if (editName) editName.value = ""; // Reset edit name input
  }
}

// Add event listeners safely
if (openModal) {
  openModal.addEventListener("click", showFolderModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", hideFolderModal);
}

if (submitBtn) {
  submitBtn.addEventListener("click", hideFolderModal);
}

if (createFolderLink) {
  createFolderLink.addEventListener("click", showFolderModal);
}

if (editModal) {
  editModal.addEventListener("click", showEditModal);
}

if (cancelEdit) {
  cancelEdit.addEventListener("click", hideEditModal);
}

if (submitEdit) {
  submitEdit.addEventListener("click", hideEditModal);
}
