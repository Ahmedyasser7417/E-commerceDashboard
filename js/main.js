//-----------------login-----------------
// Sample user data for testing
// const users = [
//     {
//         username: 'user',
//         email: 'test@example.com',
//         password: '123456',
//         role: 'user'
//     },
//     {
//         username: 'admin',
//         email: 'admin@example.com', 
//         password: 'admin123',
//         role: 'admin'
//     }
// ];

// // Store users in localStorage
// localStorage.setItem('users', JSON.stringify(users));



$(document).ready(function() {
    const $loginForm = $('#loginForm');
    const $emailInput = $('#email');
    const $passwordInput = $('#password');
    const $submitBtn = $('#submitBtn');
    const $registerBtn = $('#registerbtn');
    const $forget = $('#forget');

    // Create error message element
    const $errorMsg = $('<div>').addClass('msg');
    $loginForm.prepend($errorMsg);

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation function
    function isValidPassword(password) {
        return password.length >= 6;
    }

    // Form submission handler
    $loginForm.on('submit', function(e) {
        e.preventDefault();
        
        const email = $emailInput.val().trim();
        const password = $passwordInput.val().trim();
        
        // Reset error message
        $errorMsg.hide().text('');
        
        // Validate email
        if (!email) {
            showError('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Validate password
        if (!password) {
            showError('Please enter your password');
            return;
        }
        
        if (!isValidPassword(password)) {
            showError('Password must be at least 6 characters long');
            return;
        }
        
        // Check local storage for user credentials
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.find(user => user.email === email && user.password === password);

        if (userExists) {
            // Store current user and redirect to home
            localStorage.setItem('currentUser', JSON.stringify(userExists));
            //if user is admin, redirect to dashboard page
            if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).role === 'admin') {
            window.location.href = 'index.html';
            }

            //if user is user, redirect to home page
            if (localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).role === 'user') {
            window.location.href = '/home';
            }
        } else {
            // User not found, show registration message
            showError("Account not found. Please register first.");
        }
    });

    // Register button click handler
    $registerBtn.on('click', function() {
        // TODO: Add your registration page redirection logic here
        console.log('Redirect to registration page');
    });

    // Helper function to show error messages
    function showError(message) {
        $errorMsg.text(message).show();
    }

    // Add input event listeners for real-time validation
    $emailInput.on('input', function() {
        if ($errorMsg.is(':visible')) {
            $errorMsg.hide();
        }
    });

    $passwordInput.on('input', function() {
        if ($errorMsg.is(':visible')) {
            $errorMsg.hide();
        }
    });
});


//-----------------dashboard-----------------
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Worldwide Sales Chart
    $(".worldwide-sales").each(function(index, canvas) {
        var ctx = canvas.getContext("2d");
        // Now you can create a chart for each canvas
        new Chart(ctx, {
            type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "#915ef6"
                    
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "#3b285f"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "#327aff"
                }
            ]
            },
        options: {
            responsive: true
        }
        });
    });




    // Doughnut Chart
    $(".doughnut-chart").each(function(index, canvas) {
        var ctx = canvas.getContext("2d");
        // Now you can create a chart for each canvas
        new Chart(ctx, {
            type: "doughnut",
        data: {
            labels: ["Users", "Sellers", "Admins"],
            datasets: [{
                backgroundColor: [
                    "#915ef6",
                    "#3b285f",
                    "#327aff"
                ],
                data: [60, 20, 20]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
        });
    });

    // Salse & Revenue Chart
    $(".salse-revenue").each(function(index, canvas) {
        var ctx2 = canvas.getContext("2d");
        new Chart(ctx2, {
            type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "#915ef6",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "#3b285f",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
        });
    });

    
    
})(jQuery);

// Sidebar navigation script 

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item.nav-link, .chart-header').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove 'active' from all links
            document.querySelectorAll('.nav-item.nav-link, .chart-header').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // If a chart-header is clicked, also activate the corresponding sidebar link
            if (this.classList.contains('chart-header')) {
                const section = this.getAttribute('data-section');
                const sidebarLink = document.querySelector('.nav-item.nav-link[data-section="' + section + '"]');
                if (sidebarLink) {
                    sidebarLink.classList.add('active');
                }
            }
            // Show spinner
            document.getElementById('spinner').classList.add('show');
            // Hide all sections immediately
            document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
            // After a short delay, hide spinner and show the selected section
            setTimeout(() => {
                document.getElementById('spinner').classList.remove('show');
                const section = this.getAttribute('data-section');
                document.getElementById(section + '-section').style.display = 'block';
            }, 500); // 500ms delay, adjust as needed
        });
    });
});

// User Management System
class UserManager {
    constructor() {
        // Initialize with sample data if no users exist
        const storedUsers = localStorage.getItem('users');
        console.log('Stored users:', storedUsers);
        
        if (!storedUsers) {
            console.log('No stored users found, initializing with sample data');
            this.users = [
                { username: 'admin1', email: 'admin1@example.com', password: 'admin123', role: 'admin' },
                { username: 'merchant1', email: 'merchant1@example.com', password: 'merchant123', role: 'merchant' },
                { username: 'user1', email: 'user1@example.com', password: 'user123', role: 'user' }
            ];
            this.saveUsers();
        } else {
            console.log('Loading stored users');
            this.users = JSON.parse(storedUsers);
        }
        
        this.currentUser = null;
        this.currentPage = 1;
        this.usersPerPage = 10;
        this.initializeEventListeners();
        this.renderUsers();
        this.updatePagination();
    }

    initializeEventListeners() {
        // Add User Form Submit
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserSubmit();
            });
        }

        // Search functionality
        const searchButton = document.querySelector('.input-group .btn-outline-secondary');
        if (searchButton) {
            searchButton.addEventListener('click', () => this.handleSearch());
        }

        // Reset search and show all users
        const resetButton = document.querySelector('.resetsearch');
        if (resetButton) {
            resetButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Clear all search inputs
                const searchInputs = document.querySelectorAll('.input-group input[type="text"]');
                searchInputs.forEach(input => {
                    input.value = '';
                });
                
                // Reset to first page and show all users
                this.currentPage = 1;
                this.renderUsers(this.users);
                this.updatePagination();
            });
        }

        // Pagination event listeners
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('page-link')) {
                    const pageText = e.target.textContent;
                    if (pageText === '«') {
                        this.currentPage = Math.max(1, this.currentPage - 1);
                    } else if (pageText === '»') {
                        this.currentPage = Math.min(this.getTotalPages(), this.currentPage + 1);
                    } else {
                        this.currentPage = parseInt(pageText);
                    }
                    this.renderUsers();
                    this.updatePagination();
                }
            });
        }

        // Set up event delegation for edit and delete actions
        document.addEventListener('click', (e) => {
            const dropdownItem = e.target.closest('.dropdown-item');
            if (!dropdownItem) return;

            const row = dropdownItem.closest('tr');
            if (!row) return;

            const username = row.cells[1].textContent;
            
            if (dropdownItem.classList.contains('text-danger')) {
                // Delete action
                this.deleteUser(username);
            } else {
                // Edit action
                this.editUser(username);
            }
        });
    }

    getTotalPages() {
        return Math.ceil(this.users.length / this.usersPerPage);
    }

    updatePagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        const totalPages = this.getTotalPages();
        let paginationHTML = `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#">&laquo;</a>
            </li>
        `;

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${this.currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `;
        }

        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#">&raquo;</a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;
    }

    handleUserSubmit() {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        if (!username || !email || !password || !role) {
            alert('Please fill in all fields');
            return;
        }

        try {
            if (this.currentUser) {
                // Update existing user
                const userIndex = this.users.findIndex(u => u.username === this.currentUser.username);
                if (userIndex !== -1) {
                    this.users[userIndex] = { username, email, password, role };
                    console.log('Updating user:', this.users[userIndex]); // Debug log
                    this.saveUsers();
                }
                this.currentUser = null;
            } else {
                // Check if username already exists
                if (this.users.some(u => u.username === username)) {
                    alert('Username already exists');
                    return;
                }
                // Add new user
                const newUser = { username, email, password, role };
                this.users.push(newUser);
                console.log('Adding new user:', newUser); // Debug log
                this.saveUsers();
            }

            this.renderUsers();
            this.resetForm();
            const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
            if (modal) {
                modal.hide();
            }
        } catch (error) {
            console.error('Error handling user submit:', error);
            alert('An error occurred while saving the user');
        }
    }

    handleSearch() {
        const searchInputs = document.querySelectorAll('.input-group input[type="text"]');
        const searchTerms = Array.from(searchInputs).map(input => input.value.toLowerCase());

        // If all search terms are empty, show all users
        if (searchTerms.every(term => term === '')) {
            this.renderUsers(this.users);
            return;
        }

        const filteredUsers = this.users.filter(user => {
            return (
                user.username.toLowerCase().includes(searchTerms[0]) &&
                user.email.toLowerCase().includes(searchTerms[1]) &&
                user.role.toLowerCase().includes(searchTerms[2])
            );
        });

        this.currentPage = 1; // Reset to first page when searching
        this.renderUsers(filteredUsers);
    }

    deleteUser(username) {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                this.users = this.users.filter(user => user.username !== username);
                console.log('Deleting user:', username);
                this.saveUsers();
                this.renderUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('An error occurred while deleting the user');
            }
        }
    }

    editUser(username) {
        try {
            const user = this.users.find(u => u.username === username);
            if (user) {
                this.currentUser = user;
                document.getElementById('username').value = user.username;
                document.getElementById('email').value = user.email;
                document.getElementById('password').value = user.password;
                document.getElementById('role').value = user.role;
                
                document.getElementById('userModalLabel').textContent = 'Edit User';
                const modal = new bootstrap.Modal(document.getElementById('userModal'));
                modal.show();
            }
        } catch (error) {
            console.error('Error editing user:', error);
            alert('An error occurred while editing the user');
        }
    }

    resetForm() {
        const form = document.getElementById('userForm');
        if (form) {
            form.reset();
        }
        document.getElementById('userModalLabel').textContent = 'Add User';
    }

    saveUsers() {
        try {
            console.log('Saving users:', this.users); // Debug log
            localStorage.setItem('users', JSON.stringify(this.users));
            console.log('Users saved successfully'); // Debug log
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }

    renderUsers(usersToRender = this.users) {
        const table = document.querySelector('.usersTable');
        if (!table) return;

        // Add Bootstrap table classes
        table.classList.add('table', 'table-hover', 'align-middle', 'text-center');
        
        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.usersPerPage;
        const endIndex = startIndex + this.usersPerPage;
        const paginatedUsers = usersToRender.slice(startIndex, endIndex);

        paginatedUsers.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><span class="badge ${this.getRoleBadgeClass(user.role)}">${user.role}</span></td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-light" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item edit-user" href="#"><i class="fa fa-edit me-2"></i>Edit</a></li>
                            <li><a class="dropdown-item text-danger delete-user" href="#"><i class="fa fa-trash me-2"></i>Delete</a></li>
                        </ul>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        this.updatePagination();
    }

    getRoleBadgeClass(role) {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-primary';
            case 'merchant':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    }
}

// Initialize the UserManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UserManager();
});

