
        const board = document.getElementById("board");
        const message = document.getElementById("message");


        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];


        // Create cells for the board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);


            const line = document.createElement("div");
            line.classList.add("line");
            board.appendChild(line);
        }


        function displayWinner() {
            // Display the winning player and change background color
            const winnerMessage = document.getElementById("message");
            winnerMessage.textContent = `${currentPlayer} wins!`;
            console.log(winnerMessage.textContent)
            winnerMessage.style.backgroundColor = currentPlayer === "X" ? "#8aff8a" : "#8ac4ff";


        }


        function handleCellClick(event) {
            const clickedCell = event.target;
            const index = clickedCell.dataset.index;


            if (gameBoard[index] === "" && !checkWinner()) {
                gameBoard[index] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                clickedCell.classList.add("winner");


                if (checkWinner()) {
                    animateWinningLine([index]);
                    animateCelebration();
                    animateConfetti();
                    displayWinner();
                    message.textContent = `${currentPlayer} wins!`;
                } else if (!gameBoard.includes("")) {
                    message.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    message.textContent = `Current player: ${currentPlayer}`;
                }
            }
        }


        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];


            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    animateWinningLine([a, b, c]);
                    animateCelebration();
                    animateConfetti();
                    return true;
                }
            }


            return false;
        }


        function animateWinningLine(cells) {
            const line = document.querySelector('.line');
            const firstCell = document.querySelector(`[data-index="${cells[0]}"]`);
            const lastCell = document.querySelector(`[data-index="${cells[2]}"]`);


            if (firstCell && lastCell) {
                const startX = firstCell.offsetLeft + firstCell.offsetWidth / 2;
                const startY = firstCell.offsetTop + firstCell.offsetHeight / 2;


                const endX = lastCell.offsetLeft + lastCell.offsetWidth / 2;
                const endY = lastCell.offsetTop + lastCell.offsetHeight / 2;


                const length = Math.hypot(endX - startX, endY - startY);


                line.style.width = `${length}px`;
                line.style.transform = `translate(${startX}px, ${startY}px) rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
            }
        }




        function animateCelebration() {
            const celebration = document.createElement("div");
            celebration.classList.add("celebration");
            document.body.appendChild(celebration);


            const randomX = Math.floor(Math.random() * window.innerWidth);
            celebration.style.left = `${randomX}px`;


            const randomDuration = Math.floor(Math.random() * 5) + 2;
            celebration.style.animationDuration = `${randomDuration}s`;


            setTimeout(() => {
                celebration.remove();
            }, randomDuration * 5000);
        }


        function animateConfetti() {
            const confettiContainer = document.createElement("div");
            confettiContainer.style.position = "absolute";
            confettiContainer.style.width = "100%";
            confettiContainer.style.height = "100%";
            confettiContainer.style.overflow = "hidden";
            document.body.appendChild(confettiContainer);


            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement("div");
                confetti.classList.add("confetti");
                confetti.style.left = `${Math.random() * window.innerWidth}px`;
                confetti.style.animationDelay = `${Math.random()}s`;
                confettiContainer.appendChild(confetti);
            }


            setTimeout(() => {
                confettiContainer.remove();
            }, 5000); // Adjust the duration as needed
        }


        function resetGame() {
            // Reset game variables
            currentPlayer = "X";
            gameBoard = ["", "", "", "", "", "", "", "", ""];


            // Reset cells
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("winner");
            });


            // Reset winning line
            const line = document.querySelector('.line');
            line.style.width = "0";


            // Reset message
            message.textContent = ` New game started. Current player: ${currentPlayer}`;
        }


   