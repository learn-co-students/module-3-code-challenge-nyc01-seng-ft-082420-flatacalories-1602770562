const BASE_URL = "http://localhost:3000/characters/"

document.addEventListener('DOMContentLoaded', () => {
    const charBar = document.querySelector('#character-bar')
    const baseInfo = document.querySelector('#detailed-info')
    baseInfo.innerHTML = ""
    function getCharacters(){
        fetch(BASE_URL)
            .then(response => response.json())
            .then(characters => renderCharacters(characters))
    }    

    const renderCharacters = (characters) => {
        characters.forEach(character => {
            renderCharacter(character)
        })
    }

    const renderCharacter = (character) => {
        const charSpan = document.createElement("span")
        charSpan.dataset.charId = character.id

        charSpan.textContent = character.name
        charBar.append(charSpan)
    }

    function clickHandler(){
        document.addEventListener('click', e => {
            if (e.target.matches("#character-bar span")) {
                charId = e.target.dataset.charId
                fetch(BASE_URL + charId)
                    .then(response => response.json())
                    .then(character => {
                        const charInfo = document.querySelector('#detailed-info')
                        charInfo.dataset.charId = charId
                        charInfo.innerHTML = `
                            <p id="name">${character.name}</p>
                            <img id="image" src="${character.image}">
                            <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
                            <form id="calories-form">
                                <input type="hidden" value="Character's id" id="${charId}"/>
                                <input type="text" name="calories" placeholder="Enter Calories" id="calories"/>
                                <input type="submit" value="Add Calories"/>
                            </form>
                            <button id="reset-btn">Reset Calories</button> <button id="change-name">Change ${character.name}'s Name</button>  
                        `
                    })
            } else if (e.target.matches("#reset-btn")) {
                const calSpan = document.querySelector('#calories')
                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ calories: 0 })
                }

                fetch(BASE_URL + charId, options)
                    .then(response => response.json())
                    .then(_data => {
                        calSpan.textContent = 0
                    })
            } else if (e.target.matches("#change-name")) {
                const nameForm = document.createElement("form")
                nameForm.id = "change-name-form"
                const charInfo = document.querySelector('#detailed-info')
                nameForm.innerHTML = `
                    <input type="hidden" value="Character's id" id="${charId}"/>
                    <input type="text" name="name" placeholder="enter new name here" id="new-name"/>
                    <input type="submit" value="Change Name"/>
                `
                const newName = nameForm.name.value

                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({name: newName})
                }
               charInfo.append(nameForm)

            }
        })
    }

    function submitHandler(){
        document.addEventListener('submit', e => {
            if (e.target.matches("#calories-form")){
                e.preventDefault()
                const form = document.querySelector('#calories-form')
                const charId = form.parentElement.dataset.charId
                form.children[0].id = charId
                const currentCals = parseInt(form.previousElementSibling.querySelector("span").textContent);
                const calSpan = form.previousElementSibling.querySelector("span")
                const newCals = parseInt(form.calories.value)
                console.log(typeof(newCals))
                const totalCals = currentCals + newCals

                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ calories: totalCals })
                }
                
                    fetch(BASE_URL + charId, options)
                        .then(response => response.json())
                        .then(_data => {
                            calSpan.textContent = totalCals
                        })
                form.reset()
            
            } else if (e.target.matches("#change-name-form")){
                e.preventDefault()
                const form = e.target
                const charInfo = form.parentElement
                charId = charInfo.dataset.charId
                const newName = form.name.value
                const options = {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({ name: newName })
                }

                fetch(BASE_URL + charId, options)
                    .then(response => response.json())
                    .then(_data => {
                        charInfo.querySelector("p").textContent = newName
                    })

                form.remove()
            }
        })
    }
    
    submitHandler();
    clickHandler();
    getCharacters()
})
