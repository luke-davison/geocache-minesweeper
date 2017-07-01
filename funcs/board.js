const boardWidth = 20
const boardHeight = 20
const totalMines = 100

function boardToArray (string) {
  const arr = string.split('')
  return arr.map((letter, i) => {
    return {
      x: i % boardWidth,
      y: Math.floor(i / boardWidth),
      mine: letter
    }
  })
}

function arrayToBoard (arr) {
  return arr.reduce((str, obj) => str + obj.mine, '')
}

module.exports = {
  boardToArray,
  arrayToBoard
}
