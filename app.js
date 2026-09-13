const dialog = document.querySelector('#themeDialog');
document.querySelectorAll('[src^="../skills/tongtong-daily-companion/assets/"]').forEach(image => {
  const source = image.getAttribute('src');
  if (source) image.src = source.replace('../skills/tongtong-daily-companion/assets/', 'assets/shared/');
});
const brandLogo = 'assets/brand/tongtong-logo.png';
document.querySelectorAll('.brand-mark').forEach(mark => {
  mark.innerHTML = `<img src="${brandLogo}" alt="通通搭子">`;
});
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = brandLogo;
  document.head.append(favicon);
}
document.querySelectorAll('.topbar nav').forEach(nav => {
  if (!nav.querySelector('a[href="newcomer-guide.html"]')) {
    const guideLink = document.createElement('a');
    guideLink.href = 'newcomer-guide.html';
    guideLink.textContent = '新人手册';
    nav.insertBefore(guideLink, nav.querySelector('a[href="tongtong-work.html"]'));
  }
  if (window.location.pathname.endsWith('/newcomer-guide.html')) {
    nav.querySelectorAll('a').forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === 'newcomer-guide.html'));
  }
});
const themes = [
  { id: 'feisu', name: '绯苏', palette: '红粉 · 银 · 天蓝', description: '轻盈、柔和，把努力写成一封花园来信。', top: 'assets/shared/email/tongtong-report-top.png', bottom: 'assets/shared/email/tongtong-report-bottom.png', unlock: '默认主题 · 可直接使用', achievement: '花园来信', rarity: 'green' },
  { id: 'liuguang', name: '流光', palette: '极光蓝 · 紫 · 外发光', description: '深靛星海中，每一份努力都留下一道光。', top: 'assets/shared/email/tongtong-liuguang-report-top.png', bottom: 'assets/shared/email/tongtong-liuguang-report-bottom.png', unlock: '主题解锁后可用', achievement: '流光映月', rarity: 'blue' },
  { id: 'anjin', name: '暗金', palette: '暖白 · 华贵金属', description: '沉静积累，在温润黄金光泽中闪耀。', top: 'assets/shared/email/tongtong-anjin-report-top.png', bottom: 'assets/shared/email/tongtong-anjin-report-bottom.png', unlock: '主题解锁后可用', achievement: '沉金浮影', rarity: 'purple' },
  { id: 'xunxian', name: '荒古·寻仙', palette: '星河 · 仙宫 · 金色灵光', description: '循着星河登阶，在浮空仙境里寻找自己的天路。', top: 'assets/themes/ancient-xunxian-top.png', bottom: 'assets/themes/ancient-xunxian-bottom.png', unlock: '能量 Lv.6 解锁', achievement: '登天路，踏歌行', rarity: 'orange' },
  { id: 'shenyuan', name: '旧日·沉渊', palette: '深海 · 遗城 · 幽绿闪电', description: '穿过旧日遗城，让深海与雷鸣见证一次沉静远行。', top: 'assets/themes/abyss-shenyuan-top.png', bottom: 'assets/themes/abyss-shenyuan-bottom.png', unlock: '能量 Lv.4 解锁', achievement: '不可名状之城', rarity: 'purple' }
];

const renderThemeGallery = selectedTheme => {
  const gallery = dialog?.querySelector('.theme-gallery');
  if (!gallery) return;
  const displayedThemes = selectedTheme ? themes.filter(theme => theme.id === selectedTheme) : themes;
  gallery.className = `theme-gallery theme-gallery-five${selectedTheme ? ' is-single' : ''}`;
  gallery.innerHTML = displayedThemes.map(theme => `
    <article class="theme-card theme-card-${theme.id}" data-theme-card="${theme.id}" tabindex="0">
      <div class="theme-preview theme-sky"><img src="${theme.top}" alt="${theme.name}主题天空景象"></div>
      <div class="theme-card-copy"><div><b>${theme.name}</b><span>${theme.palette}</span></div><p>${theme.description}</p></div>
      <div class="theme-preview theme-city"><img src="${theme.bottom}" alt="${theme.name}主题城市景象"></div>
    </article>`).join('');
};

const openThemeGallery = selectedTheme => {
  if (!dialog) return;
  renderThemeGallery(selectedTheme);
  const title = dialog.querySelector('#themeDialogTitle');
  if (title) title.textContent = selectedTheme ? `${themes.find(theme => theme.id === selectedTheme)?.name || ''}主题` : '五重主题，五片风景';
  if (!dialog.open) dialog.showModal();
};

document.querySelectorAll('.theme-switcher').forEach(switcher => switcher.setAttribute('aria-label', '更多主题'));
document.querySelectorAll('.theme-label-button').forEach(button => {
  button.textContent = '更多主题';
  button.addEventListener('click', () => openThemeGallery());
});
document.querySelectorAll('.theme-swatch').forEach(swatch => swatch.addEventListener('click', () => openThemeGallery(swatch.dataset.theme)));
document.querySelector('#closeThemes')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const storyCarousel = document.querySelector('#xunxianCarousel');
if (storyCarousel) {
  const storySlides = [
    ['assets/home/xunxian-story-01.png', '小娅想对你说：关于通通搭子的设计故事'],
    ['assets/home/xunxian-story-02.png', '为什么会有通通搭子：替你收好容易散落的工作事项'],
    ['assets/home/xunxian-story-03.png', '我们想做的不只是一个工具：早安站、白天站与晚安站'],
    ['assets/home/xunxian-story-04.png', '不只是帮你完成一次任务：百花听风与通通小镇长期陪伴'],
    ['assets/home/xunxian-story-05.png', '懂联通、懂工作、也懂你：通通搭子的设计理念']
  ];
  const slide = storyCarousel.querySelector('.xunxian-slide');
  const dots = [...storyCarousel.querySelectorAll('.carousel-dots button')];
  let currentStory = 0;
  const showStory = index => {
    currentStory = (index + storySlides.length) % storySlides.length;
    slide.src = storySlides[currentStory][0];
    slide.alt = storySlides[currentStory][1];
    storyCarousel.setAttribute('aria-label', `通通搭子设计故事，第 ${currentStory + 1} 页，共 ${storySlides.length} 页`);
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentStory;
      dot.classList.toggle('is-active', active);
      dot.toggleAttribute('aria-current', active);
    });
  };
  storyCarousel.querySelector('.is-prev')?.addEventListener('click', () => showStory(currentStory - 1));
  storyCarousel.querySelector('.is-next')?.addEventListener('click', () => showStory(currentStory + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showStory(index)));
  storyCarousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showStory(currentStory - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showStory(currentStory + 1); }
  });
}

const themeMilestones = [
  { name: '登天路，踏歌行', rarity: 'orange', unlock: '能量 Lv.6 解锁', theme: '荒古·寻仙' },
  { name: '不可名状之城', rarity: 'purple', unlock: '能量 Lv.4 解锁', theme: '旧日·沉渊' }
];

document.querySelectorAll('.achievement .badges').forEach(badges => {
  if (badges.dataset.themeMilestonesAdded) return;
  badges.dataset.themeMilestonesAdded = 'true';
  badges.insertAdjacentHTML('beforeend', themeMilestones.map(item => `<span class="${item.rarity}">✦ ${item.name}</span>`).join(''));
});

const authorDialog = document.querySelector('#authorDialog');
document.querySelector('#openAuthor')?.addEventListener('click', () => authorDialog?.showModal());
document.querySelector('#closeAuthor')?.addEventListener('click', () => authorDialog?.close());
authorDialog?.addEventListener('click', event => { if (event.target === authorDialog) authorDialog.close(); });

const chart = document.querySelector('#energyChart');
const values = [5, 12, 18, 11, 21, 24, 16];
const width = 420, height = 62, padding = 5, max = 26;
const points = values.map((value, index) => [padding + index * ((width - padding * 2) / (values.length - 1)), height - padding - value / max * (height - padding * 2)]);
const line = points.map((point, index) => `${index ? 'L' : 'M'} ${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(' ');
const area = `${line} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;
if (chart) chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="近七日能量趋势"><defs><linearGradient id="energyFill" x1="0" x2="1"><stop stop-color="#eb669d" stop-opacity=".36"/><stop offset="1" stop-color="#69cde9" stop-opacity=".08"/></linearGradient></defs><path d="${area}" fill="url(#energyFill)"/><path d="${line}" fill="none" stroke="#df5c98" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${points.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" stroke="#df5c98" stroke-width="2"/>`).join('')}</svg>`;

document.querySelectorAll('.ppt-pages button').forEach((button, index) => button.addEventListener('click', () => {
  document.querySelectorAll('.ppt-pages button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const labels = ['本周成果', '工作节奏', '挑战与闭环', '核心工作', '量化成果', '小娅的话'];
  const title = document.querySelector('.ppt-title b');
  if (title) title.textContent = labels[index];
}));

document.querySelectorAll('.flower-node, .pet-core').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.link) {
    window.location.href = button.dataset.link;
    return;
  }
  const target = button.dataset.target;
  const section = target === 'knowledge' ? document.querySelector('.knowledge') : document.querySelector(`#${target}`);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

const flowerOrbit = document.querySelector('#flowerOrbit');
const orbitFlowers = [...document.querySelectorAll('.flower-node')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let petalIndex = 0;

function releasePetal() {
  if (!flowerOrbit || reducedMotion.matches || document.hidden) return;
  const flower = orbitFlowers[petalIndex++ % orbitFlowers.length];
  const orbitBox = flowerOrbit.getBoundingClientRect();
  const flowerBox = flower.getBoundingClientRect();
  const petal = document.createElement('img');
  const angle = Math.random() * Math.PI * 2;
  const distance = 82 + Math.random() * 138;
  petal.className = 'orbit-petal';
  petal.src = 'assets/feisu-home/core-blossom.png';
  petal.alt = '';
  petal.style.left = `${flowerBox.left - orbitBox.left + flowerBox.width / 2}px`;
  petal.style.top = `${flowerBox.top - orbitBox.top + 32}px`;
  petal.style.setProperty('--petal-size', `${20 + Math.random() * 17}px`);
  petal.style.setProperty('--petal-x', `${Math.cos(angle) * distance}px`);
  petal.style.setProperty('--petal-y', `${Math.sin(angle) * distance + 58}px`);
  petal.style.setProperty('--petal-turn', `${240 + Math.random() * 420}deg`);
  petal.style.setProperty('--petal-time', `${3 + Math.random() * 1.8}s`);
  flowerOrbit.appendChild(petal);
  petal.addEventListener('animationend', () => petal.remove(), { once: true });
}

if (flowerOrbit) window.setInterval(releasePetal, 560);
