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
  scale: 'ID' | 'AT' | 'CT' | 'AM' | 'HM' | 'TU';
}

export const questions: Question[] = [
  // ID - Самовыражение
  { id: 1, text: "Когда я смотрю на свой дом, я хочу узнавать в нём себя.", scale: 'ID' },
  { id: 2, text: "Мне важно видеть дома мои увлечения и ценности (книги, искусство, хобби).", scale: 'ID' },
  { id: 3, text: "Мне комфортнее в пространстве, которое отличается от базовых типовых решений.", scale: 'ID' },
  { id: 4, text: "Я хочу, чтобы дом «рассказывал обо мне», даже если гостей нет.", scale: 'ID' },
  
  // AT - Личные вещи и память
  { id: 5, text: "Без любимых вещей (фото, текстиль, предметы памяти) мне сложнее почувствовать место своим.", scale: 'AT' },
  { id: 6, text: "Я сохраняю связь с прошлыми домами/комнатами и ценю continuity.", scale: 'AT' },
  { id: 7, text: "Памятные предметы дают мне устойчивость в повседневности.", scale: 'AT' },
  { id: 8, text: "Частая смена жилья для меня эмоционально непроста.", scale: 'AT' },
  
  // CT - Порядок и структура
  { id: 9, text: "Я отдыхаю лучше, когда порядок и правила в моём пространстве определены.", scale: 'CT' },
  { id: 10, text: "Мне важно зонировать и систематизировать вещи.", scale: 'CT' },
  { id: 11, text: "Меня напрягает ощущение непредсказуемости дома.", scale: 'CT' },
  { id: 12, text: "Я чаще выбираю функциональные решения, чем декоративные.", scale: 'CT' },
  
  // AM - Лёгкость перемен
  { id: 13, text: "Я быстро осваиваюсь в новом жилье и делаю его «своим».", scale: 'AM' },
  { id: 14, text: "Могу чувствовать себя «дома» в аренде/отеле при минимуме своих вещей.", scale: 'AM' },
  { id: 15, text: "Мне нравится менять планировку/подход по мере изменения жизни.", scale: 'AM' },
  { id: 16, text: "Ценю мобильные/съёмные решения, которые не «привязывают».", scale: 'AM' },
  
  // HM - Ежедневные ритуалы
  { id: 17, text: "У меня есть ежедневные домашние ритуалы (кофе, музыка, свеча).", scale: 'HM' },
  { id: 18, text: "Я осознанно создаю атмосферу (запах, свет, звуки) каждый день.", scale: 'HM' },
  { id: 19, text: "Мне нужны «станции/углы» для занятий (чтение, работа, спорт).", scale: 'HM' },
  { id: 20, text: "Готов(а) тратить время на «настройку» дома под себя.", scale: 'HM' },
  
  // TU - Комфорт с непредсказуемым
  { id: 21, text: "Меня не смущают временные/незавершённые решения, если они помогают жить сейчас.", scale: 'TU' },
  { id: 22, text: "Нормально отношусь к следам жизни и износу — дом не должен быть «музеем».", scale: 'TU' },
  { id: 23, text: "Мне комфортно, когда не всё под контролем — «посмотрим, как сложится».", scale: 'TU' },
  { id: 24, text: "Я могу делиться правилами/пространством ради других плюсов (цена, локация, сообщество).", scale: 'TU' },
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

export function calculateResults(answers: Record<number, number>): TestResult {
  // Подсчет средних по шкалам
  const scores = {
    ID: 0,
    AT: 0,
    CT: 0,
    AM: 0,
    HM: 0,
    TU: 0
  };

  const scaleCounts = {
    ID: 0,
    AT: 0,
    CT: 0,
    AM: 0,
    HM: 0,
    TU: 0
  };

  // Суммируем ответы по шкалам
  questions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      scores[question.scale] += answer;
      scaleCounts[question.scale]++;
    }
  });

  // Вычисляем средние
  Object.keys(scores).forEach(scale => {
    if (scaleCounts[scale as keyof typeof scaleCounts] > 0) {
      scores[scale as keyof typeof scores] = 
        scores[scale as keyof typeof scores] / scaleCounts[scale as keyof typeof scaleCounts];
    }
  });

  // Округляем до 2 знаков после запятой
  Object.keys(scores).forEach(scale => {
    scores[scale as keyof typeof scores] = 
      Math.round(scores[scale as keyof typeof scores] * 100) / 100;
  });

  // Вычисляем напряжения
  const tensions = {
    T1: Math.abs(scores.AT - scores.AM),
    T2: Math.abs(scores.CT - scores.TU)
  };

  // Находим топ-2 шкалы
  const sortedScales = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([scale]) => scale);

  const top1 = sortedScales[0];
  const top2 = sortedScales[1];
  const diff = scores[top1 as keyof typeof scores] - scores[top2 as keyof typeof scores];
  
  // Отладочная информация
  console.log('Top scales:', { top1, top2, diff });
  console.log('Scores:', scores);

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
    scores,
    tensions,
    archetypes,
    descriptions
  };
}

function getArchetype(scale1: string, scale2: string): { name: string; description: string } | null {
  const combination = `${scale1}+${scale2}`;
  const reverseCombination = `${scale2}+${scale1}`;
  
  console.log('Looking for archetype:', { scale1, scale2, combination, reverseCombination });
  console.log('Available archetypes:', Object.keys(archetypeDescriptions));
  
  if (archetypeDescriptions[combination as keyof typeof archetypeDescriptions]) {
    console.log('Found archetype:', combination);
    return archetypeDescriptions[combination as keyof typeof archetypeDescriptions];
  }
  
  if (archetypeDescriptions[reverseCombination as keyof typeof archetypeDescriptions]) {
    console.log('Found archetype (reverse):', reverseCombination);
    return archetypeDescriptions[reverseCombination as keyof typeof archetypeDescriptions];
  }
  
  console.log('No archetype found for:', { scale1, scale2 });
  return null;
}