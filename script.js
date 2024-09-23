let grid = [];
let score = 0;

// Initialize grid
for (let i = 0; i < 4; i++) {
  grid[i] = new Array(4).fill(0);
}

// Add two random tiles to the grid
addTile();
addTile();

// Function to add a random tile to the grid
function addTile() {
  const emptyCells = getEmptyCells();
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[randomCell.x][randomCell.y] = Math.random() < 0.5 ? 2 : 4;
  renderGrid();
}

// Function to get empty cells
function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }
  return emptyCells;
}

// Function to render the grid
function renderGrid() {
  const gridHTML = grid.map(row => {
    return `<div class="grid-row">${row.map(cell => `<div class="grid-cell">${cell === 0 ? '' : cell}</div>`).join('')}</div>`;
  }).join('');
  document.getElementById('grid').innerHTML = gridHTML;
}

// Function to merge tiles
function mergeTiles(arr) {
  let merged = false;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1] && arr[i] !== 0) {
      arr[i] *= 2;
      score += arr[i];
      arr[i + 1] = 0;
      merged = true;
    }
  }
  if (merged) {
    arr = arr.filter(x => x !== 0);
    while (arr.length < 4) {
      arr.push(0);
    }
  }
  return arr;
}

// Function to handle user input (up, down, left, right)
function handleInput(direction) {
  let rotated = false;
  let tempGrid = JSON.parse(JSON.stringify(grid));
  switch (direction) {
    case 'up':
      break;
    case 'down':
      tempGrid = rotateGrid(tempGrid, 2);
      rotated = true;
      break;
    case 'left':
      break;
    case 'right':
      tempGrid = rotateGrid(tempGrid, 1);
      rotated = true;
      break;
  }
  for (let i = 0; i < 4; i++) {
    let temp = tempGrid.map(row => row[i]);
    temp = mergeTiles(temp);
    for (let j = 0; j < 4; j++) {
      tempGrid[j][i] = temp[j];
    }
  }
  if (rotated) {
    tempGrid = rotateGrid(tempGrid, 3);
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid[i][j] = tempGrid[i][j];
    }
  }
  addTile();
  renderGrid();
}

// Function to rotate the grid
function rotateGrid(grid, times) {
  for (let i = 0; i < times; i++) {
    grid = grid[0].map((_, colIndex) => grid.map(row => row[colIndex]).reverse());
  }
  return grid;
}

// Add event listeners for user input
document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp':
      handleInput('up');
      break;
    case 'ArrowDown':
      handleInput('down');
      break;
    case 'ArrowLeft':
      handleInput('left');
      break;
    case 'ArrowRight':
      handleInput('right');
      break;
  }
});