import { useState } from "react"
import { clsx } from 'clsx'
import Confetti from 'react-confetti'
import   languages   from "../languages.js"
import { getFarewellText, getRandomWord } from "../utils.js"

function App() {

  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetter, setGuessedLetter] = useState([])

  const alphabets = "abcdefghijklmnopqrstuvwxyz"

  const guessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length
  const lastLetterGuessed = guessedLetter[guessedLetter.length - 1]
  const isLastGuessIncorrect = lastLetterGuessed &&  !currentWord.includes(lastLetterGuessed)
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
      const shouldRevealLetter = isGameLost || guessedLetter.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetter.includes(letter) && "missed-letter"
        )
      return (
        <span 
          key={index}
          className={letterClassName}
        >
          {shouldRevealLetter ? letter.toUpperCase() : " "}
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
          aria-disabled={guessedLetter.includes(letter)}
          aria-label={`Letter ${letter}`}
          onClick={() => getGuessedLetter(letter)} 
          key={letter}
        >
          {letter.toUpperCase()}
        </button>
      )
    })

    function gameStatus() {
      if(!isGameOver && isLastGuessIncorrect) {
        return (
          <p className="farewell-message">
            {getFarewellText(languages[wrongGuessCount - 1].name)}
          </p>
        )
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
      return null
    }
    const gameStatusClass = clsx("game-status",{
      won: isGameWon,
      lost: isGameLost,
      farewell: !isGameOver && isLastGuessIncorrect
    })

    function startNewGame() {
      setCurrentWord(getRandomWord())
      setGuessedLetter([])
    }
  return (
    <main>
          {
                isGameWon && 
                    <Confetti
                        recycle={false}
                        numberOfPieces={1000}
                    />
            }
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
      <section
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {currentWord.includes(lastLetterGuessed) ?
                        `Correct! The letter ${lastLetterGuessed} is in the word.` :
                        `Sorry, the letter ${lastLetterGuessed} is not in the word.`
                    }
                    You have {guessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter =>
                    guessedLetter.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}</p>

            </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      <button onClick={startNewGame} className="new-game">New Game</button>
    </main>
  )
}

export default App
