interface Question {
  id: number
  question: string
  image: string
}

interface RoofType {
  id: number
  typeRoof: string
  questions: Question[]
  image: string
  alt: string
}

const storage: RoofType[] = [
  {
    id: 0,
    typeRoof: 'Двускатная',
    questions: [
      {
        id: 0,
        question: 'Ширина здания, м',
        image: '.../../assets/Gable/Gable-A.svg',
      },
      {
        id: 1,
        question: 'Высота крыши в коньке, м',
        image: '.../../assets/Gable/Gable-B.svg',
      },
      {
        id: 2,
        question: 'Длина свеса, м',
        image: '.../../assets/Gable/Gable-C.svg',
      },
      {
        id: 3,
        question: 'Длина конька, м',
        image: '.../../assets/Gable/Gable-D.svg',
      },
    ],

    image: '.../../assets/Gable/Gable-0.svg',
    alt: 'Схема двускатной крыши',
  },
  {
    id: 1,
    typeRoof: 'Односкатная',
    questions: [
      {
        id: 0,
        question: 'Ширина здания, м',
        image: '.../../assets/Shed/Shed-A.svg',
      },
      {
        id: 1,
        question: 'Высота крыши в коньке, м',
        image: '.../../assets/Shed/Shed-B.svg',
      },
      {
        id: 2,
        question: 'Длина свеса, м',
        image: '.../../assets/Shed/Shed-C1.svg',
      },
      {
        id: 3,
        question: 'Длина конька, м',
        image: '.../../assets/Shed/Shed-D.svg',
      },
    ],

    image: '.../../assets/Shed/Shed-0.svg',
    alt: 'Схема отдноскатной крыши',
  },
  {
    id: 2,
    typeRoof: 'Мансардная',
    questions: [
      {
        id: 0,
        question: 'Ширина заложений, м',
        image: '.../../assets/Mansard/Mansard-A1.svg',
      },
      {
        id: 1,
        question: 'Ширина заложений, м',
        image: '.../../assets/Mansard/Mansard-A2.svg',
      },
      {
        id: 2,
        question: 'Высота подъема, м',
        image: '.../../assets/Mansard/Mansard-B1.svg',
      },
      {
        id: 3,
        question: 'Высота подъема, м',
        image: '.../../assets/Mansard/Mansard-B2.svg',
      },
      {
        id: 4,
        question: 'Длина свеса, м',
        image: '.../../assets/Mansard/Mansard-C.svg',
      },
      {
        id: 5,
        question: 'Длина конька, м',
        image: '.../../assets/Mansard/Mansard-D.svg',
      },
    ],

    image: '.../../assets/Mansard/Mansard-0.svg',
    alt: 'Схема мансардной крыши',
  },
  {
    id: 3,
    typeRoof: 'Вальмовая',
    questions: [
      {
        id: 0,
        question: 'Ширина ската, м',
        image: '.../../assets/Hip/Hip-A.svg',
      },
      {
        id: 1,
        question: 'Ширина ската, м',
        image: '.../../assets/Hip/Hip-B.svg',
      },
      {
        id: 2,
        question: 'Ширина конька, м',
        image: '.../../assets/Hip/Hip-D.svg',
      },
      {
        id: 3,
        question: 'Высота конька, м',
        image: '.../../assets/Hip/Hip-K.svg',
      },
    ],

    image: '.../../assets/Hip/Hip-0.svg',
    alt: 'Схема вальмовой крыши',
  },
  {
    id: 4,
    typeRoof: 'Шатровая',
    questions: [
      {
        id: 0,
        question: 'Ширина ската, м',
        image: '.../../assets/Hip2/Hip2-A.svg',
      },
      {
        id: 1,
        question: 'Ширина ската, м',
        image: '.../../assets/Hip2/Hip2-D.svg',
      },
      {
        id: 2,
        question: 'Высота конька, м',
        image: '.../../assets/Hip2/Hip2-K.svg',
      },
    ],

    image: '.../../assets/Hip2/Hip2-0.svg',
    alt: 'Схема Шатровой крыши',
  },
]

export default storage
