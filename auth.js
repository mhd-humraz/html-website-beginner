// Authentication Functions
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[name="remember"]').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this to your server
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to main page
            window.location.href = 'index.html';
        });
    }

    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!document.querySelector('input[name="terms"]').checked) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // In a real app, you would send this to your server
            console.log('Registration:', { name, email, password });
            
            // Simulate successful registration and login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            
            // Redirect to main page
            window.location.href = 'index.html';
        });
    }
    
    // Check login status on main page
    if (window.location.pathname.includes('index.html')) {
        checkLoginStatus();
    }
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.createElement('a');
    
    if (isLoggedIn) {
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName') || userEmail;
        
        loginLink.href = '#';
        loginLink.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        loginLink.classList.add('user-profile');
        
        // Add logout functionality
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.reload();
        });
    } else {
        loginLink.href = 'login.html';
        loginLink.textContent = 'Login';
    }
    
    const nav = document.querySelector('nav ul');
    if (nav) {
        const li = document.createElement('li');
        li.appendChild(loginLink);
        nav.appendChild(li);
    }
}