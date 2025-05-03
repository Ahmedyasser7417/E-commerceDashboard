//-----------------login-----------------
// Sample user data for testing
const users = [
    {
        email: 'test@example.com',
        password: '123456',
        role: 'user'
    },
    {
        email: 'admin@example.com', 
        password: 'admin123',
        role: 'admin'
    }
];

// Store users in localStorage
localStorage.setItem('users', JSON.stringify(users));



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
            labels: ["Italy", "France", "Spain"],
            datasets: [{
                backgroundColor: [
                    "#915ef6",
                    "#3b285f",
                    "#327aff"
                ],
                data: [55, 49, 44]
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

