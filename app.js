// DOM elementlarini olish
const addStudentBtn = document.getElementById('addStudentBtn');
const studentModal = document.getElementById('studentModal');
const closeModal = document.getElementById('closeModal');
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').querySelector('tbody');
const searchInput = document.getElementById('searchInput');
const groupFilter = document.getElementById('groupFilter');

// Modalni ochish
let editingRow = null;
addStudentBtn.addEventListener('click', () => {
  studentForm.reset();
  editingRow = null;
  studentModal.classList.remove('hidden');
});

// Modalni yopish
closeModal.addEventListener('click', () => {
  studentModal.classList.add('hidden');
});

// Formni submit qilish
studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const group = document.getElementById('group').value;
  const doesWork = document.getElementById('doesWork').checked;

  if (editingRow) {
    // Tahrirlash
    editingRow.cells[1].textContent = firstname;
    editingRow.cells[2].textContent = lastname;
    editingRow.cells[3].textContent = group;
    editingRow.cells[4].textContent = doesWork ? 'Yes' : 'No';
    editingRow = null;
  } else {
    // Yangi o'quvchini qo'shish
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${studentTable.children.length + 1}</td>
      <td>${firstname}</td>
      <td>${lastname}</td>
      <td>${group}</td>
      <td>${doesWork ? 'Yes' : 'No'}</td>
      <td>
        <button class="action-btn edit-btn">Edit</button>
        <button class="action-btn delete-btn">Delete</button>
      </td>
    `;
    studentTable.appendChild(newRow);

    // Tugmalarga hodisalarni biriktirish
    addRowEventListeners(newRow);
  }

  studentModal.classList.add('hidden');
  studentForm.reset();
});

// Qidirish funksiyasi
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  Array.from(studentTable.children).forEach((row) => {
    const name = row.cells[1].textContent.toLowerCase();
    const lastName = row.cells[2].textContent.toLowerCase();
    row.style.display = name.includes(searchValue) || lastName.includes(searchValue) ? '' : 'none';
  });
});

// Guruh bo'yicha filtr
groupFilter.addEventListener('change', () => {
  const selectedGroup = groupFilter.value;
  Array.from(studentTable.children).forEach((row) => {
    const group = row.cells[3].textContent;
    row.style.display = selectedGroup === 'All' || group === selectedGroup ? '' : 'none';
  });
});

// Tugmalar uchun eventlar
function addRowEventListeners(row) {
  const editBtn = row.querySelector('.edit-btn');
  const deleteBtn = row.querySelector('.delete-btn');

  editBtn.addEventListener('click', () => {
    editingRow = row;
    document.getElementById('firstname').value = row.cells[1].textContent;
    document.getElementById('lastname').value = row.cells[2].textContent;
    document.getElementById('group').value = row.cells[3].textContent;
    document.getElementById('doesWork').checked = row.cells[4].textContent === 'Yes';
    studentModal.classList.remove('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    row.remove();
    updateRowNumbers();
  });
}

// Raqamlashni yangilash
function updateRowNumbers() {
  Array.from(studentTable.children).forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}
