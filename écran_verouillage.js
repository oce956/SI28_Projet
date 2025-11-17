document.addEventListener("DOMContentLoaded", () => {
  const lockScreen = document.getElementById("lock-screen");
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("submit-password");
  const errorMsg = document.getElementById("error-message");
  const closeBtn = document.getElementById("close-lock");

  // Si déjà déverrouillé → cache l’écran noir
  if (localStorage.getItem("postUnlocked") === "true") {
    lockScreen.style.display = "none";
    return;
  }

  // Bouton retour arrière
  closeBtn.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });

  // Vérification du mot de passe
  submitBtn.addEventListener("click", () => {
    const password = passwordInput.value.trim().toLowerCase();

    if (password === "arrete de fouiller") {
      lockScreen.style.display = "none";
      localStorage.setItem("postUnlocked", "true");
    } else {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Mot de passe incorrect.";
    }
  });
});
