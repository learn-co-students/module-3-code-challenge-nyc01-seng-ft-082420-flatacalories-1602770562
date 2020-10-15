document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000/"
    const charsURL = "http://localhost:3000/characters"
    console.log("domloaded")

    const getChars = () => {
        fetch(charsURL) 
        .then(resp => resp.json())
        .then(chars => renderChars(chars))
        
    }
    
    getChars()
})