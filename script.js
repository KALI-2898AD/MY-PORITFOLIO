// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Basic contact form validation
document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const message = this.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  alert(`Thanks ${name}, your message has been received!`);
  this.reset();
});

// Dark mode toggle
const toggleButton = document.createElement("button");
toggleButton.textContent = "🌙 Toggle Dark Mode";
toggleButton.style.position = "fixed";
toggleButton.style.bottom = "20px";
toggleButton.style.right = "20px";
toggleButton.style.padding = "10px";
toggleButton.style.background = "#1e293b";
toggleButton.style.color = "#fff";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "5px";
toggleButton.style.cursor = "pointer";

toggleButton.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

document.body.appendChild(toggleButton);
