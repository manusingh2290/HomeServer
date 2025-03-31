document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profileContainer = document.querySelector(".profile-container");
    const profileDropdown = document.getElementById("profileDropdown");
    const themeToggle = document.getElementById("theme");
    const body = document.body;

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
    }

    
    profileIcon.addEventListener("click", function () {
        profileContainer.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!profileContainer.contains(event.target)) {
            profileContainer.classList.remove("active");
        }
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-theme");

        if (body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    updateClock();
    setInterval(updateClock, 1000);
});

function filterServices() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    
    let services = document.querySelectorAll("#serviceList li, #otherServicesModal .modal-services li");
    let foundInOtherServices = false;

    services.forEach(service => {
        let serviceName = service.textContent.toLowerCase();
        if (serviceName.includes(input)) {
            service.style.display = "inline-block";
            if (service.closest("#otherServicesModal")) {
                foundInOtherServices = true;
            }
        } else {
            service.style.display = "none";
        }
    });

    let otherServicesModal = document.getElementById("otherServicesModal");
    if (foundInOtherServices) {
        otherServicesModal.style.display = "block";
    } else {
        otherServicesModal.style.display = "none";
    }
}

function selectService(serviceName) {
    const serviceDetails = document.getElementById("serviceDetails");
    const otherServicesModal = document.getElementById("otherServicesModal");

    if (otherServicesModal) {
        otherServicesModal.style.display = "none";
    }
    
    if (serviceDetails.style.display === "block" && document.getElementById("serviceName").textContent === serviceName) {
        serviceDetails.style.display = "none"; 
        return;
    }

    const phrases = {
        "Electrician": "Powering up your life with expert solutions!",
        "Plumber": "Fixing leaks, one pipe at a time!",
        "Gardener": "Bringing nature closer to you!",
        "Carpenter": "Crafting wood into wonders!",
        "Mechanic": "Fixing your ride, making it glide!",
        "IT Technician": "Tech problems? We've got the fix!",
        "Painter": "Adding colors to your world, one brushstroke at a time!",
        "Pest Control": "Keeping your home pest-free, safely and effectively!",
        "Home Cleaning": "A cleaner home, a happier you!",
        "Cook": "Delicious meals, made just for you!",
        "Babysitter": "Caring for your little ones with love!",
        "AC Repair": "Stay cool and comfortable with expert AC care at your doorstep!",
        "Tutor": "Empowering young minds with personalized learning, one lesson at a time.",

"Catering": "Delicious flavors delivered, perfect for every occasion."
    };

    document.getElementById("serviceName").textContent = serviceName;
    document.getElementById("servicePhrase").textContent = phrases[serviceName];
    
    serviceDetails.style.display = "block";
}


document.addEventListener("DOMContentLoaded", function () {
    const serviceTimeDropdown = document.getElementById("serviceTime");

    function generateTimeSlots() {
        serviceTimeDropdown.innerHTML = ""; 
        for (let hour = 7; hour < 23; hour++) { 
            let ampm = hour >= 12 ? "PM" : "AM";
            let nextAmpm = (hour + 1) >= 12 ? "PM" : "AM";

            let displayHour = hour > 12 ? hour - 12 : hour;
            let nextDisplayHour = (hour + 1) > 12 ? (hour + 1) - 12 : (hour + 1);

            if (hour === 11) nextDisplayHour = 12; 
            if (hour === 12) displayHour = 12; 

            let timeSlot = `${displayHour}:00 ${ampm} - ${nextDisplayHour}:00 ${nextAmpm}`;
            
            let option = document.createElement("option");
            option.value = timeSlot;
            option.textContent = timeSlot;
            serviceTimeDropdown.appendChild(option);
        }
    }

    generateTimeSlots();
    
    document.getElementById("bookService").addEventListener("click", function () {
        let serviceName = document.getElementById("serviceName").textContent;
        let serviceDescription = document.getElementById("serviceDescription").value;
        let serviceDate = document.getElementById("serviceDate").value;
        let serviceTime = serviceTimeDropdown.value;

        if (!serviceDate || !serviceTime) {
            alert("Please select a date and time before proceeding.");
            return;
        }

        let serviceDetails = {
            service: serviceName,
            description: serviceDescription,
            date: serviceDate,
            time: serviceTime,
            amount: 500
        };

        localStorage.setItem("selectedService", JSON.stringify(serviceDetails));

        window.location.href = "payment.html";
    });
});


function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    document.getElementById("datetime").innerHTML = now.toLocaleString('en-US', options);
}

setInterval(updateDateTime, 1000);
updateDateTime();

function initiateMockPayment(amount) {
    localStorage.setItem("mockPaymentAmount", amount);
    window.location.href = "payment.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");
    const detectLocationBtn = document.getElementById("detectLocation");
    const checkLocationBtn = document.getElementById("checkLocation");

    detectLocationBtn.addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .then(response => response.json())
                        .then(data => {
                            locationInput.value = data.address.city || data.address.county || "Location found";
                        })
                        .catch(() => {
                            alert("Unable to fetch location details.");
                        });
                },
                function () {
                    alert("Location access denied. Please enter manually.");
                }
            );
        } else {
            alert("Geolocation is not supported in this browser.");
        }
    });

    checkLocationBtn.addEventListener("click", async function () {
        let location = locationInput.value.trim();
        let apiKey = "646d811720c4766b7b1ff0a001b222a3";

        if (!location) {
            alert("Please enter a location!");
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.cod !== 200) {
                alert("Location not found! Please enter a valid location.");
                return;
            }

            let city = data.name;
            let country = data.sys.country;
            let temperature = data.main.temp;
            let weather = data.weather[0].description;

            document.getElementById("locationDetails").innerHTML =
                `<strong>${city}, ${country}</strong> - ${temperature}°C, ${weather}`;
        } catch (error) {
            alert("Error fetching location details. Please try again.");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const helpButton = document.getElementById("helpButton");
    const helpModal = document.getElementById("helpModal");
    const closeModal = document.querySelector(".close-btn");

    helpButton.addEventListener("click", function () {
        helpModal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        helpModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === helpModal) {
            helpModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const reportIssueBtn = document.getElementById("reportIssueBtn");
    const issueReportSection = document.getElementById("issueReportSection");
    const submitIssue = document.getElementById("submitIssue");
    const issueText = document.getElementById("issueText");

    reportIssueBtn.addEventListener("click", function (event) {
        event.preventDefault();
        issueReportSection.classList.toggle("hidden");
    });

    submitIssue.addEventListener("click", function () {
        let issue = issueText.value.trim();
        if (issue === "") {
            alert("Please describe your issue before submitting.");
            return;
        }

        alert("Issue submitted successfully!");
        console.log("User Issue:", issue);

        issueText.value = "";
        issueReportSection.classList.add("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const faqBtn = document.getElementById("faqBtn");
    const faqSection = document.getElementById("faqSection");
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqBtn.addEventListener("click", function (event) {
        event.preventDefault();
        faqSection.classList.toggle("hidden");
    });

    faqQuestions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === "block";
            answer.style.display = isOpen ? "none" : "block";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.getElementById("contactBtn");
    const contactSection = document.getElementById("contactSection");
    const faqSection = document.getElementById("faqSection");

    contactBtn.addEventListener("click", function (event) {
        event.preventDefault();
        contactSection.classList.toggle("hidden");
        faqSection.classList.add("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const faqBtn = document.getElementById("faqBtn");
    const contactBtn = document.getElementById("contactBtn");
    const reportIssueBtn = document.getElementById("reportIssueBtn");

    const faqSection = document.getElementById("faqSection");
    const contactSection = document.getElementById("contactSection");
    const issueReportSection = document.getElementById("issueReportSection");

    function hideAllSections() {
        if (faqSection) faqSection.classList.add("hidden");
        if (contactSection) contactSection.classList.add("hidden");
        if (issueReportSection) issueReportSection.classList.add("hidden");
    }

    if (faqBtn && faqSection) {
        faqBtn.addEventListener("click", function (event) {
            event.preventDefault();
            hideAllSections();
            faqSection.classList.toggle("hidden");
        });
    }

    if (contactBtn && contactSection) {
        contactBtn.addEventListener("click", function (event) {
            event.preventDefault();
            hideAllSections();
            contactSection.classList.toggle("hidden");
        });
    }

    if (reportIssueBtn && issueReportSection) {
        reportIssueBtn.addEventListener("click", function (event) {
            event.preventDefault();
            hideAllSections();
            issueReportSection.classList.toggle("hidden");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const myAccountBtn = document.getElementById("myAccountBtn");
    const myAccountSection = document.getElementById("myAccountSection");
    const accountDetails = document.getElementById("accountDetails");
    const accountForm = document.getElementById("accountForm");
    const saveAccountBtn = document.getElementById("saveAccountDetails");

    const accountName = document.getElementById("accountName");
    const accountMobile = document.getElementById("accountMobile");
    const accountAddress = document.getElementById("accountAddress");
    const accountGender = document.getElementById("accountGender");
    const accountEmail = document.getElementById("accountEmail");
    const bookingList = document.getElementById("bookingList");

    function resetUserDetailsOnLogin() {
        localStorage.removeItem("userData");
        localStorage.removeItem("userBookings");
    }

    function checkUserDetails() {
        let userData = JSON.parse(localStorage.getItem("userData"));
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (!userData || !loggedInUser) {
            accountForm.classList.remove("hidden");
            accountDetails.classList.add("hidden");
        } else {
            accountName.textContent = userData.name;
            accountMobile.textContent = loggedInUser;
            accountAddress.textContent = userData.address;
            accountGender.textContent = userData.gender;
            accountEmail.textContent = userData.email;
            
            let bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
            bookingList.innerHTML = bookings.length
                ? bookings.map(booking => `<li>${booking.service} at ${booking.time}</li>`).join("")
                : "<li>No bookings yet</li>";

            accountForm.classList.add("hidden");
            accountDetails.classList.remove("hidden");
        }
    }

    if (myAccountBtn) {
        myAccountBtn.addEventListener("click", function () {
            myAccountSection.classList.toggle("hidden");
            checkUserDetails();
        });
    }

    if (saveAccountBtn) {
        saveAccountBtn.addEventListener("click", function () {
            let name = document.getElementById("inputName").value.trim();
            let gender = document.getElementById("inputGender").value;
            let address = document.getElementById("inputAddress").value.trim();
            let email = document.getElementById("inputEmail").value.trim();

            if (!name || !address || !email) {
                alert("Please fill all required fields.");
                return;
            }

            let userData = { name, gender, address, email };
            localStorage.setItem("userData", JSON.stringify(userData));

            alert("Account details saved!");
            checkUserDetails();
        });
    }

    resetUserDetailsOnLogin();
    checkUserDetails();
});


document.addEventListener("DOMContentLoaded", function () {
    let images = [
        "ac service.jpg",
        "carpenter.jpeg",
        "electrician.jpg",
        "gardener.jpg",
        "catering.jpg",
        "plumber1.jpg",
        "painting.jpg",
    ];

    let index = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(images);

    function changeBackground() {
        document.body.classList.add("slideshow");
        document.body.style.backgroundImage = `url('${images[index]}')`;

        index++;
        if (index >= images.length) {
            shuffleArray(images);
            index = 0;
        }
    }

    setInterval(changeBackground, 5000);
    changeBackground();
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("otherServicesModal");
    const btn = document.getElementById("otherServices");
    const closeBtn = document.querySelector(".close");

    btn.onclick = function () {
        modal.style.display = "block";
    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
