document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form.querySelector('input[type="text"]').value.trim();
    const password = form.querySelector('input[type="password"]').value.trim();

    const validUser = "admin";
    const validPass = "1234";

    messageDiv.className = "message";

    if (username === validUser && password === validPass) {
      messageDiv.textContent = "¡Login exitoso! Bienvenido a Web Viva 🎉";
      messageDiv.classList.add("success");
    } else {
      messageDiv.textContent = "❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.";
      messageDiv.classList.add("error");
    }

    messageDiv.style.display = "block";
  });
});
