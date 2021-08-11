const base = document.querySelector('.base')
const hero = document.querySelector('.hero')

const die = document.querySelector('.die')
const startButton = document.querySelector('.button')
const messageDiv = document.querySelector('.message')
const p1 = document.getElementById('1')

//game state
let heroPosition = hero.parentElement.id
let gameActive = false
let dieVal = 0


//throwDie function
function throwDie () {
    dieVal = Math.ceil(Math.random() * 6)
}

//startJourney which handles getting the hero moving on the path
function startJourney() {
  if (dieVal === 6) {
    let child = base.removeChild(hero)
    p1.appendChild(child)
    heroPosition = p1.id
    gameActive = true
    messageDiv.innerText = `You rolled the magic number ${dieVal} and can now start your journey. Good luck!`
  } else {
    messageDiv.innerText = `You rolled a ${dieVal}. Try again for the magic number!`
  }
  
}

//resetJourney which resets current journey to base
function resetJourney() {
  heroPosition = ''
  gameActive = false
  dieVal = 0
  base.appendChild(hero)
  messageDiv.innerText = ''
}

//movements
//moveForward
function moveForward(dieVal) {
  let curPosition = hero.parentElement
  let nextPosition = document.getElementById(`${parseInt(curPosition.id) + dieVal}`)
  let child = curPosition.removeChild(hero)
  nextPosition.appendChild(child)
  heroPosition = nextPosition.id
  messageDiv.innerText = `You move forward ${dieVal} tiles. Keep it up!`
}
//moveBack
function moveBack() {
  if (heroPosition >= 3) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    let newPosition = document.getElementById(`${heroPosition - 3}`)
    newPosition.appendChild(child)
    heroPosition = newPosition.id
    messageDiv.innerText = `Uh oh, you rolled a trouble ${dieVal}. You move back ${dieVal} tiles. don't give up!`

  } else {
    let child = document.getElementById(heroPosition).removeChild(hero)
    base.appendChild(child)
    heroPosition = base.id
    messageDiv.innerText = `Uh oh, you rolled a trouble ${dieVal}. You move back to base. Hang in there!`
  }
}



//actual movement logic handler
function journey () {
  throwDie()
  if (heroPosition === base.id || !gameActive ) {
    startJourney()
  } else {
    if (dieVal === 3) {
    moveBack()
    } else {
    moveForward(dieVal)
    }
  }
  // checkWin()
}



//event listeners
startButton.addEventListener('click', function() {
  resetJourney()
})


die.addEventListener('click', function() {
  journey()
})