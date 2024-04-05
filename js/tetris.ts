document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#gameArea') as HTMLElement;
    const scoreDisplay = document.querySelector('#score') as HTMLSpanElement;
    const startBtn = document.querySelector('#start') as HTMLButtonElement;
    const pauseBtn = document.querySelector('#pause') as HTMLButtonElement;
    const restartBtn = document.querySelector('#restart') as HTMLButtonElement;
    const width = 10;
    let nextRandom = 0;
    let timerId: number | null = null;
    let score = 0;
    let squares: HTMLElement[] = [];
    const colors = ['orange', 'red', 'purple', 'green', 'blue'];

    const lTetromino = [[1, width + 1, width * 2 + 1, 2], [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2], [width, width * 2, width * 2 + 1, width * 2 + 2]];
    const zTetromino = [[0, width, width + 1, width * 2 + 1], [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1], [width + 1, width + 2, width * 2, width * 2 + 1]];
    const tTetromino = [[1, width, width + 1, width + 2], [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1], [1, width, width + 1, width * 2 + 1]];
    const oTetromino = [[0, 1, width, width + 1], [0, 1, width, width + 1],
        [0, 1, width, width + 1], [0, 1, width, width + 1]];
    const iTetromino = [[1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1], [width, width + 1, width + 2, width + 3]];
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            squares[currentPosition + index].style.backgroundColor = colors[random];
        });
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
            squares[currentPosition + index].style.backgroundColor = '';
        });
    }

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = window.setInterval(moveDown, 1000) as unknown as number;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            timerId = window.setInterval(moveDown, 1000) as unknown as number;
        }
    });

    restartBtn.addEventListener('click', () => {
        location.reload();
    });

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            addScore();
            gameOver();
        }
    }

    function control(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft') moveLeft();
        else if (e.key === 'ArrowUp') rotate();
        else if (e.key === 'ArrowRight') moveRight();
        else if (e.key === 'ArrowDown') moveDown();
    }
    document.addEventListener('keyup', control);

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        draw();
    }

    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;

    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ];

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
            (square as HTMLElement).style.backgroundColor = '';
        });
        upNextTetrominoes[nextRandom].forEach(index => {
            (displaySquares[displayIndex + index] as HTMLElement).classList.add('tetromino');
            (displaySquares[displayIndex + index] as HTMLElement).style.backgroundColor = colors[nextRandom];
        });
    }

    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.textContent = score.toString();
                const squaresRemoved = squares.splice(i, width) as HTMLElement[];
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.textContent = 'end';
            if (timerId) clearInterval(timerId);
        }
    }
});