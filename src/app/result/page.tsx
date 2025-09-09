'use client';

import { useEffect, useState } from 'react';
import ResultView from '@/components/ResultView';
import { TestResult } from '@/lib/scoring';

export default function ResultPage() {
  const [result] = useState<TestResult | null>(null);

  useEffect(() => {
    // В реальном приложении здесь можно было бы получить результаты из URL параметров
    // или из localStorage, но для простоты перенаправляем на главную страницу
    window.location.href = '/';
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Загрузка результатов...
          </h1>
          <p className="text-gray-600">
            Перенаправляем на главную страницу...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultView result={result} />
    </div>
  );
}
