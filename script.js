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


//Die function
function throwDie () {
    dieVal = Math.ceil(Math.random() * 6)
}

function startJourney() {
  
  if (dieVal === 6) {
    let child = base.removeChild(hero)
    p1.appendChild(child)
    heroPosition = p1.id
    gameActive = true
  } else return
}

//movements
//moveForward
function moveForward(dieVal) {
  let curPosition = hero.parentElement
  let nextPosition = document.getElementById(`${parseInt(curPosition.id) + dieVal}`)
  let child = curPosition.removeChild(hero)
  nextPosition.appendChild(child)
  heroPosition = nextPosition.id
}
//moveBack
function moveBack() {
  if (heroPosition >= 3) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    let newPosition = document.getElementById(`${heroPosition - 3}`)
    newPosition.appendChild(child)
    heroPosition = newPosition.id
    
  } else {
    let child = document.getElementById(heroPosition).removeChild(hero)
    base.appendChild(child)
    heroPosition = base.id
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
}



//event listeners
startButton.addEventListener('click', function() {
  heroPosition = ''
  gameActive = false
  dieVal = 0
  base.appendChild(hero)
})


die.addEventListener('click', function() {
  journey()
})