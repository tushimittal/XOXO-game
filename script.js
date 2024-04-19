const cells = Array.from({ length: 9 }, () => ({ active: false, symbol: '' }));
        const symbols = ['X', 'O'];
        let currentSymbol = symbols[0];
        let isGameOver = false;

        const game = document.querySelector('.game');
        const gameOverMessage = document.createElement('div');
        gameOverMessage.textContent = 'Game Over!';
        gameOverMessage.style.fontSize = '24px';
        gameOverMessage.style.fontWeight = 'bold';
        gameOverMessage.style.padding = '10px';

        const resetGame = () => {
            isGameOver = false;
            cells.forEach(cell => {
                cell.active = false;
                cell.symbol = '';
            });
            currentSymbol = symbols[0];
            game.innerHTML = '';
            game.append(...cells.map((_, i) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = '';
                cell.addEventListener('click', () => {
                    if (isGameOver || cell.classList.contains('active')) return;
                    cell.textContent = currentSymbol;
                    cell.classList.add('active');
                    cells[i].active = true;
                    cells[i].symbol = currentSymbol;
                    checkForWinner();
                    currentSymbol = currentSymbol === symbols[0] ? symbols[1] : symbols[0];
                });
                return cell;
            }));
        };
        const soundEffect = document.getElementById('soundEffect');

        function playSound() {
            soundEffect.play();
        }
        const checkForWinner = () => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (const line of lines) {
                const [a, b, c] = line;
                if (cells[a].active && cells[b].active && cells[c].active &&
                    cells[a].symbol === cells[b].symbol && cells[b].symbol === cells[c].symbol) {
                    gameOverMessage.textContent = `${cells[a].symbol} won!`;
                    game.append(gameOverMessage);
                    isGameOver = true;
                    return;
                }
            }

            if (cells.every(cell => cell.active)) {
                gameOverMessage.textContent = 'It\'s a tie!';
                game.append(gameOverMessage);
                isGameOver = true;
            }
        };
        
resetGame();
