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

    if (password === "detristesseacolere") {
      lockScreen.style.display = "none";
      localStorage.setItem("postUnlocked", "true");
    } else {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Mot de passe incorrect.";
    }
  });
});


//bug

// Sélectionne la vidéo
const video = document.querySelector("video");

// Quand la vidéo est terminée
video.addEventListener("ended", () => {
    lancerBugGlobal();
});
function lancerBugGlobal() {
    document.body.classList.add("bug-total");

    // Effet tremblement régulier
    setInterval(() => {
        document.body.classList.toggle("secousse");
    }, 150);

    // Texte aléatoire glitché
    const intervalGlitch = setInterval(() => {
        const elements = document.querySelectorAll("h1, h2, h3, h4, p, a, span");

        elements.forEach(el => {
            if (Math.random() < 0.2) {
                el.style.transform = `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)
                                       rotate(${Math.random()*4-2}deg)`;
                el.style.filter = "blur(1px) contrast(200%)";
            } else {
                el.style.transform = "";
                el.style.filter = "";
            }
        });
    }, 80);

    // Optionnel : bruit audio glitch
    let audioGlitch = new Audio("https://assets.codepen.io/21542/hiss+static.mp3");
    audioGlitch.volume = 0.4;
    audioGlitch.loop = true;
    audioGlitch.play();

    // Optionnel : surcharge de la page (lag volontaire)
    setInterval(() => {
        const div = document.createElement("div");
        div.className = "flash";
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 200);
    }, 120);
}
