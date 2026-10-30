import { saveData } from "./storage.js";
import { getData } from "./storage.js";
import { removeData } from "./storage.js";
const players = [];

function creeProfil(pseudo,avatar){
    const div = document.getElementById("profilesList");
    const article = document.createElement("article");

    article.dataset.name = pseudo;
    article.dataset.avatar = avatar;

    article.classList = "profile-card rounded-xl border border-white/10 bg-[#11110f] p-4 transition hover:border-empire-gold/50";

    article.innerHTML = `
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div class="flex items-center gap-4">
                    <div class="profile-avatar flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-empire-gold/40 bg-empire-gold/10 text-3xl">
                        ${avatar}
                    </div>

                    <div class="min-w-0">
                        <h4 class="profile-name break-all font-bold">${pseudo}</h4>
                        <p class="text-xs text-gray-500">Joueur</p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <button type="button"
                            class="btn-modifier rounded-lg border border-blue-400/40 px-3 py-2 text-sm text-blue-300 transition hover:bg-blue-400/10">
                        Modifier
                    </button>

                    <button type="button"
                            class="btn-supprimer rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 transition hover:bg-red-400/10">
                        Supprimer
                    </button>

                    <button type="button"
                            class="btn-choisir rounded-lg bg-empire-gold px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-400">
                        Choisir
                    </button>
                </div>

            </div>`;

    div.appendChild(article);
}
export function AfficherPlayer(){
    const players = getData("players") || [];

    players.forEach(player => {
        creeProfil(player.nickname, player.avatar);
    });

}


export function AjouterPlayer(pseudo, avatar){
    if (!pseudo || !avatar) return;

    const players = getData("players") || [];

    players.push({
        nickname: pseudo,           
        avatar: avatar,               
        createdAt: Date.now()        
    });

    saveData("players", players);

    creeProfil(pseudo, avatar);
}

export function ModifierPlayer(pseudo,newPseudo, newAvatar){
    const player = getData(pseudo);

    player.nickname = newPseudo;
    player.avatar = newAvatar;
    player.createdAt = Date.now();

    saveData(pseudo, player);

}
export function SupprimerPlayer(pseudo){
    removeData(pseudo);

}