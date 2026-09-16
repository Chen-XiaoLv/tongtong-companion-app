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

const renderThemeGallery = (selectedTheme, showAll = false) => {
  const gallery = dialog?.querySelector('.theme-gallery');
  if (!gallery) return;
  const displayedThemes = selectedTheme && !showAll ? themes.filter(theme => theme.id === selectedTheme) : themes;
  gallery.className = `theme-gallery theme-gallery-five${selectedTheme && !showAll ? ' is-single' : ''}`;
  gallery.innerHTML = displayedThemes.map(theme => `
    <article class="theme-card theme-card-${theme.id}${theme.id === selectedTheme && showAll ? ' is-selected' : ''}" data-theme-card="${theme.id}" tabindex="0" aria-label="${theme.name}主题${theme.id === selectedTheme && showAll ? '，当前选择' : ''}">
      <div class="theme-preview theme-sky"><img src="${theme.top}" alt="${theme.name}主题天空景象"></div>
      <div class="theme-card-copy"><div><b>${theme.name}</b><span>${theme.palette}</span></div><p>${theme.description}</p></div>
      <div class="theme-preview theme-city"><img src="${theme.bottom}" alt="${theme.name}主题城市景象"></div>
    </article>`).join('');
};

const openThemeGallery = (selectedTheme, showAll = false) => {
  if (!dialog) return;
  renderThemeGallery(selectedTheme, showAll);
  const title = dialog.querySelector('#themeDialogTitle');
  if (title) title.textContent = selectedTheme && !showAll ? `${themes.find(theme => theme.id === selectedTheme)?.name || ''}主题` : '五重主题，五片风景';
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

const petStateBoard = document.querySelector('#petStateBoard');
if (petStateBoard) {
  const petStates = {
    morning: { name: '打招呼', image: 'tongtong-morning.png', quote: '你好呀！以后请多关照～', hint: '每一天第一次见面，都会多一点熟悉。', voice: '今天的事情，我们慢慢来。我已经准备好陪你开工啦！' },
    working: { name: '工作中', image: 'tongtong-working.png', quote: '任务有点多，我们一个一个来，我在呢。', hint: '把眼前的一件事做好，就已经很厉害。', voice: '现在先把最重要的一件处理掉，剩下的我陪你慢慢拆开。' },
    proud: { name: '真棒', image: 'tongtong-proud.png', quote: '哇——今天这个进度真的很漂亮！', hint: '每一次完成，都是一起行动过的痕迹。', voice: '我申请立刻给你发一朵小红花！今天的你真的很棒。' },
    cheer: { name: '欢呼', image: 'tongtong-cheer.png', quote: '这个项目终于结束啦！！', hint: '今天值得好好庆祝一下。', voice: '我宣布今晚必须夸你三分钟！辛苦啦，完成得漂亮！' },
    reminder: { name: '提醒', image: 'tongtong-reminder.png', quote: '这个事情快到时间了，我们一起看一眼。', hint: '认真提醒，是为了让你更从容。', voice: '不用着急，我先把需要注意的地方整理给你，我们一起处理。' },
    confused: { name: '困惑', image: 'tongtong-confused.png', quote: '这个地方好像有点绕，我们一起理理。', hint: '卡住并不等于没有在前进。', voice: '先别急着否定自己，换一个角度，我们再试一次。' },
    tired: { name: '累了', image: 'tongtong-tired.png', quote: '剩下的明天再说吧。今天已经够努力啦。', hint: '累的时候，也可以慢一点。', voice: '今天先到这里也没关系。你已经走了很远，休息一下吧。' },
    rest: { name: '休息下', image: 'tongtong-rest.png', quote: '把今天的疲惫交给夜色，轻一点。', hint: '暂停不是落后，是给自己留一点空间。', voice: '喝口水，伸个懒腰。明天的路，我们明天再一起走。' },
    success: { name: '胜利', image: 'tongtong-success.png', quote: '完成！今天的认真已经被好好收下。', hint: '通通会替你记得这份成长。', voice: '本周营业结束！辛苦辛苦辛苦啦——！' }
  };
  const image = document.querySelector('#petStateImage');
  const name = document.querySelector('#petStateName');
  const quote = document.querySelector('#petStateQuote');
  const hint = document.querySelector('#petStateHint');
  const voiceImage = document.querySelector('#voicePetImage');
  const voiceLabel = document.querySelector('#voiceStateLabel');
  const voiceLine = document.querySelector('#voiceLine');
  const voiceDescription = document.querySelector('#voiceDescription');
  const selectPetState = key => {
    const state = petStates[key];
    if (!state) return;
    const source = `assets/time-weather/pets/${state.image}`;
    if (image) { image.src = source; image.alt = `${state.name}状态的通通`; }
    if (name) name.textContent = state.name;
    if (quote) quote.textContent = state.quote;
    if (hint) hint.textContent = state.hint;
    if (voiceLabel) voiceLabel.textContent = `${state.name} · 正在对你说`;
    if (voiceLine) voiceLine.textContent = `“${state.voice}”`;
    if (voiceDescription) voiceDescription.textContent = '情绪不只是表情，它也会根据当天的状态改变陪伴你的方式。';
    petStateBoard.querySelectorAll('[data-pet-state]').forEach(button => button.classList.toggle('is-active', button.dataset.petState === key));
  };
  petStateBoard.querySelectorAll('[data-pet-state]').forEach(button => {
    const activate = () => selectPetState(button.dataset.petState);
    button.addEventListener('click', activate);
    button.addEventListener('mouseenter', activate);
    button.addEventListener('focus', activate);
  });
}

const energyRulesButton = document.querySelector('#energyRulesButton');
const energyRules = document.querySelector('#energyRules');
energyRulesButton?.addEventListener('click', () => {
  const opened = energyRulesButton.getAttribute('aria-expanded') === 'true';
  energyRulesButton.setAttribute('aria-expanded', String(!opened));
  if (energyRules) energyRules.hidden = opened;
});

const wishCard = document.querySelector('#wishCard');
const wishNext = document.querySelector('#wishNext');
if (wishCard) {
  const wishes = [
    ['🌙 今日祈愿', '山高路远，自有花开。', '不必急着证明今天有没有意义。很多事情，本来就需要慢慢发生。'],
    ['☀ 今日祈愿', '风会吹散一些疲惫。', '今天没有做到的事，不代表明天也做不到。'],
    ['🌸 今日祈愿', '你已经比早晨多走了一段路。', '能走到这里，就值得被认真夸一次。']
  ];
  let wishIndex = 0;
  const flipWish = () => {
    const flipped = wishCard.classList.toggle('is-flipped');
    wishCard.setAttribute('aria-pressed', String(flipped));
  };
  const showWish = () => {
    wishIndex = (wishIndex + 1) % wishes.length;
    const [kicker, title, copy] = wishes[wishIndex];
    const wasFlipped = wishCard.classList.contains('is-flipped');
    wishCard.classList.remove('is-flipped');
    wishCard.setAttribute('aria-pressed', 'false');
    document.querySelector('#wishKicker').textContent = kicker;
    document.querySelector('#wishTitle').textContent = title;
    document.querySelector('#wishCopy').textContent = copy;
    if (wasFlipped) requestAnimationFrame(() => wishCard.classList.add('is-flipped'));
  };
  wishCard.addEventListener('click', flipWish);
  wishCard.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); flipWish(); } });
  wishNext?.addEventListener('click', showWish);
}

const knowledgeCloud = document.querySelector('#keywordCloud');
if (knowledgeCloud) {
  const attentionTopic = document.querySelector('#attentionTopic');
  const attentionDetail = document.querySelector('#attentionDetail');
  const showAttention = button => {
    if (!button) return;
    knowledgeCloud.querySelectorAll('.attention-keyword').forEach(item => item.classList.toggle('is-active', item === button));
    if (attentionTopic) attentionTopic.textContent = button.dataset.topic || '';
    if (attentionDetail) attentionDetail.textContent = button.dataset.detail || '';
  };
  knowledgeCloud.querySelectorAll('.attention-keyword').forEach(button => {
    button.addEventListener('click', () => showAttention(button));
    button.addEventListener('mouseenter', () => showAttention(button));
    button.addEventListener('focus', () => showAttention(button));
  });
}

const techToggle = document.querySelector('#techToggle');
const techPanel = document.querySelector('#techPanel');
techToggle?.addEventListener('click', () => {
  const expanded = techToggle.getAttribute('aria-expanded') === 'true';
  techToggle.setAttribute('aria-expanded', String(!expanded));
  techToggle.querySelector('b').textContent = expanded ? 'OFF' : 'ON';
  if (techPanel) techPanel.hidden = expanded;
});

const knowledgeSearchButton = document.querySelector('#runKnowledgeSearch');
const knowledgeQuery = document.querySelector('#knowledgeQuery');
const searchStatus = document.querySelector('#searchStatus');
const searchResults = document.querySelector('#searchResults');
const runKnowledgeSearch = () => {
  if (!searchResults || !searchStatus) return;
  const query = knowledgeQuery?.value.trim() || '这条线索';
  searchStatus.textContent = `已根据“${query}”整理出 3 个可能相关的内容（演示结果）`;
  searchResults.classList.remove('is-refreshed');
  requestAnimationFrame(() => searchResults.classList.add('is-refreshed'));
};
knowledgeSearchButton?.addEventListener('click', runKnowledgeSearch);
knowledgeQuery?.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); runKnowledgeSearch(); } });

document.querySelectorAll('[data-interest-action]').forEach(button => button.addEventListener('click', () => {
  const feedback = document.querySelector('#interestFeedback');
  const following = button.dataset.interestAction === 'follow';
  if (feedback) feedback.textContent = following ? '已在演示页里把「实体消歧」放到更近的位置。' : '已在演示页里降低这类主题的出现频率。';
  button.closest('.discover-actions')?.querySelectorAll('[data-interest-action]').forEach(item => item.classList.toggle('is-selected', item === button));
}));

const privacyFeedback = document.querySelector('#privacyFeedback');
const updatePrivacyFeedback = () => {
  const paused = document.querySelector('#pauseKnowledge')?.checked;
  const multimodal = document.querySelector('#multimodalSwitch')?.checked;
  if (!privacyFeedback) return;
  if (paused) privacyFeedback.textContent = '演示状态：知识更新已暂停，花园不会读取任何新内容。';
  else if (!multimodal) privacyFeedback.textContent = '演示状态：仅保留文字入口，图片、音频与视频理解已关闭。';
  else privacyFeedback.textContent = '当前：仅展示演示范围，不进行实际扫描。';
};
document.querySelector('#pauseKnowledge')?.addEventListener('change', updatePrivacyFeedback);
document.querySelector('#multimodalSwitch')?.addEventListener('change', updatePrivacyFeedback);
document.querySelector('#scopeButton')?.addEventListener('click', () => { if (privacyFeedback) privacyFeedback.textContent = '演示范围：只会在你明确授权的目录中查看新增或更新的文件。'; });

let demoToastTimer;
const showDemoToast = message => {
  let toast = document.querySelector('#demoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'demoToast';
    toast.className = 'demo-toast';
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  clearTimeout(demoToastTimer);
  demoToastTimer = window.setTimeout(() => toast.remove(), 3400);
};
document.querySelectorAll('[data-demo-message]').forEach(button => button.addEventListener('click', () => {
  if (button.closest('.world-news-grid')) return;
  showDemoToast(button.dataset.demoMessage || '这是一个本地演示操作。');
}));

const relationDemos = {
  '实体消歧的新评测集': {
    summary: '这条演示资讯与「实体消歧」近期关注相连。',
    signals: ['近 7 天内，「实体消歧」被提及 13 次，当前处于 Active。', 'OpenEA 与知识图谱在同一关注簇中，连接强度为 0.82。', '今天的项目资料中出现了“评测集”和“对齐”两项相邻线索。']
  },
  '多模态检索的实践笔记': {
    summary: '这条演示资讯来自你近期的文件与图片检索线索。',
    signals: ['最近 5 轮对话出现“图片、检索、统一入口”等关键词。', '「多模态知识图谱」当前位于活跃关注缓存的前 3 位。', '已授权资料中有 2 份内容同时关联图片线索与方案文档。']
  },
  '知识图谱产品化观察': {
    summary: '这条演示资讯与正在形成的长期知识路径相关。',
    signals: ['「知识图谱」连续关注 23 天，属于长期主题。', '它与 Agent、多模态检索和实体消歧形成 3 条稳定连接。', '本周新增长期笔记 4 条，均归入这一主题分支。']
  }
};
let relationDialog;
const showRelationDemo = button => {
  const title = button.closest('article')?.querySelector('h3')?.textContent || '';
  const demo = relationDemos[title];
  if (!demo) return;
  if (!relationDialog) {
    relationDialog = document.createElement('dialog');
    relationDialog.className = 'relation-dialog';
    relationDialog.addEventListener('click', event => { if (event.target === relationDialog) relationDialog.close(); });
    document.body.appendChild(relationDialog);
  }
  relationDialog.innerHTML = `<form method="dialog"><p>相关性演示 · 本地静态数据</p><h3>${title}</h3><p>${demo.summary}</p><ul class="relation-signals">${demo.signals.map(signal => `<li>${signal}</li>`).join('')}</ul><button type="submit">知道了</button></form>`;
  relationDialog.showModal();
};
document.querySelectorAll('.world-news-grid button').forEach(button => button.addEventListener('click', () => showRelationDemo(button)));

const workPage = document.querySelector('.page-work');
if (workPage) {
  let workToastTimer;
  const showWorkToast = message => {
    let toast = document.querySelector('#workToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'workToast';
      toast.className = 'work-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    clearTimeout(workToastTimer);
    workToastTimer = window.setTimeout(() => toast.remove(), 3400);
  };

  document.querySelectorAll('[data-work-scroll]').forEach(button => button.addEventListener('click', () => {
    document.querySelector(`#${button.dataset.workScroll}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  const morningCount = document.querySelector('#morningCount');
  const refreshMorningCount = () => {
    const remaining = [...document.querySelectorAll('.morning-task')].filter(task => !task.classList.contains('is-done')).length;
    if (morningCount) morningCount.textContent = String(remaining);
  };
  document.querySelectorAll('.morning-task').forEach(task => task.addEventListener('click', () => {
    task.classList.toggle('is-done');
    refreshMorningCount();
    showWorkToast(task.classList.contains('is-done') ? '已在晨报演示中标记完成。' : '已恢复为今日待处理事项。');
  }));
  document.querySelectorAll('[data-work-message]').forEach(button => button.addEventListener('click', () => showWorkToast(button.dataset.workMessage || '已更新本地演示面板。')));

  document.querySelectorAll('.risk-item').forEach(item => item.addEventListener('click', () => {
    const feedback = document.querySelector('#riskFeedback');
    const label = item.querySelector('b')?.textContent || '这项风险';
    if (feedback) feedback.textContent = `已在演示雷达中打开「${label}」的处理入口。`;
    item.classList.toggle('is-reviewed');
  }));

  document.querySelector('#addMailTask')?.addEventListener('click', () => {
    const task = document.querySelectorAll('.morning-task')[1];
    task?.classList.remove('is-done');
    refreshMorningCount();
    showWorkToast('已加入今天的工作面板（演示）。');
  });

  const dailyFeedback = document.querySelector('#dailyFeedback');
  const sendDaily = document.querySelector('#sendDaily');
  document.querySelector('#previewDaily')?.addEventListener('click', () => {
    sendDaily?.removeAttribute('disabled');
    if (dailyFeedback) dailyFeedback.textContent = '日报预览已准备好：内容来自本页展示的确认工作记录。';
  });
  sendDaily?.addEventListener('click', () => {
    sendDaily.setAttribute('disabled', '');
    if (dailyFeedback) dailyFeedback.textContent = '演示发送已确认：不会产生真实邮件。';
    showWorkToast('今日日报已完成演示确认。');
  });

  const weeklyPages = ['本周总览 + 关键词词云', '周一至周五工作时间线', '挑战与解决方案', '核心工作与量化指标', '重点成果 + 完成率 + 本周评价', '本周总结'];
  const weeklySlideImages = ['通通本地词云周报测试_01.png', '通通本地词云周报测试_02.png', '通通本地词云周报测试_03.png', '通通本地词云周报测试_04.png', '通通本地词云周报测试_05.png', '通通本地词云周报测试_06.png'];
  document.querySelectorAll('#pptPageButtons button').forEach((button, index) => button.addEventListener('click', () => {
    document.querySelectorAll('#pptPageButtons button').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const label = String(index + 1).padStart(2, '0');
    const slideLabel = document.querySelector('#pptSlideLabel');
    const slideCopy = document.querySelector('#pptSlideCopy');
    const slideImage = document.querySelector('#pptSlideImage');
    const weeklyTitle = document.querySelector('#weeklyTitle');
    if (slideLabel) slideLabel.textContent = label;
    if (slideCopy) slideCopy.textContent = weeklyPages[index];
    if (slideImage) { slideImage.src = `assets/work/ppt-weekly/${weeklySlideImages[index]}`; slideImage.alt = `通通周报第 ${index + 1} 页：${weeklyPages[index]}`; }
    if (weeklyTitle) weeklyTitle.textContent = weeklyPages[index];
  }));

  document.querySelectorAll('#workStyleSwitcher [data-work-style]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('#workStyleSwitcher [data-work-style]').forEach(item => item.classList.toggle('is-active', item === button));
    const feedback = document.querySelector('#styleFeedback');
    if (feedback) feedback.textContent = `当前为「${button.dataset.workStyle}」演示主题。`;
    const themeMap = { '初樱': 'feisu', '流光': 'liuguang', '沉金': 'anjin' };
    openThemeGallery(themeMap[button.dataset.workStyle], true);
  }));

  const sendState = document.querySelector('#sendState');
  const confirmFeedback = document.querySelector('#confirmFeedback');
  document.querySelector('#confirmPreview')?.addEventListener('click', () => {
    if (sendState) sendState.textContent = '已预览，等待你的确认';
    if (confirmFeedback) confirmFeedback.textContent = '这是本地预览，不会向任何收件人发送邮件。';
  });
  document.querySelector('#confirmSend')?.addEventListener('click', () => {
    if (sendState) sendState.textContent = '演示确认完成';
    if (confirmFeedback) confirmFeedback.textContent = '演示发送已完成，没有发送真实邮件。';
    showWorkToast('已完成发送确认演示。');
  });

  let morningTime = '09:00';
  let eveningTime = '18:00';
  const refreshSetup = () => {
    const ready = document.querySelector('#setupReady');
    const times = ready?.querySelectorAll('span');
    if (times?.[0]) times[0].textContent = `晨报　${morningTime}`;
    if (times?.[1]) times[1].textContent = `晚报　${eveningTime}`;
  };
  document.querySelectorAll('[data-setup-time]').forEach(button => button.addEventListener('click', () => {
    morningTime = button.dataset.setupTime || morningTime;
    document.querySelectorAll('[data-setup-time]').forEach(item => item.classList.toggle('is-selected', item === button));
    const line = document.querySelector('#setupUserLine');
    if (line) line.textContent = `你：${morningTime.replace(':00', ' 点').replace(':30', ' 点半')}。`;
    refreshSetup();
  }));
  document.querySelectorAll('[data-setup-evening]').forEach(button => button.addEventListener('click', () => {
    eveningTime = button.dataset.setupEvening || eveningTime;
    document.querySelectorAll('[data-setup-evening]').forEach(item => item.classList.toggle('is-selected', item === button));
    refreshSetup();
  }));
  document.querySelector('#testMorning')?.addEventListener('click', () => {
    const feedback = document.querySelector('#setupFeedback');
    const previewDialog = document.querySelector('#morningEmailDialog');
    if (previewDialog?.showModal) {
      previewDialog.showModal();
      if (feedback) feedback.textContent = `已打开填充后的测试晨报预览（${morningTime}），不会发送真实邮件。`;
    } else {
      const previewWindow = window.open('morning-email-preview.html', 'tongtongMorningPreview', 'popup,width=760,height=860,resizable=yes,scrollbars=yes');
      if (!previewWindow) window.location.href = 'morning-email-preview.html';
      if (feedback) feedback.textContent = '已在新窗口打开填充后的测试晨报预览，不会发送真实邮件。';
    }
  });
  document.querySelector('#closeMorningEmail')?.addEventListener('click', () => document.querySelector('#morningEmailDialog')?.close());

  document.querySelectorAll('#promptBubbles button').forEach(button => button.addEventListener('click', () => {
    const feedback = document.querySelector('#promptFeedback');
    if (feedback) feedback.textContent = `通通收到：“${button.textContent}”—— 已在今天的演示工作面板中理解这句话。`;
    document.querySelectorAll('#promptBubbles button').forEach(item => item.classList.toggle('is-active', item === button));
  }));
}
// Static demonstrations for this round of long-term companion capabilities.
const processSteps = {
  ask: ['先把需要的信息问清楚。', '示例：日报需要收件人和日期；其余信息已经足够，通通不会重复追问。'],
  progress: ['当前第 2 / 4 步：正在整理。', '通通会用文字告诉你已完成什么、预计还剩几步；不伪装成实时进度条。'],
  confirm: ['重要动作，先确认再执行。', '示例：内容已经整理好；是否确认发送？这一步需要你的明确选择。'],
  result: ['本次完成：3 项整理，1 份日报待确认。', '完成回执会说明数量、结果和下一步；异常会被翻译成自然语言，而不是只丢出报错。']
};
document.querySelectorAll('[data-process-step]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-process-step]').forEach(item => item.classList.toggle('is-active', item === button));
  const [title, copy] = processSteps[button.dataset.processStep] || processSteps.ask;
  const titleNode = document.querySelector('#processFeedbackTitle');
  const copyNode = document.querySelector('#processFeedback');
  if (titleNode) titleNode.textContent = title;
  if (copyNode) copyNode.textContent = copy;
}));

document.querySelector('#loadCompanionDemo')?.addEventListener('click', () => {
  const feedback = document.querySelector('#loadCompanionFeedback');
  if (feedback) feedback.textContent = '演示恢复范围：本地状态 → 长期知识 → 通通小镇快照；当前这句话优先，不会连接真实资料。';
});

const townFactorDetails = {
  knowledge: '知识总量：已经确认的长期知识，会让小镇多一盏可以回看的灯。',
  collection: '花朵图鉴：每一次收获，都是小镇里一页新的植物志。',
  flowers: '花朵总量：重复相遇也会留下记录，成为持续陪伴的温柔证据。',
  energy: '能量等级：记录真实使用与完成的步伐，不是绩效分数。',
  active: '活跃天数：只记录你与通通相遇的日子，不用每天打卡。'
};
const townBadgeDetails = {
  'daily-report': ['日报相伴', '累计发送日报 5 篇', '演示进度：5 / 5，已在通通小镇收藏。'],
  'knowledge-retained': ['知识花房', '主动沉淀知识 20 篇', '演示进度：13 / 20，继续收好真正值得复用的线索。'],
  'user-praise': ['通通被夸啦！', '得到用户的表扬或夸奖', '演示进度：已收到一次真诚夸奖。'],
  'user-dislike': ['直球接收器', '被用户嫌弃了', '演示进度：等待一条帮助通通变好的直球反馈。'],
  'shared-joy': ['喜悦共振', '用户主动分享喜悦的情绪', '演示进度：已一起庆祝 1 次。'],
  'shared-life': ['生活里的你', '用户主动分享生活中的事情', '演示进度：已听见 2 段生活小事。'],
  'hint-adopted': ['默契一击', '主动提示被用户采纳', '演示进度：已采纳 3 次提示，默契度也会留下记录。'],
  'task-summary': ['一起复盘', '主动与用户一起沉淀总结任务内容', '演示进度：已完成 2 次任务复盘。']
};
document.querySelectorAll('[data-town-factor]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-town-factor]').forEach(item => item.classList.toggle('is-active', item === button));
  const feedback = document.querySelector('#townFactorFeedback');
  if (feedback) feedback.textContent = townFactorDetails[button.dataset.townFactor] || '';
}));
document.querySelectorAll('[data-town-badge]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-town-badge]').forEach(item => item.classList.toggle('is-active', item === button));
  const [name, condition, progress] = townBadgeDetails[button.dataset.townBadge] || townBadgeDetails['daily-report'];
  const detail = document.querySelector('#townBadgeDetail');
  if (detail) detail.innerHTML = `<p>${name} · 彩色互动成就</p><h3>${condition}</h3><span>${progress} 实体徽章仅作小镇陈列，不进入邮件内容。</span>`;
}));
document.querySelector('#townLoadDemo')?.addEventListener('click', () => {
  const feedback = document.querySelector('#townLoadFeedback');
  if (feedback) feedback.textContent = '演示恢复范围：本地状态、长期知识、通通小镇快照。没有发起真实读取、写入或腾讯文档访问。';
});
