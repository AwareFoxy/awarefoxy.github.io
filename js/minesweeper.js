const grid = document.getElementById('minesweeper');
const gridSize = 10;
const mineCount = 20;
let cells = [];

const initGame = () => {
    grid.innerHTML = '';
    cells = Array.from({ length: gridSize * gridSize }, (_, idx) => ({
        element: document.createElement('div'),
        isMine: false,
        revealed: false,
        x: idx % gridSize,
        y: Math.floor(idx / gridSize),
        adjacentMines: 0,
    }));
    cells.forEach(cell => {
        cell.element.className = 'cell';
        grid.appendChild(cell.element);
    });
    plantMines();
    setAdjacentMines();
    cells.forEach((cell, index) => cell.element.onclick = () => revealCell(index));
};

const plantMines = () => {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const idx = Math.floor(Math.random() * gridSize * gridSize);
        if (!cells[idx].isMine) {
            cells[idx].isMine = true;
            minesPlaced++;
        }
    }
};

const setAdjacentMines = () => {
    cells.forEach(cell => {
        if (!cell.isMine) {
            const adjacentCells = getAdjacentCells(cell.x, cell.y);
            cell.adjacentMines = adjacentCells.reduce((acc, next) => acc + (cells[next].isMine ? 1 : 0), 0);
        }
    });
};

const revealCell = (index) => {
    const cell = cells[index];
    if (cell.revealed || cell.isMine) {
        if (cell.isMine) {
            cell.element.classList.add('mine');
            setTimeout(() => {
                alert('Game Over');
                initGame();
            }, 100);
        }
        return;
    }

    cell.revealed = true;
    cell.element.classList.add('revealed');

    if (cell.adjacentMines > 0) {
        cell.element.textContent = cell.adjacentMines;
    } else {
        const adjacentCells = getAdjacentCells(cell.x, cell.y);
        adjacentCells.forEach(idx => {
            if (!cells[idx].revealed && !cells[idx].isMine) {
                revealCell(idx);
            }
        });
    }
};

const getAdjacentCells = (x, y) => {
    const positions = [
        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        [x - 1, y],                 [x + 1, y],
        [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
    ];
    return positions.filter(([xx, yy]) => xx >= 0 && xx < gridSize && yy >= 0 && yy < gridSize)
        .map(([xx, yy]) => yy * gridSize + xx);
};

initGame();