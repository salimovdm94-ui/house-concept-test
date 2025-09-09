// Простой тест для проверки правильности расчетов
const { calculateResults } = require('./src/lib/scoring.ts');

console.log('🧪 Тестирование расчетов...\n');

// Тест 1: Все ответы = 1
console.log('Тест 1: Все ответы = 1');
const answers1 = {};
for (let i = 1; i <= 24; i++) {
  answers1[i] = 1;
}
const result1 = calculateResults(answers1);
console.log('Результаты:', result1.scores);
console.log('T1:', result1.tensions.T1, '(должно быть 0.0)');
console.log('T2:', result1.tensions.T2, '(должно быть 0.0)');
console.log('Архетипы:', result1.archetypes);
console.log('---\n');

// Тест 2: Все ответы = 5
console.log('Тест 2: Все ответы = 5');
const answers2 = {};
for (let i = 1; i <= 24; i++) {
  answers2[i] = 5;
}
const result2 = calculateResults(answers2);
console.log('Результаты:', result2.scores);
console.log('T1:', result2.tensions.T1, '(должно быть 0.0)');
console.log('T2:', result2.tensions.T2, '(должно быть 0.0)');
console.log('Архетипы:', result2.archetypes);
console.log('---\n');

// Тест 3: Асимметрия для T1
console.log('Тест 3: Асимметрия для T1');
const answers3 = {};
// AT вопросы (5,6,7,8) = 5, AM вопросы (13,14,15,16) = 1
for (let i = 1; i <= 24; i++) {
  if (i >= 5 && i <= 8) answers3[i] = 5; // AT
  else if (i >= 13 && i <= 16) answers3[i] = 1; // AM
  else answers3[i] = 3; // остальные
}
const result3 = calculateResults(answers3);
console.log('AT среднее:', result3.scores.AT, '(должно быть 5.0)');
console.log('AM среднее:', result3.scores.AM, '(должно быть 1.0)');
console.log('T1:', result3.tensions.T1, '(должно быть 4.0)');
console.log('Архетипы:', result3.archetypes);
console.log('---\n');

// Тест 4: Асимметрия для T2
console.log('Тест 4: Асимметрия для T2');
const answers4 = {};
// CT вопросы (9,10,11,12) = 4, TU вопросы (21,22,23,24) = 2
for (let i = 1; i <= 24; i++) {
  if (i >= 9 && i <= 12) answers4[i] = 4; // CT
  else if (i >= 21 && i <= 24) answers4[i] = 2; // TU
  else answers4[i] = 3; // остальные
}
const result4 = calculateResults(answers4);
console.log('CT среднее:', result4.scores.CT, '(должно быть 4.0)');
console.log('TU среднее:', result4.scores.TU, '(должно быть 2.0)');
console.log('T2:', result4.tensions.T2, '(должно быть 2.0)');
console.log('Архетипы:', result4.archetypes);
console.log('---\n');

console.log('✅ Тестирование завершено!');
