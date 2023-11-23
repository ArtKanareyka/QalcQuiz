interface Question {
  id: number
  question: string
  image: string
}

interface RoofType {
  id: number
  typeRoof: string
  questions: Question[]
  imageResult: string
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
        question: 'Ширина здания A',
        image: '.../../assets/Gable/Gable-A.svg',
      },
      {
        id: 1,
        question: 'Высота крыши в коньке B',
        image: '.../../assets/Gable/Gable-B.svg',
      },
      {
        id: 2,
        question: 'Длина свеса C',
        image: '.../../assets/Gable/Gable-C.svg',
      },
      {
        id: 3,
        question: 'Длина конька D',
        image: '.../../assets/Gable/Gable-D.svg',
      },
    ],
    imageResult: '.../../assets/Gable/Gable-1.svg',
    image: '.../../assets/Gable/Gable-0.svg',
    alt: 'Схема двускатной крыши',
  },
  {
    id: 1,
    typeRoof: 'Односкатная',
    questions: [
      {
        id: 0,
        question: 'Ширина здания A',
        image: '.../../assets/Shed/Shed-A.svg',
      },
      {
        id: 1,
        question: 'Высота крыши в коньке B',
        image: '.../../assets/Shed/Shed-B.svg',
      },
      {
        id: 2,
        question: 'Длина свеса C1',
        image: '.../../assets/Shed/Shed-C1.svg',
      },
      {
        id: 2,
        question: 'Длина свеса C2',
        image: '.../../assets/Shed/Shed-C2.svg',
      },
      {
        id: 3,
        question: 'Длина конька D',
        image: '.../../assets/Shed/Shed-D.svg',
      },
    ],
    imageResult: '.../../assets/Shed/Shed-1.svg',
    image: '.../../assets/Shed/Shed-0.svg',
    alt: 'Схема отдноскатной крыши',
  },
  {
    id: 2,
    typeRoof: 'Мансардная',
    questions: [
      {
        id: 0,
        question: 'Ширина заложений A1',
        image: '.../../assets/Mansard/Mansard-A1.svg',
      },
      {
        id: 1,
        question: 'Ширина заложений A2',
        image: '.../../assets/Mansard/Mansard-A2.svg',
      },
      {
        id: 2,
        question: 'Высота подъема B1',
        image: '.../../assets/Mansard/Mansard-B1.svg',
      },
      {
        id: 3,
        question: 'Высота подъема B2',
        image: '.../../assets/Mansard/Mansard-B2.svg',
      },
      {
        id: 4,
        question: 'Длина свеса C',
        image: '.../../assets/Mansard/Mansard-C.svg',
      },
      {
        id: 5,
        question: 'Длина конька D',
        image: '.../../assets/Mansard/Mansard-D.svg',
      },
    ],
    imageResult: '.../../assets/Mansard/Mansard-1.svg',
    image: '.../../assets/Mansard/Mansard-0.svg',
    alt: 'Схема мансардной крыши',
  },
  {
    id: 3,
    typeRoof: 'Вальмовая',
    questions: [
      {
        id: 0,
        question: 'Ширина ската A',
        image: '.../../assets/Hip/Hip-A.svg',
      },
      {
        id: 1,
        question: 'Ширина ската B',
        image: '.../../assets/Hip/Hip-B.svg',
      },
      {
        id: 2,
        question: 'Ширина конька D',
        image: '.../../assets/Hip/Hip-D.svg',
      },
      {
        id: 3,
        question: 'Высота конька K',
        image: '.../../assets/Hip/Hip-K.svg',
      },
    ],
    imageResult: '.../../assets/Hip/Hip-1.svg',
    image: '.../../assets/Hip/Hip-0.svg',
    alt: 'Схема вальмовой крыши',
  },
  {
    id: 4,
    typeRoof: 'Шатровая',
    questions: [
      {
        id: 0,
        question: 'Ширина ската A',
        image: '.../../assets/Hip2/Hip2-A.svg',
      },
      {
        id: 1,
        question: 'Ширина ската D',
        image: '.../../assets/Hip2/Hip2-D.svg',
      },
      {
        id: 2,
        question: 'Высота конька K',
        image: '.../../assets/Hip2/Hip2-K.svg',
      },
    ],
    imageResult: '.../../assets/Hip2/Hip2-1.svg',
    image: '.../../assets/Hip2/Hip2-0.svg',
    alt: 'Схема Шатровой крыши',
  },
]

export default storage
