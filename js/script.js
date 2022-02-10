
//gameBoard module
const gameBoard = ()=>{
    const gameCells = document.getElementsByClassName('cell');
    const boardArray = [ //to store game board moves and evaluate winner
        "","","",
        "","","",
        "","",""
    ];
    const playerO = "O";
    const playerX = "X";
    let currentPlayer = playerX;

    // playerO


    for (let i = 0; i < gameCells.length; i++) { //put this eventually into displayController
        gameCells[i].addEventListener('click', function (){
            console.log(i);
            if(gameCells[i].innerText === ''){

                if(currentPlayer === playerX){
                    gameCells[i].innerText = playerX;
                    currentPlayer = playerO;
                }else
                if(currentPlayer === playerO){
                    gameCells[i].innerText = playerO;
                    currentPlayer = playerX;
                }
                boardArray[i] = gameCells[i].textContent;
                console.log(boardArray)
            }

        })
    }

    return {
        gameBoard
    }
}

const displayController = ()=>{
    // handle UI display changes here
}

gameBoard();


//players stuff put in a factory
const Player = (sign, turn) => {

    const playerO = "O";
    const playerX = "X";

    const getSign = () => {
        //get players sign

    }

    const getTurn = () => {
        //get players turn
    }

    return {
        getSign,
        getTurn,
        playerX,
        playerO
    }
}

