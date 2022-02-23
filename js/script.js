function gameBoard() {
    const gameCells = document.getElementsByClassName('cell');
    const resetBtn = document.querySelector('.playAgain');
    const playerScore = document.querySelector('.playerScore');
    const cpuScore = document.querySelector('.cpuScore');


    let playerX = 0;
    let playerO = 0;
    let winner = '';
    let totalMoves = 0;
    const cpuNumber = getRandomCPU(1, 9);
    console.log(winner);

    let boardObject = {
        row1: ['', '', ''],
        row2: ['', '', ''],
        row3: ['', '', '']
    }

    function getRandomCPU(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }

    function cpuTurn(cpuNum){
        //check if winner is declared prior to making a cpu move again
        let vacant; //vacant cells
        let whoWon = checkWinner();

        if ((cpuNum < 3 && boardObject.row1[cpuNum - 1] === '') && whoWon === 'no winner') {
            boardObject.row1.splice(cpuNum - 1, 1, 'O');
            gameCells[cpuNum - 1].innerText = 'O';
            vacant = true;
            totalMoves++;
            checkWinner();
            updateDisplay();


        } else if ((cpuNum >= 3 && cpuNum <= 6 && boardObject.row2[cpuNum - 4] === '') && whoWon === 'no winner') {
            boardObject.row2.splice((cpuNum - 4), 1, 'O');
            gameCells[cpuNum - 1].innerText = 'O';
            vacant = true;
            totalMoves++;
            checkWinner();
            updateDisplay();

        } else if ((cpuNum > 6 && cpuNum <= 9 && boardObject.row3[cpuNum - 7] === '') && whoWon === 'no winner') {
            boardObject.row3.splice((cpuNum - 7), 1, 'O');
            gameCells[cpuNum - 1].innerText = 'O';
            vacant = true;
            totalMoves++;
            checkWinner();
            updateDisplay();
        }

        if (!vacant && totalMoves < 9 && winner === '') {
            return cpuTurn(getRandomCPU(1, 9)); //try another random num
        }

    }

    function playerTurn(){
        // let whoWon = checkWinner();
        //
        // // if(whoWon !== 'no winner'){
        // //      return updateDisplay();
        // //
        // // }

        boardObject.row1.forEach((mark, index) => {
            gameCells[index].innerText = mark;

        });
        boardObject.row2.forEach((mark, index) => {
            gameCells[index + 3].innerText = mark;

        });
        boardObject.row3.forEach((mark, index) => {
            gameCells[index + 6].innerText = mark;

        });

    }

    console.log(gameCells);

    for (let i = 0; i < gameCells.length; i++) {
        gameCells[i].addEventListener('click', function () {

            if (i < 3 && boardObject.row1[i] === '') { //row 1
                boardObject.row1.splice(i, 1, 'X');


            } else if ((i >= 3 && i < 6) && boardObject.row2[i - 3] === '') { //row 2
                boardObject.row2.splice((i - 3), 1, 'X');


            } else if ((i >= 6 && i < 9) && boardObject.row3[i - 6] === '') { //row 3
                boardObject.row3.splice((i - 6), 1, 'X');

            } else {
                return alert('Please select a valid unoccupied space');
            }
            totalMoves++;

            playerTurn();
            checkWinner();
            updateDisplay();
            cpuTurn(cpuNumber);

        })

    }

//check winner returns - update display here

    function updateDisplay() {
        checkWinner();

        if (winner === 'X') {
            playerX++;
            return playerScore.innerText = playerX;

        }
        if (winner === 'O') {
            playerO++;
            return cpuScore.innerText = playerO;

        }
        if (winner === 'draw') {
            return alert('its a draw!');
        }
        return 'noUpdate'
    }

    function resetBoard() { //resets board, array and moves counter
        for (let i = 0; i < gameCells.length; i++) {
            gameCells[i].innerText = '';
            console.log(gameCells);
        }
        boardObject = {
            row1: ['', '', ''],
            row2: ['', '', ''],
            row3: ['', '', '']
        }
        winner = '';
        totalMoves = 0;

        console.log(boardObject);
    }

    resetBtn.addEventListener("click", () => {
        resetBoard();
    })

    function checkWinner() {

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

        let boardArray = []; //flattened array to compare to winningCombos
        for (const boardKey in boardObject) {
            boardArray = boardArray.concat(boardObject[boardKey]);
        }

        let winnerDeclared = false;

        for (let winCondition of winningCombos) {
            if ((winCondition.every(w => boardArray[w] === 'X'))) {
                winner = 'X';
                winnerDeclared = true;
                return 'user';
            }
            if (winCondition.every(w => boardArray[w] === 'O')) {
                winner = 'O';
                winnerDeclared = true;
                return 'cpu';
            }

        }
        if ((totalMoves === 9) && winnerDeclared === false) {
            winner = 'draw';
            return 'draw'
        }

        return 'no winner';
    }

}

//gameBoard module
gameBoard();//init gameboard
