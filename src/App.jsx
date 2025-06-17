import { useState } from "react"
import { clsx } from 'clsx'
import   languages   from "../languages.js"

function App() {

  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetter, setGuessedLetter] = useState([])

  const alphabets = "abcdefghijklmnopqrstuvwxyz"

  const guessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length
  const isGameLost = wrongGuessCount >= guessesLeft
  const isGameWon =
        currentWord.split("").every(letter => guessedLetter.includes(letter)) 
  const isGameOver = isGameWon || isGameLost

  function getGuessedLetter(letter) {
    setGuessedLetter(prevLetters => {
      return (
        guessedLetter.includes(letter) ? prevLetters : [...prevLetters, letter]
      )
    })
  }

  const languageElements = languages.map((lang, index) =>{
    const isLanguageLost = index < wrongGuessCount
    const className = clsx("chip",  {lost: isLanguageLost})
    return (
      <span 
        className={className}
        style={{backgroundColor: lang.backgroundColor, color: lang.color}} 
        key={lang.name}
        >
        {lang.name}
      </span>
    )})

    const letterElements = currentWord.split("").map((letter, index) => {
      return (
        <span 
          key={index}
        >
          {guessedLetter.includes(letter) ? letter.toUpperCase() : " "}
        </span>
      )
    })

    const keyboardElements = alphabets.split("").map(letter => {
    const letterGuessed = guessedLetter.includes(letter)
    const isGuessCorrect = letterGuessed &&  currentWord.includes(letter)
    const isGuessWrong = letterGuessed && !currentWord.includes(letter)
    const className = clsx({
        correct: isGuessCorrect,
        wrong: isGuessWrong
      })
      return (
        <button
          disabled={isGameOver}
          className={className}
          onClick={() => getGuessedLetter(letter)} 
          key={letter}
        >
          {letter.toUpperCase()}
        </button>
      )
    })

    function gameStatus() {
      if(!isGameOver) {
        return null
      }
      if(isGameWon) {
        return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
        )
      }
      if(isGameLost) {
        return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
        )
      }
    }
    const gameStatusClass = clsx("game-status",{
      won: isGameWon,
      lost: isGameLost
    })
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>
        {gameStatus()}
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
      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
