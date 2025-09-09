'use client';

import { TestResult } from '@/lib/scoring';
import { scaleNames } from '@/lib/scoring';

interface ResultViewProps {
  result: TestResult;
}

export default function ResultView({ result }: ResultViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ваши результаты</h1>
        <p className="text-gray-600">Анализ вашей концепции дома</p>
      </div>

      {/* Шкалы */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Результаты по шкалам</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(result.scores).map(([scale, score]) => (
            <div key={scale} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {scaleNames[scale as keyof typeof scaleNames]}
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {score.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Напряжения */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Анализ напряжений</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">T1 = |AT - AM|</span>
            <span className={`text-lg font-bold ${result.tensions.T1 > 1.0 ? 'text-red-600' : 'text-green-600'}`}>
              {result.tensions.T1.toFixed(2)}
              {result.tensions.T1 > 1.0 && <span className="text-sm ml-2">⚠️ есть напряжение</span>}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">T2 = |CT - TU|</span>
            <span className={`text-lg font-bold ${result.tensions.T2 > 1.0 ? 'text-red-600' : 'text-green-600'}`}>
              {result.tensions.T2.toFixed(2)}
              {result.tensions.T2 > 1.0 && <span className="text-sm ml-2">⚠️ есть напряжение</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Архетипы */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Ваш архетип</h2>
        <div className="space-y-6">
          {result.archetypes.map((archetype, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{archetype}</h3>
              <p className="text-gray-600 leading-relaxed">{result.descriptions[index]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка печати */}
      <div className="text-center">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Печать / Сохранить как PDF
        </button>
      </div>
    </div>
  );
}
