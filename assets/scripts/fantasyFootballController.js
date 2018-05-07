function FantasyFootballController() {

    var fFS = new FantasyFootballService(drawPlayers)
    
    
    function drawTeam(team) {
        var team = getTeam()
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
                    <button onclick=''>remove from team</button>
                </div>
            </div>
           </div>
        
       `
        }
        document.getElementById('teamList').innerHTML = template
    }
    
    function drawPlayers(players) {
        var template = ``
        for (let i = 0; i < players.length; i++) {
            var player = players[i]
            template += `
            <div class="col-sm-3 my-3">
            <div class="card bg-dark text-white w-100 h-100">
                <img class="card-img-top" src="${player.photo}" alt="">
                <div class="card-img-overlay">
                    <h2 class="card-body">NAME: ${player.fullname}</h2>
                    <p class="card-text">Position: ${player.position}</p>
                    <p class="card-text">Team: ${player.pro_team} </p>
                    <button onclick=''>add to team</button>
                </div>
            </div>
        </div>
        
     `
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




}  //end