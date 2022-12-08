const funcs = require('./funcs/board')

const width = 20
const height = 20
const south = String(process.env.south || "123")
const east = String(process.env.east || "456")
const mines = 88

const fakeDatabase = new Map();
console.log("fakeDatabase.size", fakeDatabase.size)

function submitMove (x, y, id) {
  if (!id) {
    const game = createNewGame();
    return getResult(game)
  }

  const game = getGame(id)
  return getResult(game)

  function getResult (game) {
    const result = funcs.checkMove(x, y, game)
    if (result.failed) {
      gameFailed(game.id)
    }
    return result
  }
}

function createNewGame () {
  const board = funcs.createBoard(width, height, south, east, mines)
  const id = String(Math.ceil(Math.random() * 100000))
  board.id = id
  board.failed = false
  const dbBoard = {
    id: id,
    width: board.width,
    height: board.height,
    mines: board.mines,
    failed: false,
    squares: funcs.arrayToString(board.squares)
  }

  fakeDatabase.set(id, dbBoard)
  board.id = id

  return board
}

function getGame (id) {
  console.log(id, typeof id)
  console.log("fakeDatabase.size", fakeDatabase.size, Array.from(fakeDatabase))
  const board = fakeDatabase.get(id)
  if (!board) {
    console.log('no board')
    return createNewGame()
  }

  return {
    id: board.id,
    width: board.width,
    height: board.height,
    squares: funcs.stringToArray(board.squares, board.width, board.height),
    mines: board.mines,
    failed: board.failed
  }
}

function gameFailed (id) {
  console.log('deleting', id)
  fakeDatabase.delete(id)
}

module.exports = submitMove
