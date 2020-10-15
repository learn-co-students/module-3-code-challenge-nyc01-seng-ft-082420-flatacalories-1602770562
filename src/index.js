//disabled buttons on initial screen render - character must be selected to press buttons

const BASE_URL = 'http://localhost:3000/characters/'
let currentCalories;
let currentId;

document.addEventListener("DOMContentLoaded", () => {
    fetchChars()
    clickHandler()
    submitHandler()
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
        } else if (e.target.matches("#reset-btn")) {
            resetCals()
        }
    })
}

function fetchInfo(target) {
    fetch(BASE_URL + target.dataset.id)
    .then(res => res.json())
    .then(renderInfo)
    .catch(error => console.log(error.message))
}

function renderInfo(charObj) {
    //save selected character's calories & id on back-end for patch request
    currentCalories = parseInt(charObj.calories)
    currentId = charObj.id;

    const infoDiv = document.querySelector("#detailed-info")
    infoDiv.innerHTML = `
    <p id="name">${charObj.name}</p>
    <img id="image" src=${charObj.image}>
    <h4>Total Calories: <span id="calories">${charObj.calories}</span> </h4>
    <form id="calories-form">
        <input type="hidden" value="${charObj.id}" id="characterId"/> 
        <input type="text" placeholder="Enter Calories" id="kcal" />
        <input type="submit" value="Add Calories"/>
    </form>
    <button id="reset-btn">Reset Calories</button>
    `
    document.querySelector(".characterInfo").append(infoDiv)
}





function submitHandler() {
    const form = document.querySelector("#calories-form")
    document.addEventListener("submit", e => {
        e.preventDefault()

        //Only should run patch request if calorie number has been entered
        if (document.querySelector("#kcal").value !== "") {
            const patch = {
                calories : currentCalories += parseInt(document.querySelector("#kcal").value)
            }
            const options = {
                method: "PATCH",
                headers: {
                    "content-type" :"application/json",
                    accept: "application/json"
                },
                body: JSON.stringify(patch) 
            }
            fetch(BASE_URL + currentId, options)
            .then(res => res.json())
            .then(renderUpdatedCals)
            .catch(error => console.log(error.message))
            form.reset()
        }
    })
}

function renderUpdatedCals(obj) {
    document.querySelector("#calories").innerHTML = obj.calories
}

function resetCals() {
    const reset = document.querySelector("#reset-btn")
    currentCalories = 0
    const patch = {
        calories : 0
    }
    const options = {
        method: "PATCH",
        headers: {
            "content-type" :"application/json",
            accept: "application/json"
        },
        body: JSON.stringify(patch) 
    }
    fetch(BASE_URL + currentId, options)
    .then(res => res.json())
    .then(renderUpdatedCals)
    .catch(error => console.log(error.message))
}