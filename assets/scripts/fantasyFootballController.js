function FantasyFootballController() {

    var fFS = new FantasyFootballService(drawPlayers)


    function drawTeam(team) {
        scrollTo(0, 0)
        var template = ``
        for (let i = 0; i < team.length; i++) {
            var daTeam = team[i]
            template += `
            <div class="col-sm-2 my-3">
            <div class="card bg-dark text-white w-100 h-100">
                <img class="card-img-top" src="${daTeam.photo}" alt="">
                <div class="card-img-overlay">
                    <h2 class="card-body">NAME: ${daTeam.fullname}</h2>
                    <p class="card-text">Position: ${daTeam.position}</p>
                    <p class+ "card-text">Team: ${daTeam.pro_team} </p>
                    <button onclick="app.controllers.fFootballController.removeFromTeam(${daTeam.id})">remove from team</button>
                </div>
            </div>
           </div>
       `
        }
        document.getElementById('teamList').innerHTML = template
    }

    function drawPlayers(players) {
        var template = ``
        scrollTo(0, 0)
        for (let i = 0; i < players.length; i++) {
            var player = players[i]
            var pp = player.position
            if (pp !== "QB" && pp !== "RB" && pp !== "WR" && pp !== "TE" && pp !== "K" && pp !== "DST"){
            } else {
                template += `
            <div class="col-sm-3 my-3">
            <div class="card bg-dark text-white w-100 h-100">
                <img class="card-img-top" src="${player.photo}" alt="">
                <div class="card-img-overlay">
                    <h2 class="card-body">NAME: ${player.fullname}</h2>
                    <p class="card-text">Position: ${player.position}</p>
                    <p class="card-text">Team: ${player.pro_team} </p>
                    <button onclick="app.controllers.fFootballController.checkTeam(${player.id})">add to team</button>
                </div>
            </div>
        </div>
             `
            }
        }
        document.getElementById('playerlist').innerHTML = template
    }

    this.getByTeam = function getByTeam(e) {
        e.preventDefault();
        var val = document.getElementById("inputTeamSelect");
        var team = val.options[val.selectedIndex].value;
        fFS.getPlayersByTeam(team, drawPlayers)
    }

    this.getByPos = function getByPos(e) {
        e.preventDefault();
        var val = document.getElementById("inputPos");
        var pos = val.options[val.selectedIndex].value;
        fFS.getPlayersByPos(pos, drawPlayers)
    }

    this.addOnTeam = function addOnTeam(id) {

        if (id == 0) {
            alert("Player already selected")
        }
    }

this.checkTeam = function checkTeam(id) {
    if (!fFS.checkTeamForPlayer(id) && !fFS.checkTeamForPos(id)) {
        fFS.getAddToTeam(id, drawTeam)
    } else {
        alert('Position or Player exists on team')
    }
}

this.removeFromTeam = function removeFromTeam(id) {
    fFS.getFiredFromTeam(id, drawTeam)
}

this.getName = function getName(e) {
    e.preventDefault();
    var gName = e.target.player.value.toUpperCase()
    fFS.getPlayersByName(gName, drawPlayers)
}

}  //end
