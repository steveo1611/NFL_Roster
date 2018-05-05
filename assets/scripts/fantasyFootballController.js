function FantasyFootballController(){

//    var fantasyFootballService = new FantasyFootballService()
    var playersService = new PlayersService()

//playersService.getPlayers

function drawPlayer(results){
    var template = ``
    for (let i = 0; i < results.length; i++){
      var player = results[i]
     template +=`
     <img src="//placehold.it/200x150" alt="">
     <h2>NAME: ${player.name}nobody</h2>
     <p>Position: qa</p>
     <p>Team: SF</p>
 </div>
    
     `
    }
    document.getElementById('playerlist').innerHTML = template
    console.log(results)
      }
debugger
      drawPlayer(playersService.getPlayersByTeam('SF'))
    }