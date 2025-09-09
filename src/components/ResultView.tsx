'use client';

import { TestResult, isTense } from '@/lib/scoring';
import { scaleNames } from '@/lib/scoring';
import Section from './Section';

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
      <Section title="Результаты по шкалам">
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
      </Section>

      {/* Напряжения */}
      <Section title="Анализ напряжений">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">T1 = |AT - AM|</span>
            <span className={`text-lg font-bold ${isTense(result.tensions.T1) ? 'text-red-600' : 'text-green-600'}`}>
              {result.tensions.T1.toFixed(2)}
              {isTense(result.tensions.T1) && <span className="text-sm ml-2">⚠️ есть напряжение</span>}
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">T2 = |CT - TU|</span>
            <span className={`text-lg font-bold ${isTense(result.tensions.T2) ? 'text-red-600' : 'text-green-600'}`}>
              {result.tensions.T2.toFixed(2)}
              {isTense(result.tensions.T2) && <span className="text-sm ml-2">⚠️ есть напряжение</span>}
            </span>
          </div>
        </div>
      </Section>

      {/* Архетип */}
      {result.archetypeData && (
        <Section title={`Ваш архетип: ${result.archetypeData.title}`}>
          <div className="space-y-6">
            <p>{result.archetypeData.essence}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Сильные стороны</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {result.archetypeData.strengths.map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Возможные риски</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {result.archetypeData.risks.map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Что попробовать</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {result.archetypeData.tryNow.map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">На что обратить внимание</h4>
                <ul className="list-disc ml-5 space-y-1">
                  {result.archetypeData.watchOut.map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Рекомендации</h4>
              <ul className="list-disc ml-5 space-y-1">
                {result.archetypeData.recs.map((t,i)=><li key={i}>{t}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Чек-лист предметов</h4>
              <ul className="list-disc ml-5 space-y-1">
                {result.archetypeData.checklist.map((t,i)=><li key={i}>{t}</li>)}
              </ul>
            </div>

            <div className="p-4 rounded border">
              <h4 className="font-medium mb-2">7-дневный эксперимент</h4>
              <p className="text-sm">{result.archetypeData.experiment}</p>
            </div>
          </div>
        </Section>
      )}

      {/* Fallback для случаев без архетипа */}
      {!result.archetypeData && result.archetypes.length > 0 && (
        <Section title="Ваш архетип">
          <div className="space-y-6">
            {result.archetypes.map((archetype, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{archetype}</h3>
                <p className="text-gray-600 leading-relaxed">{result.descriptions[index]}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Дополнительный fallback если вообще ничего не найдено */}
      {!result.archetypeData && result.archetypes.length === 0 && (
        <Section title="Анализ результатов">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Не удалось определить конкретный архетип на основе ваших ответов.
            </p>
            <p className="text-sm text-gray-500">
              Попробуйте пройти тест еще раз, отвечая более определенно на вопросы.
            </p>
          </div>
        </Section>
      )}

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
