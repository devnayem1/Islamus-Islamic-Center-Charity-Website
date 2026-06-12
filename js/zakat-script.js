// Zajak Form Script Start
const ZAKAT_RATE = 0.025;
// Nisab values (USD base)
const NISAB_GOLD_USD = 11257.80;
const NISAB_SILVER_USD = 955.28;

const CURRENCY_SYMBOLS = { USD:'$', EUR:'€', GBP:'£', BDT:'৳', SAR:'﷼', AED:'د.إ' };
const CURRENCY_RATES   = { USD:1, EUR:0.92, GBP:0.79, BDT:110, SAR:3.75, AED:3.67 };

function fmt(val, sym) {
  if (val >= 1000) return sym + val.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  return sym + val.toFixed(2);
}

function getVal(key) {
  const el = document.querySelector(`[data-key="${key}"]`);
  return el ? (parseFloat(el.value) || 0) : 0;
}

function calc() {
  const currCode = document.getElementById('currency').value;
  const sym = CURRENCY_SYMBOLS[currCode] || '$';
  const rate = CURRENCY_RATES[currCode] || 1;

  const keys = ['cashHome','cashBank','cashBiz','gold','silver','property','rental','other'];
  const total = keys.reduce((s,k) => s + getVal(k), 0);

  const zakatable = total; // simplified (no liabilities input in this design)
  const nisabGold   = NISAB_GOLD_USD   * rate;
  const nisabSilver = NISAB_SILVER_USD * rate;
  const nisab = Math.min(nisabGold, nisabSilver);
  const zakat = zakatable >= nisab ? zakatable * ZAKAT_RATE : 0;

  document.getElementById('totalAssets').textContent      = fmt(total, sym);
  document.getElementById('totalLiabilities').textContent = fmt(0, sym);
  document.getElementById('zakatableAssets').textContent  = fmt(zakatable, sym);
  document.getElementById('zakatDue').textContent         = fmt(zakat, sym);
  document.getElementById('goldNisab').textContent        = fmt(nisabGold, sym);
  document.getElementById('silverNisab').textContent      = fmt(nisabSilver, sym);
}

document.getElementById('currency').addEventListener('change', calc);
calc();
// Zajak Form Script END
