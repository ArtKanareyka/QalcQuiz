// Result.tsx
import React from 'react'
import storage from '../../Data/storage'
import './result.scss'
import { Button } from '@mui/material'

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

  return (
    <div className="result__container">
      <div className="title__container">
        <Button
          variant="outlined"
          className="result__button"
          onClick={onRestart}
        >
          На главную
        </Button>
        <h2>Результат расчетов крыши типа: {selectedRoofType}</h2>
      </div>
      <div className="img-text__container">
        <img src={roofData.imageResult} alt={roofData.alt} />
        <div className="text__container">
          <ol className="result__list">
            {roofData.questions.map((question, index) => (
              <li className="result__item" key={index}>
                {question.question}: {inputData[index]} м
              </li>
            ))}
          </ol>
          <p className="result__result">Площадь крыши: {result} м2</p>
        </div>
      </div>
    </div>
  )
}

export default Result
