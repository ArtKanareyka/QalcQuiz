// Result.tsx
import React from 'react'
import storage from './storage'

interface ResultProps {
  result: string | null
  onRestart: () => void
  selectedRoofType: string
}

const Result: React.FC<ResultProps> = ({
  result,
  onRestart,
  selectedRoofType,
}) => {
  const roofData = storage.find((item) => item.typeRoof === selectedRoofType)

  console.log(roofData)

  return (
    <div className="data-input-container">
      <h2>Результат расчетов крыши типа {selectedRoofType}</h2>
      <div className="result">
        <img src={roofData?.image} alt={roofData?.typeRoof} />

        <p>Площадь крыши: {result} м2</p>
        <button className="result-button" onClick={onRestart}>
          Начать заново
        </button>
      </div>
    </div>
  )
}

export default Result
