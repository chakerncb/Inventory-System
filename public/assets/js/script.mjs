
const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

   
    if (isEmail(identifier)) {
        console.log('Logging in with email:', identifier);
    } else if (isPhone(identifier)) {
        console.log('Logging in with phone:', identifier);
    } else {
        alert('Please enter a valid email or phone number.');
        return;
    }

    console.log('Password:', password);
    alert('Login successful!');
});

function isEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

function isPhone(input) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(input);
}

