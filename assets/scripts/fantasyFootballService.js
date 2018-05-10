function FantasyFootballService(callback) {

  var playersData = []
  var teamData = []

  function loadPlayersData() {
    //check if the player already has a copy of the NFL playersData
    var localData = localStorage.getItem('playersData');
    //if they do, pull from there
    if (localData) {
      playersData = JSON.parse(localData);
      //return will short-circuit the loadPlayersData function
      //this will prevent the code below from ever executing
      return callback(playersData)
    }
    //if not go get that data
    var url = "https://bcw-getter.herokuapp.com/?url=";
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(endpointUri);

    $.getJSON(apiUrl, function (data) {
      playersData = data.body.players;
      console.log('Player Data Ready')
      console.log('Writing Player Data to localStorage')
      localStorage.setItem('playersData', JSON.stringify(playersData))
      console.log('Finished Writing Player Data to localStorage')
      callback(playersData)
    })
  }

  this.getPlayersByTeam = function (teamName, cb) {
    var teamList = playersData.filter(function (player) {
      if (player.pro_team == teamName) {
        return true;
      }
    });
    cb(teamList)
  }

  this.getPlayersByPos = function (position, cb) {
    var posList = playersData.filter(function (player) {
      if (player.position == position) {
        return true;
      }
    });
    cb(posList)
  }


  this.getPlayersByName = function (gName, cb) {
    var namesList = playersData.filter(function (player) {
      if (player.fullname.toUpperCase().includes(gName)) {
        return true;
      }
    });
    cb(namesList)

  }

  this.getTeam = function () {
    return teamData
  }

  this.getAddToTeam = function (addPlayerId, cb) {
    var addPlayer = playersData.find(function (player) {
      return player.id == addPlayerId
    })
    teamData.push(addPlayer)
    cb(teamData)
  }

  this.checkTeamForPlayer = function checkTeamForPlayer(playerId, cb) {
    var dupe = false

    for (let i = 0; i < teamData.length; i++) {
      const team = teamData[i];
      if (team.id == playerId) {
        return true
      }
    }
    return false
  }


  this.checkTeamForPos = function checkTeamForPos(playerId) {
    if (teamData.length == 0) {
      return false
    }
    else {
      var player = playersData.find(function (player) {
        return player.id == playerId
      })
      for (let i = 0; i < teamData.length; i++) {
        const tPlayer = teamData[i];
        //debugger
        if (tPlayer.position == player.position) {
          return true
        }
      }
      return false
    }
  }

  this.getFiredFromTeam = function (delPlayerId, cb) {
    var delPlayer = teamData.findIndex(teamId => teamId.id==delPlayerId)
    teamData.splice(delPlayer, 1)
    cb(teamData)
  }


  loadPlayersData();

}
