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
      });
    }

  

    this.getPlayersByTeam = function(teamName){
      return playersData.filter(function(player){
        if(player.team == teamName){
          return true;
        }
      });
    }, 
    this.getPlayersByPos = function(position){
      return playersData.filter(function(player){
        if(player.position == position){
          return true;
        }
      });
    }

    this.getTeam = function(){
      return teamData
    }

  loadPlayersData();
  
}




// needs to keep  overall player array and team array in services section: private data then need public was to access to arrays to allow services access to the data.  I can use the filter method to push the data I need to a different array that will then get pushed to the controller and then to the web page.  they have given me the playerService function that has a callback, this callback is for when waiting on the data to what is done afterwards with that data.  Do I do this is on service or on the controller???????
// playerservice: **** is this the main service service (top of page or other seperate function)   ******try it as main service....(changed name in the controller top also)