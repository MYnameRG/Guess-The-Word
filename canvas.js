window.addEventListener('load',eventWindowLoaded,false);

function eventWindowLoaded()
{
    gamePlay();
}

function canvasSupport()
{
    return Modernizr.canvas;
}

function gamePlay()
{
    if(!canvasSupport)
    {
        return; 
    }

    var Debugger = function(){};
    Debugger.log = function(message)
    {
        try{
            console.log(message);
        }
        catch{
            return;
        }
    }

    Debugger.log("Drawing Canvas");

    var hitGuesses = 0;
    var letters = ['a','b','c','d','e','f','g','h','i','j','k','l',
    'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var letterToGuess = '';
    var higherOrLower = '';
    var letterGuessed = [];
    var letterPressed = '';
    var letterIndex = 0;
    var gameOver = false;
    
    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');

    function gameGraphics()
    {
        //Background
        context.fillStyle = 'azure';
        context.fillRect(0,0,400,400);
    
        //Box
        context.strokeStyle = 'black';
        context.strokeRect(0,1,400,400);
    
        //Text
        context.fillStyle = 'tomato';
        context.font = '20px Sans-Serif';
        context.textBaseline = 'top';
        context.fillText("Guess!! The Word",120,20);
    
        //Letter Guess High Or Low
        context.fillStyle = 'blue';
        context.font = '20px Sans-Serif';
        context.fillText(higherOrLower.toString(),120,250);
    
        //Letter pressed
        context.fillStyle = 'green';
        context.font = '20px Sans-Serif';
        context.fillText("Letter to Pressed : " + letterPressed.toString(),120,150);
    
        //Hit Gusses
        context.fillStyle = 'green';
        context.font = '20px Sans-Serif';
        context.fillText("Hit : " + hitGuesses.toString(),120,120);
        console.log(hitGuesses.toString());
    
        if(gameOver)
        {
            context.fillStyle = 'tomato';
            context.font = '20px Sans-Serif';
            context.fillText("You Got An Answer!!!", 120,200);
        }
    }    
    
    function startGame()
    {
        letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        letterGuessed = [];
        gameOver = false;
        window.addEventListener('keydown',eventKeyPressed,true);
        gameGraphics();                
    }

    startGame();

    function eventKeyPressed(e)
    {
        if(!gameOver)
        {
            //hit count
            hitGuesses++;

            //Letter which we had pressed
            letterPressed = String.fromCharCode(e.keyCode);
            letterPressed = letterPressed.toLocaleLowerCase();

            letterGuessed.push(letterPressed);

            if(letterPressed == letterToGuess)
            {
                gameOver = true;
            }
            else
            {
                letterPressedIndex = letters.indexOf(letterPressed);
                letterGuessedIndex = letters.indexOf(letterToGuess);
                Debugger.log(letterGuessedIndex);

                //Whether we go to high or low wrt gueses
                if(letterPressedIndex > letterGuessedIndex)
                {
                    higherOrLower = 'Higher';
                }
                else
                {
                    higherOrLower = 'Lower';
                }  
            }
            gameGraphics();
        }
    }    
}