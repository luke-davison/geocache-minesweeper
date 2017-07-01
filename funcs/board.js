const numWidth = 3
const numHeight = 5

function stringToArray (string, width, height) {
  const arr = string.split('')
  return arr.map((letter, i) => {
    return {
      x: i % width,
      y: Math.floor(i / height),
      mine: letter
    }
  })
}

function arrayToString (arr) {
  return arr.reduce((str, obj) => str + obj.mine, '')
}

function createBoard (width, height, east, south, mines) {
  const board = {
    width,
    height,
    squares: []
  }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board.squares.push({x: j, y: i})
    }
  }

  const eastSpacing = createSpacing(3, width - east.length * numWidth)
  const southSpacing = createSpacing(3, width - south.length * numWidth)
  const verticalSpacing = createSpacing(2, height - 2 * numHeight)
  return board
}

function createSpacing (digits, spaces) {
  const spacing = []
  for (let i = 0; i < digits + 1; i++) {
    if (i !== 0 & i !== digits + 1) {
      spacing.push(1)
      spaces--
    } else {
      spacing.push(0)
    }
  }
  for (let i = 0; i < spaces; i++) {
    let r = Math.floor(Math.random() * spacing.length + 1)
    spacing[r]++
  }
  return spacing
}

function addNumToBoard(board, x, y, num) {
  numStr = getNumber(num)
}

function getNumber (num) {
  switch (num) {
    default: return ''
    case '0': return 'XXXXOXXOXXOXXXX'
    case '1': return 'OXOXXOOXOOXOXXX'
    case '2': return 'XXXOOXXXXXOOXXX'
    case '3': return 'XXXOOXOXXOOXXXX'
    case '4': return 'XOXXOXXXXOOXOOX'
    case '5': return 'XXXXOOXXXOOXXXX'
    case '6': return 'XXXXOOXXXXOXXXX'
    case '7': return 'XXXOOXOOXOOXOOX'
    case '8': return 'XXXXOXXXXXOXXXX'
    case '9': return 'XXXXOXXXXOOXXXX'
  }
}

module.exports = {
  stringToArray,
  arrayToString,
  createBoard,
  createSpacing,
  addNumToBoard,
  getNumber
}
