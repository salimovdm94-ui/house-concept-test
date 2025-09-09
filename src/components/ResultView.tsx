'use client';

import { TestResult, isTense } from '@/lib/scoring';
import { scaleNames } from '@/lib/scoring';
import { getArchetypeSmart, SCALE_LABELS, SCALE_TIPS } from '@/lib/homeContent';
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
      {!archetype && (
        <Section title="Анализ результатов">
          <div className="p-4 border rounded">
            <p>
              Не нашлось точного соответствия для пары <b>{smart.lead}</b> + <b>{smart.second}</b>.
              Мы покажем рекомендации по вашим шкалам — ведущая: <b>{SCALE_LABELS[smart.lead]}</b>, усиление: <b>{SCALE_LABELS[smart.second]}</b>.
            </p>
            <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Советы по {SCALE_LABELS[smart.lead]}</h4>
                <ul className="list-disc ml-5 space-y-1">{SCALE_TIPS[smart.lead].map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
              <div>
                <h4 className="font-medium">Акцент: {SCALE_LABELS[smart.second]}</h4>
                <ul className="list-disc ml-5 space-y-1">{SCALE_TIPS[smart.second].map((t,i)=><li key={i}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        </Section>
      )}

      {archetype && (
        <Section title={`Ваш архетип: ${archetype.title}`}>
          <>
            {smart.accentScale && (
              <p className="text-sm text-gray-700 mb-4">
                Акцент вашего профиля: <b>{SCALE_LABELS[smart.accentScale]}</b>. Это оттеняет архетип вашими личными приоритетами.
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
                  <h4 className="font-medium mb-2">Акцент: практические шаги</h4>
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
