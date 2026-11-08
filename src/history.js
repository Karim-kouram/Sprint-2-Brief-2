import { getData } from "./storage.js";

const profilechoisi = getData("profilechoisi");

if (profilechoisi) {
    const logo = document.querySelector(".logo");
    const Pseudo = document.querySelector(".Pseudo");
    logo.textContent = profilechoisi.avatar;
    Pseudo.textContent = profilechoisi.nickname;

}


const historyBody = document.getElementById("historyBody");

const searchPlayer = document.getElementById("searchPlayer");
const filterResult = document.getElementById("filterResult");
const filterDate = document.getElementById("filterDate");
const emptyMessage = document.getElementById("emptyMessage");


// Récupérer les parties
function getGames() {
    return JSON.parse(localStorage.getItem("games")) || [];
}


// Afficher l'historique
function afficherHistorique() {

    let games = getGames();

    // 1. Trier par date : plus récente à plus ancienne
    games.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    // 2. Recherche par pseudo
    const recherche = searchPlayer.value.trim().toLowerCase();

    if (recherche) {
        games = games.filter(game =>
            (game.playerName || "")
                .toLowerCase()
                .includes(recherche)
        );
    }

    // 3. Filtrer par résultat
    const resultat = filterResult.value;

    if (resultat !== "toutes") {
        games = games.filter(game =>
            game.result === resultat
        );
    }

    // 4. Filtrer par date
    const dateFilter = filterDate.value;

    if (dateFilter === "today") {

        const today = new Date().toLocaleDateString();

        games = games.filter(game =>
            new Date(game.date).toLocaleDateString() === today
        );

    } else if (dateFilter === "week") {

        const maintenant = new Date();

        const septJours = new Date();
        septJours.setDate(maintenant.getDate() - 7);

        games = games.filter(game => {
            const dateGame = new Date(game.date);

            return dateGame >= septJours &&
                   dateGame <= maintenant;
        });

    }

    // Vider le tableau
    historyBody.innerHTML = "";

    // Aucune partie
    if (games.length === 0) {

        emptyMessage.classList.remove("hidden");

        return;
    }

    emptyMessage.classList.add("hidden");


    // 5. Afficher les parties
    games.forEach(game => {

        const tr = document.createElement("tr");

        tr.className = "transition hover:bg-white/5";

        // Date
        const tdDate = document.createElement("td");

        tdDate.className = "px-6 py-5 text-gray-400";

        tdDate.textContent = new Date(game.date).toLocaleString("fr-FR");


        // Joueur
        const tdPlayer = document.createElement("td");

        tdPlayer.className = "px-6 py-5 font-semibold";

        tdPlayer.textContent = game.playerName || game.playerId;


        // Score
        const tdScore = document.createElement("td");

        tdScore.className = "px-6 py-5 font-bold";

        tdScore.textContent =
            `${game.playerScore} - ${game.computerScore}`;


        // Résultat
        const tdResult = document.createElement("td");

        tdResult.className = "px-6 py-5 font-bold";

        tdResult.textContent = game.result;

        if (game.result === "victoire") {
            tdResult.classList.add("text-green-500");
        }
        else if (game.result === "défaite") {
            tdResult.classList.add("text-red-500");
        }
        else {
            tdResult.classList.add("text-yellow-500");
        }


        // Bouton supprimer
        const tdAction = document.createElement("td");

        tdAction.className = "px-6 py-5";

        const btnDelete = document.createElement("button");

        btnDelete.textContent = "Supprimer";

        btnDelete.className =
            "rounded-lg bg-red-900/50 px-3 py-2 text-red-400 transition hover:bg-red-700 hover:text-white";

        btnDelete.dataset.id = game.id;

        tdAction.append(btnDelete);


        // Ajouter les cellules
        tr.append(
            tdDate,
            tdPlayer,
            tdScore,
            tdResult,
            tdAction
        );

        historyBody.append(tr);

    });

}

// Recherche en temps réel
searchPlayer.addEventListener("input", afficherHistorique);


// Filtrer par résultat
filterResult.addEventListener("change", afficherHistorique);


// Filtrer par date
filterDate.addEventListener("change", afficherHistorique);


// Supprimer une partie
historyBody.addEventListener("click", function(e) {

    const button = e.target.closest("button");

    if (!button) return;

    const id = button.dataset.id;

    // Demander confirmation
    const confirmation = confirm(
        "Voulez-vous vraiment supprimer cette partie ?"
    );

    if (!confirmation) return;

    // Récupérer les parties
    let games = getGames();

    // Supprimer la partie sélectionnée
    games = games.filter(game => game.id !== id);

    // Enregistrer les modifications
    localStorage.setItem("games", JSON.stringify(games));

    // Actualiser l'historique
    afficherHistorique();

});


// Affichage initial
afficherHistorique();