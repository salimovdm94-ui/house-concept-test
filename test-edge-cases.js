// Тест граничных случаев для проверки требований
const { getArchetypeSmart, SCALE_LABELS } = require('./src/lib/homeContent.ts');

console.log('🧪 Тестирование граничных случаев...\n');

// Тест 1: Кейс со скрина (ID=4.75, AT=2.50, CT=4.25, AM=4.00, HM=3.00, TU=2.50)
console.log('1. Тест кейса со скрина:');
const testCase1 = {
  avgID: 4.75,
  avgAT: 2.50,
  avgCT: 4.25,
  avgAM: 4.00,
  avgHM: 3.00,
  avgTU: 2.50
};

const result1 = getArchetypeSmart(testCase1);
console.log('Результат:', result1);
console.log('T1 = |AT - AM| = |2.50 - 4.00| =', Math.abs(2.50 - 4.00));
console.log('T2 = |CT - TU| = |4.25 - 2.50| =', Math.abs(4.25 - 2.50));
console.log('');

// Тест 2: Граничные пороги
console.log('2. Тест граничных порогов:');
const testCase2 = {
  avgID: 3.0,
  avgAT: 2.0,
  avgCT: 3.0,
  avgAM: 2.0,
  avgHM: 3.0,
  avgTU: 2.0
};

const result2 = getArchetypeSmart(testCase2);
console.log('T1 = 1.00 (баланс):', Math.abs(2.0 - 2.0));
console.log('T2 = 1.00 (баланс):', Math.abs(3.0 - 2.0));
console.log('');

// Тест 3: Непокрытые пары
console.log('3. Тест непокрытых пар:');
const testCases = [
  { name: 'ID+AM', avgs: { avgID: 4.5, avgAM: 4.0, avgAT: 2.0, avgCT: 2.0, avgHM: 2.0, avgTU: 2.0 } },
  { name: 'CT+HM', avgs: { avgCT: 4.5, avgHM: 4.0, avgID: 2.0, avgAT: 2.0, avgAM: 2.0, avgTU: 2.0 } },
  { name: 'AT+TU', avgs: { avgAT: 4.5, avgTU: 4.0, avgID: 2.0, avgCT: 2.0, avgAM: 2.0, avgHM: 2.0 } }
];

testCases.forEach(test => {
  const result = getArchetypeSmart(test.avgs);
  console.log(`${test.name}:`, result.matchedBy, result.archetype?.title, result.accentScale ? `(акцент: ${SCALE_LABELS[result.accentScale]})` : '');
});

console.log('\n✅ Тесты завершены!');
