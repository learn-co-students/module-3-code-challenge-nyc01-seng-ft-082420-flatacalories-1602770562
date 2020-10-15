document.addEventListener('DOMContentLoaded', () => {
    const BASEURL = "http://localhost:3000/characters/"

    const getCharacters = () => {
        fetch(BASEURL)
        .then(response => response.json())
        .then(characterData => renderCharacters(characterData))
    }

    const renderCharacters = (characterData) => {
        const characterBar = document.querySelector("#character-bar")
        for(const character of characterData) {
            renderCharacter(character, characterBar)
        }
    }

    const renderCharacter = (character, characterBar) => {        
        const characterSpan = document.createElement("span")
        characterSpan.dataset.id = character.id
        characterSpan.classList.add("charSpan")
        characterSpan.innerHTML = `
        ${character.name}
        `

        characterBar.appendChild(characterSpan)
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if(e.target.matches(".charSpan")) {
                const spanButton = e.target
                const characterId = spanButton.dataset.id

                fetch(BASEURL + characterId)
                .then(response => response.json())
                .then(characterObj => renderCharacterDiv(characterObj))
            }
            else if(e.target.matches("#reset-btn")) {
                const resetButton = e.target
                const characterId = resetButton.parentElement.dataset.id

                options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ calories: 0 })
                }
    
                fetch(BASEURL + characterId, options)
                .then(response => response.json())
                .then(characterObj => renderCharacterDiv(characterObj))

            }
            else if(e.target.matches("#edit-name")) {
                const editButton = e.target
                editButton.innerText = "Hide Form"
                const detailedInfoDiv = document.querySelector("#detailed-info")
                const characterId = editButton.parentElement.dataset.id

                const newNameForm = document.createElement("form")
                newNameForm.id = "newNameForm"

                newNameForm.innerHTML = `
                    <input type="hidden" value="Character's id" id="${characterId}"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter New Name" id="newName"/>
                    <input type="submit" value="Change Name"/>
                `
                
                detailedInfoDiv.append(newNameForm)

            }
            // else if(e.target.innerText === "Hide Form") {
            //     console.log("hide")
            // }
        })
    }

    const renderCharacterDiv = (characterObj) => {
        const detailedInfoDiv = document.querySelector("#detailed-info")
        detailedInfoDiv.dataset.id = characterObj.id 

        detailedInfoDiv.innerHTML = `
            <p id="name">${characterObj.name}</p>
            <img id="image" src=${characterObj.image}><!-- display character image here -->
            <h4>Total Calories: <span id="calories">${characterObj.calories}</span> </h4>
            <form id="calories-form">
                <input type="hidden" value="Character's id" id="${characterObj.id}"/> <!-- Assign character id as a value here -->
                <input type="text" placeholder="Enter Calories" id="calories"/>
                <input type="submit" value="Add Calories"/>
            </form>
            <button id="reset-btn">Reset Calories</button>
            <button id="edit-name">Edit Name</button>
            <br><br>
        `

    }

    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const form = document.querySelector("#calories-form")
            const currentCalories = document.querySelector("#calories").innerText
            const currentCaloriesInt = parseInt(currentCalories)
            const caloriesInput = form.querySelector("#calories")
            const caloriesInputInt = parseInt(caloriesInput.value)
            const newCalories = caloriesInputInt + currentCaloriesInt

            const submitButton = e.target
            const characterId = submitButton.closest("div").dataset.id

            options = {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({ calories: newCalories})
            }

            fetch(BASEURL + characterId, options)
            .then(response => response.json())
            .then(characterObj => renderCharacterDiv(characterObj))
        })
    }

    getCharacters();
    clickHandler();
    submitHandler();
})
