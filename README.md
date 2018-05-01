# NFL_Roster

Fantasy Hand-Egg!!! OK, Football. In case you have never participated in a fantasy football league here is a basic overview from NFL.com:

`Fantasy football, like other fantasy games, puts you in the front office and on the sidelines as General Manager and Coach of your team. You select from a list of the best players in the NFL and they compete on a weekly basis for your team.`

For this project we will be creating a dynamic roster that allows users to add and remove players to a team as well as search all the NFL filtering the results by player name, team, or position. We will look at working with an API to get the real info available from the NFL.

![NFL Roster](http://i61.tinypic.com/5nvwuq.png)

### Step 1 - Setup

*We have provided some ideas below for example. However create this however you see fit*

1.  Remember to set up connections to your jQuery, footballService, footballController, and app in that order at the bottom of your index.html
2.  You will want to wire-frame out your html knowing ahead of time that you will need some place to draw the users team as well as the search results. Be sure to provide them with id's
3.  Inside the div for your team, add another div with the class "player-card" (style this however you like but below are some suggestions)
    -   Add an image to the player card with the src = "[http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"](http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/")
    -   Display the player's name, position and team, each on separate lines

### Step 2 - Players Service & Encapsulation

We have already briefly talked about one of the three pillars of object oriented programming, Encapsulation. We discussed the important role it plays in software development, and how it promotes efficient, maintainable code.

While the concept of Encapsulation is very broad, let's review a few basic principles:

-   Single Responsibility, or "One function, One job".
    -   Do your best to ensure a function doesn't do too much. If it is doing too much try to separate (refactor) out each task into other smaller functions.
-   "Keep your private parts private".
    -   Use the 'var' keyword and the 'this' keywords to keep functionality enclosed within the object itself. *(for more reading on this, look up **closure**)*

Since we already have some of the HTML done, we are going to jump over into the footballService for the next process.

With the above concepts in mind, lets breakdown the goals of this application and how the service has to manage the data flowing through it.

-   At the start of the application we will need to retrieve player data from an external source
    -   We should only have to retrieve the data once, then we can store it to a local variable inside our `footballService`.
-   Next we will need some way to filter player data by certain properties such as Name, Position, Team, etc...
    -   To make it simple we will start with 2 basic functions
        -   getPlayersByTeam(teamName);
            -   this method receives a name of a team and returns an array of all players on that team
        -   getPlayersByPosition(position);
            -   this method receives a player's position and returns an array of all players with that position
    -   Each function relies on the data retrieved from the external source.
-   Lastly we will need some way to add players to a user team array
    -   The usersTeam will be private so it will need a public getter that will simply return a copy of the usersTeam

Based on this outline, we know our service needs to have player data, and a few functions. Let's put a few examples in just to get the ball rolling. We will eventually want to sort players somehow so adding in the ability to do this by team and by position might be a good start.

```javascript
function PlayersService(callback){
  var playersData = [];

  this.getPlayersByTeam = function(teamName){
    //return an array of all players who match the given teamName.
  }

  this.getPlayersByPosition = function(position){
    //return an array of all players who match the given position.
  }
} 
```

Once we have the skeleton laid out, we can implement the functionality. We will use a new method called [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array/filter).

In its simplest form, Array.filter is a way to filter a large array into a smaller array, based on a certain condition. It does this by taking in a callback function (or a function passed as a parameter) and running it for each item in the array.

That function will be responsible to return true, if the object should be kept, or false if it should not be included in the filtered array

**Note, Array.filter() does not modify the original array; instead it creates a new one.**

Here is an example of filter in action:

```javascript
function PlayersService(callback){
  var playersData = [];

  this.getPlayersByTeam = function(teamName){
    return playersData.filter(function(player){
      if(player.team == teamName){
        return true;
      }
    });
  }
} 
```

Notice that `getPlayersByTeam` returns the results of the filter, because of this, whichever function triggered it, will ultimately be given back the filtered array to do with as needed (this will likely be your controller function, who will then draw the filtered list)

Now we just need to write the function to get the player data from the API. And call that function every time we create a new Players Service.

```javascript
function PlayersService(callback){
   var playersData = []
   //...
  //...
    function loadPlayersData(){
      //check if the player already has a copy of the NFL playersData
      var localData = localStorage.getItem('playersData');
     //if they do, pull from there
      if(localData){
          playersData = JSON.parse(localData);
          //return will short-circuit the loadPlayersData function
          //this will prevent the code below from ever executing
          return callback()
      }
      //if not go get that data
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback()
        });
    }    
loadPlayersData(); //call the function above every time we create a new service
} 
```

And there you have it. A basic, easy to use Players Service.

To make it work, we will create a footballController and instantiate the footballService.

Remember, the footballService is going out to make an async call, and we will want to make sure our page shows some sort of loader while we are waiting for the data to load. To accomplish this task we can setup a simple bool for loading and then flip that bool once the ready function is called by our player service.

use something like this:

```javascript
var loading = true;
var playerService = new PlayerService(ready);

function ready(){
    loading = false;
    }
}

```

You can have your ready function do all sorts of different things instead of just changing true to false, consider having your buttons with loading gifs, then redrawing them once ready is fired with some other draw function. Or maybe they exist but everything is disabled until then. However you want to manage it, keep your user in mind as they sit and wait for something to happen to indicate the page is ready.

The rest of the application is up to you to write, including how you might add each of these players to your 'fantasy' team.

- - -

Before you are turned loose there are a few things you will want to know about this API. First, it will give you back a ton of data, and not all of it comes how you would expect, nor is all of it usable. Since this is coming from a fantasy football API each team will have "players" that aren't actual people.

For example the Seahawks have a player with the name "Seahawks" and the position of "D" in a fantasy league this represents the entire defense, giving the player all the points racked up from the defence. It is up to you if you want to keep these "empty" players in your roster.

Additionally you will find some of the players pictures are different sizes or non-existant make sure that you have contingencies for such things.

Once it is all set up feel free to re-integrate adding players, adding and removing players from your roster, etc.

Good luck, and Happy Coding.

## REQUIREMENTS

##### Functionality

-   Utilizes a PlayerService & PlayerController
-   Players can be added and removed from user team
    
    ##### Visualization
    
-   Players can be filtered by Team
    
-   Players can be filtered by Position
    
-   Players can be filtered by Name
    

- - -

##### Bonus Challenges

-   Only one instance of a player on the team is allowed
-   Teams have a max size
-   Only one player of each position

- - -
