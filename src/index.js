/*

As user, see all characters names on div with id character-bar".
  On page load, GET fetch all characters. Create span tag and appened to character bar

Click a character to see character info, inside of #detailed-info div.

clicks on "Add Calories" button to add calories to a chracter. Persist cals to DB and update DOM


*/


document.addEventListener("DOMContentLoaded", () =>{

  const baseUrl = "http://localhost:3000/characters/"
  const charBar = document.querySelector('#character-bar')
  const charDetailsDiv = document.querySelector('#detailed-info')
  // const charInfoDiv = document.querySelector('.characterInfo')

  const getChars = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(characters => {
      renderChars(characters)
    })

  }

  const renderChars = characters => {
    for (const character of characters) {
      renderChar(character)
    }
  }

  const renderChar = character => {
    const charSpan = document.createElement('span')
    charSpan.textContent = character.name
    charSpan.classList.add('render-span')
    charSpan.dataset.charId = character.id 
    charBar.append(charSpan)

  }

  const renderCharDetails = character => {
    
    charDetailsDiv.innerHTML = `
      <p id="${character.name}">${character.name}</p>
      <img id="image" src="${character.image}">
      <h4>Total Calories: <span id="${character.calories}">${character.calories}</span> </h4>
      <form id="calories-form">
      <input type="hidden" value="Character's id" id="${character.id}"/> 
      <input type="text" placeholder="Enter Calories" id="${character.calories}"/>
      <input type="submit" value="Add Calories"/>
      </form>
      <button id="reset-btn">Reset Calories</button>
    `
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.matches('.render-span')) {
        const charSpanId = e.target.dataset.charId 
        
        fetch(baseUrl + charSpanId)
        .then(response => response.json())
        .then(character => {
          renderCharDetails(character)
        })
        
      }

    })

  }


  const submitHandler = () => {
    
    document.addEventListener('submit', e => {
      e.preventDefault()

      const addCalForm = e.target
      const charId = addCalForm.data.charId 
      const newCal = addCalForm.children[1].value


      
      options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({calories: newCal})
      }

      fetch(baseUrl + charId, options)
      .then(response => response.json())
      .then(character => {
        const charDetailsDiv = document.querySelector('#detailed-info')
        charDetailsDiv.querySelector('h4').textContent = character.calories
      })

    })


  }


  submitHandler()
  clickHandler()
  getChars()
})