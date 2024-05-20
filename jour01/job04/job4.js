const fs = require('fs');

// Lire le contenu du répertoire courant
fs.readdir('.', { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error("Erreur lors de la lecture du répertoire :", err);
        return;
    }

    // Filtrer les dossiers
    const dossiers = files.filter(file => file.isDirectory()).map(file => file.name);

    // Afficher les dossiers
    console.log("Dossiers dans le répertoire courant :", dossiers);
});
