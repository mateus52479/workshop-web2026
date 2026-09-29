/* ==========================================================================
ZONA DOS ALUNOS: CONFIGURAÇÃO DO SEU PRODUTO
Altere os valores entre as aspas para personalizar a sua aplicação!
========================================================================== */
const APP_CONFIG = {
  // 1. Nome e Subtítulo do Produto do seu Squad
  appTitle: "Workshop",
  appSubtitle: "Foco & Produtividade",
  
  // 2. Ícone da Marca (Escolha no FontAwesome (https://fontawesome.com/): fa-gamepad, fa-mug-hot, fa-vr-cardboard, etc)
  brandIcon: "fa-cubes-stacked",

  // 3. Cores e Imagem de Fundo (https://unsplash.com/s/photos)
  //clique com o botão direito sobre a imagem e selecione a opção "Copiar endereço da imagem"
  theme: {
    primaryColor: "#5cf6c8ff",
    accentColor: "#ceec48ff",
    bgOverlay: "rgba(15, 23, 42, 0.84)",
    bgImageUrl: "https://i.pinimg.com/564x/29/c1/08/29c10812b6f5cf7589820f9324e47490.jpg"
  },

  // 4. Tempos do Cronometro (em minutos)
  timer: {
    focusMinutes: 60, //modo foco 
    breakMinutes: 15   //pausa
  },

  // 5. Vídeo de Fundo do Modo Foco (https://www.pexels.com/pt-br/procurar/videos/)
  // clique com o botão direito sobre o video e selecione a opção "Copiar link do video"
  focusVideoUrl: "https://www.pexels.com/pt-br/download/video/28615179/",

  // 6. Link da Playlist do Spotify escolhida pelo grupo (https://open.spotify.com/)
  // selecione a playlist, clique nos 3 pontos, em share/compartilhar e em "Copiar link da playlist"
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/679wCT6dVMDBxrYa5NcrXL?si=qp9eut2bSjWDacg7I7Vy3A",

  // 7. Créditos da Equipe (Aparece no Rodapé)
  authorName: "Mateus",
  devDate: "quase outubro, 2026",

  // 8. Tarefas Iniciais do Quadro de tarefas
  tasks: [
    { id: "t1", text: "Algebra linear, estudar para prova", status: "done", tag: "Matemática" },
    { id: "t2", text: "Projeto de Ciências, vulcão", status: "doing", tag: "Geografia" },
    { id: "t3", text: "Programar o Front-End em React do trabalho", status: "doing", tag: "Programação" },
    { id: "t4", text: "Ler o livro 'O Alquimista' de Paulo Coelho", status: "todo", tag: "Português" }
  ]
};

/* ==========================================================================
   PRESETS RÁPIDOS DE DEMONSTRAÇÃO
   Altere os temas que você deseja ter
   ========================================================================== */
const PRESETS = {
  // Tema 01
  cyberpunk: {
    themeName: "Cyberpunk2022", // 🏷️ Nome exibido no botão do cabeçalho
    appTitle: "ModOn: Hackeando",
    appSubtitle: "Virando a noite em modo neon",
    primaryColor: "#9d48ec",
    brandIcon: "fa-vr-cardboard",
    bgImageUrl: "https://images.unsplash.com/photo-1705510144116-cc4d88838b14?q=80&w=2892&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgOverlay: "rgba(34, 49, 52, 0.52)",
    focusVideoUrl: "https://www.pexels.com/pt-br/download/video/28615179/",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM" 
  },
  // Tema 02
  lofi: {
    themeName: "Lo-Fi", // 🏷️ Nome exibido no botão do cabeçalho
    appTitle: "ModOn: Calma no flow",
    appSubtitle: "Mais uma xícara, mais um capítulo",
    primaryColor: "#0ea5e9",
    brandIcon: "fa-mug-hot",
    bgImageUrl: "https://images.unsplash.com/photo-1682130442699-843a145fc3f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgOverlay: "rgba(34, 49, 52, 0.52)",
    focusVideoUrl: "https://www.pexels.com/pt-br/download/video/8549579/",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/6zCID88oNjNv9zx6puDHKj"
  },
  // Tema 03
  retroGaming: {
    themeName: "Games", // 🏷️ Nome exibido no botão do cabeçalho
    appTitle: "ModOn: Zerando a matéria",
    appSubtitle: "Tá na hora de solar o chefão",
    primaryColor: "#cb2212",
    brandIcon: "fa-gamepad",
    bgImageUrl: "https://images.unsplash.com/photo-1691534986870-c9d8c950ae76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgOverlay: "rgba(10, 10, 15, 0.50)",
    focusVideoUrl: "https://www.pexels.com/pt-br/download/video/28615181/",
    spotifyPlaylistUrl: "https://open.spotify.com/playlist/0Pu0tXDywekfDRWiVluaVl?si=Az_z84ECSf6u-Bn62lPsJA"
  }
};


/* ==========================================================================
Não é necessário que os alunos alterem o código abaixo desta linha.
========================================================================== */
const STORAGE_KEY = "studyhub_kanban_tasks";
let tasks = [];
let isSpotifyConnected = false;
let currentActivePresetKey = null;

let timerState = {
  remainingSeconds: APP_CONFIG.timer.focusMinutes * 60,
  totalSeconds: APP_CONFIG.timer.focusMinutes * 60,
  isRunning: false,
  isBreak: false,
  intervalId: null,
  cycleCount: 1
};

/* Ciclo de Inicialização */
window.onload = function() {
  loadKanbanFromLocalStorage();
  applyConfiguration();
  renderPresetButtons();
  renderKanban();
  updateTimerDisplay();
  setupColorPickerSync();
  updateSpotifyEmbedSrc(APP_CONFIG.spotifyPlaylistUrl);
};

/* ==========================================================================
   RENDERIZADOR DINÂMICO DOS BOTÕES DE PRESET
   Lê o objeto PRESETS e desenha os botões com os nomes e cores definidos.
   ========================================================================== */
function renderPresetButtons(activeKey = currentActivePresetKey) {
  // Procura o container com ID ou descobre pelo elemento pai dos botões de preset
  let container = document.getElementById('presetButtonsContainer');
  if (!container) {
    const existingBtn = document.querySelector('button[onclick*="applyPreset"]');
    if (existingBtn && existingBtn.parentElement) {
      container = existingBtn.parentElement;
      container.id = 'presetButtonsContainer';
    }
  }

  if (!container) return;

  let buttonsHtml = '<span class="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:inline">Tema:</span>';

  Object.entries(PRESETS).forEach(([key, preset]) => {
    const displayName = preset.themeName || key;
    const isSelected = activeKey === key;
    const activeStyle = isSelected ? 'bg-white/20 shadow-sm ring-1 ring-white/30 font-bold' : 'hover:bg-white/10 font-semibold';
    const textColor = preset.primaryColor || '#a855f7';

    buttonsHtml += `
      <button 
        onclick="applyPreset('${key}')" 
        class="px-2.5 py-1 text-xs rounded-lg transition-all ${activeStyle}" 
        style="color: ${textColor};"
        title="Ativar tema ${displayName}">
        ${displayName}
      </button>
    `;
  });

  container.innerHTML = buttonsHtml;
}

/* Formatador do Iframe do Spotify */
function formatSpotifyEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('/embed/')) {
    return url.includes('theme=0') ? url : `${url}${url.includes('?') ? '&' : '?'}utm_source=generator&theme=0`;
  }
  const match = url.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  }
  return url;
}

function updateSpotifyEmbedSrc(url) {
  const iframe = document.getElementById('spotifyEmbedIframe');
  if (iframe && url) {
    const formattedUrl = formatSpotifyEmbedUrl(url);
    if (iframe.src !== formattedUrl) {
      iframe.src = formattedUrl;
    }
  }
}

function reloadSpotifyEmbed() {
  const iframe = document.getElementById('spotifyEmbedIframe');
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => { iframe.src = currentSrc; }, 150);
  }
}

/* Fluxo de Autenticação do Spotify */
function loginSpotifyWindow() {
  const width = 450, height = 650;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  window.open(
    "https://accounts.spotify.com/login", 
    "SpotifyLoginPopup", 
    `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
  );

  const badge = document.getElementById('spotifyStatusBadge');
  if (badge) {
    badge.className = "text-[10px] font-code px-2 py-0.5 rounded-md font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1";
    badge.innerHTML = '<i class="fa-solid fa-spinner animate-spin text-[9px]"></i> Aguardando Login...';
  }
}

function confirmSpotifyLogin() {
  isSpotifyConnected = true;
  const badge = document.getElementById('spotifyStatusBadge');
  const authCard = document.getElementById('spotifyAuthCard');

  if (badge) {
    badge.className = "text-[10px] font-code px-2 py-0.5 rounded-md font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1";
    badge.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400 text-[9px]"></i> Conectado (Completo)';
  }

  if (authCard) authCard.classList.add('hidden');
  reloadSpotifyEmbed();
}

function dismissAuthNotice() {
  const authCard = document.getElementById('spotifyAuthCard');
  if (authCard) authCard.classList.add('hidden');
}

/* Aplicação de Configurações Visuais */
function applyConfiguration() {
  document.documentElement.style.setProperty('--primary', APP_CONFIG.theme.primaryColor);
  
  const body = document.getElementById('appBody');
  if (body) body.style.backgroundImage = `url('${APP_CONFIG.theme.bgImageUrl}')`;

  const overlay = document.getElementById('bgOverlay');
  if (overlay) overlay.style.backgroundColor = APP_CONFIG.theme.bgOverlay;

  const title = document.getElementById('appTitleText');
  if (title) title.textContent = APP_CONFIG.appTitle;

  const sub = document.getElementById('appSubtitleText');
  if (sub) sub.textContent = APP_CONFIG.appSubtitle;

  const icon = document.getElementById('brandIcon');
  if (icon) icon.className = `fa-solid ${APP_CONFIG.brandIcon}`;

  const author = document.getElementById('footerAuthor');
  if (author) author.textContent = APP_CONFIG.authorName;

  const date = document.getElementById('footerDate');
  if (date) date.textContent = APP_CONFIG.devDate;

  // Atualiza a fonte do vídeo do Modo Foco
  const videoSource = document.getElementById('immersiveVideoSource');
  const video = document.getElementById('immersiveFocusVideo');
  if (videoSource && video && videoSource.src !== APP_CONFIG.focusVideoUrl) {
    videoSource.src = APP_CONFIG.focusVideoUrl;
    video.load();
  }
}

/* Aplicação Completa de Presets */
function applyPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  currentActivePresetKey = presetKey;

  // Atualiza identificação e cores
  APP_CONFIG.appTitle = preset.appTitle;
  if (preset.appSubtitle) APP_CONFIG.appSubtitle = preset.appSubtitle;
  APP_CONFIG.theme.primaryColor = preset.primaryColor;
  APP_CONFIG.brandIcon = preset.brandIcon;
  APP_CONFIG.theme.bgImageUrl = preset.bgImageUrl;

  // Atualiza película, vídeo de foco e playlist
  if (preset.bgOverlay) APP_CONFIG.theme.bgOverlay = preset.bgOverlay;
  if (preset.focusVideoUrl) APP_CONFIG.focusVideoUrl = preset.focusVideoUrl;
  if (preset.spotifyPlaylistUrl) {
    APP_CONFIG.spotifyPlaylistUrl = preset.spotifyPlaylistUrl;
    updateSpotifyEmbedSrc(preset.spotifyPlaylistUrl);
  }

  applyConfiguration();
  renderPresetButtons(presetKey); // Destaca o botão selecionado
}

/* Armazenamento Exclusivo do Kanban no LocalStorage */
function loadKanbanFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      tasks = JSON.parse(saved);
      return;
    }
  } catch (e) {
    console.warn("Falha ao ler localStorage. Usando tarefas padrão.", e);
  }
  tasks = [...APP_CONFIG.tasks];
}

function saveKanbanToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Erro ao salvar Kanban no localStorage", e);
  }
}

/* Renderização do Quadro Kanban */
function renderKanban() {
  const colTodo = document.getElementById('col-todo');
  const colDoing = document.getElementById('col-doing');
  const colDone = document.getElementById('col-done');

  if (!colTodo || !colDoing || !colDone) return;

  colTodo.innerHTML = '';
  colDoing.innerHTML = '';
  colDone.innerHTML = '';

  let countTodo = 0, countDoing = 0, countDone = 0;

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = "p-3 rounded-xl bg-slate-800/90 border border-white/10 flex flex-col gap-2 text-xs shadow-md transition hover:border-white/20";

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-300">${task.tag || 'Geral'}</span>
        <button onclick="deleteTask('${task.id}')" class="text-slate-500 hover:text-rose-400 transition" title="Excluir">
          <i class="fa-solid fa-trash-can text-[11px]"></i>
        </button>
      </div>
      <p class="text-slate-100 font-medium leading-snug">${task.text}</p>
      <div class="flex items-center justify-end gap-1 pt-1 border-t border-white/5">
        ${task.status !== 'todo' ? `<button onclick="moveTask('${task.id}', -1)" class="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center text-[10px]"><i class="fa-solid fa-chevron-left"></i></button>` : ''}
        ${task.status !== 'done' ? `<button onclick="moveTask('${task.id}', 1)" class="w-6 h-6 rounded bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center text-[10px]"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
      </div>
    `;

    if (task.status === 'todo') {
      colTodo.appendChild(card);
      countTodo++;
    } else if (task.status === 'doing') {
      colDoing.appendChild(card);
      countDoing++;
    } else if (task.status === 'done') {
      colDone.appendChild(card);
      countDone++;
    }
  });

  const cTodo = document.getElementById('count-todo');
  const cDoing = document.getElementById('count-doing');
  const cDone = document.getElementById('count-done');
  if (cTodo) cTodo.textContent = countTodo;
  if (cDoing) cDoing.textContent = countDoing;
  if (cDone) cDone.textContent = countDone;
}

function moveTask(taskId, direction) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const order = ['todo', 'doing', 'done'];
  const currentIndex = order.indexOf(task.status);
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < order.length) {
    task.status = order[nextIndex];
    saveKanbanToLocalStorage();
    renderKanban();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  saveKanbanToLocalStorage();
  renderKanban();
}

function openAddTaskModal() {
  const modal = document.getElementById('addTaskModal');
  if (modal) modal.classList.remove('hidden');
  const input = document.getElementById('taskTextInput');
  if (input) input.focus();
}

function closeAddTaskModal() {
  const modal = document.getElementById('addTaskModal');
  if (modal) modal.classList.add('hidden');
}

function confirmAddTask() {
  const textInput = document.getElementById('taskTextInput');
  const tagInput = document.getElementById('taskTagInput');
  const text = textInput ? textInput.value.trim() : '';
  const tag = tagInput && tagInput.value.trim() ? tagInput.value.trim() : 'Sprint';

  if (!text) return;

  tasks.unshift({
    id: 'task_' + Date.now(),
    text: text,
    tag: tag,
    status: 'todo'
  });

  saveKanbanToLocalStorage();
  renderKanban();

  if (textInput) textInput.value = '';
  if (tagInput) tagInput.value = '';
  closeAddTaskModal();
}

/* Cronômetro Pomodoro & Modo Foco */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  const formatted = formatTime(timerState.remainingSeconds);
  
  const display = document.getElementById('timerDisplay');
  if (display) display.textContent = formatted;

  const immersiveDisplay = document.getElementById('immersiveTimerDisplay');
  if (immersiveDisplay) immersiveDisplay.textContent = formatted;

  const perimeter = 2 * Math.PI * 44;
  const fraction = timerState.remainingSeconds / timerState.totalSeconds;
  const offset = perimeter * (1 - fraction);

  const ring = document.getElementById('timerProgressRing');
  if (ring) ring.style.strokeDashoffset = offset;

  const immersiveRing = document.getElementById('immersiveProgressRing');
  if (immersiveRing) immersiveRing.style.strokeDashoffset = offset;

  const icon = document.getElementById('timerToggleIcon');
  if (icon) icon.className = timerState.isRunning ? "fa-solid fa-pause" : "fa-solid fa-play ml-0.5";

  const subStatus = document.getElementById('timerStatusSub');
  if (subStatus) subStatus.textContent = timerState.isRunning ? "Em Execução" : "Pronto";

  const imToggleIcon = document.getElementById('immersiveToggleIcon');
  const imToggleText = document.getElementById('immersiveToggleText');
  if (imToggleIcon) imToggleIcon.className = timerState.isRunning ? "fa-solid fa-pause" : "fa-solid fa-play";
  if (imToggleText) imToggleText.textContent = timerState.isRunning ? "Pausar" : "Continuar";
}

function toggleTimer() {
  if (timerState.isRunning) {
    pauseTimer();
  } else {
    startTimer();
    openImmersiveFocus();
  }
}

function startTimer() {
  timerState.isRunning = true;
  clearInterval(timerState.intervalId);

  timerState.intervalId = setInterval(() => {
    if (timerState.remainingSeconds > 0) {
      timerState.remainingSeconds--;
      updateTimerDisplay();
    } else {
      handleTimerCompletion();
    }
  }, 1000);

  updateTimerDisplay();
}

function pauseTimer() {
  timerState.isRunning = false;
  clearInterval(timerState.intervalId);
  updateTimerDisplay();
}

function resetTimer() {
  pauseTimer();
  timerState.remainingSeconds = timerState.totalSeconds;
  updateTimerDisplay();
}

function switchTimerMode() {
  pauseTimer();
  timerState.isBreak = !timerState.isBreak;
  
  const label = document.getElementById('timerModeLabel');
  const immersiveBadge = document.getElementById('immersiveCycleBadge');

  if (timerState.isBreak) {
    timerState.totalSeconds = APP_CONFIG.timer.breakMinutes * 60;
    timerState.remainingSeconds = timerState.totalSeconds;
    if (label) label.innerHTML = '<i class="fa-solid fa-mug-hot text-emerald-400"></i> Pausa Curta';
    if (immersiveBadge) immersiveBadge.textContent = "Pausa para Café";
  } else {
    timerState.totalSeconds = APP_CONFIG.timer.focusMinutes * 60;
    timerState.remainingSeconds = timerState.totalSeconds;
    if (label) label.innerHTML = '<i class="fa-solid fa-hourglass-half text-amber-400"></i> Modo Foco';
    if (immersiveBadge) immersiveBadge.textContent = "Modo Foco Ativo";
  }

  updateTimerDisplay();
}

function handleTimerCompletion() {
  pauseTimer();
  playNotificationSound();

  if (!timerState.isBreak) {
    timerState.cycleCount++;
    const badge = document.getElementById('pomodoroCycleBadge');
    if (badge) badge.textContent = `Ciclo #${timerState.cycleCount}`;
  }

  switchTimerMode();
  closeImmersiveFocus();
}

function openImmersiveFocus() {
  const screen = document.getElementById('immersiveFocusScreen');
  const video = document.getElementById('immersiveFocusVideo');
  const source = document.getElementById('immersiveVideoSource');
  
  if (screen) screen.classList.remove('hidden');

  // Garante que o vídeo toque a URL atual configurada
  if (video && source) {
    if (source.src !== APP_CONFIG.focusVideoUrl) {
      source.src = APP_CONFIG.focusVideoUrl;
      video.load();
    }
    video.currentTime = 0;
    video.play().catch(e => console.log("Autoplay aguardando interação", e));
  }
}

function closeImmersiveFocus() {
  const screen = document.getElementById('immersiveFocusScreen');
  const video = document.getElementById('immersiveFocusVideo');
  
  if (screen) screen.classList.add('hidden');
  if (video) video.pause();
}

function cancelImmersiveFocus() {
  pauseTimer();
  closeImmersiveFocus();
}

function playNotificationSound() {
  try {
    Tone.start();
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -4;
    const now = Tone.now();
    synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "0.5", now);
    synth.triggerAttackRelease(["E5"], "1.0", now + 0.4);
  } catch (e) {
    console.warn("Áudio aguardando permissão", e);
  }
}

/* Helpers do Modal de Parâmetros */
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function openConfigModal() {
  setVal('cfgAppTitle', APP_CONFIG.appTitle);
  setVal('cfgAppSubtitle', APP_CONFIG.appSubtitle);
  setVal('cfgPrimaryColor', APP_CONFIG.theme.primaryColor);
  setVal('cfgPrimaryColorHex', APP_CONFIG.theme.primaryColor);
  setVal('cfgBrandIcon', APP_CONFIG.brandIcon);
  setVal('cfgSpotifyUrl', APP_CONFIG.spotifyPlaylistUrl);
  setVal('cfgVideoUrl', APP_CONFIG.focusVideoUrl);
  setVal('cfgBgImage', APP_CONFIG.theme.bgImageUrl);
  setVal('cfgAuthor', APP_CONFIG.authorName);
  setVal('cfgDate', APP_CONFIG.devDate);

  const modal = document.getElementById('configModal');
  if (modal) modal.classList.remove('hidden');
}

function closeConfigModal() {
  const modal = document.getElementById('configModal');
  if (modal) modal.classList.add('hidden');
}

function saveAndApplyConfig() {
  APP_CONFIG.appTitle = getVal('cfgAppTitle') || APP_CONFIG.appTitle;
  APP_CONFIG.appSubtitle = getVal('cfgAppSubtitle') || APP_CONFIG.appSubtitle;
  APP_CONFIG.theme.primaryColor = getVal('cfgPrimaryColorHex') || APP_CONFIG.theme.primaryColor;
  APP_CONFIG.brandIcon = getVal('cfgBrandIcon') || APP_CONFIG.brandIcon;
  APP_CONFIG.spotifyPlaylistUrl = getVal('cfgSpotifyUrl') || APP_CONFIG.spotifyPlaylistUrl;
  APP_CONFIG.focusVideoUrl = getVal('cfgVideoUrl') || APP_CONFIG.focusVideoUrl;
  APP_CONFIG.theme.bgImageUrl = getVal('cfgBgImage') || APP_CONFIG.theme.bgImageUrl;
  APP_CONFIG.authorName = getVal('cfgAuthor') || APP_CONFIG.authorName;
  APP_CONFIG.devDate = getVal('cfgDate') || APP_CONFIG.devDate;

  applyConfiguration();
  updateSpotifyEmbedSrc(APP_CONFIG.spotifyPlaylistUrl);
  closeConfigModal();
}

function setupColorPickerSync() {
  const picker = document.getElementById('cfgPrimaryColor');
  const hex = document.getElementById('cfgPrimaryColorHex');
  if (picker && hex) {
    picker.addEventListener('input', () => { hex.value = picker.value; });
    hex.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(hex.value)) picker.value = hex.value;
    });
  }
}