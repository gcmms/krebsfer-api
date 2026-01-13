const logEl = document.getElementById('log');
const pendingEl = document.getElementById('pending');
const appliedEl = document.getElementById('applied');
const lastRunEl = document.getElementById('last-run');
const runBtn = document.getElementById('run');
const statusBtn = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const stepEls = {
  ping: document.querySelector('[data-step="ping"]'),
  'status-before': document.querySelector('[data-step="status-before"]'),
  deploy: document.querySelector('[data-step="deploy"]'),
  'status-after': document.querySelector('[data-step="status-after"]'),
};

function timestamp() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function logLine(message) {
  logEl.textContent += `[${timestamp()}] ${message}\n`;
  logEl.scrollTop = logEl.scrollHeight;
}

function clearLog() {
  logEl.textContent = '';
}

function setStepState(id, state) {
  const el = stepEls[id];
  if (!el) return;

  const checkbox = el.querySelector('input[type="checkbox"]');
  el.classList.remove('active', 'done', 'error');

  if (state === 'active') {
    el.classList.add('active');
  }

  if (state === 'done') {
    el.classList.add('done');
    checkbox.checked = true;
  }

  if (state === 'error') {
    el.classList.add('error');
  }
}

function resetSteps() {
  Object.keys(stepEls).forEach((id) => {
    const el = stepEls[id];
    const checkbox = el.querySelector('input[type="checkbox"]');
    checkbox.checked = false;
    el.classList.remove('active', 'done', 'error');
  });
}

function updateSummary(result) {
  const applied =
    result?.appliedMigrationNames ||
    result?.appliedMigrations ||
    result?.appliedMigrationIds ||
    [];
  const pending =
    result?.unappliedMigrationNames ||
    result?.pendingMigrationNames ||
    result?.unappliedMigrations ||
    [];

  pendingEl.textContent = Array.isArray(pending) ? pending.length : '-';
  appliedEl.textContent = Array.isArray(applied) ? applied.length : '-';
  lastRunEl.textContent = timestamp();
}

async function apiFetch(path, options) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    const error = new Error(data.error || 'Falha na requisicao');
    error.payload = data;
    throw error;
  }
  return data;
}

async function checkStatus() {
  logLine('Consultando status das migrations...');
  const data = await apiFetch('/api/status');
  if (data.result?.raw) {
    logLine(data.result.raw);
  } else {
    logLine('Status JSON recebido.');
  }
  updateSummary(data.result);
  return data.result;
}

async function ping() {
  logLine('Validando conexao e variaveis...');
  const data = await apiFetch('/api/ping');
  if (!data.hasDatabaseUrl) {
    logLine('Aviso: DATABASE_URL nao encontrado.');
  }
  return data;
}

async function deploy() {
  logLine('Executando prisma migrate deploy...');
  const data = await apiFetch('/api/deploy', { method: 'POST' });
  if (data.stdout) {
    logLine(data.stdout.trim());
  }
  if (data.stderr) {
    logLine(data.stderr.trim());
  }
  return data;
}

async function runSequence() {
  runBtn.disabled = true;
  statusBtn.disabled = true;
  resetBtn.disabled = true;

  clearLog();
  resetSteps();

  try {
    setStepState('ping', 'active');
    await ping();
    setStepState('ping', 'done');

    setStepState('status-before', 'active');
    await checkStatus();
    setStepState('status-before', 'done');

    setStepState('deploy', 'active');
    await deploy();
    setStepState('deploy', 'done');

    setStepState('status-after', 'active');
    await checkStatus();
    setStepState('status-after', 'done');

    logLine('Processo finalizado.');
  } catch (error) {
    logLine(`Erro: ${error.message}`);
    if (error.payload?.stdout) {
      logLine(error.payload.stdout.trim());
    }
    if (error.payload?.stderr) {
      logLine(error.payload.stderr.trim());
    }

    Object.keys(stepEls).forEach((id) => {
      if (stepEls[id].classList.contains('active')) {
        setStepState(id, 'error');
      }
    });
  } finally {
    runBtn.disabled = false;
    statusBtn.disabled = false;
    resetBtn.disabled = false;
  }
}

runBtn.addEventListener('click', runSequence);
statusBtn.addEventListener('click', async () => {
  try {
    await checkStatus();
  } catch (error) {
    logLine(`Erro: ${error.message}`);
  }
});
resetBtn.addEventListener('click', () => {
  resetSteps();
  pendingEl.textContent = '-';
  appliedEl.textContent = '-';
  lastRunEl.textContent = '-';
});
