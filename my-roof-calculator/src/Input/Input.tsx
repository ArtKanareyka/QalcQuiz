import React, { useState, useEffect, useMemo } from 'react'
import storage from '../Data/storage'
import './input.scss'

interface RoofQuestion {
  id: number
  question: string
  image: string
}

interface RoofData {
  typeRoof: string
  questions: RoofQuestion[]
}

interface InputProps {
  selectedRoofType: string
  onSubmit: (data: number[]) => void
  onBack: () => void
  inputData: string[]
}

const RoofDataInput: React.FC<InputProps> = ({
  selectedRoofType,
  onSubmit,
  onBack,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [inputData, setInputData] = useState<string[]>([''])
  const [roofData, setRoofData] = useState<RoofData | null>(null)

  const roofDataMap = useMemo(() => {
    const map: Record<string, string[]> = {}
    storage.forEach((item) => {
      map[item.typeRoof] = new Array(item.questions.length).fill('')
    })
    return map
  }, [])

  useEffect(() => {
    const data = storage.find((item) => item.typeRoof === selectedRoofType)
    setRoofData(data || null)

    setInputData([...roofDataMap[selectedRoofType]])
  }, [selectedRoofType, roofDataMap])

  const handleInputChange = (value: string) => {
    // Замена запятых на точки перед обновлением состояния
    const sanitizedValue = value.replace(/,/g, '.')

    // Фильтрация ввода с использованием регулярного выражения
    const filteredValue = sanitizedValue.replace(/[^0-9.]/g, '')

    const commaCount = filteredValue.split(',').length - 1
    const dotCount = filteredValue.split('.').length - 1

    if (commaCount + dotCount > 1) {
      // Если более одной запятой или точки обнаружены, не обновлять состояние
      return
    }

    if (/^[.,]/.test(filteredValue)) {
      // Если введена точка или запятая в начале строки, не обновлять состояние
      return
    }

    // Проверка на случай, когда перед нулем есть любое другое число
    if (/[^1-9]^0{2,}(?=\d)|^0{2,}$/.test(filteredValue)) {
      // Если перед нулем есть что-то кроме нуля или отсутствует число перед запятой,
      // или строка состоит из двух или более нулей подряд, не обновлять состояние
      return
    }

    if (value.length >= 8) {
      return
    }

    // Обновление состояния
    setInputData((prevData) => {
      const newData = [...prevData]
      newData[currentQuestionIndex] = filteredValue
      return newData
    })
  }

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const isValidInputValue = (value: string): boolean => {
    return /^[1-9]\d*\.?\d*|0\.\d*[1-9]\d*$/.test(value)
  }

  const handleNextQuestion = () => {
    const inputValue = inputData[currentQuestionIndex].trim()

    if (isValidInputValue(inputValue)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      alert('Пожалуйста, введите значение не равное 0 и не пустую строку.')
    }
  }

  const handleSubmit = () => {
    // Проверка на валидность каждого элемента массива
    const isValid = inputData.every((value) => isValidInputValue(value))

    if (isValid) {
      // Преобразование массива строк в массив чисел
      const numericData = inputData.map((value) => parseFloat(value))

      // Отправка преобразованного массива
      onSubmit(numericData)
    } else {
      alert('Пожалуйста, введите корректные значения.')
    }
  }

  if (!roofData || !roofData.questions) {
    return null // Or you can render a loading state or an error message
  }
  return (
    <div className="roof__container">
      <div className="title__container">
        {currentQuestionIndex > 0 ? (
          <button className="button back-button" onClick={handlePrevQuestion}>
            Назад
          </button>
        ) : (
          <button className="button back-button" onClick={onBack}>
            Назад
          </button>
        )}
        <h2>Введите данные для крыши типа: {selectedRoofType}</h2>
      </div>

      <div className="list-button-img__contanier">
        <img
          src={roofData?.questions[currentQuestionIndex].image}
          alt={roofData?.questions[currentQuestionIndex].question}
        />
        <div className="list-button__contanier">
          <ol className="roof__questions-list">
            {roofData.questions.map((question, index) => (
              <li
                key={index}
                className={
                  index === currentQuestionIndex
                    ? 'active'
                    : index < currentQuestionIndex
                    ? 'completed'
                    : ''
                }
              >
                {question.question}: {inputData[index]} м
              </li>
            ))}
          </ol>
          <div className="roof__button-container">
            <form>
              <input
                type="text"
                inputMode="decimal"
                value={inputData[currentQuestionIndex]}
                placeholder={roofData?.questions[currentQuestionIndex].question}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </form>

            {currentQuestionIndex < (roofData?.questions.length || 0) - 1 && (
              <button
                className="button next-button"
                onClick={handleNextQuestion}
              >
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
      </div>

      <div className="roof__progress-container">
        <progress
          className="roof__progress-bar"
          value={(currentQuestionIndex + 1) * (100 / roofData.questions.length)}
          max="100"
        ></progress>
        <span>{`${currentQuestionIndex + 1} / ${
          roofData.questions.length
        }`}</span>
      </div>
    </div>
  )
}

export default RoofDataInput