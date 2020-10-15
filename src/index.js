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
        const charDiv = document.createElement("span")
        charDiv.dataset.id = char.id
        charDiv.classList.add
        charDiv.innerHTML = `

        <span> ${char.name} </span>

        
        `
        console.log(charDiv)
        

    }






getChar()

})



//data fetched 
//iterate to display
//render then append 
//`span` tag with character name to bar
