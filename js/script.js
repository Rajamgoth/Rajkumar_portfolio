const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light-mode");
});

const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.3   
});

elements.forEach(el => observer.observe(el));


// =============================
// 3. CONTACT FORM (BACKEND API)
// =============================
const API_URL = "https://portfolio-backend-yt3t.onrender.com/api/contact";

document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const status = document.getElementById("status");
    status.innerText = "Sending... ⏳";

    const data = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const text = await res.text();

        status.innerText = text + " ✅";
        status.style.color = "green";

        this.reset();

    } catch (error) {
        status.innerText = "Failed to send message ❌";
        status.style.color = "red";
    }
});