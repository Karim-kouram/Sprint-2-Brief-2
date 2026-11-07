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
import { afficherGameOver } from "./game.js";
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

const camp1 = handPlayer(game.round);
const camp2 = handPC(game.round);

afficherCarte(camp1,camp2);

let copieHandplayer = [...camp1];
let copieHandpc = [...camp2];

const carteplayer = document.getElementById("cartePlayer");
const player = document.getElementById("player");

carteplayer.addEventListener("click", function(e){
    const scorePc = document.getElementById("scorePc");
    const scorePlayer = document.getElementById("scorePlayer");
    const matche = document.getElementById("matche");
    const groupe = document.getElementById("groupe");
    
    

    const carte = e.target.closest("article");
    if (!carte) return;
    const carteName = carte.dataset.name;
    if (!carteName) return;
    player.innerHTML =`
    <article data-name="${carteName}">
            <img src="images/${carteName}.png" alt="ESCLAVE" class="absolute inset-0 h-full w-full object-cover rounded-2xl">
        </article>`;

    const cartePc = jouerCartePC();
    const PC = document.getElementById("PC");
    if (!PC) return;
    PC.innerHTML =`
        <article data-name="${cartePc}">
                <img src="images/${cartePc}.png" alt="ESCLAVE" class="absolute inset-0 h-full w-full object-cover rounded-2xl">
            </article>`;

    

    const egal = duel(carteName, cartePc)


    if (egal == "égalité"){
        removeCards(copieHandplayer)
        removeCards(copieHandpc);

        afficherCarte(copieHandplayer,copieHandpc);
        

    }else if( egal == "victoire"){
        game.round++;
        game.playerScore += calculpointPlayer(carteName, cartePc);
        game.computerScore += calculpointPc(carteName, cartePc);
        if (game.round > 12){

            afficherGameOver("Félicitations ! Tu as gagné la partie !");
            game = PlayAgain(profilechoisi.nickname);
        }
        const Camp1 = handPlayer(game.round);
        const Camp2 = handPC(game.round);

        afficherCarte(Camp1,Camp2);
        
        copieHandplayer = [...Camp1];
        copieHandpc = [...Camp2];

    }else if( egal == "défaite"){
        game.round++;
        game.playerScore += calculpointPlayer(carteName, cartePc);
        game.computerScore += calculpointPc(carteName, cartePc);
        if (game.round > 12){

            afficherGameOver("Dommage ! Tu as perdu la partie.");
            game = PlayAgain(profilechoisi.nickname);
        }
        const Camp1 = handPlayer(game.round);
        const Camp2 = handPC(game.round);

        afficherCarte(Camp1,Camp2);
        
        copieHandplayer = [...Camp1];
        copieHandpc = [...Camp2];
    }

    //game.playerScore += calculpointPlayer(carteName, cartePc);
    //game.computerScore += calculpointPc(carteName, cartePc);

    scorePlayer.textContent = game.playerScore;
    scorePc.textContent = game.computerScore;

    const calculgroup = calculGroup(game.round);
    //console.log(calculgroup)

    

    setTimeout(() => {
    groupe.textContent = calculgroup;
    matche.textContent = game.round;
    player.innerHTML = `<span class="text-4xl text-empire-gold sm:text-5xl">♛</span>

                        <p class="mt-3 text-[10px] font-bold tracking-widest text-empire-gold sm:text-xs">
                            À JOUER
                        </p>`;

    PC.innerHTML = `<div class="text-center">
                            <span class="text-4xl text-red-300 sm:text-5xl">?</span>
                            <p class="mt-2 text-[9px] text-gray-500 sm:text-xs">Carte cachée</p>
                        </div>`;
}, 2000);

    
})

