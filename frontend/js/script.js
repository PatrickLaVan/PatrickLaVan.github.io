document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const alertBox = document.getElementById("alert");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        showAlert("Sending...", "success");

        try {
            const response = await fetch("http://localhost:3000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                showAlert("Message was sent successfully 😃", "success");
                form.reset();
            } else {
                showAlert("I didn't receive your message", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert("Something went wrong", "error");
        }
    });

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = "block";
        setTimeout(() => { alertBox.style.display = "none"; }, 3000);
    }
});
