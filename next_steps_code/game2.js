//global variables
const base = document.querySelector('.base')
const home = document.querySelector('.home')
const hero = document.querySelector('.hero')

const pits = document.querySelectorAll('.pit')
const die = document.querySelector('.die')
const startButton = document.querySelector('.new-game-button')
const messageDiv = document.querySelector('.message')
messageDiv.innerText = 'Click the artifact below to try your luck...'
const p1 = document.getElementById('1')

//game state
let heroPosition = base.id
let gameActive = false
let dieVal = 0

//throwDie function, to be invoked each time the "die" is clicked
function throwDie () {
  dieVal = Math.ceil(Math.random() * 6)
}

//startJourney which handles getting the hero moving on the first path tile
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

//resetJourney which resets current journey/state.
function resetJourney() {
  gameActive = false
  dieVal = 0
  let child = document.getElementById(hero.parentElement.id).removeChild(hero)
  base.appendChild(child)
  heroPosition = base.id
  messageDiv.innerText = 'Click the artifact below to try your luck...'
}

//movements
  //moveBack: handles hero rolling 3
function moveBack() {
  if (heroPosition > 3) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    let newPosition = document.getElementById(`${heroPosition - 3}`)
    newPosition.appendChild(child)
    heroPosition = newPosition.id
    messageDiv.innerText = `Uh oh, you rolled a trouble ${dieVal}. You move back ${dieVal} tiles. don't give up!`
  } else {
    let child = document.getElementById(heroPosition).removeChild(hero)
    base.appendChild(child)
    heroPosition = base.id
    gameActive = false
    messageDiv.innerText = `Uh oh, you rolled a trouble ${dieVal}. You move back to base. Hang in there!`
  }
}
//moveHome: which handles cases where hero is near home
function moveHome (heroPosition) {
  let child = document.getElementById(heroPosition).removeChild(hero)
  home.appendChild(child)
  heroPosition = home.id
  messageDiv.innerText = `You made it home! Click on the die again for the epilogue.`
  gameActive = false
  unlockEnd()
}
  //moveForward: gets hero moving on the board based on rolls
function moveForward(dieVal) {
  if (!gameActive) {
    return
  } else {
    if (hero.parentElement.id >= 47) {
      if (heroPosition >= 47 && dieVal === 6) {
        moveHome(heroPosition)
      } else if (heroPosition >= 48 && dieVal >= 5) {
        moveHome(heroPosition)
      } else if (heroPosition >= 49 && dieVal >= 4) {
        moveHome(heroPosition)
      } else if (heroPosition >= 50 && dieVal >= 3) {
        moveHome(heroPosition)
      } else if (heroPosition >= 51 && dieVal >= 2) {
        moveHome(heroPosition)
      } else if (heroPosition >= 52 && dieVal >= 1){
        moveHome(heroPosition)
      } else {
        let curPosition = hero.parentElement
        let nextPosition = document.getElementById(`${parseInt(curPosition.id) + dieVal}`)
        let child = curPosition.removeChild(hero)
        nextPosition.appendChild(child)
        heroPosition = nextPosition.id
        messageDiv.innerText = `You move forward ${dieVal} tiles. Almost there!`
      }
    } else {
      let curPosition = hero.parentElement
      let nextPosition = document.getElementById(`${parseInt(curPosition.id) + dieVal}`)
      let child = curPosition.removeChild(hero)
      nextPosition.appendChild(child)
      heroPosition = nextPosition.id
      messageDiv.innerText = `You move forward ${dieVal} tiles. Keep it up!`
    }
  }
}

//game logic handler
function journey () {
  throwDie()

  if (heroPosition === base.id && !gameActive ) {
    startJourney()
  } else {
    if (dieVal === 3) {
    fallIn()
    moveBack()
    } else {
    fallIn()
    moveForward(dieVal)
    }
  }
}

//sand pit mechanic
  //generate pits on the map.
function makePits () {
  pits.forEach( pit => {
  const sandPit = document.createElement('img')
  sandPit.className = 'pit-img'
  sandPit.src = 'https://i.imgur.com/z3ao0ih.jpg'
  pit.appendChild (sandPit)
  })
}
  //fallIn: handles hero stepping on pit.
function fallIn () {
  if (!hero.parentElement.classList.contains('pit')) {
    return
  } else {
    let child = document.getElementById(hero.parentElement.id).removeChild(hero)
    base.appendChild(child)
    heroPosition = base.id
    gameActive = false
    messageDiv.innerText = `Ouch, you fell in a pit and found yourself to base. Roll the magic number to get out.`
  }
}

//unlockEnd sends winning hero to epilogue's page
function unlockEnd (e) {
  if (heroPosition === home.id && !gameActive) {
    let target = e.target
    target.parentElement.innerHTML = '<a href="end.html"><img src="https://i.imgur.com/j5WmlUk.gif" alt="die"></a>'
  } else {
    return
  }
}

//event listeners
startButton.addEventListener('click', function() {
  resetJourney()
})

die.addEventListener('click', function(e) {
  journey()
  unlockEnd(e)
})

window.addEventListener('DOMContentLoaded', function() {
  makePits()
})