export type ScaleCode = 'ID'|'AT'|'CT'|'AM'|'HM'|'TU';

export type Answers = Record<
  `${ScaleCode}${1|2|3|4}`,
  number | string | undefined
>;

export interface TestResult {
  scores: {
    ID: number;
    AT: number;
    CT: number;
    AM: number;
    HM: number;
    TU: number;
  };
  tensions: {
    T1: number;
    T2: number;
  };
  archetypes: string[];
  descriptions: string[];
}

export interface Question {
  id: number;
  text: string;
  scale: ScaleCode;
  questionKey: `${ScaleCode}${1|2|3|4}`;
}

export const questions: Question[] = [
  // ID - Самовыражение
  { id: 1, text: "Когда я смотрю на свой дом, я хочу узнавать в нём себя.", scale: 'ID', questionKey: 'ID1' },
  { id: 2, text: "Мне важно видеть дома мои увлечения и ценности (книги, искусство, хобби).", scale: 'ID', questionKey: 'ID2' },
  { id: 3, text: "Мне комфортнее в пространстве, которое отличается от базовых типовых решений.", scale: 'ID', questionKey: 'ID3' },
  { id: 4, text: "Я хочу, чтобы дом «рассказывал обо мне», даже если гостей нет.", scale: 'ID', questionKey: 'ID4' },
  
  // AT - Личные вещи и память
  { id: 5, text: "Без любимых вещей (фото, текстиль, предметы памяти) мне сложнее почувствовать место своим.", scale: 'AT', questionKey: 'AT1' },
  { id: 6, text: "Я сохраняю связь с прошлыми домами/комнатами и ценю continuity.", scale: 'AT', questionKey: 'AT2' },
  { id: 7, text: "Памятные предметы дают мне устойчивость в повседневности.", scale: 'AT', questionKey: 'AT3' },
  { id: 8, text: "Частая смена жилья для меня эмоционально непроста.", scale: 'AT', questionKey: 'AT4' },
  
  // CT - Порядок и структура
  { id: 9, text: "Я отдыхаю лучше, когда порядок и правила в моём пространстве определены.", scale: 'CT', questionKey: 'CT1' },
  { id: 10, text: "Мне важно зонировать и систематизировать вещи.", scale: 'CT', questionKey: 'CT2' },
  { id: 11, text: "Меня напрягает ощущение непредсказуемости дома.", scale: 'CT', questionKey: 'CT3' },
  { id: 12, text: "Я чаще выбираю функциональные решения, чем декоративные.", scale: 'CT', questionKey: 'CT4' },
  
  // AM - Лёгкость перемен
  { id: 13, text: "Я быстро осваиваюсь в новом жилье и делаю его «своим».", scale: 'AM', questionKey: 'AM1' },
  { id: 14, text: "Могу чувствовать себя «дома» в аренде/отеле при минимуме своих вещей.", scale: 'AM', questionKey: 'AM2' },
  { id: 15, text: "Мне нравится менять планировку/подход по мере изменения жизни.", scale: 'AM', questionKey: 'AM3' },
  { id: 16, text: "Ценю мобильные/съёмные решения, которые не «привязывают».", scale: 'AM', questionKey: 'AM4' },
  
  // HM - Ежедневные ритуалы
  { id: 17, text: "У меня есть ежедневные домашние ритуалы (кофе, музыка, свеча).", scale: 'HM', questionKey: 'HM1' },
  { id: 18, text: "Я осознанно создаю атмосферу (запах, свет, звуки) каждый день.", scale: 'HM', questionKey: 'HM2' },
  { id: 19, text: "Мне нужны «станции/углы» для занятий (чтение, работа, спорт).", scale: 'HM', questionKey: 'HM3' },
  { id: 20, text: "Готов(а) тратить время на «настройку» дома под себя.", scale: 'HM', questionKey: 'HM4' },
  
  // TU - Комфорт с непредсказуемым
  { id: 21, text: "Меня не смущают временные/незавершённые решения, если они помогают жить сейчас.", scale: 'TU', questionKey: 'TU1' },
  { id: 22, text: "Нормально отношусь к следам жизни и износу — дом не должен быть «музеем».", scale: 'TU', questionKey: 'TU2' },
  { id: 23, text: "Мне комфортно, когда не всё под контролем — «посмотрим, как сложится».", scale: 'TU', questionKey: 'TU3' },
  { id: 24, text: "Я могу делиться правилами/пространством ради других плюсов (цена, локация, сообщество).", scale: 'TU', questionKey: 'TU4' },
];

export const scaleNames = {
  ID: 'Самовыражение',
  AT: 'Личные вещи и память',
  CT: 'Порядок и структура',
  AM: 'Лёгкость перемен',
  HM: 'Ежедневные ритуалы',
  TU: 'Комфорт с непредсказуемым'
};

export const archetypeDescriptions = {
  'ID+CT': {
    name: 'Куратор идентичности',
    description: 'Вы создаете пространство, которое одновременно отражает вашу личность и поддерживает порядок. Витрины, системы хранения и акценты помогают вам выражать себя через организованную среду.'
  },
  'ID+AT': {
    name: 'Коллекционер памяти',
    description: 'Ваш дом — это музей вашей жизни. Стена памяти, рамки с фотографиями и архив-боксы помогают вам сохранять связь с прошлым и рассказывать свою историю.'
  },
  'CT+AT': {
    name: 'Стратег контроля',
    description: 'Вы создаете структурированную среду, которая дает вам чувство контроля. Зонирование, шкафы и контроль света/шума помогают вам чувствовать себя в безопасности.'
  },
  'AM+HM': {
    name: 'Кочующий гнездостроитель',
    description: 'Вы легко адаптируетесь к новым местам, но при этом создаете уютные ритуалы. Портативные якоря и складная мебель помогают вам чувствовать себя дома везде.'
  },
  'HM+ID': {
    name: 'Мастер ритуалов',
    description: 'Вы создаете пространство, которое поддерживает ваши ежедневные ритуалы и отражает вашу личность. Станции-углы и световые сценарии помогают вам чувствовать себя комфортно.'
  },
  'AM+TU': {
    name: 'Гибкий минималист',
    description: 'Вы цените простоту и гибкость. Многофункциональные предметы и модульность помогают вам адаптироваться к изменениям, не накапливая лишнего.'
  }
};

const mean = (vals: (number | string | undefined)[]) => {
  const nums = vals.map(v => Number(v));               // приведение типов
  const filled = nums.filter(v => Number.isFinite(v));
  if (filled.length === 0) return 0;
  const sum = filled.reduce((a,b)=>a+Number(b), 0);
  return sum / filled.length;
};

export function computeAverages(a: Answers) {
  const avgID = mean([a.ID1,a.ID2,a.ID3,a.ID4]);
  const avgAT = mean([a.AT1,a.AT2,a.AT3,a.AT4]);
  const avgCT = mean([a.CT1,a.CT2,a.CT3,a.CT4]);
  const avgAM = mean([a.AM1,a.AM2,a.AM3,a.AM4]);
  const avgHM = mean([a.HM1,a.HM2,a.HM3,a.HM4]);
  const avgTU = mean([a.TU1,a.TU2,a.TU3,a.TU4]);
  return { avgID, avgAT, avgCT, avgAM, avgHM, avgTU };
}

export function computeTensions(avgs: ReturnType<typeof computeAverages>) {
  const { avgAT, avgAM, avgCT, avgTU } = avgs;
  // КЛЮЧЕВАЯ ПРАВКА: модуль разности
  const T1 = Math.abs(avgAT - avgAM);
  const T2 = Math.abs(avgCT - avgTU);
  return { T1, T2 };
}

export function pickTopScales(avgs: ReturnType<typeof computeAverages>) {
  const entries = Object.entries(avgs) as [keyof typeof avgs, number][];
  const sorted = entries.sort((a,b)=> b[1]-a[1]);
  const [top1, top2] = sorted;
  return { top1: top1[0], top2: top2[0], sorted };
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export function calculateResults(answers: Record<number, number>): TestResult {
  // Преобразуем старый формат ответов в новый формат
  const newAnswers: Partial<Answers> = {};
  
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      newAnswers[question.questionKey] = answer;
    }
  });

  // Вычисляем средние
  const avgs = computeAverages(newAnswers as Answers);
  
  // Вычисляем напряжения
  const tensions = computeTensions(avgs);
  
  // Находим топ-2 шкалы
  const { top1, top2 } = pickTopScales(avgs);
  const diff = avgs[top1] - avgs[top2];

  // Определяем архетипы
  const archetypes: string[] = [];
  const descriptions: string[] = [];

  // Пытаемся найти архетип по комбинации топ-2 шкал
  let archetype = getArchetype(top1, top2);
  
  if (!archetype) {
    // Если не нашли, пробуем обратную комбинацию
    archetype = getArchetype(top2, top1);
  }

  if (archetype) {
    archetypes.push(archetype.name);
    descriptions.push(archetype.description);
    
    // Если разница между топ-1 и топ-2 меньше 0.2, показываем оба архетипа
    if (diff < 0.2) {
      const archetype2 = getArchetype(top2, top1);
      if (archetype2 && archetype2.name !== archetype.name) {
        archetypes.push(archetype2.name);
        descriptions.push(archetype2.description);
      }
    }
  } else {
    // Fallback: если не нашли архетип, показываем советы по топ-шкале
    const topScaleName = scaleNames[top1 as keyof typeof scaleNames];
    archetypes.push(`Рекомендации по шкале "${topScaleName}"`);
    descriptions.push(`Ваша ведущая шкала - "${topScaleName}". Обратите внимание на развитие этой области в обустройстве дома.`);
  }

  return {
    scores: {
      ID: round2(avgs.avgID),
      AT: round2(avgs.avgAT),
      CT: round2(avgs.avgCT),
      AM: round2(avgs.avgAM),
      HM: round2(avgs.avgHM),
      TU: round2(avgs.avgTU),
    },
    tensions: {
      T1: round2(tensions.T1),
      T2: round2(tensions.T2),
    },
    archetypes,
    descriptions
  };
}

function getArchetype(scale1: string, scale2: string): { name: string; description: string } | null {
  const combination = `${scale1}+${scale2}`;
  const reverseCombination = `${scale2}+${scale1}`;
  
  if (archetypeDescriptions[combination as keyof typeof archetypeDescriptions]) {
    return archetypeDescriptions[combination as keyof typeof archetypeDescriptions];
  }
  
  if (archetypeDescriptions[reverseCombination as keyof typeof archetypeDescriptions]) {
    return archetypeDescriptions[reverseCombination as keyof typeof archetypeDescriptions];
  }
  
  return null;
}