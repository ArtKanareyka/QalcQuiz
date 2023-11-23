// TypeSelector.tsx
import React from 'react'
import storage from '../Data/storage'
import './type.scss'

interface TypeSelectorProps {
  onSelect: (roofType: string) => void
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="type__container">
      <h2 className="type__title">Выберите тип крыши:</h2>
      {storage.map((item) => (
        <div
          className="type__buttons"
          key={item.id}
          onClick={() => onSelect(item.typeRoof)}
        >
          {item.typeRoof}
          <img className="type__image" src={item.image} alt={item.alt} />
        </div>
      ))}
    </div>
  )
}

export default TypeSelector
