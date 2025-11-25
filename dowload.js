// download.js

// Fonction pour créer et télécharger un fichier TXT
function downloadTXT(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Récupère tous les commentaires supprimés
  const deletedComments = document.querySelectorAll(".comment.deleted");

  if (deletedComments.length === 0) return; // Aucun commentaire supprimé

  // On prend le dernier
  const lastComment = deletedComments[deletedComments.length - 1];

  // Change le style pour indiquer qu'il est cliquable
  lastComment.style.cursor = "pointer";
  lastComment.style.backgroundColor = "#ffe6e6"; // rouge très clair
  lastComment.style.transition = "background-color 0.3s";
  lastComment.addEventListener("mouseenter", () => {
    lastComment.style.backgroundColor = "#ffcccc";
  });
  lastComment.addEventListener("mouseleave", () => {
    lastComment.style.backgroundColor = "#ffe6e6";
  });

  // Ajoute l'événement clic
  lastComment.addEventListener("click", () => {
    const message = `
Je n'arrêterai jamais. Ils méritent tous de mourir. Ils m'ont fait du mal. C'est mon tour.
`;
    downloadTXT("________.txt", message);
  });
});
