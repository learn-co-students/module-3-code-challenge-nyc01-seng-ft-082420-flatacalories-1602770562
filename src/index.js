const BASE_URL = 'http://localhost:3000/characters/'

document.addEventListener("DOMContentLoaded", () => {
    fetchChars()
    clickHandler()
})


function fetchChars() {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(chars => renderChars(chars))
}

function renderChars(characters) {
    for (char of characters) {
        renderChar(char)
    }
}

function renderChar(character) {
    const charBar = document.querySelector("#character-bar")
    const charSpan = document.createElement("span")
    charSpan.dataset.id = character.id
    charSpan.classList.add("char-span")
    charSpan.textContent = character.name
    charBar.append(charSpan)
}

function clickHandler() {
    document.addEventListener("click", e => {
        if (e.target.matches(".char-span")) {
            fetchInfo(e.target)
        }
    })
}

function fetchInfo(target) {
    fetch(BASE_URL + target.dataset.id)
    .then(res => res.json())
    .then(renderInfo)
}

function renderInfo(charObj) {
    console.log(charObj)
    const infoDiv = document.querySelector("#detailed-info")
    infoDiv.innerHTML = `
    <p id="name">${charObj.name}</p>
    <img id="image" src=${charObj.image}>
    <h4>Total Calories: <span id="calories">${charObj.calories}</span> </h4>
    <form id="calories-form">
        <input type="hidden" value="Character's id" id="${charObj.id}"/>
        <input type="text" placeholder="Enter Calories" id="calories"/>
        <input type="submit" value="Add Calories"/>
    </form>
    <button id="reset-btn">Reset Calories</button>
    `


   
}

