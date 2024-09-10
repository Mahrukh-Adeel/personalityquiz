import { useState, useEffect } from 'react'
import {UserContext}  from './components/UserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import './App.css'

function App() {
const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "Which season do you prefer?",
    options: ["Summer ☀️", "Winter ❄️", "Spring 🌱", "Autumn 🍂"],
  },
  {
    question: "What's your ideal vacation?",
    options: ["Mountain hiking 🏔️", "Beach relaxation 🏖️", "Forest camping 🏕️", "City exploration 🏙️"],
  },
  {
    question: "Choose a personality trait:",
    options: ["Passionate", "Calm", "Dependable", "Free-spirited"],
  },
  {
    question: "Pick a natural phenomenon:",
    options: ["Volcano eruption 🌋", "Tsunami 🌊", "Earthquake 🏚️", "Tornado 🌪️"],
  },
  {
    question: "If you could have a superpower, what would it be?",
    options: ["Flying ✈️", "Invisibility 👻", "Super strength 💪", "Time travel ⏳"],
  },
  {
    question: "What motivates you the most?",
    options: ["Success 🏆", "Happiness 😊", "Growth 🌱", "Adventure 🌍"],
  },
  {
    question: "Choose an animal:",
    options: ["Lion 🦁", "Dolphin 🐬", "Bear 🐻", "Eagle 🦅"],
  },
  {
    question: "What's your favorite physical activity?",
    options: ["High-intensity workout 🏋️", "Swimming 🏊", "Yoga 🧘", "Running 🏃"],
  },
  {
    question: "Pick a geometric shape:",
    options: ["Triangle 🔺", "Circle ⭕", "Square ◻️", "Spiral 🌀"],
  },
  {
    question: "What's your preferred time of day?",
    options: ["Noon ☀️", "Dawn 🌅", "Midnight 🌙", "Dusk 🌆"],
  }
];
const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};
const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  
  "Summer ☀️": "Fire",
  "Winter ❄️": "Water",
  "Spring 🌱": "Earth",
  "Autumn 🍂": "Air",

  "Mountain hiking 🏔️": "Earth",
  "Beach relaxation 🏖️": "Water",
  "Forest camping 🏕️": "Fire",
  "City exploration 🏙️": "Air",

  "Passionate": "Fire",
  "Calm": "Water",
  "Dependable": "Earth",
  "Free-spirited": "Air",

  "Volcano eruption 🌋": "Fire",
  "Tsunami 🌊": "Water",
  "Earthquake 🏚️": "Earth",
  "Tornado 🌪️": "Air",

  "Flying ✈️": "Air",
  "Invisibility 👻": "Water",
  "Super strength 💪": "Earth",
  "Time travel ⏳": "Air",

  "Success 🏆": "Fire",
  "Happiness 😊": "Water",
  "Growth 🌱": "Earth",
  "Adventure 🌍": "Air",

  "Lion 🦁": "Fire",
  "Dolphin 🐬": "Water",
  "Bear 🐻": "Earth",
  "Eagle 🦅": "Air",

  "High-intensity workout 🏋️": "Fire",
  "Swimming 🏊": "Water",
  "Yoga 🧘": "Air",
  "Running 🏃": "Earth",

  "Triangle 🔺": "Fire",
  "Circle ⭕": "Water",
  "Square ◻️": "Earth",
  "Spiral 🌀": "Air",

  "Noon ☀️": "Fire",
  "Dawn 🌅": "Air",
  "Midnight 🌙": "Water",
  "Dusk 🌆": "Earth",
};
  const [currentQuestionIndex, setCurrentQuestionIndex]= useState(0);
  const [answers,setAnswers]=useState([])
  const [userName, setUserName]= useState("")
  const [element, setElement] = useState("")
  const [artwork, setArtwork]=useState(null)
  function handleAnswer(answer) {
  setAnswers([...answers, answer]);
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};

// function handleUserFormSubmit(name) {
//   setUserName(name);
// };

function determineElement(answers) {
  const counts = {};
  answers.forEach(function(answer) {
    const element = elements[answer];
    counts[element] = (counts[element] || 0) + 1;
  });
  return Object.keys(counts).reduce(function(a, b) {
    return counts[a] > counts[b] ? a : b
  });
};
async function fetchArtwork(keyword) {
  try {
    const searchResponse = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`
    );
    const searchData = await searchResponse.json();

    console.log('Search Data:', searchData); 

    if (searchData.objectIDs && searchData.objectIDs.length > 0) {
      const randomIndex = Math.floor(Math.random() * searchData.objectIDs.length);
      const objectID = searchData.objectIDs[randomIndex];
      const detailsResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const detailsData = await detailsResponse.json();
      console.log('Details Data:', detailsData); 
      const { title, primaryImage, artistDisplayName, objectDate } = detailsData;

      setArtwork({
        title,
        image_url: primaryImage, 
        artist_display: artistDisplayName,
        date_display: objectDate,
      });
    } else {
      setArtwork(null);
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
  }
}

useEffect(
  function () {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  },
  [currentQuestionIndex]
);

const navigate = useNavigate();

function handleUserFormSubmit(name) {
  setUserName(name);
  navigate('/quiz');
};
function resetQuiz() {
  setCurrentQuestionIndex(0);
  setAnswers([]);
  setElement("");
  setArtwork(null);
  navigate('/');
}
  return (
    <>
    <UserContext.Provider value={{ name: userName, setName: setUserName }}>
      <Header />
      <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} artwork={artwork} onReset={resetQuiz} />
              )
            }
          />
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
