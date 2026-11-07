import { getData } from "./storage.js";

const profilechoisi = getData("profilechoisi");

if (profilechoisi) {
    const logo = document.querySelector(".logo");
    const Pseudo = document.querySelector(".Pseudo");
    logo.textContent = profilechoisi.avatar;
    Pseudo.textContent = profilechoisi.nickname;

}

function afficherClassement() {

    // Récupérer les parties
    const games = JSON.parse(localStorage.getItem("games")) || [];

    const tbody = document.getElementById("classementBody");

    tbody.innerHTML = "";

    // Garder uniquement les parties terminées
    const partiesTerminees = games.filter(
        game => game.status === "finished"
    );

    // Regrouper les résultats par joueur
    const classement = {};

    partiesTerminees.forEach(game => {

        const nickname = game.playerId;

        if (!classement[nickname]) {
            classement[nickname] = {
                nickname: nickname,
                victories: 0,
                points: 0
            };
        }

        // Calculer les victoires
        if (game.winner === nickname) {
            classement[nickname].victories++;
        }

        // Additionner les points
        classement[nickname].points += game.playerScore;

    });

    // Transformer object en array
    const joueurs = Object.values(classement);

    // Trier par victoires puis par points
    joueurs.sort((a, b) =>
        b.victories - a.victories || b.points - a.points
    );

    // Afficher le classement
    if (joueurs.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 4;
        td.className = "px-6 py-8 text-center text-gray-500";
        td.textContent = "Aucune partie terminée.";

        tr.append(td);
        tbody.append(tr);

        return;
    }

    joueurs.forEach((joueur, index) => {

        const tr = document.createElement("tr");

        tr.className = "transition hover:bg-white/5";

        const rang = document.createElement("td");
        rang.className = "px-6 py-5 font-bold";

        const nom = document.createElement("td");
        nom.className = "px-6 py-5 font-semibold";

        const victoires = document.createElement("td");
        victoires.className = "px-6 py-5";

        const points = document.createElement("td");
        points.className = "px-6 py-5 font-bold text-empire-gold";

        // Couleur des trois premiers
        if (index === 0) {
            rang.classList.add("text-empire-gold");
        } else if (index === 1) {
            rang.classList.add("text-gray-300");
        } else if (index === 2) {
            rang.classList.add("text-amber-700");
        }

        rang.textContent = `#${index + 1}`;
        nom.textContent = joueur.nickname;
        victoires.textContent = joueur.victories;
        points.textContent = joueur.points;

        tr.append(rang, nom, victoires, points);

        tbody.append(tr);

    });

}

// Appeler la fonction
afficherClassement();