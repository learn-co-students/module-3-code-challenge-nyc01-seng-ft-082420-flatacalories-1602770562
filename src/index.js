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
            console.log(charId)
            const name = button.innerText
            
            
            
            const charInfo = document.querySelector(".characterInfo")
            
            charInfo.innherHTML = `
            <div id="detailed-info">
            <p id="name">${name}</p>
            <img id="image" src="assets/dummy.gif"><!-- display character image here -->
            <h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
            <form id="calories-form">
                <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
                <input type="text" placeholder="Enter Calories" id="calories"/>
                <input type="submit" value="Add Calories"/>
            </form>
            <button id="reset-btn">Reset Calories</button>
        </div>
            `
        }
    })

 }


 clickHandler();
 fetchCharacters();










})