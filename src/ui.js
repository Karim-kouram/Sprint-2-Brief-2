import { getData } from "./storage.js";
import { createGame } from "./game.js";
import { handPC } from "./game.js";
import { handPlayer } from "./game.js";
import { afficherCarte } from "./game.js";
import { jouerCartePC } from "./game.js";
import { duel } from "./game.js";
import { calculpointPlayer } from "./game.js";
import { calculpointPc } from "./game.js";
import { removeCards } from "./game.js";
import { calculGroup } from "./game.js";
import { finishGame } from "./game.js";
import { PlayAgain } from "./game.js";


const profilechoisi = getData("profilechoisi");

if (profilechoisi) {
    const logo = document.querySelector(".logo");
    const Pseudo = document.querySelector(".Pseudo");
    logo.textContent = profilechoisi.avatar;
    Pseudo.textContent = profilechoisi.nickname;

    const playerAvatar = document.getElementById("playerAvatar");
    const playerName = document.getElementById("playerName");
    playerAvatar.textContent = profilechoisi.avatar;
    playerName.textContent = profilechoisi.nickname;
}


let game = createGame(profilechoisi.nickname);

let camp1 = handPlayer(game.round);
let camp2 = handPC(game.round);

let copieHandplayer = [...camp1];
let copieHandpc = [...camp2];



const carteplayer = document.getElementById("cartePlayer");
const player = document.getElementById("player");
const PC = document.getElementById("PC");

// Popup
const popup = document.getElementById("gameOverPopup");
const resultMessage = document.getElementById("resultMessage");

const btnAccueil = document.getElementById("btnAccueil");
const btnPlayAgain = document.getElementById("btnPlayAgain");

afficherCarte(camp1, camp2);


// Fonction Popup
function afficherGameOver(message) {

    resultMessage.textContent = message;

    popup.classList.remove("hidden");
    popup.classList.add("flex");

    game.status = "finished";
}


// Fonction إعادة اللعبة
function recommencerJeu() {

    // Cacher popup
    popup.classList.add("hidden");
    popup.classList.remove("flex");

    // Réinitialiser le jeu
    game = PlayAgain(profilechoisi.nickname);

    game.status = "playing";

    // Réinitialiser les cartes
    camp1 = handPlayer(game.round);
    camp2 = handPC(game.round);

    copieHandplayer = [...camp1];
    copieHandpc = [...camp2];

    // Afficher les nouvelles cartes
    afficherCarte(camp1, camp2);

    // Réinitialiser les scores
    document.getElementById("scorePlayer").textContent = game.playerScore;
    document.getElementById("scorePc").textContent = game.computerScore;

    document.getElementById("matche").textContent = game.round;
    document.getElementById("groupe").textContent = calculGroup(game.round);

    player.innerHTML = `
        <span class="text-4xl text-empire-gold sm:text-5xl">♛</span>
        <p class="mt-3 text-[10px] font-bold tracking-widest text-empire-gold sm:text-xs">
            À JOUER
        </p>
    `;

    PC.innerHTML = `
        <div class="text-center">
            <span class="text-4xl text-red-300 sm:text-5xl">?</span>
            <p class="mt-2 text-[9px] text-gray-500 sm:text-xs">
                Carte cachée
            </p>
        </div>
    `;
}


// Bouton Accueil
btnAccueil.addEventListener("click", () => {
    window.location.href = "index.html";
});


// Bouton Play Again
btnPlayAgain.addEventListener("click", recommencerJeu);


// Événement jouer
carteplayer.addEventListener("click", function(e) {

    // Empêcher de jouer après la fin
    if (game.status == "finished") return;

    const scorePc = document.getElementById("scorePc");
    const scorePlayer = document.getElementById("scorePlayer");
    const matche = document.getElementById("matche");
    const groupe = document.getElementById("groupe");

    const carte = e.target.closest("article");

    if (!carte) return;

    const carteName = carte.dataset.name;

    if (!carteName) return;


    // Afficher carte joueur
    player.innerHTML = `
        <article data-name="${carteName}">
            <img src="images/${carteName}.png"
                alt="${carteName}"
                class="absolute inset-0 h-full w-full rounded-2xl object-cover">
        </article>
    `;


    // Jouer carte PC
    const cartePc = jouerCartePC();

    PC.innerHTML = `
        <article data-name="${cartePc}">
            <img src="images/${cartePc}.png"
                alt="${cartePc}"
                class="absolute inset-0 h-full w-full rounded-2xl object-cover">
        </article>
    `;


    // Duel
    const egal = duel(carteName, cartePc);


    if (egal == "égalité") {

        removeCards(copieHandplayer);
        removeCards(copieHandpc);

        afficherCarte(copieHandplayer, copieHandpc);

    } 

    else if (egal == "victoire" || egal == "défaite") {

        game.round++;

        game.playerScore += calculpointPlayer(carteName, cartePc);
        game.computerScore += calculpointPc(carteName, cartePc);


        // Mise à jour des scores
        scorePlayer.textContent = game.playerScore;
        scorePc.textContent = game.computerScore;


        // Vérifier fin de partie
        if (game.round > 12) {

            finishGame(game);

            let message;

            if (game.playerScore > game.computerScore) {
                message = "Félicitations ! Tu as gagné la partie !";
            } 
            else if (game.playerScore < game.computerScore) {
                message = "Dommage ! Tu as perdu la partie.";
            } 
            else {
                message = "Match nul ! Bien joué !";
            }

            setTimeout(() => {

                player.innerHTML = "";
                PC.innerHTML = "";

                afficherGameOver(message);

            }, 2000);

            return;
        }


        // Préparer prochaine manche
        camp1 = handPlayer(game.round);
        camp2 = handPC(game.round);

        afficherCarte(camp1, camp2);

        copieHandplayer = [...camp1];
        copieHandpc = [...camp2];

    }


    // Mise à jour groupe et manche
    const calculgroup = calculGroup(game.round);


    setTimeout(() => {

        if (game.status == "finished") return;

        groupe.textContent = calculgroup;
        matche.textContent = game.round;

        player.innerHTML = `
            <span class="text-4xl text-empire-gold sm:text-5xl">♛</span>
            <p class="mt-3 text-[10px] font-bold tracking-widest text-empire-gold sm:text-xs">
                À JOUER
            </p>
        `;

        PC.innerHTML = `
            <div class="text-center">
                <span class="text-4xl text-red-300 sm:text-5xl">?</span>
                <p class="mt-2 text-[9px] text-gray-500 sm:text-xs">
                    Carte cachée
                </p>
            </div>
        `;

    }, 2000);

});