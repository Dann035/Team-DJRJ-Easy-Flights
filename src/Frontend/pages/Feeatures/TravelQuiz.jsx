import React, { useState, useEffect } from 'react';
import './TravelQuiz.css';

const destinations = [
  "Las Vegas", "Nueva York", "Tokyo", "Miami", "Londres",
  "México", "Viena", "Amsterdam", "Venecia", "Puerto Rico", "París"
];

const allQuestions = [
  { question: "¿Prefieres una ciudad vibrante o tranquila?", options: ["Vibrante", "Tranquila"] },
  { question: "¿Te gustaría ver muchos rascacielos?", options: ["Sí, me encanta", "No, prefiero arquitectura histórica"] },
  { question: "¿Qué tan importante es la vida nocturna?", options: ["Muy importante", "No me interesa mucho"] },
  { question: "¿Prefieres un destino en la playa o en la ciudad?", options: ["Playa", "Ciudad"] },
  { question: "¿Qué clima prefieres?", options: ["Calor y sol", "Frío y nevado"] },
  { question: "¿Te gusta el arte y la cultura?", options: ["Sí, mucho", "No mucho"] },
  { question: "¿Prefieres un destino con mucha historia?", options: ["Sí, me interesa", "No, prefiero algo más moderno"] },
  { question: "¿Qué tan importante es la comida local para ti?", options: ["Muy importante", "No mucho"] },
  { question: "¿Te gustaría visitar museos y galerías de arte?", options: ["Sí", "No"] },
  { question: "¿Qué tipo de actividades prefieres?", options: ["Aventuras al aire libre", "Turismo cultural"] },
  { question: "¿Quieres ir a un lugar turístico popular?", options: ["Sí", "No"] },
  { question: "¿Te gustan los destinos con playas paradisiacas?", options: ["Sí", "No"] },
  { question: "¿Prefieres explorar nuevas ciudades o descansar en un resort?", options: ["Explorar", "Descansar"] },
  { question: "¿Te gustaría hacer compras de lujo?", options: ["Sí", "No"] },
  { question: "¿Te atraen destinos donde se hablen otros idiomas?", options: ["Sí", "No"] }
];

const TravelQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const randomQuestions = [];
    const copy = [...allQuestions];
    for (let i = 0; i < 8; i++) {
      const randIndex = Math.floor(Math.random() * copy.length);
      randomQuestions.push(copy.splice(randIndex, 1)[0]);
    }
    setSelectedQuestions(randomQuestions);
  }, []);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const randomDest = destinations[Math.floor(Math.random() * destinations.length)];
      setResult(randomDest);
      setQuizFinished(true);
    }
  };

  // Modificación aquí: Reiniciar el cuestionario sin recargar la página
  const handleRestart = () => {
    setAnswers([]);  // Resetear respuestas
    setCurrentQuestion(0);  // Volver a la primera pregunta
    setQuizFinished(false);  // Restablecer estado de finalización
    setResult("");  // Eliminar el resultado anterior

    // Re-aleatorizar las preguntas
    const randomQuestions = [];
    const copy = [...allQuestions];
    for (let i = 0; i < 8; i++) {
      const randIndex = Math.floor(Math.random() * copy.length);
      randomQuestions.push(copy.splice(randIndex, 1)[0]);
    }
    setSelectedQuestions(randomQuestions);  // Asignar nuevas preguntas aleatorias
  };

  return (
    <div className="quiz-page">
      <div className="quizcontainer">
        {!quizFinished ? (
          <div className="quizcard">
            <h2 className="questiontitle">{selectedQuestions[currentQuestion]?.question}</h2>
            <div className="options-container">
              {selectedQuestions[currentQuestion]?.options.map((option, index) => (
                <button key={index} className="option-btn" onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="resultcard">
            <h2 className="resulttitle">¡Tu destino es...</h2>
            <div className="resultname">
              <span>{result}</span>
            </div>
          </div>
        )}
      </div>

      {/* Ahora el botón va aquí, debajo de todo */}
      <div className="restartcontainer">
        <button className="btn restartbtn" onClick={handleRestart}>
          Reiniciar Cuestionario
        </button>
      </div>
    </div>
  );
};

export default TravelQuiz;