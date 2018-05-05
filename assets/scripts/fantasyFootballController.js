function FantasyFootballController(){

   var fFS = new FantasyFootballService(drawPlayers)

function drawPlayers(players){
    var template = ``
    for (let i = 0; i < players.length; i++){
      var player = players[i]
     template +=`
     <img src="${player.photo}" alt="">
     <h2>NAME: ${player.fullname}</h2>
     <p>Position: ${player.position}</p>
     <p>Team: ${player.pro_team} </p>
 </div>
    
     `
    }
     document.getElementById('playerlist').innerHTML = template
    console.log(players)
       }
function drawTeam(team){
   var team = getTeam()
   var template = ``
   for (let i = 0; i < team.length; i++){
       var daTeam = team[i]
       template +=`
       <img src="${team.photo}" alt="">
     <h2>NAME: ${team.fullname}</h2>
     <p>Position: ${team.position}</p>
     <p>Team: ${team.pro_team} </p>
 </div>
       
       `
   }
   document.getElementById('teamList').innerHTML = template
}







    }  //end