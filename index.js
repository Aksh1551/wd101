const registrationForm = document.getElementById('registrationForm');
const dataBody = document.getElementById('dataBody');

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const dobInput = document.getElementById('dob');
  const termsInput = document.getElementById('acceptTerms');

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const dob = dobInput.value;
  const acceptTerms = termsInput.checked;

  const validEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  
  const today = new Date();
  const dobDate = new Date(dob);
  const ageInMilliseconds = today - dobDate;
  const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;

  if (ageInYears < 18 || ageInYears > 55 ) {
    document.getElementById('birthday-error').innerHTML='<i class="fa-solid fa-circle-exclamation"></i>Your age must between 18 and 55 years to register.';
    return;
  }

  function store(){

    const data = {
      name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms,
    };
    var num=window.localStorage.length+1;
    window.localStorage.setItem(num,JSON.stringify(data));  
    
      var myData = JSON.parse(window.localStorage.getItem(num));
  const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = myData.name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = myData.email;
    row.appendChild(emailCell);

    const passwordCell = document.createElement('td');
    passwordCell.textContent = myData.password;
    row.appendChild(passwordCell);

    const dobCell = document.createElement('td');
    dobCell.textContent = myData.dob;
    row.appendChild(dobCell);

    const acceptTermsCell = document.createElement('td');
    acceptTermsCell.textContent = myData.acceptTerms;
    row.appendChild(acceptTermsCell);

    dataBody.appendChild(row);

    
}
store();
});
