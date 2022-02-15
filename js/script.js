//gameBoard module
function gameBoard() {
    const gameCells = document.getElementsByClassName('cell');
    const resetBtn = document.getElementById('resetGame');


    let playerX = 0;
    let playerO = 0;
    let isDraw = false;
    let movesX = 0;
    let movesO = 0;

    let boardObject = {
        row1: ['', '', ''],
        row2: ['', '', ''],
        row3: ['', '', '']
    }

    resetBtn.addEventListener('click', function () {
        let boardObject = {
            row1: ['', '', ''],
            row2: ['', '', ''],
            row3: ['', '', '']
        }
        console.log('cleared boardObj: ' + boardObject)

        for (let i = 0; i < gameCells[i].length; i++) {
            gameCells[i].innerText = '';
        }
        checkWinner().playerX = 0;
        checkWinner().playerO = 0;

    })


    const cpuTurn = (cpuNum) => {
        //check if winner is declared prior to making a cpu move again
        if (cpuNum) {
            // if(gameCells[cpuNum])
            // console.log(checkWinner().winnerDeclared);
            if (cpuNum < 3 && boardObject.row1[cpuNum - 1] === '') {
                boardObject.row1.splice(cpuNum - 1, 1, 'O');
                gameCells[cpuNum - 1].innerText = 'O';
                movesO++;

            } else if (cpuNum >= 3 && cpuNum <= 6 && boardObject.row2[cpuNum - 4] === '') {
                boardObject.row2.splice((cpuNum - 4), 1, 'O');
                gameCells[cpuNum - 1].innerText = 'O';
                movesO++;

            } else if (cpuNum > 6 && cpuNum <= 9 && boardObject.row3[cpuNum - 7] === '') {
                boardObject.row3.splice((cpuNum - 7), 1, 'O');
                gameCells[cpuNum - 1].innerText = 'O';
                movesO++;

            } else {
                cpuTurn(getRandomCPU(1, 9)); //try another random num
            }

        }

    }

    const draw = (boardObject, cpuNumber) => {

        boardObject.row1.forEach((mark, index) => {
            gameCells[index].innerText = mark;

        });
        boardObject.row2.forEach((mark, index) => {
            gameCells[index + 3].innerText = mark;

        });
        boardObject.row3.forEach((mark, index) => {
            gameCells[index + 6].innerText = mark;

        });
        cpuTurn(cpuNumber);
    }
    console.log(gameCells);


    for (let i = 0; i < gameCells.length; i++) {
        gameCells[i].addEventListener('click', function () {
            console.log("index of board: " + i);

            if (i < 3 && boardObject.row1[i] === '') { //row 1
                boardObject.row1.splice(i, 1, 'X');
                movesX++;

            } else if ((i >= 3 && i < 6) && boardObject.row2[i - 3] === '') { //row 2
                boardObject.row2.splice((i - 3), 1, 'X');
                movesX++;


            } else if ((i >= 6 && i < 9) && boardObject.row3[i - 6] === '') { //row 3
                boardObject.row3.splice((i - 6), 1, 'X');
                movesX++;

            } else {
                return alert('Please select a valid unoccupied space');
            }

            const cpuNumber = getRandomCPU(1, 9);
            console.log(boardObject);
            draw(boardObject, cpuNumber);

            checkWinner();

            // if (movesX >= 3) {
            //     checkWinner();
            // }


        })
    }

    const changeTurn = () => {
        let turn = Player().playerX;
        return turn === Player().playerX ? Player().playerO : Player().playerX;
    }

    function getRandomCPU(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    function checkWinner(){

        const winningCombos = [
            [0, 1, 2],//row1 horiz
            [3, 4, 5],//row2 horiz
            [6, 7, 8],//row3 horiz
            [0, 3, 6],//row1, row2, row3 vertical
            [1, 4, 7],//vertical
            [2, 5, 8],//vertical
            [0, 4, 8],//diagonal
            [2, 4, 6] //diagonal
        ];

        // let winnerDeclared = {win: false, player: ''}

        for (let winCondition of winningCombos) {
            if (winCondition.every(w => gameCells[w].innerText === "X")) {
                playerX++
                console.log('Player X wins: ' + playerX)
                return alert('Player X Wins!');
                // return winnerDeclared.win = {win:true, player: 'playerX'}
                //end game
            }
            if (winCondition.every(w => gameCells[w].innerText === "O")) {
                playerO++
                console.log('Player O wins: ' + playerO);
                return alert('Player O Wins!');
                // return winnerDeclared = {win:true, player: 'playerO'}
                //end game
            } else {
                console.log("NO WINNER YET...KEEP PLAYING");
                // console.log('Moves for X: ' + movesX);
                // console.log('Moves for O: ' + movesO);
            }
        }

        return {
            playerX,
            playerO
        };
    }

}


//players stuff put in a factory
const Player = () => {

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

function displayController() {
    //get playerX and playerO scores and display them
}


gameBoard();


// finder winner
// const winner = (boardObj, letter) => {
//     let winner;
//     const row1 = boardObj.row1.length === 3;
//     const row2 = boardObj.row2.length === 3;
//     const row3 = boardObj.row3.length === 3;
//     const a = boardObj.row1[0].length === 3 && boardObj.row2[0].length === 3 && boardObj.row3[0].length === 3;
//     const b = boardObj.row1[1].length === 3 && boardObj.row2[1].length === 3 && boardObj.row3[1].length === 3;
//     const c = boardObj.row1[2].length === 3 && boardObj.row2[2].length === 3 && boardObj.row3[2].length === 3;
//     const y = boardObj.row1[0].length === 3 && boardObj.row2[1].length === 3 && boardObj.row3[2].length === 3;
//     const z = boardObj.row1[2].length === 3 && boardObj.row2[1].length === 3 && boardObj.row3[0].length === 3;
//     winner = row1 ? boardObj.row1.includes(letter) : row2 ? boardObj.row2.includes(letter) : row3 ? boardObj.row3.includes(letter) : a ? !(!boardObj.row1[0].includes(letter) && !boardObj.row2[0].includes(letter) && !boardObj.row3[0].includes(letter)) : b ? !(!boardObj.row1[1].includes(letter) && !boardObj.row2[1].includes(letter) && !boardObj.row3[1].includes(letter)) : c ? !(!boardObj.row1[2].includes(letter) && !boardObj.row2[2].includes(letter) && !boardObj.row3[2].includes(letter)) : y ? !(!boardObj.row1[0].includes(letter) && !boardObj.row2[1].includes(letter) && !boardObj.row3[2].includes(letter)) : z ? !(!boardObj.row1[2].includes(letter) && !boardObj.row2[1].includes(letter) && !boardObj.row3[0].includes(letter)) : false;
//     return winner;
//
// }