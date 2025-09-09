'use client';

import { TestResult, isTense } from '@/lib/scoring';
import { scaleNames } from '@/lib/scoring';
import { getArchetypeSmart, SCALE_LABELS } from '@/lib/homeContent';
import Section from './Section';

interface ResultViewProps {
  result: TestResult;
}

export default function ResultView({ result }: ResultViewProps) {
  const handlePrint = () => {
    window.print();
  };

  // Преобразуем результат в формат для умного выбора архетипа
  const avgs = {
    avgID: result.scores.ID,
    avgAT: result.scores.AT,
    avgCT: result.scores.CT,
    avgAM: result.scores.AM,
    avgHM: result.scores.HM,
    avgTU: result.scores.TU,
  };

  const smart = getArchetypeSmart(avgs);
  const archetype = smart.archetype;

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
      <Section title="Индексы напряжения">
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${isTense(result.tensions.T1) ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">T1 = |AT − AM|</span>
              <span className={`text-lg font-bold ${isTense(result.tensions.T1) ? 'text-orange-600' : 'text-green-600'}`}>
                {result.tensions.T1.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isTense(result.tensions.T1) ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((result.tensions.T1 / 3) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              {isTense(result.tensions.T1) ? '⚠️ есть напряжение' : '✅ баланс, напряжения нет'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Расчёт: |{result.scores.AT.toFixed(2)} − {result.scores.AM.toFixed(2)}| = {result.tensions.T1.toFixed(2)}
            </p>
            {isTense(result.tensions.T1) && (
              <p className="text-xs text-orange-600 mt-1">
                Направление: {result.scores.AT > result.scores.AM ? 'AT' : 'AM'}
              </p>
            )}
          </div>

          <div className={`p-4 rounded-lg ${isTense(result.tensions.T2) ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">T2 = |CT − TU|</span>
              <span className={`text-lg font-bold ${isTense(result.tensions.T2) ? 'text-orange-600' : 'text-green-600'}`}>
                {result.tensions.T2.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isTense(result.tensions.T2) ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((result.tensions.T2 / 3) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              {isTense(result.tensions.T2) ? '⚠️ есть напряжение' : '✅ баланс, напряжения нет'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Расчёт: |{result.scores.CT.toFixed(2)} − {result.scores.TU.toFixed(2)}| = {result.tensions.T2.toFixed(2)}
            </p>
            {isTense(result.tensions.T2) && (
              <p className="text-xs text-orange-600 mt-1">
                Направление: {result.scores.CT > result.scores.TU ? 'CT' : 'TU'}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Архетип */}
      <Section title={`Ваш архетип: ${archetype.title}${smart.matchedBy === 'closest' ? ' (подбор по ведущей шкале)' : ''}`}>
        <>
          {smart.accentScale && (
            <p className="text-sm text-gray-700 mb-4">
              Акцент второй шкалы: <b>{SCALE_LABELS[smart.accentScale]}</b>. Это оттеняет архетип вашими личными приоритетами.
            </p>
          )}

          <div className="space-y-6">
            <p>{archetype.essence}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Сильные стороны</h4>
                <ul className="list-disc ml-5 space-y-1">{archetype.strengths.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Возможные риски</h4>
                <ul className="list-disc ml-5 space-y-1">{archetype.risks.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Что попробовать</h4>
                <ul className="list-disc ml-5 space-y-1">{archetype.tryNow.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">На что обратить внимание</h4>
                <ul className="list-disc ml-5 space-y-1">{archetype.watchOut.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Рекомендации</h4>
              <ul className="list-disc ml-5 space-y-1">{archetype.recs.map((t,i)=><li key={i}>{t}</li>)}</ul>
            </div>

            {smart.accentTips && (
              <div className="p-4 rounded border">
                <h4 className="font-medium mb-2">Акцент второй шкалы</h4>
                <ul className="list-disc ml-5 space-y-1">{smart.accentTips.map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
            )}

            <div>
              <h4 className="font-medium mb-2">Чек-лист предметов</h4>
              <ul className="list-disc ml-5 space-y-1">{archetype.checklist.map((t,i)=><li key={i}>{t}</li>)}</ul>
            </div>

            <div className="p-4 rounded border">
              <h4 className="font-medium mb-2">7-дневный эксперимент</h4>
              <p className="text-sm">{archetype.experiment}</p>
            </div>
          </div>
        </>
      </Section>


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
