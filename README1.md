# NFL_Roster
Fantasy Hand-Egg!!! OK, Football. In case you have never participated in fantasy here is a basic overview from NFL.com:

 `
 Fantasy football, like other fantasy games, puts you in the front office and on the sidelines as General Manager and Coach of your team. You select from a list of the best players in the NFL and they compete on a weekly basis for your team.
`

For this project we will be creating a dynamic roster where you can add/remove players and visualize your team. We will look at working with an API to get the real info available from the NFL.

![NFL Roster](http://i61.tinypic.com/5nvwuq.png)

### Step 1 - Project Setup

1. Create a repository for my-roster.
2. Create the index.html, app.js, player-controller.js, player-service.js and styles.css files.
3. Link the app.js and styles.css into index.html
4. Lastly add your links for Bootstrap and jQuery into index.html

### Step 2 - HTML Wire-frame 

*The layout for this project works well with Bootstrap's panel class, however feel free to go around that and make it your own*

1. Add a panel with a header that says "My NFL Roster".
2. Wrap the panel in a div with the class "container".
3. Inside the panel body, create 2 child divs, one with the class "player-roster" and one with the class "my-team".
4. Inside the player-roster div, add another div with the class "player-card" (style this however you like but below are some sugestions)
  - Set the player-card class to "display: inline-block" and add a "1px solid black" border
  - Add an image to the player card with the src = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
  - Display the player's name, position and team, each on seperate lines
 
