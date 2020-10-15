document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000/"
    const charsURL = "http://localhost:3000/characters"
    console.log("domloaded")

    const getChars = () => {
        fetch(charsURL) 
        .then(resp => resp.json())
        .then(chars => renderChars(chars))
        
    }

    const renderChars = chars => {
        chars.forEach(char => renderChar(char))
        
    }

    const renderChar = char => {
        const charBar = document.querySelector('#character-bar')
        const charSpan = document.createElement('span')
        charSpan.innerHTML = `<span>${char.name}</span>`
        charBar.append(charSpan)
        
    }

    
    getChars()
})