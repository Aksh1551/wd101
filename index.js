const registrationForm = document.getElementById('registrationForm');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

// Load saved data from web storage
document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  savedData.forEach(userData => {
    addRowToTable(userData);
  });
});

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('acceptedTerms').checked;

  const age = calculateAge(dob);
  if (age >= 18 && age <= 55 && name && email && password && acceptedTerms) {
    const userData = { name, email, password, dob, acceptedTerms };
    addRowToTable(userData);
    saveToLocalStorage(userData);
    registrationForm.reset();
  } else {
    alert('Please fill in all fields correctly and accept the terms. Your age should be between 18 and 55.');
  }
});

function addRowToTable(userData) {
  const newRow = dataTable.insertRow();
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  cell1.textContent = userData.name;
  cell2.textContent = userData.email;
  cell3.textContent = userData.password;
  cell4.textContent = userData.dob;
  cell5.textContent = userData.acceptedTerms ? 'Yes' : 'No';
}

function saveToLocalStorage(userData) {
  const savedData = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  savedData.push(userData);
  localStorage.setItem('registeredUsers', JSON.stringify(savedData));
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

