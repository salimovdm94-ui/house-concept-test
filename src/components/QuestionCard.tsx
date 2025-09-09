'use client';

import { Question } from '@/lib/scoring';

interface QuestionCardProps {
  question: Question;
  value: number;
  onChange: (questionId: number, value: number) => void;
  questionNumber: number;
}

export default function QuestionCard({ question, value, onChange, questionNumber }: QuestionCardProps) {
  const scaleLabels = ['не про меня', 'скорее не про меня', 'нейтрально', 'скорее про меня', 'очень про меня'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-500">Вопрос {questionNumber}</span>
        <p className="text-gray-800 text-lg leading-relaxed mt-2">{question.text}</p>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((option) => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={value === option}
              onChange={() => onChange(question.id, option)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}. {scaleLabels[option - 1]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
