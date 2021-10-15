const form = document.querySelector('#need-validation');
const username = document.querySelector('#floatingInputUsername');
const useremail = document.querySelector('#floatingInputEmail');
const userPassword = document.querySelector('#floatingPassword');
const userPasswordCheck = document.querySelector('#floatingPasswordCheck');
const userType = document.querySelector('#floatingUserType');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let flag = true;
    const checkValidity = checkInputs(flag);
    if (checkValidity !== false) {
        form.submit();
    }
});


const checkInputs = (flag) => {
    const usernameValue = username.value.trim();
    const useremailValue = useremail.value.trim();
    const userPasswordValue = userPassword.value.trim();
    const userPasswordCheckValue = userPasswordCheck.value.trim();
    const userTypeValue = userType.value.trim();

    if (usernameValue === '') {
        flag = false;
        setErrorFor(username, 'Username cannot be empty');
    } else {
        setSuccessFor(username);
    }

    if (useremailValue === '') {
        flag = false;
        setErrorFor(useremail, 'Email cannot be empty')
    } else if (!isEmail(useremailValue)) {
        flag = false;
        setErrorFor(useremail, 'Not a Valid Email')
    } else {
        setSuccessFor(useremail);
    }

    if (userPasswordValue === '') {
        flag = false;
        setErrorFor(userPassword, 'Password cannot be blank');
    } else if (userPasswordValue.length < 6) {
        flag = false;
        setErrorFor(userPassword, 'Password must have more than 6 character');
    } else {
        setSuccessFor(userPassword);
    }

    if (userPasswordCheckValue === '') {
        flag = false;
        setErrorFor(userPasswordCheck, 'Password Check cannot be empty');
    } else if (userPasswordCheckValue !== userPasswordValue) {
        flag = false;
        setErrorFor(userPasswordCheck, 'Password dose not match');
    } else {
        setSuccessFor(userPasswordCheck);
    }

    if (userTypeValue === 'Choose...') {
        flag = false;
        setErrorForType(userType, 'Choose a valid user type');
    } else {
        setSuccessForType(userType);
    }
    return flag;
}

const setErrorFor = (input, message) => {
    const formFloating = input.parentElement;
    const small = formFloating.querySelector('small');
    small.innerText = message;
    formFloating.className = 'form-floating error';
}

const setErrorForType = (select, message) => {
    const formFloating = select.parentElement;
    const small = formFloating.querySelector('small');
    small.innerText = message;
    formFloating.className = 'form-floating error';
}

const setSuccessFor = (input) => {
    const formFloating = input.parentElement;
    formFloating.className = 'form-floating success';
}

const setSuccessForType = (select) => {
    const formFloating = select.parentElement;
    formFloating.className = 'form-floating success';
}

const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}