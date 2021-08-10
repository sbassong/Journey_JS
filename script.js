//Die functionality
let dieVal = 0

function throwDie () {
    dieVal = Math.ceil(Math.random() * 6)
    dieDiv.style.backgroundImage = `url(die_images/${dieVal}`
}