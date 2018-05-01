# NFL_Roster
Fantasy Hand-Egg!!! OK, Football. In case you have never participated in a fantasy football league here is a basic overview from NFL.com:

 `
 Fantasy football, like other fantasy games, puts you in the front office and on the sidelines as General Manager and Coach of your team. You select from a list of the best players in the NFL and they compete on a weekly basis for your team.
`

For this project we will be creating a dynamic roster that allows users to add and remove players to a team as well as search all the NFL filtering the results by player name, team, or position. We will look at working with an API to get the real info available from the NFL.

![NFL Roster](http://i61.tinypic.com/5nvwuq.png)


### Step 1 - Setup

*We have provided some ideas below for example. However create this however you see fit*

1. Remember to set up connections to your jQuery, footballService, footballController, and app in that order at the bottom of your index.html 
2. You will want to wire-frame out your html knowing ahead of time that you will need some place to draw the users team as well as the search results. Be sure to provide them with id's
4. Inside the div for your team, add another div with the class "player-card" (style this however you like but below are some sugestions)
  - Add an image to the player card with the src = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
  - Display the player's name, position and team, each on seperate lines
