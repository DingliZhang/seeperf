// All parsing, matching and rendering happens locally in this browser tab.
const $ = (selector) => document.querySelector(selector);
const state = { datasets: [], baselineId: null, demo: false, rows: [], visible: [] };
const TYPE_NAMES = { Byte: 'byte array', Short: 'short array', Int: 'int array', Long: 'long array', Char: 'char array', Float: 'float array', Double: 'double array', Boolean: 'boolean array', Object: 'object array' };
const DEMO_TEXT = {
  a: String.raw`Benchmark                                   (delta)  (size)  Mode  Cnt   Score   Error  Units
StringCompareToDifferentLength.compareToLL        2      24  avgt    9   8.692 ± 2.385  ms/op
StringCompareToDifferentLength.compareToLL        2      36  avgt    9   9.396 ± 2.035  ms/op
StringCompareToDifferentLength.compareToLL        2      72  avgt    9  10.519 ± 1.399  ms/op
StringCompareToDifferentLength.compareToLL        2     128  avgt    9  12.056 ± 0.669  ms/op
StringCompareToDifferentLength.compareToLL        2     256  avgt    9  14.985 ± 0.843  ms/op
StringCompareToDifferentLength.compareToLL        2     512  avgt    9  26.377 ± 1.002  ms/op
StringCompareToDifferentLength.compareToLU        2      24  avgt    9   9.758 ± 1.170  ms/op
StringCompareToDifferentLength.compareToLU        2      36  avgt    9  10.204 ± 0.167  ms/op
StringCompareToDifferentLength.compareToLU        2      72  avgt    9  11.551 ± 0.727  ms/op
StringCompareToDifferentLength.compareToLU        2     128  avgt    9  13.647 ± 0.842  ms/op
StringCompareToDifferentLength.compareToLU        2     256  avgt    9  19.107 ± 0.839  ms/op
StringCompareToDifferentLength.compareToLU        2     512  avgt    9  33.257 ± 0.847  ms/op
StringCompareToDifferentLength.compareToUL        2      24  avgt    9  10.330 ± 0.012  ms/op
StringCompareToDifferentLength.compareToUL        2      36  avgt    9  11.024 ± 1.592  ms/op
StringCompareToDifferentLength.compareToUL        2      72  avgt    9  13.139 ± 0.040  ms/op
StringCompareToDifferentLength.compareToUL        2     128  avgt    9  15.522 ± 0.095  ms/op
StringCompareToDifferentLength.compareToUL        2     256  avgt    9  20.629 ± 0.047  ms/op
StringCompareToDifferentLength.compareToUL        2     512  avgt    9  34.778 ± 0.093  ms/op
StringCompareToDifferentLength.compareToUU        2      24  avgt    9  10.436 ± 1.663  ms/op
StringCompareToDifferentLength.compareToUU        2      36  avgt    9  11.680 ± 1.381  ms/op
StringCompareToDifferentLength.compareToUU        2      72  avgt    9  13.633 ± 0.803  ms/op
StringCompareToDifferentLength.compareToUU        2     128  avgt    9  16.489 ± 0.843  ms/op
StringCompareToDifferentLength.compareToUU        2     256  avgt    9  26.662 ± 0.966  ms/op
StringCompareToDifferentLength.compareToUU        2     512  avgt    9  47.207 ± 0.054  ms/op
Finished running test 'micro:com.arm.benchmarks.intrinsics.StringCompareToDifferentLength'
`,
  b: String.raw`Benchmark                                   (delta)  (size)  Mode  Cnt   Score   Error  Units
StringCompareToDifferentLength.compareToLL        2      24  avgt    9   8.689 ± 2.387  ms/op
StringCompareToDifferentLength.compareToLL        2      36  avgt    9   9.649 ± 1.437  ms/op
StringCompareToDifferentLength.compareToLL        2      72  avgt    9   9.880 ± 0.893  ms/op
StringCompareToDifferentLength.compareToLL        2     128  avgt    9  12.307 ± 0.146  ms/op
StringCompareToDifferentLength.compareToLL        2     256  avgt    9  15.660 ± 0.061  ms/op
StringCompareToDifferentLength.compareToLL        2     512  avgt    9  25.977 ± 0.047  ms/op
StringCompareToDifferentLength.compareToLU        2      24  avgt    9  10.850 ± 0.801  ms/op
StringCompareToDifferentLength.compareToLU        2      36  avgt    9  10.964 ± 1.131  ms/op
StringCompareToDifferentLength.compareToLU        2      72  avgt    9  11.360 ± 0.654  ms/op
StringCompareToDifferentLength.compareToLU        2     128  avgt    9  14.075 ± 0.968  ms/op
StringCompareToDifferentLength.compareToLU        2     256  avgt    9  19.106 ± 0.842  ms/op
StringCompareToDifferentLength.compareToLU        2     512  avgt    9  33.220 ± 0.798  ms/op
StringCompareToDifferentLength.compareToUL        2      24  avgt    9  10.339 ± 0.017  ms/op
StringCompareToDifferentLength.compareToUL        2      36  avgt    9  10.945 ± 1.681  ms/op
StringCompareToDifferentLength.compareToUL        2      72  avgt    9  13.636 ± 0.805  ms/op
StringCompareToDifferentLength.compareToUL        2     128  avgt    9  15.504 ± 0.046  ms/op
StringCompareToDifferentLength.compareToUL        2     256  avgt    9  20.627 ± 0.048  ms/op
StringCompareToDifferentLength.compareToUL        2     512  avgt    9  34.739 ± 0.095  ms/op
StringCompareToDifferentLength.compareToUU        2      24  avgt    9  11.067 ± 1.592  ms/op
StringCompareToDifferentLength.compareToUU        2      36  avgt    9  10.640 ± 0.002  ms/op
StringCompareToDifferentLength.compareToUU        2      72  avgt    9  13.276 ± 1.380  ms/op
StringCompareToDifferentLength.compareToUU        2     128  avgt    9  16.204 ± 1.328  ms/op
StringCompareToDifferentLength.compareToUU        2     256  avgt    9  27.276 ± 0.093  ms/op
StringCompareToDifferentLength.compareToUU        2     512  avgt    9  47.039 ± 0.431  ms/op
Finished running test 'micro:com.arm.benchmarks.intrinsics.StringCompareToDifferentLength'`
};

function esc(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]); }
function cleanNumber(value) { if (value === null || value === undefined || String(value).trim() === '') return NaN; if (typeof value === 'number') return value; const n = Number(String(value).replace(/,/g, '').replace(/^[±+]/, '').trim()); return Number.isFinite(n) ? n : NaN; }
function fmt(value, decimals = 3) { return Number.isFinite(value) ? value.toLocaleString('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) : '—'; }
function pct(value) {
  if (!Number.isFinite(value)) return '—';
  const rounded = Number(value.toFixed(1));
  return rounded === 0 ? '0.0%' : `${rounded > 0 ? '+' : ''}${fmt(rounded, 1)}%`;
}
function shortName(name) { return name.split('.').pop(); }
function rowKey(row) { return `${row.benchmark}\u0000${row.mode}\u0000${JSON.stringify(Object.entries(row.params).sort(([a], [b]) => a.localeCompare(b)))}`; }
function normalizeRow(input) {
  const benchmark = String(input.benchmark || input.method || '').trim();
  const score = cleanNumber(input.score);
  if (!benchmark || !Number.isFinite(score)) return null;
  const params = Object.fromEntries(Object.entries(input.params || {}).filter(([, v]) => v !== undefined && v !== null).map(([k, v]) => [String(k), String(v)]));
  const error = cleanNumber(input.error);
  return { benchmark, score, error: Number.isFinite(error) && error >= 0 ? error : null, params, mode: String(input.mode || 'avgt').trim(), unit: String(input.unit || 'ns/op').trim(), samples: input.samples ?? null };
}

function parseCsv(text) {
  const lines = []; let line = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
    else if (ch === ',' && !quoted) { line.push(cell); cell = ''; }
    else if ((ch === '\n' || ch === '\r') && !quoted) { if (ch === '\r' && text[i + 1] === '\n') i++; line.push(cell); if (line.some(x => x.trim())) lines.push(line); line = []; cell = ''; }
    else cell += ch;
  }
  if (quoted) throw new Error('Unclosed quote in CSV');
  line.push(cell); if (line.some(x => x.trim())) lines.push(line);
  if (lines.length < 2) throw new Error('No data rows found in CSV');
  const header = lines.shift().map(x => x.trim().toLowerCase());
  const col = (...names) => header.findIndex(h => names.includes(h));
  const get = (record, ...names) => record[col(...names)];
  if (col('benchmark', 'method') < 0 || col('score') < 0) throw new Error('CSV must have Benchmark/Method and Score columns');
  return lines.map(r => {
    const params = {};
    header.forEach((name, index) => { if (name.startsWith('param:')) params[name.slice(6).trim()] = r[index]; });
    if (!Object.keys(params).length && col('size') >= 0) params.size = get(r, 'size');
    return normalizeRow({ benchmark: get(r, 'benchmark', 'method'), score: get(r, 'score'), error: get(r, 'score error (99.9%)', 'score error', 'error', '±'), mode: get(r, 'mode'), unit: get(r, 'unit', 'units'), samples: get(r, 'samples', 'cnt'), params });
  }).filter(Boolean);
}

function parseJson(text) {
  const data = JSON.parse(text);
  const list = Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : Array.isArray(data.benchmarks) ? data.benchmarks : null;
  if (!list) throw new Error('JSON must be a JMH results array or contain a results / benchmarks array');
  return list.map(r => normalizeRow({ benchmark: r.benchmark ?? r.method, score: r.primaryMetric?.score ?? r.score, error: r.primaryMetric?.scoreError ?? r.error, unit: r.primaryMetric?.scoreUnit ?? r.unit, mode: r.mode, samples: r.measurementIterations ?? r.samples, params: r.params ?? (r.size != null ? { size: r.size } : {}) })).filter(Boolean);
}

function parseText(text) {
  const rows = []; let paramNames = [];
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*Benchmark\s+/i.test(line)) { const prefix = line.split(/\s+Mode\s+/i)[0]; paramNames = [...prefix.matchAll(/\(([^)]+)\)/g)].map(m => m[1]); continue; }
    const parts = line.trim().split(/\s+/);
    const modeIndex = parts.findIndex(p => /^(avgt|thrpt|sample|ss)$/i.test(p));
    if (modeIndex < 1 || parts.length < modeIndex + 3) continue;
    const benchmark = parts[0], values = parts.slice(1, modeIndex), mode = parts[modeIndex];
    const rest = parts.slice(modeIndex + 1);
    const hasCount = rest.length > 1 && /^\d+$/.test(rest[0]) && Number.isFinite(cleanNumber(rest[1]));
    const scoreIndex = hasCount ? 1 : 0;
    const score = rest[scoreIndex];
    const afterScore = rest.slice(scoreIndex + 1);
    const pmIndex = afterScore.findIndex(s => s === '±' || s === '+/-');
    const error = pmIndex >= 0 ? afterScore[pmIndex + 1] : null;
    const unit = (pmIndex >= 0 ? afterScore[pmIndex + 2] : afterScore[0]) || 'ns/op';
    const params = {};
    values.forEach((v, i) => { params[paramNames[i] || (i === 0 ? 'size' : `param${i + 1}`)] = v; });
    const row = normalizeRow({ benchmark, score, error, unit, mode, samples: hasCount ? rest[0] : null, params });
    if (row) rows.push(row);
  }
  if (!rows.length) throw new Error('No JMH result rows found; supported formats: JMH TXT, CSV, and JSON');
  return rows;
}

function parseFile(text, filename) {
  const content = text.replace(/^\uFEFF/, '');
  const ext = filename.toLowerCase().split('.').pop();
  const rows = ext === 'json' || /^[\s]*[\[{]/.test(content) ? parseJson(content) : ext === 'csv' || /^\s*(benchmark|method)\s*,/i.test(content) ? parseCsv(content) : parseText(content);
  if (!rows.length) throw new Error('No valid score records found in file');
  const map = new Map(); let duplicates = 0;
  rows.forEach(row => { const key = rowKey(row); if (map.has(key)) duplicates++; map.set(key, row); });
  return { rows: [...map.values()], duplicates };
}

function loadDemo() {
  const a = parseFile(DEMO_TEXT.a, 'a.txt').rows;
  const b = parseFile(DEMO_TEXT.b, 'b.txt').rows;
  state.datasets = [{ id: 'demo-a', name: 'a', file: 'a.txt · built-in demo', source: DEMO_TEXT.a, rows: a, isDemo: true }, { id: 'demo-b', name: 'b', file: 'b.txt · built-in demo', source: DEMO_TEXT.b, rows: b, isDemo: true }];
  state.baselineId = 'demo-a'; state.demo = true;
  setMessage(`Loaded ${a.length} records each from a.txt and b.txt. Upload files or paste data to replace this demo.`, false);
  render();
}

function setMessage(text, error = false) { const el = $('#message'); el.textContent = text; el.hidden = !text; el.classList.toggle('error', error); }
async function addFiles(files) {
  const incoming = [...files]; if (!incoming.length) return;
  const current = state.demo ? [] : state.datasets;
  if (current.length + incoming.length > 3) { setMessage('You can upload up to 3 datasets. Remove an existing dataset or select fewer files.', true); return; }
  const parsed = [];
  try {
    for (const file of incoming) {
      if (file.size > 8 * 1024 * 1024) throw new Error(`${file.name} exceeds the 8 MB file limit`);
      if (!/\.(txt|csv|json)$/i.test(file.name)) throw new Error(`${file.name} is not a supported TXT / CSV / JSON file`);
      const source = await file.text();
      const result = parseFile(source, file.name);
      parsed.push({ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, name: file.name.replace(/\.[^.]+$/, ''), file: file.name, source, rows: result.rows, duplicates: result.duplicates });
    }
  } catch (error) { setMessage(`Import failed: ${error.message}. Existing datasets were not changed.`, true); return; }
  state.datasets = [...current, ...parsed]; state.baselineId = state.demo ? parsed[0].id : state.baselineId || parsed[0].id; state.demo = false;
  const duplicateCount = parsed.reduce((sum, item) => sum + item.duplicates, 0);
  const recordCount = parsed.reduce((sum, item) => sum + item.rows.length, 0);
  setMessage(`Imported ${parsed.length} ${parsed.length === 1 ? 'dataset' : 'datasets'} with ${recordCount} ${recordCount === 1 ? 'record' : 'records'}.${duplicateCount ? ` ${duplicateCount} duplicate ${duplicateCount === 1 ? 'key' : 'keys'} found; the last record was kept.` : ''}`);
  render();
}

// Paste edits are parsed before touching the current dataset, so invalid input is safe to cancel.
let editingDatasetId = null;
function nextPastedName(isBaseline) {
  if (isBaseline) return 'base';
  let number = 1;
  while (state.datasets.some(dataset => dataset.name === `variant ${number}`)) number++;
  return `variant ${number}`;
}
function openDatasetEditor(dataset = null) {
  if (!dataset && !state.demo && state.datasets.length >= 3) return;
  editingDatasetId = dataset?.id ?? null;
  $('#editDatasetTitle').textContent = dataset ? `Edit ${dataset.name}` : 'Paste new dataset';
  $('#editDatasetHelp').textContent = dataset
    ? 'Paste JMH TXT, CSV, or JSON results. Apply replaces only this dataset in the current page and recalculates the comparison. Local files are not changed.'
    : state.demo ? 'Paste JMH TXT, CSV, or JSON results. Apply replaces the demo in this page and makes this dataset the baseline.' : 'Paste JMH TXT, CSV, or JSON results. Apply adds this dataset to the current page.';
  $('#editDatasetSource').textContent = dataset?.file || '';
  $('#editDatasetText').value = dataset?.source || '';
  $('#editDatasetError').hidden = true;
  $('#editDatasetError').textContent = '';
  $('#editDatasetDialog').showModal();
  $('#editDatasetText').focus();
}
function applyDatasetEditor() {
  const dataset = state.datasets.find(item => item.id === editingDatasetId);
  if (editingDatasetId && !dataset) { $('#editDatasetDialog').close(); return; }
  const text = $('#editDatasetText').value;
  const errorEl = $('#editDatasetError');
  try {
    if (!dataset && !state.demo && state.datasets.length >= 3) throw new Error('You can have up to 3 datasets');
    if (new Blob([text]).size > 8 * 1024 * 1024) throw new Error('Pasted data exceeds the 8 MB limit');
    // Content detection accepts TXT, CSV, or JSON regardless of the old file's extension.
    const result = parseFile(text, 'pasted.txt');
    let selected;
    if (dataset) {
      if (dataset.isDemo) dataset.name = nextPastedName(dataset.id === state.baselineId);
      dataset.rows = result.rows;
      dataset.source = text;
      dataset.file = 'Pasted data';
      dataset.isDemo = false;
      selected = dataset;
    } else {
      const isBaseline = state.demo || state.datasets.length === 0;
      selected = {
        id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
        name: nextPastedName(isBaseline), file: 'Pasted data', source: text, rows: result.rows
      };
      state.datasets = state.demo ? [selected] : [...state.datasets, selected];
      if (isBaseline) state.baselineId = selected.id;
    }
    state.demo = false;
    const index = state.datasets.indexOf(selected);
    $('#editDatasetDialog').close();
    setMessage(`${dataset ? 'Updated' : 'Added'} ${selected.name} with ${result.rows.length} records.${result.duplicates ? ` ${result.duplicates} duplicate keys found; the last record was kept.` : ''}`);
    render();
    $('#datasetList').querySelectorAll('.edit-data')[index]?.focus();
  } catch (error) {
    errorEl.textContent = `Could not apply data: ${error.message}. Existing datasets have not changed.`;
    errorEl.hidden = false;
    $('#editDatasetText').focus();
  }
}

function describe(row) {
  const method = shortName(row.benchmark);
  const match = method.match(/^(.*?)(Byte|Short|Int|Long|Char|Float|Double|Boolean|Object)Array$/);
  const group = match ? TYPE_NAMES[match[2]] : method;
  const series = match ? match[1] || method : method;
  const sizeKey = Object.keys(row.params).find(x => /^(size|length|len|count)$/i.test(x)) || Object.keys(row.params)[0];
  const other = Object.entries(row.params).filter(([key]) => key !== sizeKey).map(([key, value]) => `${key}=${value}`).join(' · ');
  return { group, series, size: sizeKey ? String(row.params[sizeKey]) : 'default', other };
}
function groupRank(group) { return Object.values(TYPE_NAMES).indexOf(group); }
function compareMode(row) { return /^(avgt|sample|ss)$/i.test(row.mode) || /\/op$/i.test(row.unit) ? 'latency' : /^(thrpt)$/i.test(row.mode) || /^ops\//i.test(row.unit) ? 'throughput' : 'unknown'; }
function buildRows() {
  const byKey = new Map();
  for (const dataset of state.datasets) for (const entry of dataset.rows) {
    const key = rowKey(entry);
    if (!byKey.has(key)) byKey.set(key, { key, ...describe(entry), benchmark: entry.benchmark, mode: entry.mode, params: entry.params, scores: new Map() });
    byKey.get(key).scores.set(dataset.id, entry);
  }
  state.rows = [...byKey.values()].sort((a, b) => {
    const ar = groupRank(a.group), br = groupRank(b.group);
    return (ar < 0 ? 100 : ar) - (br < 0 ? 100 : br) || a.group.localeCompare(b.group) || (Number(a.size) - Number(b.size) || 0) || a.size.localeCompare(b.size) || a.series.localeCompare(b.series) || a.other.localeCompare(b.other);
  });
}
function getComparison(row, id) {
  const base = row.scores.get(state.baselineId), target = row.scores.get(id);
  if (!base || !target || base.unit !== target.unit || base.score === 0) return null;
  return (target.score - base.score) / Math.abs(base.score) * 100;
}
function availableComparisons() { return state.datasets.filter(x => x.id !== state.baselineId); }
function isBetter(delta, row) {
  const mode = compareMode(row.scores.get(state.baselineId) || [...row.scores.values()][0]);
  if (delta === 0 || mode === 'unknown') return null;
  return mode === 'throughput' ? delta > 0 : delta < 0;
}

function renderDatasets() {
  const list = $('#datasetList'); list.innerHTML = '';
  state.datasets.forEach((dataset, index) => {
    const card = document.createElement('div'); card.className = `dataset-card ${dataset.id === state.baselineId ? 'baseline' : ''}`;
    card.innerHTML = `<div class="dataset-number">DATASET ${String(index + 1).padStart(2, '0')}</div><div class="dataset-tag ${dataset.id === state.baselineId ? '' : 'variant'}">${dataset.id === state.baselineId ? '● Baseline' : '◆ Variant'}</div><div class="dataset-name" title="${esc(dataset.name)}">${esc(dataset.name)}</div><div class="dataset-meta">${dataset.rows.length} records · ${esc(dataset.file)}</div><div class="dataset-actions"><button class="dataset-action edit-data" type="button" aria-label="Edit data for ${esc(dataset.name)}">Edit data</button>${dataset.id === state.baselineId ? '' : '<button class="dataset-action make-base" type="button">Set as baseline</button>'}<button class="dataset-action remove" type="button">Remove</button></div>`;
    card.addEventListener('click', event => { if (!event.target.closest('button')) openDatasetEditor(dataset); });
    card.querySelector('.edit-data').addEventListener('click', () => openDatasetEditor(dataset));
    card.querySelector('.make-base')?.addEventListener('click', () => { state.baselineId = dataset.id; render(); });
    card.querySelector('.remove').addEventListener('click', () => { state.datasets = state.datasets.filter(x => x.id !== dataset.id); if (state.baselineId === dataset.id) state.baselineId = state.datasets[0]?.id || null; state.demo = false; setMessage('Dataset removed.'); render(); });
    list.append(card);
  });
  for (let i = state.datasets.length; i < 3; i++) {
    const slot = document.createElement('button');
    slot.type = 'button';
    slot.className = 'empty-slot';
    slot.innerHTML = `<span>0${i + 1}</span> Awaiting dataset`;
    slot.setAttribute('aria-label', state.demo ? 'Paste your own data to replace the demo' : `Paste dataset ${i + 1}`);
    slot.addEventListener('click', () => openDatasetEditor());
    list.append(slot);
  }
  $('#dropzone').disabled = state.datasets.length >= 3 && !state.demo;
}

function setOptions(select, options) {
  const old = select.value, first = select.options[0].cloneNode(true);
  select.replaceChildren(first);
  for (const value of options) { const option = document.createElement('option'); option.value = value; option.textContent = value; select.append(option); }
  select.value = [...select.options].some(x => x.value === old) ? old : 'all';
}
function renderFilters() {
  setOptions($('#groupFilter'), [...new Set(state.rows.map(x => x.group))].sort((a, b) => (groupRank(a) < 0 ? 100 : groupRank(a)) - (groupRank(b) < 0 ? 100 : groupRank(b)) || a.localeCompare(b)));
  const group = $('#groupFilter').value;
  const subset = state.rows.filter(x => group === 'all' || x.group === group);
  setOptions($('#methodFilter'), [...new Set(subset.map(x => x.series))].sort());
  setOptions($('#sizeFilter'), [...new Set(subset.map(x => x.size))].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b)));
  $('#thresholdWrap').hidden = state.datasets.length < 2;
}
function filteredRows() {
  const group = $('#groupFilter').value, method = $('#methodFilter').value, size = $('#sizeFilter').value;
  const threshold = Number($('#thresholdFilter').value);
  const variants = availableComparisons();
  return state.rows.filter(row => (group === 'all' || row.group === group) && (method === 'all' || row.series === method) && (size === 'all' || row.size === size) && (!threshold || variants.some(v => Math.abs(getComparison(row, v.id)) >= threshold)));
}
function renderMetrics() {
  const variants = availableComparisons();
  const comparable = variants.flatMap(v => state.rows.map(row => ({ row, delta: getComparison(row, v.id) })).filter(x => x.delta !== null));
  const faster = comparable.filter(x => isBetter(x.delta, x.row)).length;
  const slower = comparable.filter(x => isBetter(x.delta, x.row) === false).length;
  const base = state.datasets.find(x => x.id === state.baselineId);
  const values = variants.length ? [
    ['Valid comparisons', String(comparable.length), 'Matched method, parameters, and unit', ''],
    ['Faster results', String(faster), 'Score direction only; not a significance test', 'green'],
    ['Slower results', String(slower), 'Score direction only; not a significance test', 'red'],
    ['Methods covered', String(new Set(state.rows.filter(r => r.scores.has(state.baselineId)).map(r => r.benchmark)).size), `${base?.name || 'Baseline'} · ${base?.rows.length || 0} original records`, '']
  ] : [
    ['Measurements', String(base?.rows.length || 0), 'Current dataset', ''],
    ['Benchmarks', String(new Set(base?.rows.map(r => r.benchmark)).size), 'Counted by Benchmark field', ''],
    ['Parameter values', String(new Set(state.rows.map(r => r.size)).size), 'Based on the first parameter', ''],
    ['Units', String(new Set(base?.rows.map(r => r.unit)).size), [...new Set(base?.rows.map(r => r.unit))].join(' / '), '']
  ];
  $('#metricGrid').innerHTML = values.map(([label, value, note, tone]) => `<div class="metric-card"><div class="metric-label">${esc(label)}</div><div class="metric-value ${tone}">${esc(value)}</div><div class="metric-note" title="${esc(note)}">${esc(note)}</div></div>`).join('');
  const missing = variants.reduce((n, v) => n + state.rows.filter(row => row.scores.has(state.baselineId) && !row.scores.has(v.id)).length, 0);
  const mismatch = variants.reduce((n, v) => n + state.rows.filter(row => row.scores.has(state.baselineId) && row.scores.has(v.id) && row.scores.get(state.baselineId).unit !== row.scores.get(v.id).unit).length, 0);
  $('#matchNote').textContent = variants.length ? `${missing} missing · ${mismatch} unit mismatches` : 'Add a second dataset to calculate changes';
}

function chartExtent(values) {
  const min = Math.min(-10, ...values), max = Math.max(10, ...values);
  const rough = (max - min) / 6;
  const step = [5,10,20,25,50,100,200,500,1000,2000,5000].find(x => x >= rough) || Math.pow(10, Math.ceil(Math.log10(rough)));
  return { min: Math.floor(min / step) * step, max: Math.ceil(max / step) * step, step };
}
function chartMarkup(row, variants, extent, singleMax) {
  const base = row.scores.get(state.baselineId);
  const baselineName = state.datasets.find(dataset => dataset.id === state.baselineId)?.name || 'Baseline';
  const parameters = Object.entries(row.params).map(([key, value]) => `${key}=${value}`).join(' · ') || 'No parameters';
  const scoreDetail = entry => `${fmt(entry.score)}${entry.error === null ? '' : ` ± ${fmt(entry.error)}`} ${entry.unit}`;
  const description = `${row.benchmark}\n${parameters} · ${row.mode}`;
  const bars = variants.length ? variants.flatMap(variant => {
    const delta = getComparison(row, variant.id), measure = row.scores.get(variant.id);
    if (delta === null) return [];
    const zero = -extent.min / (extent.max - extent.min) * 100;
    const direction = isBetter(delta, row);
    const tone = direction === null ? '' : direction ? 'better' : 'worse';
    const end = Math.max(0, Math.min(100, (delta - extent.min) / (extent.max - extent.min) * 100));
    const left = Math.min(zero, end), width = Math.abs(end - zero);
    const detail = `${description}\nBaseline (${baselineName}): ${scoreDetail(base)}\nVariant (${variant.name}): ${scoreDetail(measure)}\nCalculation: (${measure.score} − ${base.score}) ÷ |${base.score}| × 100\n= ${delta > 0 ? '+' : ''}${fmt(delta, 3)}% · ${direction === null ? 'No direction' : direction ? 'Improvement' : 'Regression'}`;
    return `<div class="bar-line" tabindex="0" role="img" aria-label="${esc(detail)}" data-tooltip="${esc(detail)}"><span class="bar-plot"><span class="zero-line" style="left:${zero}%"></span>${tone ? `<span class="bar ${tone}" style="left:${left}%;width:${width}%"></span>` : ''}<span class="bar-value ${delta < 0 ? 'negative' : ''}" style="left:${end}%">${pct(delta)}</span></span></div>`;
  }) : base ? (() => {
    const width = Math.max(1, Math.log1p(Math.max(0, base.score)) / Math.log1p(singleMax) * 94);
    const detail = `${description}\n${baselineName}: ${scoreDetail(base)}`;
    return [`<div class="bar-line" tabindex="0" role="img" aria-label="${esc(detail)}" data-tooltip="${esc(detail)}"><span class="bar-plot"><span class="bar raw" style="left:0;width:${width}%"></span><span class="bar-value" style="left:${width}%">${fmt(base.score, 2)}</span></span></div>`];
  })() : [];
  return bars.join('');
}
function renderCharts(rows) {
  $('#chartTooltip').hidden = true;
  const variants = availableComparisons();
  $('#legend').innerHTML = variants.length ? '<span class="legend-item"><i class="legend-swatch better"></i>Improvement</span><span class="legend-item"><i class="legend-swatch worse"></i>Regression</span>' : '';
  const deltas = variants.flatMap(v => rows.map(row => getComparison(row, v.id)).filter(x => x !== null));
  const extent = chartExtent(deltas);
  $('#chartTitle').textContent = variants.length ? 'Change vs. baseline' : 'Raw score distribution';
  $('#chartSubtitle').textContent = variants.length ? `Shared scale ${extent.min}% to +${extent.max}% · ${variants.length === 2 ? 'bars follow dataset order · ' : ''}negative left / positive right · values beside bar ends` : 'Separate logarithmic scale per group · exact values below';
  const groups = [...new Set(rows.map(x => x.group))];
  $('#chartGrid').innerHTML = groups.length ? groups.map(group => {
    const groupRows = rows.filter(row => row.group === group), sizes = [...new Set(groupRows.map(x => x.size))];
    const singleMax = Math.max(1, ...groupRows.map(row => row.scores.get(state.baselineId)?.score || 0));
    const ticks = variants.length ? Array.from({ length: Math.round((extent.max - extent.min) / extent.step) + 1 }, (_, i) => `${extent.min + i * extent.step > 0 ? '+' : ''}${extent.min + i * extent.step}%`) : ['0', `${fmt(Math.sqrt(singleMax + 1) - 1, 0)}`, `${fmt(singleMax, 0)}`];
    return `<article class="chart-panel"><div class="panel-head"><h3>${esc(group)} <small>${esc(groupRows[0]?.mode || '')}</small></h3><span>${sizes.length} SIZES</span></div><div class="panel-scale">${ticks.map(t => `<span>${esc(t)}</span>`).join('')}</div><div class="plot-area">${sizes.map(size => {
      const these = groupRows.filter(row => row.size === size);
      const exactPower = Number(size) > 0 && Number.isInteger(Math.log2(Number(size)));
      return `<div class="plot-row"><span class="row-label ${exactPower ? 'power' : ''}" title="${esc(size)}">${esc(size)}</span><div class="row-track">${these.map(row => chartMarkup(row, variants, extent, singleMax)).join('') || '<span class="missing-value">No match</span>'}</div></div>`;
    }).join('')}</div></article>`;
  }).join('') : '<div class="no-results">No records match these filters. Try another group, method, or threshold.</div>';
  $('#chartFootnote').textContent = variants.length ? 'Only point estimates matched by Benchmark, Mode, parameters, and unit appear in the chart. See the table for reported errors; bar length or error ranges alone do not establish statistical significance. Green bars mark improvements and coral bars regressions, regardless of method. Unchanged results and modes with unknown performance direction have no colored bar. Percentages sit just beyond each bar end.' : 'With one dataset, neutral bars show raw Scores on a logarithmic scale. Do not compare bar lengths across groups or units.';
}

function renderTable(rows) {
  const variants = availableComparisons(), base = state.datasets.find(x => x.id === state.baselineId);
  $('#tableHead').innerHTML = `<tr><th>Method / Benchmark</th><th>Parameters</th><th>Mode</th><th>${esc(base?.name || 'Baseline')} · Score ± Error</th>${variants.map(v => `<th>${esc(v.name)} · Score ± Error</th><th>Change</th>`).join('')}<th>Unit</th></tr>`;
  $('#tableBody').innerHTML = rows.map(row => {
    const b = row.scores.get(state.baselineId);
    const measured = entry => entry ? `${fmt(entry.score)}${entry.error === null ? '' : ` ± ${fmt(entry.error)}`}` : '—';
    return `<tr><td title="${esc(row.benchmark)}">${esc(shortName(row.benchmark))}</td><td title="${esc(JSON.stringify(row.params))}">${esc(row.size)}${row.other ? ` · ${esc(row.other)}` : ''}</td><td>${esc(row.mode)}</td><td class="${b ? '' : 'dim'}">${measured(b)}</td>${variants.map(v => {
      const entry = row.scores.get(v.id), delta = getComparison(row, v.id);
      const direction = delta === null ? null : isBetter(delta, row);
      const tone = direction === null ? 'dim' : direction ? 'delta-good' : 'delta-bad';
      return `<td class="${entry ? '' : 'dim'}">${measured(entry)}${entry && b && entry.unit !== b.unit ? ` <span class="dim">(${esc(entry.unit)})</span>` : ''}</td><td class="${tone}">${pct(delta)}</td>`;
    }).join('')}<td>${esc(b?.unit || [...row.scores.values()][0]?.unit || '')}</td></tr>`;
  }).join('');
  $('#tableFooter').textContent = `Showing ${rows.length} of ${state.rows.length} method/parameter records · “—” means no matching value. Score Error is reported by JMH when available.`;
}
function renderResults() {
  $('#results').hidden = !state.datasets.length;
  if (!state.datasets.length) return;
  buildRows(); renderFilters(); renderMetrics();
  state.visible = filteredRows(); renderCharts(state.visible); renderTable(state.visible);
}
function renderFiltered() { state.visible = filteredRows(); renderCharts(state.visible); renderTable(state.visible); }
function render() { renderDatasets(); renderResults(); }

function exportCsv() {
  const variants = availableComparisons();
  const headers = ['Benchmark', 'Mode', 'Params', 'Baseline', 'Baseline Error', ...variants.flatMap(v => [v.name, `${v.name} Error`, `${v.name} Delta %`]), 'Unit'];
  const records = state.visible.map(row => {
    const base = row.scores.get(state.baselineId);
    return [row.benchmark, row.mode, JSON.stringify(row.params), base?.score ?? '', base?.error ?? '', ...variants.flatMap(v => { const r = row.scores.get(v.id); return [r?.score ?? '', r?.error ?? '', getComparison(row, v.id) ?? '']; }), base?.unit || [...row.scores.values()][0]?.unit || ''];
  });
  const quote = x => { const safe = typeof x === 'string' && /^[=+\-@\t\r]/.test(x) ? `'${x}` : String(x); return `"${safe.replaceAll('"', '""')}"`; };
  const csv = '\uFEFF' + [headers, ...records].map(line => line.map(quote).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'benchmark-comparison.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const chartGrid = $('#chartGrid');
const chartTooltip = $('#chartTooltip');
function showChartTooltip(line, x, y) {
  chartTooltip.textContent = line.dataset.tooltip;
  chartTooltip.hidden = false;
  const rect = chartTooltip.getBoundingClientRect();
  chartTooltip.style.left = `${Math.max(12, Math.min(x + 14, window.innerWidth - rect.width - 12))}px`;
  chartTooltip.style.top = `${y + rect.height + 16 < window.innerHeight ? y + 16 : Math.max(12, y - rect.height - 12)}px`;
}
chartGrid.addEventListener('pointermove', event => {
  const line = event.target.closest('.bar-line');
  if (line) showChartTooltip(line, event.clientX, event.clientY);
  else chartTooltip.hidden = true;
});
chartGrid.addEventListener('pointerleave', () => { chartTooltip.hidden = true; });
chartGrid.addEventListener('focusin', event => {
  const line = event.target.closest('.bar-line');
  if (!line) return;
  const rect = line.getBoundingClientRect();
  showChartTooltip(line, rect.left + rect.width / 2, rect.bottom);
});
chartGrid.addEventListener('focusout', () => { chartTooltip.hidden = true; });

$('#applyDatasetEdit').addEventListener('click', applyDatasetEditor);
$('#cancelDatasetEdit').addEventListener('click', () => $('#editDatasetDialog').close());
$('#editDatasetDialog').addEventListener('close', () => { editingDatasetId = null; });
$('#editDatasetText').addEventListener('input', () => { $('#editDatasetError').hidden = true; });
$('#fileInput').addEventListener('change', async event => { await addFiles(event.target.files); event.target.value = ''; });
$('#dropzone').addEventListener('click', () => $('#fileInput').click());
for (const type of ['dragenter', 'dragover']) $('#dropzone').addEventListener(type, e => { e.preventDefault(); $('#dropzone').classList.add('dragover'); });
for (const type of ['dragleave', 'drop']) $('#dropzone').addEventListener(type, e => { e.preventDefault(); $('#dropzone').classList.remove('dragover'); });
$('#dropzone').addEventListener('drop', e => addFiles(e.dataTransfer.files));
$('#demoBtn').addEventListener('click', loadDemo);
$('#printBtn').addEventListener('click', () => window.print());
$('#exportBtn').addEventListener('click', exportCsv);
$('#groupFilter').addEventListener('change', () => { renderFilters(); renderFiltered(); });
for (const id of ['methodFilter', 'sizeFilter', 'thresholdFilter']) $(`#${id}`).addEventListener('change', renderFiltered);
loadDemo();
