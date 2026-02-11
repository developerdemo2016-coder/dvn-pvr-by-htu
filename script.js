const form = document.getElementById('numerologyForm');
const resultEl = document.getElementById('result');
const yearEl = document.getElementById('year');

const masterNumbers = new Set([11, 22, 33]);

function reduceToSingleOrMaster(value) {
  let num = value;
  while (num > 9 && !masterNumbers.has(num)) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return num;
}

function calculateLifePath(dateString) {
  const digits = dateString.replace(/-/g, '').split('').map(Number);
  const total = digits.reduce((sum, digit) => sum + digit, 0);
  return reduceToSingleOrMaster(total);
}

function calculateNameNumber(name) {
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, '');
  const total = cleaned
    .split('')
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);

  return reduceToSingleOrMaster(total);
}

function getZodiacSign(dateString) {
  const [, monthString, dayString] = dateString.split('-');
  const month = Number(monthString);
  const day = Number(dayString);

  const zodiacBoundaries = [
    { sign: 'Capricorn ♑', month: 1, day: 19 },
    { sign: 'Aquarius ♒', month: 2, day: 18 },
    { sign: 'Pisces ♓', month: 3, day: 20 },
    { sign: 'Aries ♈', month: 4, day: 19 },
    { sign: 'Taurus ♉', month: 5, day: 20 },
    { sign: 'Gemini ♊', month: 6, day: 20 },
    { sign: 'Cancer ♋', month: 7, day: 22 },
    { sign: 'Leo ♌', month: 8, day: 22 },
    { sign: 'Virgo ♍', month: 9, day: 22 },
    { sign: 'Libra ♎', month: 10, day: 22 },
    { sign: 'Scorpio ♏', month: 11, day: 21 },
    { sign: 'Sagittarius ♐', month: 12, day: 21 },
    { sign: 'Capricorn ♑', month: 12, day: 31 }
  ];

  const index = zodiacBoundaries.findIndex(({ month: endMonth, day: endDay }) => month < endMonth || (month === endMonth && day <= endDay));
  return zodiacBoundaries[index >= 0 ? index : zodiacBoundaries.length - 1].sign;
}

function numberMeaning(number) {
  const meanings = {
    1: 'Pioneer energy, leadership, and bold decisions.',
    2: 'Harmony, diplomacy, and emotional wisdom.',
    3: 'Expression, creativity, and communication blessings.',
    4: 'Discipline, grounding, and sacred duty.',
    5: 'Change, travel, and dynamic life movement.',
    6: 'Nurturing, family karma, and healing love.',
    7: 'Intuition, spiritual study, and inner insight.',
    8: 'Power, prosperity, and material mastery.',
    9: 'Compassion, service, and wisdom completion.',
    11: 'Mystic messenger with heightened spiritual intuition.',
    22: 'Master builder of tangible legacy and purpose.',
    33: 'Compassionate teacher with healing consciousness.'
  };

  return meanings[number] || 'A unique vibration guiding your soul path.';
}

function planetaryGuidance(lifePath) {
  const planets = {
    1: 'Sun ☉',
    2: 'Moon ☾',
    3: 'Jupiter ♃',
    4: 'Rahu ☊',
    5: 'Mercury ☿',
    6: 'Venus ♀',
    7: 'Ketu ☋',
    8: 'Saturn ♄',
    9: 'Mars ♂',
    11: 'Moon ☾',
    22: 'Rahu ☊',
    33: 'Venus ♀'
  };

  return planets[lifePath] || 'Cosmic balance';
}

function chakraForNumber(number) {
  const chakraMap = {
    1: 'Muladhara (Root) — grounding and life force',
    2: 'Svadhisthana (Sacral) — emotional and creative flow',
    3: 'Manipura (Solar Plexus) — confidence and purpose',
    4: 'Anahata (Heart) — healing and devotion',
    5: 'Vishuddha (Throat) — truth and expression',
    6: 'Ajna (Third Eye) — intuition and vision',
    7: 'Sahasrara (Crown) — divine connection',
    8: 'Anahata (Heart) — karmic strength and resilience',
    9: 'Sahasrara (Crown) — wisdom and completion',
    11: 'Ajna (Third Eye) — mystic intuition',
    22: 'Muladhara (Root) — manifestation power',
    33: 'Anahata (Heart) — compassionate service'
  };

  return chakraMap[number] || 'Balanced chakra stream';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullName = form.fullName.value.trim();
  const dob = form.dob.value;

  if (!fullName || !dob) {
    resultEl.textContent = 'Please enter both your full name and date of birth.';
    return;
  }

  const lifePath = calculateLifePath(dob);
  const nameNumber = calculateNameNumber(fullName);
  const zodiac = getZodiacSign(dob);
  const rulingPlanet = planetaryGuidance(lifePath);
  const chakraFocus = chakraForNumber(lifePath);

  resultEl.innerHTML = `
    <strong>${fullName}</strong>, your cosmic profile is ready:<br>
    • <strong>Life Path Number:</strong> ${lifePath} — ${numberMeaning(lifePath)}<br>
    • <strong>Name Number:</strong> ${nameNumber} — ${numberMeaning(nameNumber)}<br>
    • <strong>Zodiac Sign:</strong> ${zodiac}<br>
    • <strong>Ruling Planetary Energy:</strong> ${rulingPlanet}<br>
    • <strong>Chakra Focus:</strong> ${chakraFocus}
  `;
});

yearEl.textContent = new Date().getFullYear();
