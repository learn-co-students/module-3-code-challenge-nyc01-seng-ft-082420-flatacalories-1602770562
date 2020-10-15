

document.addEventListener('DOMContentLoaded', function() {

const url = "http://localhost:3000/characters/"

const renderCharacters = charactersOBj =>{
    for(const character of charactersOBj){
        renderCharacter(character)

    }
}



renderCharacter = characterObj =>{
const characterBar = document.getElementById('character-bar')
const characterSpan = document.createElement('span')

characterSpan.textContent = characterObj.name
characterSpan.dataset.characterId = characterObj.id

characterBar.append(characterSpan)
}

const renderCharacterDetail = charId =>{
    const charcterInfo = document.getElementById("detail-info")
    const p = document.getElementById("name")
    const image = document.getElementById("image")
    const calories = document.getElementById('calories')
    calories.dataset.id = charId
    
    

    fetch(url)
    .then(res=> res.json())
    .then(characters => {
        for(const character of characters){
            if(character.id == charId){
                p.innerHTML = `${character.name}`
                image.src = `${character.image}`
                calories.textContent= `${character.calories}`
                
            }
        }
    })

}

const submitHandler = () =>{
    const form = document.getElementById('calories-form')
    form.addEventListener('submit', e =>{
        e.preventDefault()
        const calories = document.getElementById('calories')
        console.log(calories.textContent)
        
        const characterId = calories.dataset.id
        
        const characterForm = e.target
        const newCals = characterForm.calories.value
        console.log(newCals)

        const officialCal = newCals + calories.textContent
        calories.textContent = officialCal
        console.log(officialCal)

        const newValue = {calories: officialCal}

        const options = {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify(newValue)
          }
          
          fetch(url + characterId , options)
          .then(res=> res.json())
          .then(_characters => {getCharacters()
        })
    

    })
}
submitHandler()

function clickHandler(){
    const span = document.querySelector('#character-bar')
    
    span.addEventListener('click', e=> {
        const characterId = e.target.dataset.characterId
        console.log(characterId)
        renderCharacterDetail(characterId)

    })
}

clickHandler()

const getCharacters = () =>{
    fetch(url)
    .then(res=> res.json())
    .then(characters => renderCharacters(characters))
}

getCharacters()
})