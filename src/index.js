CHAR_URL = 'http://localhost:3000/characters/'

document.addEventListener("DOMContentLoaded", function() {
    getCharacters()
    clickHub()
    //submitHub()
    //Couldn't get submit button to work properly so to avoid issue I just bundled the functions for the patch request in the click listener
    
    
    function getCharacters() {
        fetch(CHAR_URL).then(function(response) {
            return response.json()
        }).then(function(data) {
            renderCharacterNames(data)
        })
    }


    function renderCharacterNames(obj) {
        for (const element of obj) {
            renderCharacterName(element)
        }
    }

    function renderCharacterName(obj) {
        const nameBar = document.getElementById('character-bar')
        const nameDiv = document.createElement('span')
        nameBar.append(nameDiv)
        nameDiv.textContent = `${obj.name}`
        nameDiv.dataset.id = `${obj.id}`
        nameDiv.classList.add('name-span')



    }


    function renderCharInfo(obj) {
       
                    
        
        const pTag = document.getElementById("name")
        const imgTag = document.getElementById("image")
        const hTag = document.getElementById("calories")
        pTag.textContent = `${obj.name}`
        hTag.innerHTML = `<span id="calories">${obj.calories}</span>`
        imgTag.setAttribute('src', `${obj.image}`) 
        hTag.textContent = "Total Calories : "
        hTag.innerHTML = `<span id="calories"> ${obj.calories} </span>`
        
        //const form = document.getElementById('calories-form')
        const idInput = document.getElementById("characterId")
        idInput.value = obj.id
        // console.log(idInput)

        // const caloriesInput = document.getElementById("add-calories")
        // caloriesInput.value = obj.calories
        // console.log(caloriesInput)
        



    }
    
    
    function clickHub() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('.name-span')) {
                const span = e.target
                span.classList.add('clicked')
                span.classList.remove('name-span')
                //console.log(span)
                const animalId = span.dataset.id
                
                //console.log(animalId)

                fetch(CHAR_URL + animalId).then(function(response) {
                    return response.json()
                }).then(function(data) {
                    renderCharInfo(data)

                })
            } else if (e.target.matches('.clicked')) {
                const span = e.target
                span.classList.remove('clicked')
                span.classList.add('name-span')
                const container = document.getElementById('detailed-info')
                container.innerHTML = ''
                container.innerHTML = `<p id="name">Character's Name</p>
                <img id="image" src="assets/dummy.gif"><!-- display character image here -->
                <h4>Total Calories: <span id="calories">Character's Calories</span> </h4> 
                <form id="calories-form">
                    <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories" id="calories"/>
                    <input id="submit-btn" type="submit" value="Add Calories"/>
                </form>
                <button id="reset-btn">Reset Calories</button>
                
                
                ` 

            } else if (e.target.matches("#submit-btn")) {
                e.preventDefault()

                
                const id = document.getElementById("characterId")
                const charId = id.value

                //console.log(charId)

                const urlId = parseInt(charId)

                const calories = document.getElementById("add-calories")
                const currentCalories = calories.value

                //console.log(currentCalories)

                //console.log(currentCalories)
                const newCalories = parseInt(currentCalories, 10)

                //console.log(newCalories)

                options = {
                    method: "PATCH",
                    headers: {
                        "content-type" : "application/json",
                        "accept" : "application/json"
                    },

                    body: JSON.stringify({calories: newCalories})
                }

                fetch(CHAR_URL + urlId, options).then(function(response) {
                    return response.json()
                }).then(function(data) {
                    renderCharInfo(data)
                })
                
            } else if (e.target.matches("#reset-btn")) {
                //const calories = document.getElementById("calories")
                const id = document.getElementById("characterId")
                const charId = id.value
                const urlId = parseInt(charId)
                
                options = {
                    method: "PATCH",
                    headers: {
                        "content-type" : "application/json",
                        "accept": "application/json"
                    },
        
                    body: JSON.stringify({calories: 0})
                }
        
                fetch(CHAR_URL + urlId, options).then(function(response) {
                    return response.json()
                }).then(function(data) {
                    renderCharInfo(data)
                })
            }
            
        })
    }



    // function submitHub() {
    //     document.addEventListener("submit", function(e) {
    //         if (e.target.matches("#submit-btn")) {
    //             e.preventDefault()

    //             const form = e.target
    //             const id = document.getElementById("characterId")
    //             const charId = id.value

    //             console.log(charId)

    //             const calories = document.getElementById("add-calories")
    //             const currentCalories = calories.value

    //             console.log(currentCalories)
    //             const newCalories = parseInt(currentCalories, 10)

    //             options = {
    //                 method: "PATCH",
    //                 headers: {
    //                     "content-type" : "application/json",
    //                     "accept" : "application/json"
    //                 },

    //                 body: JSON.stringify({calories: newCalories})
    //             }

    //             fetch(CHAR_URL + charId, options).then(function(response) {
    //                 return response.json()
    //             }).then(function(data) {
    //                 renderCharInfo(data)
    //             })
    //         }
    //     })


    // }


    //Reset Caloies

    









})