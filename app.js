/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;

init();


/*the object that will give us access to the DOM, is the document object. Then select elements from webpage use querySelector.
Select the text in webpage and put the value to it.

Set then plain text content of a node:  node.textContent = text

textContent only used to plain text, cant html, innerHTML can.

<em>  <em> element we will have italic text.
*/
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';  
// Get the element in the document with class="#score-0"
document.querySelector('#current-' + activePlayer).textContent = dice;

var x = document.querySelector('#score-0').textContent;


/* hide the dice class(the picture). 
.dice  means cite the class
display is the CSS property, none is the CSS value
*/



/*events : notificaiton that are sent to notify the code that something happened ont the page.
like: clicking a button, resizing a pop up window, scrolling down or pressing a key.
event listener: a function that performs an action based on a certain event.

common event: https://developer.mozilla.org/en-US/docs/Web/Events
*/

//event handler

/* when a function pass an an argument into another function:
 no parethesis, because we dont want to immediately call the function, 
 we just offer funciton name and let the Eventlister to call the function.
*/
document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) +1; // range from 1 to 6

        // 2. Display the results
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'


        // 3.Update the round score IF the rolled number was NOT a 1
        if (dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to globle score
        scores[activePlayer] += roundScore;
        
        // update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // add winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        }else{
            nextPlayer();
        }       
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer=1 : activePlayer=0 ; //tenary operator
   
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggle: if active,remove; if not, add it.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // reomve active and sure to put the active to player 1
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active'); 
}