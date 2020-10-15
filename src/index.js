document.addEventListener('DOMContentLoaded', () => {
    getCharacters()
    clickHandler()
    submitHandler()
})
CHAR_URL = "http://localhost:3000/characters/"
CHARACTERS = []

function getCharacters() {
    fetch(CHAR_URL)
    .then(response => response.json())
    .then(chars => {
        CHARACTERS = chars
        renderCharacters(chars)
        // randomCharacter()
    })
}

function updateCharacters() {
    fetch(CHAR_URL)
    .then(response => response.json())
    .then(chars => {
        CHARACTERS = chars
    })
}

// function randomCharacter() {
//     let random = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
//     console.log(random)
//     const charDiv = document.querySelector("#character-bar")
//     renderCharacterInfo(random, charDiv)
// }


function renderCharacters(characters) {
    for(character of characters) {
        const charDiv = document.querySelector("#character-bar")
        renderCharacterSpan(character, charDiv)
    }
}

// function editCharacterInfo(id) {
//     options = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         body: JSON.stringify( {} )
//     }
//     fetch(CHAR_URL + id)
//     .then(response => response.json())
//     .then()
// }

function renderCharacterSpan(character, div) {
    const charSpan = document.createElement("span")
    charSpan.innerText = character.name
    // charSpan.dataset.id = character.id
    div.append(charSpan)
}

function renderCharacterInfo(character, div) {
    for(char of CHARACTERS) {
        if(character.innerText == char.name) {
            const editBtn = document.querySelector("button#edit")
            const header = div.children[2]
            div.children[0].innerText = char.name
            div.children[1].src = char.image
            header.children[0].innerText = char.calories
            div.dataset.id = char.id
            // div.append(editBtn)
        }
    }
}

function addCalories(id, calories) {
    const charData = document.querySelector(`[data-id="${id}"]`)
    let currentCalories = parseInt(charData.children[2].firstElementChild.innerText)
    options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify( {"calories": currentCalories + parseInt(calories)} )
    }
    if(id != undefined && calories != "") {
        fetch(CHAR_URL + id, options)
        .then(response => response.json())
        .then(console.log)
        const charData = document.querySelector(`[data-id="${id}"]`)
        let currentCalories = parseInt(charData.children[2].firstElementChild.innerText)
        charData.children[2].firstElementChild.innerText = currentCalories + parseInt(calories)
        updateCharacters()
    }
}

function resetCalories(id) {
    const charData = document.querySelector(`[data-id="${id}"]`)
    let currentCalories = parseInt(charData.children[2].firstElementChild.innerText)
    options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify( {"calories": 0 } )
    }
    if(id != undefined && calories != "") {
        fetch(CHAR_URL + id, options)
        .then(response => response.json())
        .then(console.log)
        const charData = document.querySelector(`[data-id="${id}"]`)
        charData.children[2].firstElementChild.innerText = 0
        updateCharacters()
    }
}

function clickHandler() {
    document.addEventListener('click', e => {
        if(e.target.matches("span")) {
            const char = e.target
            const infoDiv = document.querySelector("#detailed-info")
            renderCharacterInfo(char, infoDiv)
        }
        // if(e.target.matches("button#reset-btn")) {
        //     console.log(e.target)
        // }
    })
    const resetBtn = document.querySelector("button#reset-btn")
    resetBtn.addEventListener('click', e => {
        // console.log(e.target.parentElement.dataset.id)
        const char = e.target.parentElement.dataset.id
        resetCalories(char)
    })
    const editBtn = document.querySelector("button#edit")
    editBtn.addEventListener('click', e => {
        // console.log(e.target.parentElement.dataset.id)
        const char = e.target.parentElement.dataset.id
        console.log(char)
        const infoDiv = document.querySelector("#detailed-info")
    })
}

function submitHandler() {
    document.addEventListener('submit', e => {
        e.preventDefault()
        if(e.target.matches("form")) {
            const charId = e.target.parentElement.dataset.id
            const calories = e.target.calories.value
            e.target.characterId.id = e.target.parentElement.dataset.id
            addCalories(charId, calories)
            e.target.reset()
        }
    })
}