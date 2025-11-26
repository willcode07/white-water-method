import React, { useState } from 'react';
import './FitnessAssessment.css';

const FitnessAssessment = ({ onClose, onBookConsultation }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What is your primary fitness goal?",
      options: [
        "Build strength and muscle",
        "Improve flexibility and mobility",
        "Recover from injury",
        "Improve athletic performance",
        "General fitness and health"
      ]
    },
    {
      id: 2,
      question: "How many days per week can you commit to training?",
      options: [
        "1-2 days",
        "3-4 days",
        "5-6 days",
        "7 days"
      ]
    },
    {
      id: 3,
      question: "What is your current fitness level?",
      options: [
        "Beginner - Just starting out",
        "Intermediate - Some experience",
        "Advanced - Very experienced",
        "Professional athlete"
      ]
    },
    {
      id: 4,
      question: "Do you have any current injuries or limitations?",
      options: [
        "No injuries or limitations",
        "Minor aches and pains",
        "Recovering from injury",
        "Chronic condition or limitation"
      ]
    },
    {
      id: 5,
      question: "What equipment do you have access to?",
      options: [
        "Full gym access",
        "Home gym with weights",
        "Limited equipment (resistance bands, bodyweight)",
        "No equipment"
      ]
    },
    {
      id: 6,
      question: "How long are your typical workout sessions?",
      options: [
        "30 minutes or less",
        "30-45 minutes",
        "45-60 minutes",
        "60+ minutes"
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateResults = () => {
    // Simple scoring logic - in a real app, this would be more sophisticated
    const goal = answers[1] || '';
    const days = answers[2] || '';
    
    let recommendation = "Based on your assessment, we recommend a ";
    
    if (goal.includes("strength")) {
      recommendation += "strength-focused program";
    } else if (goal.includes("flexibility")) {
      recommendation += "mobility and flexibility program";
    } else if (goal.includes("injury")) {
      recommendation += "rehabilitation-focused program";
    } else if (goal.includes("performance")) {
      recommendation += "performance optimization program";
    } else {
      recommendation += "well-rounded fitness program";
    }

    if (days.includes("1-2")) {
      recommendation += " with 2 sessions per week";
    } else if (days.includes("3-4")) {
      recommendation += " with 3-4 sessions per week";
    } else {
      recommendation += " with 4-5 sessions per week";
    }

    return recommendation;
  };

  const currentQuestion = questions[step - 1];
  const isComplete = step > questions.length;
  const progress = (step / questions.length) * 100;

  return (
    <div className="fitness-assessment">
      <h2>Fitness Assessment</h2>
      
      {!isComplete ? (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">Question {step} of {questions.length}</p>
          
          <div className="question-container">
            <h3 className="question-text">{currentQuestion.question}</h3>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {step > 1 && (
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
          )}
        </>
      ) : (
        <div className="results-container">
          <h3>Assessment Complete!</h3>
          <div className="results-content">
            <p className="recommendation">{calculateResults()}</p>
            <div className="results-summary">
              <h4>Your Responses:</h4>
              {Object.entries(answers).map(([key, value]) => {
                const question = questions.find(q => q.id === parseInt(key));
                return (
                  <div key={key} className="result-item">
                    <strong>{question?.question}</strong>
                    <p>{value}</p>
                  </div>
                );
              })}
            </div>
            <div className="results-actions">
              <button className="primary-button" onClick={() => {
                onClose();
                if (onBookConsultation) {
                  setTimeout(() => onBookConsultation(), 300);
                }
              }}>
                Book Consultation to Get Started
              </button>
              <button className="secondary-button" onClick={() => {
                setStep(1);
                setAnswers({});
              }}>
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessAssessment;

