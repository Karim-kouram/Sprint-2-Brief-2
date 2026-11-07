import { ModifierPlayer } from "./src/players.js";
import { AjouterPlayer } from "./src/players.js";
import { SupprimerPlayer } from "./src/players.js";
import { getData } from "./src/storage.js";
import { removeData } from "./src/storage.js";
import { AfficherPlayer } from "./src/players.js";
import { ChoisirProfil } from "./src/players.js";

const players = getData("players");
const profilechoisi = getData("profilechoisi");

if (players) {
    AfficherPlayer();
}

if (profilechoisi) {
    const logo = document.querySelector(".logo");
    const Pseudo = document.querySelector(".Pseudo");
    logo.textContent = profilechoisi.avatar;
    Pseudo.textContent = profilechoisi.nickname;

    document.querySelectorAll(".profile-card").forEach(card => {
        if (card.dataset.name === profilechoisi.nickname){
            card.classList.add("active");
        }
    });
}

const form = document.getElementById("profileForm");
const formMessage = document.getElementById("formMessage");
const pseudoError = document.getElementById("pseudoError");

const regex = /^[A-Za-z0-9]{3,15}$/;

let pseudoActuel = null;

let pseudoChoisi = null;
let avatarChoisi = '♛';

form.addEventListener("submit", function(event){
    event.preventDefault();
    const pseudo = document.getElementById("pseudo").value;
    const avatar = document.getElementById("avatar").value;

    const players = getData("players") || [];

    const player = players.find(player => player.nickname.toLowerCase() === pseudo.toLowerCase());

    if (player) {
        pseudoError.textContent = "Ton pseudo est dèja existé !";
        return;
    }

    if (!regex.test(pseudo)){
        pseudoError.textContent = "Ton pseudo est invalid !";
        return;
    }
    if (!avatar) return;

    if (pseudoActuel){

        ModifierPlayer(pseudoActuel, pseudo, avatar);

        pseudoActuel = null;

        formMessage.textContent = "Profil modifié avec succès."
    }else{

        AjouterPlayer(pseudo, avatar);
        formMessage.textContent = "Ton profile est crée avec succès .";
    }

    form.reset();
    
})

const listProfile = document.getElementById("profilesList");

listProfile.addEventListener("click", function(e){
    const pseudo = document.getElementById("pseudo");
    const avatar = document.getElementById("avatar");

    const button = e.target.closest('button[type="button"]');

    if (!button) return;

    const article = button.closest("article");

    if (!article) return;

    const name = article.dataset.name;
    const Avatar = article.dataset.avatar;

    const content = button.textContent.trim();

    if (content == "Modifier"){
        
        pseudoActuel = name;

        pseudo.value = name;
        avatar.value = Avatar;
        //ModifierPlayer(name);


    }else if(content == "Supprimer"){
        
        SupprimerPlayer(name);
        removeData("profilechoisi");

    }else if(content == "Choisir"){
        const logo = document.querySelector(".logo");
        const Pseudo = document.querySelector(".Pseudo");

        document.querySelectorAll(".profile-card").forEach( card => {
            card.classList.remove("active");
        })
        
        removeData("profilechoisi");

        article.classList.add("active")
        logo.textContent = Avatar;
        Pseudo.textContent = name;
        ChoisirProfil(Avatar, name);

    }
})