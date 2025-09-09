'use client';

import { TestResult, isTense } from '@/lib/scoring';
import { scaleNames } from '@/lib/scoring';
import { getArchetypeSmart, SCALE_LABELS } from '@/lib/homeContent';
import { getT1Recommendations, getT2Recommendations, SCALE_NAMES } from '@/lib/tensionRecommendations';
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
        <div className="space-y-8">
          {/* T1 */}
          <div className={`p-6 rounded-lg ${isTense(result.tensions.T1) ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">T1 = |AT − AM|</span>
              <span className={`text-2xl font-bold ${isTense(result.tensions.T1) ? 'text-orange-600' : 'text-green-600'}`}>
                {result.tensions.T1.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full ${isTense(result.tensions.T1) ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((result.tensions.T1 / 3) * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Расчёт: |{result.scores.AT.toFixed(2)} − {result.scores.AM.toFixed(2)}| = {result.tensions.T1.toFixed(2)}
              </p>
              {(() => {
                const delta = result.scores.AT - result.scores.AM;
                return (
                  <p className="text-gray-600">
                    ΔT1 = {delta.toFixed(2)} → перекос в сторону {delta > 0 ? 'AT' : 'AM'} ({SCALE_NAMES[delta > 0 ? 'AT' : 'AM']})
                  </p>
                );
              })()}
              <p className={`font-medium ${isTense(result.tensions.T1) ? 'text-orange-600' : 'text-green-600'}`}>
                {isTense(result.tensions.T1) ? '⚠️ Статус: есть напряжение' : '✅ Баланс: напряжения нет'}
              </p>
            </div>

            {/* Рекомендации для T1 */}
            {isTense(result.tensions.T1) && (() => {
              const delta = result.scores.AT - result.scores.AM;
              const recommendations = getT1Recommendations(delta);
              return (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium text-gray-800">Рекомендации по T1:</h4>
                  
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Универсальные шаги:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.universal.map((rec, i) => (
                        <li key={i} className="text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Направленные шаги:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.directional.map((rec, i) => (
                        <li key={i} className="text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-3 rounded border">
                    <h5 className="font-medium text-sm text-blue-800 mb-2">Микродействия сегодня:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.microActions.map((action, i) => (
                        <li key={i} className="text-blue-700">{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* T2 */}
          <div className={`p-6 rounded-lg ${isTense(result.tensions.T2) ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-lg">T2 = |CT − TU|</span>
              <span className={`text-2xl font-bold ${isTense(result.tensions.T2) ? 'text-orange-600' : 'text-green-600'}`}>
                {result.tensions.T2.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full ${isTense(result.tensions.T2) ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min((result.tensions.T2 / 3) * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Расчёт: |{result.scores.CT.toFixed(2)} − {result.scores.TU.toFixed(2)}| = {result.tensions.T2.toFixed(2)}
              </p>
              {(() => {
                const delta = result.scores.CT - result.scores.TU;
                return (
                  <p className="text-gray-600">
                    ΔT2 = {delta.toFixed(2)} → перекос в сторону {delta > 0 ? 'CT' : 'TU'} ({SCALE_NAMES[delta > 0 ? 'CT' : 'TU']})
                  </p>
                );
              })()}
              <p className={`font-medium ${isTense(result.tensions.T2) ? 'text-orange-600' : 'text-green-600'}`}>
                {isTense(result.tensions.T2) ? '⚠️ Статус: есть напряжение' : '✅ Баланс: напряжения нет'}
              </p>
            </div>

            {/* Рекомендации для T2 */}
            {isTense(result.tensions.T2) && (() => {
              const delta = result.scores.CT - result.scores.TU;
              const recommendations = getT2Recommendations(delta);
              return (
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium text-gray-800">Рекомендации по T2:</h4>
                  
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Универсальные шаги:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.universal.map((rec, i) => (
                        <li key={i} className="text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Направленные шаги:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.directional.map((rec, i) => (
                        <li key={i} className="text-gray-600">{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-3 rounded border">
                    <h5 className="font-medium text-sm text-blue-800 mb-2">Микродействия сегодня:</h5>
                    <ul className="list-disc ml-5 space-y-1 text-sm">
                      {recommendations.microActions.map((action, i) => (
                        <li key={i} className="text-blue-700">{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
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
