'use client';

import { useState } from 'react';
import { questions, calculateResults } from '@/lib/scoring';
import QuestionCard from '@/components/QuestionCard';
import Progress from '@/components/Progress';
import ResultView from '@/components/ResultView';

export default function Home() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setIsTestStarted(false);
  };

  const answeredCount = Object.values(answers)
    .filter(v => Number(v) >= 1 && Number(v) <= 5).length;
  const allAnswered = answeredCount === questions.length;

  if (showResults) {
    const result = calculateResults(answers);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ResultView result={result} />
          <div className="text-center mt-8">
            <button
              onClick={handleRestart}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mr-4"
            >
              Пройти тест заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Ваша концепция дома
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Ответьте на 24 утверждения, чтобы узнать, как вы воспринимаете и организуете свое жилое пространство. 
            Тест поможет определить ваш архетип и даст рекомендации по обустройству дома.
          </p>
          <div className="space-y-4 text-left max-w-lg mx-auto mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">24 вопроса с оценкой от 1 до 5</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Анализ по 6 шкалам</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Определение вашего архетипа</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Время прохождения: 5-10 минут</span>
            </div>
          </div>
          <button
            onClick={handleStartTest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Начать тест
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ваша концепция дома
            </h1>
            <p className="text-gray-600">
              Оцените каждое утверждение по шкале от 1 до 5
            </p>
          </div>

          <Progress current={answeredCount} total={questions.length} />

          <div className="space-y-6">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={answers[question.id] || 0}
                onChange={handleAnswerChange}
                questionNumber={index + 1}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleShowResults}
              disabled={!allAnswered}
              className={`font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 ${
                allAnswered
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {allAnswered ? 'К результатам' : `Ответьте на все вопросы (${answeredCount}/${questions.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}