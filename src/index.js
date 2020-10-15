document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters/"


    const getChar = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(renderChar)

    }

    const renderChars = chars => {
        chars.forEach(renderChar)

    }

    const renderChar = char => {
        const charDiv = document.querySelector('#character-bar')
        charDiv.dataset.id = char.id
        charDiv.innerHTML = `

        <span> ${char.name} </span>

        
        `

    
    }






getChar()

})



//data fetched 
//iterate to display
//render then append 
//`span` tag with character name to bar
