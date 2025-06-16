import { useState } from "react"
import   languages   from "../languages.js"

function App() {

  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetter, setGuessedLetter] = useState([])

  const alphabets = "abcdefghijklmnopqrstuvwxyz"

  function getGuessedLetter(letter) {
    setGuessedLetter(prevLetters => 
      guessedLetter.includes(letter) ? [...prevLetters, letter] : prevLetters)
  }

  console.log(guessedLetter)
  
  const languageElements = languages.map(lang =>{
    return (
      <span 
        className="chip"
        style={{backgroundColor: lang.backgroundColor, color: lang.color}} 
        key={lang.name}
        >
        {lang.name}
      </span>
    )})

    const letterElements = currentWord.split("").map((letter, index) => {
      return (
        <span key={index}>{guessedLetter.includes(letter) ? letter.toUpperCase() : " "}</span>
      )
    })

    const keyboardElements = alphabets.split("").map(letter => {
      return (
        <button onClick={() => getGuessedLetter(letter)} key={letter}>{letter}</button>
      )
    })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">
        {languageElements}
      </section>
      <section className="word">
        {letterElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
    </main>
  )
}

export default App
