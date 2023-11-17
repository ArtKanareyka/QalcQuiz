// Result.tsx
import React from 'react'

interface ResultProps {
  result: string | null
  onRestart: () => void
}

const Result: React.FC<ResultProps> = ({ result, onRestart }) => {
  return (
    <div className="result-container">
      <h2>Результат:</h2>
      {result !== null ? (
        <div className="result">
          <p>Площадь крыши: {result} м2</p>
          <button className="result-button" onClick={onRestart}>
            Начать заново
          </button>
        </div>
      ) : (
        <p>Что-то пошло не так...</p>
      )}
    </div>
  )
}

export default Result
