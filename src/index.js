document.addEventListener('DOMContentLoaded', e => {

 const baseUrl = "http://localhost:3000/characters/"
 const characterBar = document.querySelector('#character-bar')


 const fetchCharacters = () => {
     fetch(baseUrl)
     .then(resp => resp.json())
     .then(chars => addChars(chars))
 }

 const addChars = (chars) => {
     for(const char of chars){
         addCharsToDom(char)
     }
 }

 const addCharsToDom = (char) => {
     const charSpan = document.createElement('span')
     charSpan.dataset.id = char.id
     charSpan.classList.add('char')
     charSpan.innerText = `${char.name}`
     console.log(charSpan)

     characterBar.append(charSpan)
 }

 const clickHandler = () => {
    document.addEventListener('click', e => {
        if(e.target.matches('.char')){
            const button = e.target
            const charId = button.dataset.id

            fetch(baseUrl + charId)
            .then(resp => resp.json())
            .then(char => charInfoToDom(char))
            
            
            
            const charInfoToDom = (char) => {

                const charInfo = document.querySelector(".characterInfo")
                charInfo.dataset.id = char.id
                
        
                charInfo.innerHTML = `
                <div data-id="${char.id} "id="detailed-info">
                <p id="name">${char.name}</p>
                <img id="image" src="${char.image}"><!-- display character image here -->
                <h4>Total Calories: <span id="calories">${char.calories}</span> </h4>
                <form id="calories-form">
                    <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                    <input type="text" placeholder="Enter Calories" id="calories"/>
                    <input type="submit" value="Add Calories" class="addCalories" data-id="${char.id}"/>
                </form>
                <button id="reset-btn">Reset Calories</button>
            </div>
                `
            }
        }
        else if(e.target.matches('.addCalories')){
            e.preventDefault()
            const addButton = e.target
            const charId = addButton.dataset.id
            const currentCalories = addButton.closest('h4')
            console.log(currentCalories)
            

        }
    })

 }


 clickHandler();
 fetchCharacters();










})