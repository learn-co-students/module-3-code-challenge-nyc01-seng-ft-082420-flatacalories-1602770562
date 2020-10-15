// DOM loaded at top
document.addEventListener("DOMContentLoaded" , () => {
baseUrl = "http://localhost:3000/characters/"
// add / to end of characters for easier use later

const getAllCharacters = () => {
    return fetch(baseUrl)
    .then(response => response.json())
}
// request AKA fetch 
const displayCharacters = () => {
    getAllCharacters()
    .then(data => {
        const charactersDiv = document.querySelector('#character-bar')
        console.log(charactersDiv)
        for(const character of data){

        displayOneCharacter(character, charactersDiv)
        }
    })
}
const displayOneCharacter = (character, charactersDiv) => {
    const characterSpan = document.createElement('span')
    characterSpan.innerHTML = character.name
    characterSpan.addEventListener('click', e => {
        displayCharacterInfo(character)
    })
    charactersDiv.append(characterSpan)
}
const displayCharacterInfo = (character) => {
    const infoDiv = document.querySelector('#detailed-info')
    // 'detailed-info' is coming from ReadMe
    const infoName = document.querySelector('#name')
    const infoImg = document.querySelector('#image')
    const infoCalorie = document.querySelector('#calories')
    const infoId = document.querySelector('#characterId')
    infoId.value = character.id
    // check JSON to confirm exact wording 

    infoName.innerHTML = character.name
    infoImg.src = character.image
    infoCalorie.innerHTML = character.calories
}
// src for images 
const calorieForm = () => {
    const buttomForm = document.querySelector('#calories-form')
    buttomForm.addEventListener('submit', e => {
        e.preventDefault()
        // forgot to use the preventDefault in mock yesterday ** 
        const infoId = document.querySelector('#characterId')
        const characterid = infoId.value
        const infoCalorie = document.querySelector('#calories')
        const totalCalorie = infoCalorie.innerHTML 
        const inputCalories = document.querySelector('input#calories')
        console.log(e.target[1].value)
        const newCalories = e.target[1].value
        const newTotal = parseInt(totalCalorie) + parseInt(newCalories)

        // this was tricky took a while to actually find the value (500) i inputted

        // ** when trying to add to get the newtotal calories need to parse Int each indiv above because parseInt just total calorie did NOT WORK

        var options = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({calories: newTotal })
        }
        fetch(baseUrl + characterid, options)
        infoCalorie.innerHTML = newTotal

        // confirm syntax** 
        
        
    })
}

// resetting calories *mostly copy/pasted from code above ^
// need to reset calories = 0 
const resetCalories = () => {
    const resetButton = document.querySelector('#reset-btn')
    resetButton.addEventListener ('click', e => {
        const infoId = document.querySelector('#characterId')
        const characterid = infoId.value
        const infoCalorie = document.querySelector('#calories')

// copy/pasted from above 
        var options = {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({calories: 0 })
        }

        fetch(baseUrl + characterid, options)
        infoCalorie.innerHTML = 0

    })
}
displayCharacters()
calorieForm()
resetCalories()
// make sure to call in correct place** 

})