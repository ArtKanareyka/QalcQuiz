import React, { useState, useEffect, useMemo } from 'react'
import storage from './storage'

interface RoofQuestion {
  id: number
  question: string
  image: string
}

interface RoofData {
  typeRoof: string
  questions: RoofQuestion[]
}

interface RoofDataInputProps {
  selectedRoofType: string
  onSubmit: (data: number[]) => void
  onBack: () => void
}

const RoofDataInput: React.FC<RoofDataInputProps> = ({
  selectedRoofType,
  onSubmit,
  onBack, // Добавляем новый обратный вызов для кнопки "Назад"
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [inputData, setInputData] = useState<number[]>([0])
  const [roofData, setRoofData] = useState<RoofData | null>(null)

  const roofDataMap = useMemo(() => {
    const map: Record<string, number[]> = {}
    storage.forEach((item) => {
      map[item.typeRoof] = new Array(item.questions.length).fill(0)
    })
    return map
  }, [])

  useEffect(() => {
    const data = storage.find((item) => item.typeRoof === selectedRoofType)
    setRoofData(data || null)

    setInputData([...roofDataMap[selectedRoofType]])
  }, [selectedRoofType, roofDataMap])

  const handleInputChange = (value: string) => {
    const newData = [...inputData]
    newData[currentQuestionIndex] = parseFloat(value)
    setInputData(newData)
  }

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleSubmit = () => {
    if (inputData.every((value) => !isNaN(value))) {
      onSubmit(inputData)
    } else {
      alert('Пожалуйста, введите корректные данные.')
    }
  }
  if (!roofData || !roofData.questions) {
    return null // Or you can render a loading state or an error message
  }
  return (
    <div className="data-input-container">
      <h2>Введите данные для крыши типа {selectedRoofType}:</h2>
      <progress
        value={(currentQuestionIndex + 1) * (100 / roofData.questions.length)}
        max="100"
      ></progress>
      <div>
        <img
          src={roofData?.questions[currentQuestionIndex].image}
          alt={roofData?.questions[currentQuestionIndex].question}
        />
        <p>{roofData?.questions[currentQuestionIndex].question}</p>
        <input
          type="number"
          value={inputData[currentQuestionIndex]}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      <div className="button-container">
        {currentQuestionIndex > 0 ? (
          <button className="button back-button" onClick={handlePrevQuestion}>
            Назад
          </button>
        ) : (
          <button className="button back-button" onClick={onBack}>
            Назад
          </button>
        )}
        {currentQuestionIndex < (roofData?.questions.length || 0) - 1 && (
          <button className="button next-button" onClick={handleNextQuestion}>
            Далее
          </button>
        )}
        {currentQuestionIndex === (roofData?.questions.length || 0) - 1 && (
          <button className="button next-button" onClick={handleSubmit}>
            Завершить
          </button>
        )}
      </div>
    </div>
  )
}

export default RoofDataInput
