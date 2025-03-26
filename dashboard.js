document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profileContainer = document.querySelector(".profile-container");

    profileIcon.addEventListener("click", function () {
        profileContainer.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profileContainer.contains(event.target)) {
            profileContainer.classList.remove("active");
        }
    });

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    // Initialize real-time clock
    updateClock();
    setInterval(updateClock, 1000);
});

// Search Filter Functionality
function filterServices() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let services = document.querySelectorAll("#serviceList li");

    services.forEach(service => {
        let serviceName = service.getAttribute("data-service-name").toLowerCase();
        if (serviceName.includes(input)) {
            service.style.display = "inline-block";
        } else {
            service.style.display = "none";
        }
    });
}

// Function to select a service and display details
function selectService(serviceName) {
    const phrases = {
        "Electrician": "Powering up your life with expert solutions!",
        "Plumber": "Fixing leaks, one pipe at a time!",
        "Gardener": "Bringing nature closer to you!",
        "Carpenter": "Crafting wood into wonders!",
        "Mechanic": "Fixing your ride, making it glide!",
        "IT Technician": "Tech problems? We've got the fix!"
    };

    document.getElementById("serviceName").textContent = serviceName;
    document.getElementById("servicePhrase").textContent = phrases[serviceName] || "Reliable service at your doorstep!";
    
    document.getElementById("serviceDetails").style.display = "block";
}

document.getElementById("bookService").addEventListener("click", function () {
    let serviceName = document.getElementById("serviceName").textContent;
    let serviceDescription = document.getElementById("serviceDescription").value;
    let serviceTime = document.getElementById("serviceTime").value;

    if (!serviceTime) {
        alert("Please select a service time before proceeding.");
        return;
    }

    let serviceDetails = {
        service: serviceName,
        description: serviceDescription,
        time: serviceTime,
        amount: 500  // Set a fixed amount or calculate based on service
    };

    localStorage.setItem("selectedService", JSON.stringify(serviceDetails));

    // Redirect to payment page
    window.location.href = "payment.html";
});

// Function to update real-time clock
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

setInterval(updateDateTime, 1000); // Update every second
updateDateTime(); // Initial call

function initiateMockPayment(amount) {
    localStorage.setItem("mockPaymentAmount", amount);
    window.location.href = "payment.html"; // Redirect to mock payment page
}
