/* =========================================
   UTSAV '26 - COLLEGE FEST WEBSITE
   JavaScript functionality
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION MENU
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";

            });

        });

    }


    // =====================================
    // 2. DARK MODE / LIGHT MODE
    // =====================================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            themeToggle.textContent = isDark ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

        });

    }


    // =====================================
    // 3. EVENT CATEGORY FILTER
    // =====================================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const eventCards = document.querySelectorAll(".event-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove active state from every filter
            filterButtons.forEach(function (filter) {
                filter.classList.remove("active");
            });

            // Activate the selected filter
            button.classList.add("active");

            const selectedCategory = button.dataset.filter;

            eventCards.forEach(function (card) {

                const eventCategory = card.dataset.category;

                if (
                    selectedCategory === "all" ||
                    selectedCategory === eventCategory
                ) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }

            });

        });

    });


    // =====================================
    // 4. REGISTRATION FORM VALIDATION
    // =====================================

    const registrationForm =
        document.getElementById("registrationForm");

    const formMessage =
        document.getElementById("formMessage");

    if (registrationForm && formMessage) {

        registrationForm.addEventListener("submit", function (event) {

            // Prevent the page from reloading
            event.preventDefault();

            const fullName =
                document.getElementById("fullName").value.trim();

            const rollNumber =
                document.getElementById("rollNumber").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const department =
                document.getElementById("department").value;

            const selectedGender =
                document.querySelector('input[name="gender"]:checked');

            const selectedEvent =
                document.getElementById("eventSelect").value;


            // Check name
            if (fullName.length < 2) {

                showFormMessage(
                    formMessage,
                    "Please enter your full name.",
                    false
                );

                return;
            }


            // Check roll number: exactly 10 digits
            if (!/^\d{10}$/.test(rollNumber)) {

                showFormMessage(
                    formMessage,
                    "Roll number must contain exactly 10 digits.",
                    false
                );

                return;
            }


            // Check Indian mobile number
            if (!/^[6-9]\d{9}$/.test(phone)) {

                showFormMessage(
                    formMessage,
                    "Please enter a valid 10-digit Indian mobile number.",
                    false
                );

                return;
            }


            // Check email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                showFormMessage(
                    formMessage,
                    "Please enter a valid email address.",
                    false
                );

                return;
            }


            // Check department
            if (department === "") {

                showFormMessage(
                    formMessage,
                    "Please select your department.",
                    false
                );

                return;
            }


            // Check gender
            if (!selectedGender) {

                showFormMessage(
                    formMessage,
                    "Please select your gender.",
                    false
                );

                return;
            }


            // Check event
            if (selectedEvent === "") {

                showFormMessage(
                    formMessage,
                    "Please select an event.",
                    false
                );

                return;
            }


            // Frontend demonstration only
            showFormMessage(
                formMessage,
                "🎉 Registration validated successfully! This demo does not save your details.",
                true
            );

            registrationForm.reset();

        });

    }


    // =====================================
    // 5. FEEDBACK FORM
    // =====================================

    const feedbackForm =
        document.getElementById("feedbackForm");

    const feedbackStatus =
        document.getElementById("feedbackStatus");

    if (feedbackForm && feedbackStatus) {

        feedbackForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const feedbackName =
                document.getElementById("feedbackName").value.trim();

            const feedbackEmail =
                document.getElementById("feedbackEmail").value.trim();

            const feedbackType =
                document.getElementById("feedbackType").value;

            const feedbackText =
                document.getElementById("feedbackMessage").value.trim();


            if (feedbackName.length < 2) {

                showFormMessage(
                    feedbackStatus,
                    "Please enter your name.",
                    false
                );

                return;
            }


            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail)) {

                showFormMessage(
                    feedbackStatus,
                    "Please enter a valid email address.",
                    false
                );

                return;
            }


            if (feedbackType === "" || feedbackText.length < 3) {

                showFormMessage(
                    feedbackStatus,
                    "Please select a feedback type and enter your message.",
                    false
                );

                return;
            }


            showFormMessage(
                feedbackStatus,
                "💌 Thank you for your feedback! This demo does not send or save messages.",
                true
            );

            feedbackForm.reset();

        });

    }


    // =====================================
    // 6. DIGITAL CLOCK
    // =====================================

    const digitalClock = document.getElementById("digitalClock");

    function updateClock() {

        if (!digitalClock) {
            return;
        }

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        digitalClock.textContent =
            hours + ":" + minutes + ":" + seconds;

    }

    updateClock();

    setInterval(updateClock, 1000);


    // =====================================
    // 7. EVENT COUNTDOWN
    // =====================================

    const countdown = document.getElementById("countdown");

    /*
       SAMPLE FESTIVAL DATE:
       15 November 2026 at 9:00 AM.

       Change this date if your actual festival
       takes place on a different day.
    */

    const festivalDate = new Date("2026-11-15T09:00:00");

    function updateCountdown() {

        if (!countdown) {
            return;
        }

        const now = new Date();
        const difference = festivalDate.getTime() - now.getTime();

        if (difference <= 0) {

            countdown.textContent = "The celebration is here! 🎉";
            return;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        countdown.textContent =
            days + "d " +
            hours + "h " +
            minutes + "m " +
            seconds + "s";

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    // =====================================
    // 8. REUSABLE FORM MESSAGE FUNCTION
    // =====================================

    function showFormMessage(element, message, success) {

        element.textContent = message;

        element.style.color = success ? "#15966b" : "#e04460";

    }


    // =====================================
    // 9. FOOTER YEAR
    // =====================================

    const copyright =
        document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            "© 2026 UTSAV '26. College Event Management Website.";

    }

});