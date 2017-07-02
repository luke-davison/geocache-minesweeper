const numWidth = 3
const numHeight = 5

function stringToArray (string, width, height) {
  const arr = string.split('')
  return arr.map((letter, i) => {
    return {
      x: i % width,
      y: Math.floor(i / width),
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
    squares: [],
    mines: 0
  }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board.squares.push({x: j, y: i})
    }
  }
  const verticalSpacings = createSpacings(2, height - 2 * numHeight)
  const eastSpacings = createSpacings(3, width - east.length * numWidth)
  addNums(board, east, eastSpacings, verticalSpacings[0])
  drawBoard(board)
  const southSpacings = createSpacings(3, width - south.length * numWidth)
  addNums(board, south, southSpacings, verticalSpacings[0] + verticalSpacings[1] + numHeight)
  drawBoard(board)
  addRandomMines(board, mines)
  addRemainingSquares(board)
  drawBoard(board)
  return board.squares
}

function createSpacings (digits, spaces) {
  const spacings = []
  for (let i = 0; i < digits + 1; i++) {
    if (i !== 0 & i !== digits + 1) {
      spacings.push(1)
      spaces--
    } else {
      spacings.push(0)
    }
  }
  for (let i = 0; i < spaces; i++) {
    let r = Math.floor(Math.random() * spacings.length)
    spacings[r]++
  }
  return spacings
}

function addNums (board, nums, spacings, top) {
  nums.split('').reduce((spacing, num, i) => {
    let left = spacing + spacings[i] + numWidth * i
    addNum(board, left, top, num)
    return left
  }, 0)
}

function addNum (board, x, y, num) {
  const numStr = getNumber(num)
  const numArr = stringToArray(numStr, numWidth, numHeight)
  console.log(numArr)
  numArr.forEach(numObj => {
    const square = board.squares.find(square => {
      return square.x === x + numObj.x && square.y === y + numObj.y
    })
    if (square) {
      square.mine = numObj.mine
      if (numObj.mine === 'X') {
        board.mines++
      }
    }
  })
  board.squares.forEach(square => {
    if (((square.x === x - 1 || square.x === x + numWidth) && square.y >= y - 1 && square.y <= y + numHeight) ||
      ((square.y === y - 1 || square.y === y + numHeight) && square.x >= x - 1 && square.x <= x + numWidth)) {
      square.mine = 'O'
    }
  })
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

function addRandomMines (board, mines) {
  while (board.mines < mines) {
    let r = Math.floor(Math.random() * board.squares.length + 1)
    if (!board.squares[r].mine) {
      board.squares[r].mine = 'X'
      board.mines++
    }
  }
}

function addRemainingSquares (board) {
  board.squares.forEach(square => {
    if (!square.mine) {
      square.mine = 'O'
    }
  })
}

function drawBoard (board) {
  board.squares.reduce((string, square) => {
    if (string.length === board.width - 1) {
      console.log(string + (square.mine || '_'))
      return ''
    }
    return string + (square.mine || '_')
  }, '')
}

module.exports = {
  stringToArray,
  arrayToString,
  createBoard,
  createSpacings,
  addNums,
  addNum,
  getNumber,
  addRandomMines,
  addRemainingSquares
}
