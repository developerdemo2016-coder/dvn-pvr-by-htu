const starField = document.getElementById('starField');
const yearEl = document.getElementById('year');
const signGrid = document.getElementById('signGrid');
const horoscopeDisplay = document.getElementById('horoscopeDisplay');
const horoscopeLoading = document.getElementById('horoscopeLoading');

const signs = [
  { name: 'Aries', icon: 'fa-solid fa-fire', date: 'Mar 21 - Apr 19' },
  { name: 'Taurus', icon: 'fa-solid fa-leaf', date: 'Apr 20 - May 20' },
  { name: 'Gemini', icon: 'fa-solid fa-wind', date: 'May 21 - Jun 20' },
  { name: 'Cancer', icon: 'fa-solid fa-droplet', date: 'Jun 21 - Jul 22' },
  { name: 'Leo', icon: 'fa-solid fa-sun', date: 'Jul 23 - Aug 22' },
  { name: 'Virgo', icon: 'fa-solid fa-seedling', date: 'Aug 23 - Sep 22' },
  { name: 'Libra', icon: 'fa-solid fa-scale-balanced', date: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', icon: 'fa-solid fa-skull', date: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', icon: 'fa-solid fa-arrow-right', date: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', icon: 'fa-solid fa-mountain', date: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', icon: 'fa-solid fa-water', date: 'Jan 20 - Feb 18' },
  { name: 'Pisces', icon: 'fa-solid fa-fish', date: 'Feb 19 - Mar 20' }
];

function createStarField() {
  const starCount = 140;
  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    starField.appendChild(star);
  }
}

function seededScore(seed, offset) {
  return ((seed * 37 + offset * 17) % 46) + 55;
}

function getLocalHoroscope(signName) {
  const lines = {
    Aries: 'Today your fire is magnetic. Lead with courage, but pause before reacting—patience unlocks your next breakthrough.',
    Taurus: 'Grounded choices bring abundance. A practical step today plants a long-term reward in career and finances.',
    Gemini: 'Your words carry power now. Honest communication clears misunderstandings and opens a lucky social door.',
    Cancer: 'Emotional wisdom guides you well. Protect your peace while saying yes to nourishing relationships.',
    Leo: 'Your light is visible. A bold creative decision attracts support and recognition from the right people.',
    Virgo: 'Order creates momentum. Small disciplined actions help you resolve a lingering challenge with grace.',
    Libra: 'Balance becomes your superpower. Harmony in partnerships invites progress in both love and purpose.',
    Scorpio: 'Transformation energy is strong. Trust intuition and release what no longer aligns with your path.',
    Sagittarius: 'Adventure calls your spirit. Expand your vision today—one new idea can change your month.',
    Capricorn: 'Steady effort compounds beautifully. Responsibility handled now becomes future authority and respect.',
    Aquarius: 'Innovation flows through you. Share an unconventional thought—it may spark a meaningful collaboration.',
    Pisces: 'Your intuition is heightened. Quiet reflection reveals the exact next step your heart has been seeking.'
  };

  return lines[signName] || 'The stars whisper guidance: trust your path and move with faith.';
}

function renderHoroscope(sign, element) {
  document.querySelectorAll('.sign-btn').forEach((btn) => btn.classList.remove('active-sign'));
  element.classList.add('active-sign');

  horoscopeDisplay.classList.remove('hidden');
  horoscopeLoading.classList.remove('hidden');

  const seed = sign.name.length + new Date().getDate();

  setTimeout(() => {
    document.getElementById('displayIcon').innerHTML = `<i class="${sign.icon}"></i>`;
    document.getElementById('displayName').innerText = sign.name;
    document.getElementById('displayDate').innerText = sign.date;
    document.getElementById('displayText').innerText = `"${getLocalHoroscope(sign.name)}"`;

    document.getElementById('metricDisplay').innerHTML = `
      <span class="text-xs border border-white/10 px-3 py-1 rounded-full text-gray-400">✨ Love: ${seededScore(seed, 1)}%</span>
      <span class="text-xs border border-white/10 px-3 py-1 rounded-full text-gray-400">✨ Career: ${seededScore(seed, 2)}%</span>
      <span class="text-xs border border-white/10 px-3 py-1 rounded-full text-gray-400">✨ Luck: ${seededScore(seed, 3)}%</span>
      <span class="text-xs border border-white/10 px-3 py-1 rounded-full text-gray-400">🕉 Chakra: ${seededScore(seed, 4)}%</span>
    `;

    horoscopeLoading.classList.add('hidden');
  }, 650);
}

function populateSigns() {
  signs.forEach((sign) => {
    const div = document.createElement('div');
    div.className = 'sign-btn glass-card';
    div.innerHTML = `<i class="${sign.icon} text-3xl mb-3 text-gold opacity-80"></i><span class="text-sm font-semibold tracking-wide">${sign.name}</span>`;
    div.addEventListener('click', () => renderHoroscope(sign, div));
    signGrid.appendChild(div);
  });
}

function getSunSign(dateString) {
  const [, monthStr, dayStr] = dateString.split('-');
  const month = Number(monthStr);
  const day = Number(dayStr);
  const limits = [
    { sign: 'Capricorn', m: 1, d: 19 }, { sign: 'Aquarius', m: 2, d: 18 },
    { sign: 'Pisces', m: 3, d: 20 }, { sign: 'Aries', m: 4, d: 19 },
    { sign: 'Taurus', m: 5, d: 20 }, { sign: 'Gemini', m: 6, d: 20 },
    { sign: 'Cancer', m: 7, d: 22 }, { sign: 'Leo', m: 8, d: 22 },
    { sign: 'Virgo', m: 9, d: 22 }, { sign: 'Libra', m: 10, d: 22 },
    { sign: 'Scorpio', m: 11, d: 21 }, { sign: 'Sagittarius', m: 12, d: 21 },
    { sign: 'Capricorn', m: 12, d: 31 }
  ];

  const found = limits.find(({ m, d }) => month < m || (month === m && day <= d));
  return found ? found.sign : 'Capricorn';
}

function buildNatalSummary(name, sun, city) {
  return `${name}, your Sun shines through ${sun}, giving you a core identity that seeks meaning, expression, and alignment. Your chart indicates strong karmic growth through commitment and inner clarity.

In ${city}, your birth imprint suggests intuitive intelligence and resilience. Prioritize heart-centered choices, regular grounding rituals, and disciplined spiritual practice for best outcomes.`;
}

function openModal() {
  document.getElementById('chartModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('chartModal').style.display = 'none';
}

function setupBirthForm() {
  const form = document.getElementById('birthForm');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const city = document.getElementById('birthCity').value.trim();

    const sun = getSunSign(birthDate);
    const moon = signs[(sun.length + 3) % signs.length].name;
    const rising = signs[(sun.length + 7) % signs.length].name;

    setTimeout(() => {
      const container = document.getElementById('aiAnalysis');
      container.innerHTML = `
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-gold/10 p-4 rounded border border-gold/30 text-center"><div class="text-xs text-gold uppercase tracking-widest">Sun</div><div class="font-cinzel text-xl">${sun}</div></div>
          <div class="bg-gold/10 p-4 rounded border border-gold/30 text-center"><div class="text-xs text-gold uppercase tracking-widest">Moon</div><div class="font-cinzel text-xl">${moon}</div></div>
          <div class="bg-gold/10 p-4 rounded border border-gold/30 text-center"><div class="text-xs text-gold uppercase tracking-widest">Rising</div><div class="font-cinzel text-xl">${rising}</div></div>
        </div>
        <div class="bg-white/5 p-6 rounded border border-white/10">
          <p class="text-gold font-cinzel mb-2 uppercase tracking-widest">✨ Soul Blueprint</p>
          <p class="italic text-sm leading-relaxed">${buildNatalSummary(`${firstName} ${lastName}`, sun, city)}</p>
        </div>
      `;

      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
      openModal();
    }, 700);
  });
}

function setupModalActions() {
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('acknowledgeBtn').addEventListener('click', closeModal);
}

createStarField();
populateSigns();
setupBirthForm();
setupModalActions();
yearEl.textContent = new Date().getFullYear();
