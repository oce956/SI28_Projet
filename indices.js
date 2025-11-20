document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".indice-block").forEach(block => {
    
    const dateKey = block.dataset.date;
    const savedStep = parseInt(localStorage.getItem("indice_" + dateKey)) || 0;

    const unlockBtn = block.querySelector(".unlock-btn");
    const indices = block.querySelectorAll(".indice");

    // ➤ Affiche les indices déjà débloqués
    for (let i = 0; i < savedStep; i++) {
      if (indices[i]) {
        indices[i].style.display = "block";

        // ➤ Cache le bouton "indice suivant" de ces étapes
        const nextBtn = indices[i].querySelector(".next-btn");
        if (nextBtn) nextBtn.style.display = "none";
      }
    }

    // ➤ Si déjà débloqué → cache le bouton "Afficher l’indice 1"
    if (savedStep > 0) unlockBtn.style.display = "none";

    // ➤ Débloque le premier indice
    unlockBtn.addEventListener("click", () => {
      indices[0].style.display = "block";

      // Cache le bouton "Afficher l’indice 1"
      unlockBtn.style.display = "none";

      localStorage.setItem("indice_" + dateKey, 1);
    });

    // ➤ Boutons "indice suivant"
    block.querySelectorAll(".next-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".indice");
        const step = parseInt(parent.dataset.step);

        // Débloque l’indice suivant
        const next = block.querySelector(`.indice[data-step="${step + 1}"]`);
        if (next) {
          next.style.display = "block";
        }

        // Cache ce bouton après clic
        btn.style.display = "none";

        // Enregistre la progression
        localStorage.setItem("indice_" + dateKey, step + 1);
      });
    });

  });

});
