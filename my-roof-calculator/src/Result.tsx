// Result.tsx
import React from 'react'
import storage from './storage'

interface ResultProps {
  result: string | null
  onRestart: () => void
  selectedRoofType: string
  inputData: number[]
}

const Result: React.FC<ResultProps> = ({
  result,
  onRestart,
  selectedRoofType,
  inputData,
}) => {
  const roofData = storage.find((item) => item.typeRoof === selectedRoofType)

  if (!roofData) {
    // Если roofData не определен, вы можете вернуть заглушку или обработать это иначе
    return <div>Данные о крыше не найдены</div>
  }

  console.log(roofData)

  return (
    <div className="data-input-container">
      <h2>Результат расчетов крыши типа {selectedRoofType}</h2>
      <div className="result">
        <img src={roofData.image} alt={roofData.typeRoof} />
        <ol className="questions-list">
          {roofData.questions.map((question, index) => (
            <li key={index}>
              {question.question} {inputData[index]} м
            </li>
          ))}
        </ol>
        <p>Площадь крыши: {result} м2</p>
        <button className="result-button" onClick={onRestart}>
          Начать заново
        </button>
      </div>
    </div>
  )
}

export default Result
