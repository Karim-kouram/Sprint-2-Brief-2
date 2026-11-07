

export function createGame(player) {

    if (!player) {
        return null;
    }

    const game = {
        playerId: player,
        round: 1,
        duelCount: 0,
        playerCamp: null,
        computerCamp: null,
        firstCamp: "emperor",
        playerHand: null,
        computerHand: null,
        playerScore: 0,
        computerScore: 0,
        roundWinner: null,
        status: "playing"
    };

    return game;
}
export function finishedgame(round,player){
    if (round > 12){
        createGame(player);
    }
}

const emperor = ["emperor","citizen","citizen","citizen","citizen"];
const slave = ["citizen","citizen","citizen","citizen","slave"];


export function handPlayer(round){
    if (round >= 1 && round <= 3){
        return emperor;

    }else if(round >=4 && round <=6){
        return slave;

    }else if(round >=7 && round <=9){
        return emperor;

    }else if(round >=10 && round <=12){
        return slave;

    }

}

export function handPC(round){
    if (round >= 1 && round <= 3){
        return slave;

    }else if(round >=4 && round <=6){
        return emperor;

    }else if(round >=7 && round <=9){
        return slave;

    }else if(round >=10 && round <=12){
        return emperor;

    }

}



export function afficherCarte(camp1,camp2){

    const cartePlayer = document.getElementById("cartePlayer");
    const cartePC = document.getElementById("cartePC");
   
    cartePlayer.innerHTML = "";

    camp1.forEach( camp => {
        cartePlayer.innerHTML += `
        <article data-name="${camp}" class="relative flex h-24 w-16  items-center justify-center rounded-lg border border-red-400/40 bg-gradient-to-b from-red-950 to-empire-panel transition hover:-translate-y-2 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300 sm:h-32 sm:w-24 sm:rounded-xl">
                    <img src="images/${camp}.png" alt="CITOYEN" class="absolute inset-0 h-full w-full object-cover rounded-2xl">
                </article>`
    })
    cartePC.innerHTML = "";

    camp2.forEach( camp => {
        cartePC.innerHTML += `
        <article data-name="${camp}" class="flex h-24 w-16 items-center justify-center rounded-lg border border-empire-gold/50 bg-gradient-to-br from-amber-950 to-black shadow-lg sm:h-32 sm:w-24 sm:rounded-xl">
                    <div class="flex h-[85%] w-[85%] items-center justify-center rounded-md border border-empire-gold/30">
                        <span class="text-3xl text-empire-gold sm:text-4xl">♛</span>
                    </div>
                </article>`
    })
}


export const removeCards = (hand) =>{

    const index = hand.indexOf("citizen");

    if(index === -1){
        return hand
    }

    hand.splice(index,1);


}

export function getRandomCard(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


export function jouerCartePC() {

    const cartesPC = document.querySelectorAll("#cartePC article");

    if (cartesPC.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * cartesPC.length);

    const carteChoisie = cartesPC[randomIndex];

    return carteChoisie.dataset.name;
}



export function carteJoueur(player){
    const Player = document.getElementById("player");
    const carte2 = Player.querySelector("article");
    const name1 = carte2.dataset.name;
    
    return name1;
}

export function carteOrdinateur(pc){
    const PC = document.getElementById("PC");
    const carte1 = PC.querySelector("article");
    const name2 = carte1.dataset.name;

    return name2;
}

export function duel(cartejoueur, cartepc){
    if (cartejoueur == "emperor" && cartepc == "citizen"){
        return "victoire";

    }else if(cartejoueur == "citizen" && cartepc == "slave"){
        return "victoire";

    }else if(cartejoueur == "slave" && cartepc == "emperor"){
        return "victoire";

    }else if(cartejoueur == "citizen" && cartepc == "citizen"){
        return "égalité";

    }else{
        return "défaite";
    }

}


export function calculpointPlayer(cartejoueur, cartepc){
    let playerScore= 0;

    if (cartejoueur == "emperor" && cartepc == "citizen"){
        playerScore += 1;

    }else if(cartejoueur == "citizen" && cartepc == "slave"){
        playerScore += 1;

    }else if(cartejoueur == "slave" && cartepc == "emperor"){
        playerScore += 5;

    }
    return playerScore;
}


export function calculpointPc(cartejoueur, cartepc){
    let computerScore = 0;

    if(cartejoueur == "emperor" && cartepc == "slave"){
        computerScore += 5;

    }else if(cartejoueur == "slave" && cartepc == "citizen"){
        computerScore += 1;

    }else if(cartejoueur == "citizen" && cartepc == "empror"){
        computerScore += 1;

    }
    return computerScore;
}


export function calculGroup(round){
    if (round >= 1 && round <= 3){
        return 1;

    }else if(round >=4 && round <=6){
        return 2;

    }else if(round >=7 && round <=9){
        return 3;

    }else if(round >=10 && round <=12){
        return 4;

    }

}

const popup = document.getElementById("gameOverPopup");
const resultMessage = document.getElementById("resultMessage");

// Fonction pour afficher le popup
export function afficherGameOver(message) {

    resultMessage.textContent = message;

    popup.classList.remove("hidden");
    popup.classList.add("flex");
}

export function PlayAgain(nickname){
    
const btnAccueil = document.getElementById("btnAccueil");
const btnPlayAgain = document.getElementById("btnPlayAgain");

// Bouton Accueil
btnAccueil.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Bouton Play Again
btnPlayAgain.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");


    // Relancer la partie
    return createGame(nickname);
});
}
