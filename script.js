const base = document.querySelector('.base')
const home = document.querySelector('.home')
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
  gameActive = false
  dieVal = 0
  let child = document.getElementById(hero.parentElement.id).removeChild(hero)
  base.appendChild(child)
  heroPosition = base.id
  messageDiv.innerText = ''
}

//movements
//moveBack
function moveBack() {
  if (!gameActive) {
    return
  } else {
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
      messageDiv.innerText = `Uh oh, you rolled a trouble ${dieVal}. You move back to base. Hang in there!`
    }
  }  
}

//moveForward
function moveForward(dieVal) {
  if (!gameActive) {
    return
  } else {
    if (hero.parentElement.id <= 33) {
      let curPosition = hero.parentElement
      let nextPosition = document.getElementById(`${parseInt(curPosition.id) + dieVal}`)
      let child = curPosition.removeChild(hero)
      nextPosition.appendChild(child)
      heroPosition = nextPosition.id
      messageDiv.innerText = `You move forward ${dieVal} tiles. Keep it up!`
    } else {
      moveHome()
    }
  }
}

//moveHome which handles cases where the hero is 6 tiles away from home.
function moveHome() {
  console.log(heroPosition)
  console.log(dieVal)
  if (heroPosition >= 33 && dieVal === 6) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else if (heroPosition >= 34 && dieVal === 5) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else if (heroPosition >= 35 && (dieVal === 4)) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else if (heroPosition >= 36 && dieVal === 3) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else if (heroPosition >= 37 && dieVal === 2) {
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else if (heroPosition >= 38 && dieVal === 1){
    let child = document.getElementById(heroPosition).removeChild(hero)
    home.appendChild(child)
    heroPosition = home.id
    messageDiv.innerText = `You completed Journey and made it home. Congratulations!`
    gameActive = false
  } else {
    return
  }
}


//actual movement logic handler
function journey () {
  throwDie()

  if (heroPosition === base.id && !gameActive ) {
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