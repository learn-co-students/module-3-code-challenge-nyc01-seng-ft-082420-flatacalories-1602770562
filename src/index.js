document.addEventListener("DOMContentLoaded", () => {

/*
### DEV 1 ###
DONE - See all characters names in a div with the id of "character-bar". 
DONE - When you have this information, you'll need to add a span tag with the character's name to the character bar.
       
- On page load, request data from the server to get all of the characters objects. 
    on click - render character 

*/
    characterUrl = "http://localhost:3000/characters" 

    const getCharacters = () => {
        fetch(characterUrl)
        .then(response => response.json())
        .then(characters => {
            renderCharacters(characters)
        })
    }

    const renderCharacters = characters => {
        const characterCollection = document.querySelector("#character-bar")
        for(const character of characters)
        renderCharacter(character, characterCollection)
    }

    const renderCharacter = (character, characterCollection) => {
        const characterSpan = document.createElement("span")
        characterSpan.dataset.characterId = character.id

        characterSpan.innerHTML = `
        ${character.name}
        `
        characterCollection.append(characterSpan)
    }
    
    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches("span")){
                const nameSpan = e.target
                const nameId = nameSpan.dataset.characterId
                //console.log(nameSpan) --> prints id to screen

                const renderCharacter = character => {
                    const characterDiv = document.querySelector(".characterInfo")
                    characterDiv.innerHTML = ""
                    //console.log(characterDiv)

                    const characterId = characterDiv.querySelector("div")
                    characterId.textContent = `${character.id}`
                
                    const characterName = characterDiv.querySelector("p")
                    characterName.textContent = `${character.name}`

                    const characterImage = characterDiv.querySelector("img")
                    characterName.src = `${character.image}`

                    const characterCalories = characterDiv.querySelector("span")
                    characterCalories.textContent = `${character.calories}`
                }
      

 
                

             


                
            }
        })
    }
    


    // Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.
    // submit - form
    // PATCH

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault();
            const form = e.target
            const textArea = form[1].value
            
        })
    }
    

<form id="calories-form">
                    <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories" id="calories"/>
                    <input type="submit" value="Add Calories"/>
                </form>


    getCharacters()

    clickHandler()

    submitHandler()

})
