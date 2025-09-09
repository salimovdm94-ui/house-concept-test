import { ScaleCode, Archetype, archetypeDescriptions } from './scoring';

// Типы для умного выбора архетипа
export type ArchetypeKey = 'CURATOR' | 'COLLECTOR' | 'RITUAL_MASTER' | 'CONTROL_STRATEG' | 'NOMAD' | 'FLEX_MINIMAL';

export interface Averages {
  avgID: number;
  avgAT: number;
  avgCT: number;
  avgAM: number;
  avgHM: number;
  avgTU: number;
}

export interface ArchetypeBlock extends Archetype {
  key: ArchetypeKey;
}

// Короткие советы по отдельным шкалам — используются как «акцент»
export const SCALE_TIPS: Record<ScaleCode, string[]> = {
  ID: [
    'Показывайте себя через 1–2 выразительных акцента вместо перегруза декором.',
    'Обновляйте «экспозицию месяца», чтобы дом оставался живым.',
  ],
  AT: [
    'Держите «полку воспоминаний» (3–5 вещей), остальное — в архив.',
    'Фото-память помогает отпустить предмет, сохранив историю.',
  ],
  CT: [
    'Сделайте простую систему хранения по категориям и оставьте немного «воздуха».',
    'Разрешите одну «зону без правил», чтобы снизить напряжение.',
  ],
  AM: [
    'Выберите 3–4 предмета-якоря, которые поедут с вами в любое место.',
    'Тестируйте лёгкие перестановки, не фиксируясь на «идеале».',
  ],
  HM: [
    'Определите 2 ключевых привычки (утро/вечер) и обеспечьте им мини-уголки.',
    'Готовьте короткие версии ритуалов (5 минут) для поездок и гостей.',
  ],
  TU: [
    'Потренируйте «неидеальность»: оставьте одну вещь на виду и понаблюдайте за ощущением.',
    'Добавляйте «живые элементы» (растение/текстиль) для мягкой гибкости.',
  ],
};

// Названия шкал для отображения
export const SCALE_LABELS: Record<ScaleCode, string> = {
  ID: 'Самовыражение',
  AT: 'Личные вещи и память',
  CT: 'Порядок и структура',
  AM: 'Лёгкость перемен',
  HM: 'Ежедневные ритуалы',
  TU: 'Комфорт с непредсказуемым'
};

// Какие архетипы доступны для каждой ведущей шкалы
const CANDIDATES_BY_LEAD: Record<ScaleCode, ArchetypeKey[]> = {
  ID: ['CURATOR', 'COLLECTOR', 'RITUAL_MASTER'],        // (ID+CT), (ID+AT), (HM+ID)
  AT: ['COLLECTOR', 'CONTROL_STRATEG'],                 // (ID+AT), (CT+AT)
  CT: ['CURATOR', 'CONTROL_STRATEG'],                   // (ID+CT), (CT+AT)
  AM: ['NOMAD', 'FLEX_MINIMAL'],                        // (AM+HM), (AM+TU)
  HM: ['RITUAL_MASTER', 'NOMAD'],                       // (HM+ID), (HM+AM)
  TU: ['FLEX_MINIMAL'],                                 // (AM+TU)
};

// Для архетипа — какая «парная» шкала в его определении
const PARTNER_OF: Record<ArchetypeKey, ScaleCode> = {
  CURATOR: 'CT',          // ID ведёт к CURATOR → партнёр CT
  COLLECTOR: 'AT',        // ID → COLLECTOR → партнёр AT
  RITUAL_MASTER: 'HM',    // ID → RITUAL_MASTER → партнёр HM
  CONTROL_STRATEG: 'CT',  // AT/CT → партнёр CT (или AT), но нам важно сравнить дистанцию до фактической второй
  NOMAD: 'HM',            // AM/HM → партнёр HM
  FLEX_MINIMAL: 'TU',     // AM/TU → партнёр TU
};

// Маппинг ключей архетипов на их описания
const ARCHETYPE_MAP: Record<ArchetypeKey, string> = {
  CURATOR: 'ID+CT',
  COLLECTOR: 'ID+AT',
  RITUAL_MASTER: 'HM+ID',
  CONTROL_STRATEG: 'CT+AT',
  NOMAD: 'AM+HM',
  FLEX_MINIMAL: 'AM+TU'
};

// Безопасно получить среднее по коду шкалы
export const getAvgByCode = (avgs: Averages, code: ScaleCode): number => {
  const key = `avg${code}` as keyof Averages;
  const n = Number(avgs[key]);
  return Number.isFinite(n) ? n : 0;
};

// Найти топ-2 шкалы
export const pickTop2 = (avgs: Averages): [ScaleCode, ScaleCode] => {
  const entries = Object.entries(avgs) as [keyof Averages, number][];
  const sorted = entries.sort((a,b)=> b[1]-a[1]);
  const [top1, top2] = sorted;
  
  // Преобразуем ключи в ScaleCode
  const scale1 = top1[0].replace('avg', '') as ScaleCode;
  const scale2 = top2[0].replace('avg', '') as ScaleCode;
  
  return [scale1, scale2];
};

// Получить архетип по паре шкал
export const getArchetypeByPair = (scale1: ScaleCode, scale2: ScaleCode): ArchetypeBlock | null => {
  const combination = `${scale1}+${scale2}`;
  const reverseCombination = `${scale2}+${scale1}`;
  
  // Ищем точное соответствие
  const archetypeData = archetypeDescriptions[combination] || archetypeDescriptions[reverseCombination];
  
  if (archetypeData) {
    // Находим ключ архетипа
    const key = Object.entries(ARCHETYPE_MAP).find(([, value]) => 
      value === combination || value === reverseCombination
    )?.[0] as ArchetypeKey;
    
    if (key) {
      return { ...archetypeData, key };
    }
  }
  
  return null;
};

// Умный выбор архетипа: точная пара → ок; иначе — подбираем по ведущей шкале ближайший из кандидатов
export const getArchetypeSmart = (avgs: Averages): {
  archetype: ArchetypeBlock;
  lead: ScaleCode;
  second: ScaleCode;
  accentScale?: ScaleCode;   // какая вторая шкала «акцентируется»
  accentTips?: string[];     // советы по второй шкале
  matchedBy: 'exact' | 'closest';
} => {
  const [lead, second] = pickTop2(avgs);
  
  // Сначала пробуем точное соответствие
  const exact = getArchetypeByPair(lead, second);
  if (exact) {
    return { archetype: exact, lead, second, matchedBy: 'exact' };
  }

  // Нет точной пары — подбираем по ведущей шкале
  const candidates = CANDIDATES_BY_LEAD[lead] ?? [];
  
  // Выбираем кандидат, у которого «парная шкала» ближе всего к фактической второй шкале пользователя
  const secondVal = getAvgByCode(avgs, second);
  let best: ArchetypeKey | null = null;
  let bestDist = Infinity;

  for (const cand of candidates) {
    const partner = PARTNER_OF[cand];
    const partnerVal = getAvgByCode(avgs, partner);
    const dist = Math.abs(partnerVal - secondVal);
    if (dist < bestDist) {
      bestDist = dist;
      best = cand;
    }
  }

  // Если не нашли кандидата, берем первый доступный
  if (!best && candidates.length > 0) {
    best = candidates[0];
  }

  // Получаем архетип по найденному ключу
  const archetypeKey = ARCHETYPE_MAP[best!];
  const archetypeData = archetypeDescriptions[archetypeKey];
  
  const archetype: ArchetypeBlock = { ...archetypeData, key: best! };
  
  // Определяем акцентную шкалу (вторая по важности, не входящая в архетип)
  const archetypeScales = archetypeKey.split('+') as ScaleCode[];
  const accentScale = [lead, second].find(scale => !archetypeScales.includes(scale));
  const accentTips = accentScale ? SCALE_TIPS[accentScale] : undefined;

  return { 
    archetype, 
    lead, 
    second, 
    accentScale, 
    accentTips, 
    matchedBy: 'closest' 
  };
};
