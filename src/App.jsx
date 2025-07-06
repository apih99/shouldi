import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const questions = [
    "Should I get snacks?",
    "Should I take a nap?",
    "Should I order pizza?",
    "Should I start that project?",
    "Should I go for a walk?",
    "Should I watch another episode?",
    "Should I learn something new?",
    "Should I text my friend?",
    "Should I treat myself?",
    "Should I dance a little?",
    "Should I make coffee?",
    "Should I reorganize my room?",
    "Should I try that new recipe?",
    "Should I call my mom?",
    "Should I go to bed early?",
    "Should I be spontaneous?",
    "Should I say yes to adventure?",
    "Should I just do it?",
    "Should I follow my dreams?",
    "Should I trust my gut?"
  ]

  const motivationalMessages = [
    "ABSOLUTELY!",
    "DO IT!",
    "YES, YES, YES!",
    "LIFE IS TOO SHORT!",
    "JUST GO FOR IT!",
    "BELIEVE IN YOURSELF!",
    "MAKE IT HAPPEN!",
    "YOU'VE GOT THIS!",
    "SEIZE THE MOMENT!",
    "FOLLOW YOUR HEART!"
  ]

  const handleYesClick = () => {
    setIsAnimating(true)
    setShowCelebration(true)
    setClickCount(prev => prev + 1)
    
    setTimeout(() => {
      setIsAnimating(false)
      setShowCelebration(false)
      setCurrentQuestion(Math.floor(Math.random() * questions.length))
    }, 2000)
  }

  const handleQuestionClick = () => {
    setCurrentQuestion(Math.floor(Math.random() * questions.length))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentQuestion(prev => (prev + 1) % questions.length)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isAnimating, questions.length])

  return (
    <div className="app">
      <div className="background-animation">
        <div className="floating-bubble bubble-1"></div>
        <div className="floating-bubble bubble-2"></div>
        <div className="floating-bubble bubble-3"></div>
        <div className="floating-bubble bubble-4"></div>
        <div className="floating-bubble bubble-5"></div>
        <div className="floating-bubble bubble-6"></div>
      </div>
      
      <div className="container">
        <div className="header">
          <h1 className="title">
            <span className="emoji">🤔</span>
            Decision Oracle
            <span className="emoji">✨</span>
          </h1>
          <p className="subtitle">When in doubt, just click YES!</p>
        </div>

        <div className="question-container">
          <h2 
            className={`question ${isAnimating ? 'celebrating' : ''}`}
            onClick={handleQuestionClick}
          >
            {questions[currentQuestion]}
          </h2>
          <p className="question-hint">Click the question to randomize!</p>
        </div>

        <div className="button-container">
          <button 
            className={`yes-button ${isAnimating ? 'clicked' : ''}`}
            onClick={handleYesClick}
            disabled={isAnimating}
          >
            <span className="button-text">YES</span>
            <div className="button-glow"></div>
          </button>
        </div>

        {showCelebration && (
          <div className="celebration">
            <div className="confetti">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className={`confetti-piece confetti-${i % 6}`}></div>
              ))}
            </div>
            <div className="celebration-text">
              {motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]}
            </div>
          </div>
        )}

        <div className="stats">
          <p className="decision-count">
            Decisions made: <span className="count">{clickCount}</span>
          </p>
        </div>

        <div className="footer">
          <p>✨ Life is about saying YES to possibilities ✨</p>
        </div>
      </div>
    </div>
  )
}

export default App
