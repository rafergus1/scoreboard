const btnNewGame = document.getElementById("btnNewGame");
const btnStart = document.getElementById("btnStart");
const playerContainer = document.getElementById("playerContainer");

var playerCount = 9;


btnStart.addEventListener("click", restartGame);

btnNewGame.addEventListener("click", function () {
    const inputPlayerCount = document.getElementById("txtPlayerCount")
    playerCount = inputPlayerCount.value;
    playerContainer.innerHTML = '';  // Clears all children
    for (let i = 1; i <= playerCount; i++) {
        const newPlayer = createNewPlayer(i);
        playerContainer.appendChild(newPlayer);
    }
});

function createNewPlayer(playerIndex) {
    const playerTileTemplate = document.getElementById("playerTileTemplate");
    const newPlayer = playerTileTemplate.content.cloneNode(true);
    // newPlayer.id = 'player-' + playerIndex;
    newPlayer.querySelector(".container").id = 'player-' + playerIndex;
    newPlayer.querySelector("#playerName").textContent = 'Player' + playerIndex;
    newPlayer.querySelector("#playerName").addEventListener("click", function(event) {handlePlayerNameChange(this)});
    newPlayer.querySelector("#btnLifeUp").addEventListener("click", function(event) {handleLifeCount(playerIndex, 1)});
    newPlayer.querySelector("#btnLifeDown").addEventListener("click", function(event) {handleLifeCount(playerIndex, -1)});
    newPlayer.querySelector("#btnRoll").addEventListener("click", function(event) {handleRoll(playerIndex)});
    newPlayer.querySelector("#btnNext").addEventListener("click", function(event) {handleNextPlayer(playerIndex)});
    return newPlayer;
}

function restartGame() {
    const players = getPlayers();
    for (var i = 0; i < players.length; i++) {
        players[i].querySelector("#lives").textContent = '3';
        players[i].querySelector("#rolls").textContent = '3';
        players[i].querySelector("#rollResult").textContent = '\xa0';
    }
    const randomPlayer = Math.floor(Math.random() * players.length) + 1
    clearActivePlayers();
    clearDeadPlayers();
    setPlayerActive(randomPlayer);
}

function getPlayers() {
    return Array.from(playerContainer.children).filter(child => child.classList.contains("bk-player-tile"));
}

function handlePlayerNameChange(player) {
    var newName = prompt("Enter player name:");
    console.log(newName);
    if (newName == "" || newName == null) {
        newName = "The Lost One";
    }
    player.textContent = newName;
}

function handleLifeCount(playerIndex, change) {
    const player = playerContainer.querySelector("#player-" + playerIndex);
    const currentLife = parseInt(player.querySelector("#lives").textContent);
    var newLife = currentLife + change;
    if (newLife < 0) {
        newLife = 0;
    }
    player.querySelector("#lives").textContent = newLife;
    if (newLife == 0) {
        player.classList.add("bk-dead-player");
    }
}

function handleRoll(playerIndex) {
    const player = playerContainer.querySelector("#player-" + playerIndex);
    const currentRolls = parseInt(player.querySelector("#rolls").textContent);
    if (currentRolls > 0) {
        // Roll
        const pick = Math.floor(Math.random() * 100);
        var roll = "";
        if (pick <= 33) {roll = "Ball In Hand";}
        else if (pick <= 66) {roll = "Skip Your Turn";}
        else {roll = "Pick A Player";}
        
        player.querySelector("#rolls").textContent = currentRolls - 1;
        player.querySelector("#rollResult").textContent = roll;
    }
    else {
        player.querySelector("#rollResult").textContent = "No Rolls Left!";
    }
}

function handleNextPlayer(playerIndex) {
    const player = playerContainer.querySelector("#player-" + playerIndex);
    if (player.classList.contains("bk-active-player"))
    {
        const playerCount = getPlayers().length;
        var nextPlayerIndex = playerIndex;
        for (i = 0; i < playerCount; i++)
        {
            nextPlayerIndex = ((playerIndex + i) % playerCount) + 1;
            const nextPlayerIsDead = playerContainer.querySelector("#player-" + nextPlayerIndex).classList.contains("bk-dead-player");
            if (!nextPlayerIsDead) {
                break;
            }
        }
        
        if (nextPlayerIndex != playerIndex) {
            clearActivePlayers();
            setPlayerActive(nextPlayerIndex);
        }
    }
}

function setPlayerActive(playerIndex) {
    const player = playerContainer.querySelector("#player-" + playerIndex);
    player.classList.add("bk-active-player");
}

function clearActivePlayers() {
    const players = getPlayers();
    for (var i = 0; i < players.length; i++) {
        players[i].classList.remove("bk-active-player");
    }
}

function clearDeadPlayers() {
    const players = getPlayers();
    for (var i = 0; i < players.length; i++) {
        players[i].classList.remove("bk-dead-player");
    }
}
