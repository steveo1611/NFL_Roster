function FantasyFootballController() {

    var fFS = new FantasyFootballService(drawPlayers)
    
    
    function drawTeam(team) {
        scrollTo(0,0)
        var template = ``
        for (let i = 0; i < team.length; i++) {
            var daTeam = team[i]

            template += `
            <div class="col-sm-3 my-3">
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
             scrollTo(0,0)
        for (let i = 0; i < players.length; i++) {
            var player = players[i]
            var pp = player.position
            if (pp !=="QB" && pp !=="RB" && pp !=="WR" && pp !=="TE" && pp !=="K" && pp !=="DST"){
           }else{
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

this.getByTeam = function getByTeam(e){
    e.preventDefault();
   var val = document.getElementById("inputTeamSelect");
   var team = val.options[val.selectedIndex].value;
  fFS.getPlayersByTeam(team,drawPlayers)
}

this.getByPos = function getByPos(e){
    e.preventDefault();
   var val = document.getElementById("inputPos");
   var pos = val.options[val.selectedIndex].value;
  fFS.getPlayersByPos(pos,drawPlayers)
}

this.addOnTeam = function addOnTeam(id){

    if (id == 0){
        alert("Player already selected")
    
    }
    else if(id == '0p'){
     alert("Position already selected")
    
    }
    else{
    fFS.getAddToTeam(id, drawTeam)
    }
}


this.checkTeam = function checkTeam(id){
     fFS.checkTeamForPlayer(id, app.controllers.fFootballController.checkPos)
}

this.checkPos = function checkPos(id){
    fFS.checkTeamForPos(id, app.controllers.fFootballController.addOnTeam)
}

this.removeFromTeam = function removeFromTeam(id){
    fFS.getFiredFromTeam(id, drawTeam)
}

this.getName = function getName(e){
    e.preventDefault();
    var gName = e.target.player.value.toUpperCase()
    fFS.getPlayersByName(gName, drawPlayers)


}

}  //end