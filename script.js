import { ModifierPlayer } from "./src/players.js";
import { AjouterPlayer } from "./src/players.js";
import { SupprimerPlayer } from "./src/players.js";
import { getData } from "./src/storage.js";
import { AfficherPlayer } from "./src/players.js";

const players = getData("players")

if (players) {
    AfficherPlayer();
}

const form = document.getElementById("profileForm");
const formMessage = document.getElementById("formMessage");
const pseudoError = document.getElementById("pseudoError");

const regex = /^[A-Za-z0-9]{3,15}$/;

form.addEventListener("submit", function(event){
    event.preventDefault();
    const pseudo = document.getElementById("pseudo").value;
    const avatar = document.getElementById("avatar").value;

    if (!regex.test(pseudo)){
        pseudoError.textContent = "Ton pseudo est invalid !";
        return;
    }
    if (!avatar) return;

    AjouterPlayer(pseudo, avatar);
    formMessage.textContent = "Ton profile est crée avec succès .";
    
})