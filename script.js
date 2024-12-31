var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame(){
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            let tiles = document.createElement("div");
            tiles.id = row.toString() + "-" + col.toString();
            tiles.classList.add("tiles");

            if(row == 0 || row == 1){
                tiles.classList.add("horizontal-line");
            }
            if(col == 0 || col == 1){
                tiles.classList.add("vertical-line");
            }
            tiles.innerText = "";
            tiles.addEventListener("click", settiles);
            document.getElementById("board").appendChild(tiles);
        }
    }
}

function settiles() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);

    if (board[row][col] != ' ') { 
        //already taken spot
        return;
    }
    
    board[row][col] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    //check winner
    checkWinner();
}


function checkWinner() {
    //horizontally, check 3 rows
    for (let row = 0; row < 3; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tiles = document.getElementById(row.toString() + "-" + i.toString());
                tiles.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] == board[1][col] && board[1][col] ==  board[2][col] && board[0][col] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tiles = document.getElementById(i.toString() + "-" + col.toString());                
                tiles.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tiles = document.getElementById(i.toString() + "-" + i.toString());                
            tiles.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tiles = document.getElementById("0-2");                
        tiles.classList.add("winner");

        //1-1
        tiles = document.getElementById("1-1");                
        tiles.classList.add("winner");

        //2-0
        tiles = document.getElementById("2-0");                
        tiles.classList.add("winner");
        gameOver = true;
        return;
    }
}