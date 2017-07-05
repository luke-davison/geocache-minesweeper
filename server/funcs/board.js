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
    mines: 0,
    failed: false
  }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      board.squares.push({x: j, y: i})
    }
  }
  const verticalSpacings = createSpacings(2, height - 2 * numHeight)
  const eastSpacings = createSpacings(3, width - east.length * numWidth)
  addNums(board, east, eastSpacings, verticalSpacings[0])
  const southSpacings = createSpacings(3, width - south.length * numWidth)
  addNums(board, south, southSpacings, verticalSpacings[0] + verticalSpacings[1] + numHeight)
  addRandomMines(board, mines)
  addRemainingSquares(board)
  addNearbyNumbers(board)
  return board
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
    let left = spacing + spacings[i]
    addNum(board, left, top, num)
    left += numWidth
    return left
  }, 0)
}

function addNum (board, x, y, num) {
  const numStr = getNumber(num)
  const numArr = stringToArray(numStr, numWidth, numHeight)
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
      square.mine = '0'
    }
  })
}

function getNumber (num) {
  switch (num) {
    default: return ''
    case '0': return 'XXXX0XX0XX0XXXX'
    case '1': return '0X0XX00X00X0XXX'
    case '2': return 'XXX00XXXXX00XXX'
    case '3': return 'XXX00X0XX00XXXX'
    case '4': return 'X0XX0XXXX00X00X'
    case '5': return 'XXXX00XXX00XXXX'
    case '6': return 'XXXX00XXXX0XXXX'
    case '7': return 'XXX00X00X00X00X'
    case '8': return 'XXXX0XXXXX0XXXX'
    case '9': return 'XXXX0XXXX00XXXX'
  }
}

function addRandomMines (board, mines) {
  while (board.mines < mines) {
    let r = Math.floor(Math.random() * board.squares.length)
    if (!board.squares[r].mine) {
      board.squares[r].mine = 'X'
      board.mines++
    }
  }
}

function addRemainingSquares (board) {
  board.squares.forEach(square => {
    if (!square.mine) {
      square.mine = '0'
    }
  })
}

function addNearbyNumbers (board) {
  board.squares.forEach(square => {
    if (!isNaN(square.mine)) {
      square.mine = String(board.squares.reduce((total, nearby) => {
        if (isNearby(square.x, square.y, nearby.x, nearby.y) && nearby.mine === 'X') {
          return total + 1
        }
        return total
      }, 0))
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

function checkMove (x, y, board) {
  const result = board.squares.find(square => square.x === x && square.y === y)
  if (!result) throw new Error('Invalid move')
  if (result.mine === 'X') return {failed: true, results: [result]}
  const results = [result]
  let i = 0
  while (i < results.length) {
    if (results[i].mine === '0') {
      board.squares.forEach(square => {
        if (isNearby(results[i].x, results[i].y, square.x, square.y) && !results.find(found => found.x === square.x && found.y === square.y)) {
          results.push(square)
        }
      })
    }
    i++
  }
  return {
    results,
    id: board.id,
    width: board.width,
    height: board.height
  }
}

function isNearby (x1, y1, x2, y2) {
  return (x2 >= x1 - 1 && x2 <= x1 + 1 && y2 >= y1 - 1 && y2 <= y1 + 1) && (x2 !== x1 || y2 !== y1)
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
  addRemainingSquares,
  addNearbyNumbers,
  checkMove
}
