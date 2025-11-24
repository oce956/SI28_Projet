document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".indice-block").forEach(block => {
    
    const dateKey = block.dataset.date;
    const savedStep = parseInt(localStorage.getItem("indice_" + dateKey)) || 0;

    const unlockBtn = block.querySelector(".unlock-btn");
    const indices = block.querySelectorAll(".indice");
    const total = indices.length;

    // --- Affiche les indices déjà débloqués ---
    for (let i = 0; i < savedStep; i++) {
      if (indices[i]) {
        indices[i].style.display = "block";

        // Cache les boutons des indices déjà débloqués
        const btn = indices[i].querySelector(".next-btn");
        if (btn) btn.style.display = "none";
      }
    }

    // --- Gérer le bouton "Afficher l’indice 1" ---
    if (savedStep >= 1) {
      unlockBtn.style.display = "none";
    } else {
      unlockBtn.style.display = "block";
    }

    // --- Afficher le bouton suivant correct au reload ---
    if (savedStep > 0 && savedStep < total) {
      const nextBtn = indices[savedStep - 1].querySelector(".next-btn");
      if (nextBtn) nextBtn.style.display = "block";
    }

    // --- Si tous les indices sont trouvés → plus aucun bouton ---
    if (savedStep >= total) {
      block.querySelectorAll(".next-btn").forEach(btn => btn.style.display = "none");
    }

    // --- Clic : débloquer le 1er indice ---
    unlockBtn.addEventListener("click", () => {
      indices[0].style.display = "block";
      unlockBtn.style.display = "none";

      // Affiche le bouton suivant
      const nextBtn = indices[0].querySelector(".next-btn");
      if (nextBtn) nextBtn.style.display = "block";

      localStorage.setItem("indice_" + dateKey, 1);
    });

    // --- Clic : débloquer les suivants ---
    block.querySelectorAll(".next-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".indice");
        const step = parseInt(parent.dataset.step);

        const next = block.querySelector(`.indice[data-step="${step + 1}"]`);

        // Afficher l’indice suivant
        if (next) {
          next.style.display = "block";

          // Afficher son bouton (si ce n'était pas le dernier)
          const nextBtn = next.querySelector(".next-btn");
          if (nextBtn) nextBtn.style.display = "block";
        }

        // Cacher le bouton cliqué
        btn.style.display = "none";

        // Sauvegarde progression
        localStorage.setItem("indice_" + dateKey, step + 1);
      });
    });

  });

});
