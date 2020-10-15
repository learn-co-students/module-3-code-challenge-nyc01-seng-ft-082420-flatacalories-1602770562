document.addEventListener("DOMContentLoaded", e => {
    const baseUrl = "http://localhost:3000/characters/"
    
    const getCharacters = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(char => renderCharacters(char))
    };

    const renderCharacters = characters => {
        for (let character of characters){
            renderCharacter(character)
        }
    };
    
    const renderCharacter = character => {
        const nameDiv = document.querySelector("#character-bar")
        const nameSpan = document.createElement("span")
        nameSpan.dataset.characterId = character.id
        nameSpan.classList.add("character-name")
        nameSpan.textContent = `${character.name}`

        nameDiv.append(nameSpan)  
        
        
    };

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.matches(".character-name")){
                const span = e.target
                const characterId = span.dataset.characterId
                fetch(baseUrl + characterId)
                .then(res => res.json())
                .then(character => CharacterInfo(character))
            }
        })
    };

    const CharacterInfo = character => {
        const infoDiv = document.querySelector("#detailed-info")
        const cells = infoDiv.children
        const spanCalories = document.querySelector("#calories")
        
        const name = character.name
        cells[0].textContent = name
        const img = character.image
        cells[1].src = img
        const calories = character.calories
        spanCalories.textContent = calories
    }

    const submitHandler = () => {
        document.addEventListener("submit", e =>{
            e.preventDefault();
            const form = e.target
           const calories = form[1].value
           const newCalories = parseInt(calories.value) + 1
           const character = document.querySelector(".character-name")
           const characterId = character.dataset.characterId
            
           const options  = {
               method: "PATCH",
               headers: {
                   "content-type": "application/json",
                   "accepts": "application/json"
               },
               body: JSON.stringify({calories: newCalories})
           }
           fetch(baseUrl + characterId, options)
           .then(res => res.json())
           .then(data => {
               calories.value = `${data.calories}`
           })
            
        })
    }

    getCharacters();
    clickHandler();
    submitHandler();
});