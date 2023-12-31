import React, { useState, useEffect, useMemo, useRef } from 'react'
import storage from '../../Data/storage'
import './input.scss'
import { Button } from '@mui/material'

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
  const inputRef = useRef<HTMLInputElement>(null)
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'Enter' || event.key === 'Spacebar') {
      setTimeout(() => {
        onclick
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 0)
    }
  }

  if (!roofData || !roofData.questions) {
    return null // Or you can render a loading state or an error message
  }
  return (
    <div className="calc-quiz-roof__container">
      <div className="calc-quiz-title__container">
        {currentQuestionIndex > 0 ? (
          <Button
            variant="outlined"
            className="calc-quiz-button back-button"
            onClick={handlePrevQuestion}
          >
            Назад
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="calc-quiz-button back-button"
            onClick={onBack}
          >
            Назад
          </Button>
        )}
        <h2>Введите данные для крыши типа: {selectedRoofType}</h2>
      </div>

      <div className="calc-quiz-list-button-img__contanier">
        <img
          className="calc-quiz-qalc-img"
          src={roofData?.questions[currentQuestionIndex].image}
          alt={roofData?.questions[currentQuestionIndex].question}
        />
        <div className="calc-quiz-list-button__contanier">
          <ol className="calc-quiz-roof__questions-list calc-quiz-ol">
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
          <form className="calc-quiz-roof__button-container">
            <input
              type="text"
              inputMode="decimal"
              autoFocus
              ref={inputRef}
              value={inputData[currentQuestionIndex]}
              placeholder={roofData?.questions[currentQuestionIndex].question}
              onChange={(e) => handleInputChange(e.target.value)}
            />

            {currentQuestionIndex < (roofData?.questions.length || 0) - 1 && (
              <Button
                variant="contained"
                className="calc-quiz-button next-button"
                onClick={handleNextQuestion}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                Далее
              </Button>
            )}
            {currentQuestionIndex === (roofData?.questions.length || 0) - 1 && (
              <Button
                variant="contained"
                className="calc-quiz-button next-button"
                onClick={handleSubmit}
              >
                Завершить
              </Button>
            )}
          </form>
        </div>
      </div>

      <div className="calc-quiz-roof__progress-container">
        <progress
          className="calc-quiz-roof__progress-bar"
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
