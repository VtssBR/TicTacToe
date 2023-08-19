const buttonsBox = document.querySelectorAll('.buttonsBox')
let turnPlayer = ''
let Board = []

function updateTitle() {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

function initialized() {
    Board = [["", "", ""], ["", "", ""], ["", "", ""]]
    turnPlayer = 'player1'
    document.querySelector('h3').innerHTML = 'VEZ DE: <span id="turnPlayer"></span>'
    updateTitle()
    buttonsBox.forEach(function (element) {
        element.innerText = ''
        element.classList.remove('win')
        element.addEventListener('click', clickbuttons)
    })
}

function clickbuttons(ev) {
    const button = ev.currentTarget
    const position = button.dataset.position
    const rowCollumPair = position.split('.')
    const row = rowCollumPair[0]
    const collum = rowCollumPair[1]

    if (turnPlayer === 'player1') {
        button.innerText = 'X'
        Board[row][collum] = 'X'
    }
    else {
        button.innerText = 'O'
        Board[row][collum] = 'O'
    }
    disablebutton(button)
    const winCondition = getWin()

    if (winCondition.length > 0) {
        handleWin(winCondition)
        disableAllButtons();
    } else if (Board.flat().includes('')) {
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h3').innerHTML = 'EMPATE'
    }
}

function disablebutton(element) {
    element.removeEventListener('click', clickbuttons)
}

function disableAllButtons() {
    buttonsBox.forEach(function (element) {
    element.removeEventListener('click', clickbuttons)
    })
}


function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-position="' + region + '"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h3').innerHTML = playerName + ' VENCEU'
}



function getWin() {
    const winCondition = []
    if (Board[0][0] && Board[0][0] === Board[0][1] && Board[0][0] === Board[0][2])
        winCondition.push("0.0", "0.1", "0.2")
    if (Board[1][0] && Board[1][0] === Board[1][1] && Board[1][0] === Board[1][2])
        winCondition.push("1.0", "1.1", "1.2")
    if (Board[2][0] && Board[2][0] === Board[2][1] && Board[2][0] === Board[2][2])
        winCondition.push("2.0", "2.1", "2.2")
    if (Board[0][0] && Board[0][0] === Board[1][0] && Board[0][0] === Board[2][0])
        winCondition.push("0.0", "1.0", "2.0")
    if (Board[0][1] && Board[0][1] === Board[1][1] && Board[0][1] === Board[2][1])
        winCondition.push("0.1", "1.1", "2.1")
    if (Board[0][2] && Board[0][2] === Board[1][2] && Board[0][2] === Board[2][2])
        winCondition.push("0.2", "1.2", "2.2")
    if (Board[0][0] && Board[0][0] === Board[1][1] && Board[0][0] === Board[2][2])
        winCondition.push("0.0", "1.1", "2.2")
    if (Board[0][2] && Board[0][2] === Board[1][1] && Board[0][2] === Board[2][0])
        winCondition.push("0.2", "1.1", "2.0")
    return winCondition
}

document.getElementById('buttonStart').addEventListener('click', initialized)