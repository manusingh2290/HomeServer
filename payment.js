document.addEventListener("DOMContentLoaded", function () {
    let serviceDetails = JSON.parse(localStorage.getItem("selectedService"));

    if (!serviceDetails) {
        alert("No service selected!");
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("serviceInfo").textContent =
        `Service: ${serviceDetails.service} | Time: ${serviceDetails.time} | Amount: ₹${serviceDetails.amount}`;

    document.getElementById("payNow").addEventListener("click", function () {
        if (!serviceDetails.amount) {
            alert("Invalid payment amount!");
            return;
        }

        let options = {
            key: "YOUR_RAZORPAY_API_KEY",  // Replace with your actual Razorpay API key
            amount: serviceDetails.amount * 100,  // Convert to smallest currency unit
            currency: "INR",
            name: "HomeServer",
            description: serviceDetails.service,
            theme: {
                color: "#0072ff"  // Customize checkout button color
            },
            handler: function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                localStorage.setItem("paymentStatus", "success");

                // Clear selected service from local storage after payment
                localStorage.removeItem("selectedService");

                // Redirect to confirmation page
                window.location.href = "confirmation.html";
            },
            prefill: {
                email: localStorage.getItem("loggedInUser") || "user@example.com",  // Use stored email if available
                contact: "9999999999"  // Ideally fetch from user profile
            }
        };

        let rzp = new Razorpay(options);
        rzp.open();
    });
});