const request = require('superagent')

let receivingInfo = false
let squares = []
let error = ''
let failed = false
let width = 20
let height = 20
let mines = 90

document.addEventListener('DOMContentLoaded', startGame)

function startGame () {
  let windowWidth = window.innerWidth - 10
  let windowHeight = window.innerHeight - 10
  let squareDimension = Math.floor(Math.min(windowWidth / width, windowHeight / height)) - 2
  windowWidth = (squareDimension + 2) * width
  windowHeight = (squareDimension + 2) * height
  const container = document.getElementById('board')
  container.style.width = windowWidth + 'px'
  container.style.height = windowHeight + 'px'
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const newSquare = document.createElement('div')
      newSquare.id = 'x' + x + 'y' + y
      newSquare.className = 'square'
      container.appendChild(newSquare)
      newSquare.addEventListener('click', () => leftClick(x, y))
      newSquare.addEventListener('contextmenu', (e) => rightClick(e, x, y))
      newSquare.style.width = squareDimension + 'px'
      newSquare.style.height = squareDimension + 'px'
      const square = squares.find(square => square.x === x && square.y === y)
      if (square) {
        newSquare.classList.add('mine' + square.mine)
        newSquare.innerHTML = '<div class=square-text>' + square.mine + '</div>'
      }
    }
  }
}

function leftClick (x, y) {
  if (!receivingInfo) {
    if (failed) {
      resetGame()
    } else {
      if (!squares.find(square => square.x === x && square.y === y)) {
        request
          .post('/submit')
          .send({x, y, id: window.localStorage.getItem('id')})
          .end(infoReceived)
      }
    }
  }
}

function infoReceived (err, res) {
  if (err) {
    error = err.message
    return
  }
  res.body.results.forEach(newSquare => {
    if (!squares.find(square => square.x === newSquare.x && square.y === newSquare.y)) {
      squares.unshift(newSquare)
    }
  })
  if (res.body.failed) {
    failed = true
    window.localStorage.removeItem('id')
  } else {
    window.localStorage.setItem('id', res.body.id)
  }
  startGame()
}

function resetGame () {
  squares = []
  failed = false
  startGame()
}

function rightClick (e, x, y) {
  e.preventDefault()
  if (!receivingInfo) {
    if (!failed) {
      if (squares.find(square => square.x === x && square.y === y && square.mine === '')) {
        squares = squares.filter(square => square.x !== x || square.y !== y)
      } else {
        squares.push({x, y, mine: ''})
      }
      startGame()
    } else {
      resetGame()
    }
  }
}
