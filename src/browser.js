const rows = 5;
const cols = 5;
const minesCount = 5;
const mines = [];

const plantMines = () => {
  for(let i = 0; i < minesCount; i += 1) {
    mines.push([Math.floor(Math.random()*rows), Math.floor(Math.random()*cols)])
  }
  console.log(`mines in ${mines}`);
}

const countNeighborsMines = (row, col) => {
  let count = 0
  if (hasMine(row-1, col-1)){count += 1;}
  if (hasMine(row-1, col)){count += 1;}
  if (hasMine(row-1, col+1)){count += 1;}

  if (hasMine(row, col-1)){count += 1;}
  if (hasMine(row, col+1)){count += 1;}

  if (hasMine(row+1, col-1)){count += 1;}
  if (hasMine(row+1, col)){count += 1;}
  if (hasMine(row+1, col+1)){count += 1;}

  return count;
}

const hasMine = (row, col) => {
  let mine = false;
  mines.forEach((m) => {
    if (m[0] === row && m[1] === col) {
      mine = true
    }
  });
  return mine;
}

const openTile = (tile) => {
  row = tile.parentElement.rowIndex;
  col = tile.cellIndex;
  console.log(`click in row: ${row} col: ${col}`);
  tile.classList.remove('unopened');
  if ( hasMine(row, col) ) {
    tile.classList.add('mine');
  } else {
    let count = countNeighborsMines(row, col);
    if (count === 0) {
      tile.classList.add('opened');
    } else {
      tile.classList.add(`mine-neighbour-${count}`);
    }

  }
}

const grid = () => {
  const table = document.createElement('table');
  table.setAttribute('id','minesweeper');
  for(let i = 0; i < rows; i += 1) {
    const row = document.createElement('tr');

    for(let j = 0; j < cols; j += 1) {
      const col = document.createElement('td');
      col.classList.add('unopened');

      col.addEventListener('click', (event) => {openTile(event.currentTarget)});

      row.appendChild(col);
    }

    table.appendChild(row);
  }
  return table;
}

plantMines();
const game = document.getElementById('game');
game.appendChild(grid());
