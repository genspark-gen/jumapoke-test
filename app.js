// ===== 共通定数 =====
const METAL_PURITY = {
  K18:   { purity: 0.75, source: 'k24' },
  PT900: { purity: 0.90, source: 'pt1000' },
  PT850: { purity: 0.85, source: 'pt1000' },
};
const PROCESSING = { cast_oneoff: 12000, cast_mass: 1000, handmade: 15000, meleeSetPerPc: 50, centerSetPerPc: 800, polish: 1000 };
const SHAPE_COEFF = { round: 1.0, oval: 1.05, pear: 1.05, heart: 1.10, marquise: 1.08, emerald: 1.05, square: 1.03, rose: 0.90 };
const CHAIN_PRICES = {
  "小豆0.20_45cm_PT850":13000,"小豆0.20_45cm_K18":20500,
  "ベネ0.6mm_45cm_PT850":22400,"ベネ0.6mm_45cm_K18":36000,
  "ベネ0.8mm_45cm_PT850":36000,"ベネ0.8mm_45cm_K18":56000,
};

// ===== メレダイヤ係数 =====
const MELEE_BASE = 55000;
const MELEE_COLOR = { DEF:1.273, GHI:1.0, JKL:0.818, LMN:0.67, UnderN:0.55 };
const MELEE_HC = { "有":1.182, "無":1.0 };
const MELEE_CLARITY = { FL:1.85, VVS:1.364, VS:1.0, SI:0.818, "SI-I1":0.67 };
const MELEE_CUT = { "EX-VG":1.0, "VG-G":0.727, "Fair以下":0.53 };
const MELEE_WEIGHT = { "〜0.10ct":0.636, "0.10〜0.30ct":1.0, "0.30〜0.50ct":1.364, "0.50ct〜":1.455 };

// ===== センターダイヤ係数 =====
const CENTER_BASE = 180000;
const CENTER_COLOR = { D:1.222, E:1.111, F:1.05, "G-H":1.0, "I以下":0.5 };
const CENTER_CLARITY = { FL:1.6, VVS:1.333, VS:1.0, SI:0.889, "SI-I1":0.72 };
const CENTER_CUT = { "EX-VG":1.0, "VG-G":0.778, "Fair以下":0.6 };
const CENTER_CERT = { GIA:1.0, CGL:0.85, "その他":0.80, "なし":0.72 };
const CENTER_CARAT_BANDS = [
  {min:0,coeff:0.72},{min:0.18,coeff:0.72},{min:0.20,coeff:0.75},{min:0.25,coeff:0.79},
  {min:0.30,coeff:0.833},{min:0.40,coeff:0.92},{min:0.50,coeff:1.0},{min:0.70,coeff:1.13},
  {min:1.00,coeff:1.333},{min:1.50,coeff:1.17},{min:2.00,coeff:1.0},{min:3.00,coeff:0.83},{min:5.00,coeff:0.72}
];

// ===== 色石データ =====
// 共通クラリティ係数
const CS_CLARITY = { "ルーペクリーン":1.10, "内包物少ない":1.0, "内包物多い":0.80 };

// 共通サイズ係数（パパラチアベース）
const SIZE_STD = { 0.3:0.50, 0.5:0.625, 0.7:0.813, 1.0:1.0 };

// 各石の定義
const STONE_DB = {
  // ===== 特殊石（個別価格テーブル） =====
  "ルビー（7月）": {
    type: "heat", // 加熱/非加熱あり
    colorGrades: ["ピジョンブラッド","色キレイ","くすみ感"],
    prices: { // 1.0ct/内包物少ない
      "ピジョンブラッド": { "非加熱":150000, "加熱":140000 },
      "色キレイ":         { "非加熱":140000, "加熱":130000 },
      "くすみ感":         { "非加熱":70000,  "加熱":50000  },
    },
    sizeCoeff: { 0.3:0.308, 0.5:0.462, 0.7:0.615, 1.0:1.0 },
  },
  "サファイア（9月）": {
    type: "heat",
    colorGrades: ["コーンフラワー","ロイヤルブルー","色キレイ","くすみ感"],
    prices: {
      "コーンフラワー":   { "非加熱":160000, "加熱":140000 },
      "ロイヤルブルー":   { "非加熱":140000, "加熱":120000 },
      "色キレイ":         { "非加熱":130000, "加熱":110000 },
      "くすみ感":         { "非加熱":70000,  "加熱":50000  },
    },
    sizeCoeff: { 0.3:0.364, 0.5:0.545, 0.7:0.727, 1.0:1.0 },
  },
  "エメラルド（5月）": {
    type: "simple", // 色味3段階のみ（加熱なし）
    colorGrades: ["色最高","色キレイ","くすみ感"],
    prices: { "色最高":250000, "色キレイ":200000, "くすみ感":80000 },
    sizeCoeff: { 0.3:0.25, 0.5:0.40, 0.7:0.75, 1.0:1.0 },
  },
  "パライバトルマリン": {
    type: "origin", // 産地証明あり
    colorGrades: ["色最高","色キレイ","くすみ感"],
    prices: {
      "色最高": { "GIAブラジル産地証明":3000000, "鑑別書付":2000000, "鑑別書なし":1400000 },
      "色キレイ": { "GIAブラジル産地証明":1000000, "鑑別書付":600000, "鑑別書なし":420000 },
      "くすみ感": { "GIAブラジル産地証明":300000,  "鑑別書付":200000, "鑑別書なし":140000 },
    },
    sizeCoeff: { 0.3:0.25, 0.5:0.40, 0.7:0.60, 1.0:1.0 },
    // 特例: 0.3ct以下 + GIAブラジル + 色最高 → 最低1,000,000円/ct
    specialMin: { condition: { color:"色最高", origin:"GIAブラジル産地証明", maxCt:0.3 }, minPrice:1000000 },
  },
  "パパラチアサファイア": {
    type: "simple",
    colorGrades: ["色最高","色キレイ","くすみ感"],
    prices: { "色最高":140000, "色キレイ":80000, "くすみ感":40000 },
    sizeCoeff: { 0.3:0.50, 0.5:0.625, 0.7:0.813, 1.0:1.0 },
  },
  "翡翠（ジェダイト）": {
    type: "simple",
    colorGrades: ["ろうかん（色最高）","色キレイ","くすみ感"],
    prices: { "ろうかん（色最高）":150000, "色キレイ":30000, "くすみ感":12000 },
    sizeCoeff: { 0.3:0.50, 0.5:0.625, 0.7:0.813, 1.0:1.0 },
  },
  "アレキサンドライト": {
    type: "origin",
    colorGrades: ["色変わり強い","色変わり中程度","色変わり弱い"],
    prices: {
      "色変わり強い":   { "ブラジル産地証明":800000, "鑑別書付":550000, "鑑別書なし":385000 },
      "色変わり中程度": { "ブラジル産地証明":300000, "鑑別書付":300000, "鑑別書なし":210000 },
      "色変わり弱い":   { "ブラジル産地証明":150000, "鑑別書付":150000, "鑑別書なし":105000 },
    },
    sizeCoeff: { 0.3:0.267, 0.5:0.533, 0.7:0.733, 1.0:1.0 },
  },

  // ===== 標準石（共通係数） =====
  "ガーネット（1月）":            { type:"std", basePrice:3000 },
  "アメシスト（2月）":            { type:"std", basePrice:3000 },
  "アクアマリン（3月）":          { type:"std", basePrice:10000 },
  "ムーンストーン（6月）":        { type:"std", basePrice:8000 },
  "ペリドット（8月）":            { type:"std", basePrice:5000 },
  "オパール（10月）":             { type:"std", basePrice:5000 },
  "ブラックオパール（10月）":     { type:"std", basePrice:60000 },
  "トルマリン（10月）":           { type:"std", basePrice:8000 },
  "トパーズ（11月）":             { type:"std", basePrice:8000 },
  "インペリアルトパーズ（11月）": { type:"std", basePrice:14000 },
  "シトリン（11月）":             { type:"std", basePrice:3000 },
  "タンザナイト（12月）":         { type:"std", basePrice:16000 },
  "ジルコン（12月）":             { type:"std", basePrice:9000 },
  "ピンクサファイア":             { type:"std", basePrice:50000 },
  "イエローサファイア":           { type:"std", basePrice:60000 },
  "スピネル（レッド系）":         { type:"std", basePrice:60000 },
  "スピネル（その他）":           { type:"std", basePrice:60000 },
  "スフェーン":                   { type:"std", basePrice:55000 },
  "アイオライト":                 { type:"std", basePrice:5000 },
  "モルガナイト":                 { type:"std", basePrice:10000 },
  "トルコ石":                     { type:"std", basePrice:3000 },
  "ラピスラズリ":                 { type:"std", basePrice:2000 },
  "クンツァイト":                 { type:"std", basePrice:50000 },
  "ラリマー":                     { type:"std", basePrice:20000 },
};

// 標準石の共通色味係数
const STD_COLOR = { "色最高":1.3, "色キレイ":1.0, "くすみ感":0.4 };

// 石種リスト（表示順）
const STONE_LIST = [
  "ルビー（7月）","サファイア（9月）","エメラルド（5月）",
  "パライバトルマリン","パパラチアサファイア",
  "翡翠（ジェダイト）",
  "ガーネット（1月）","アメシスト（2月）","アクアマリン（3月）",
  "ムーンストーン（6月）","ペリドット（8月）",
  "オパール（10月）","ブラックオパール（10月）","トルマリン（10月）",
  "トパーズ（11月）","インペリアルトパーズ（11月）","シトリン（11月）",
  "タンザナイト（12月）","ジルコン（12月）",
  "アレキサンドライト",
  "ピンクサファイア","イエローサファイア",
  "スピネル（レッド系）","スピネル（その他）",
  "スフェーン","モルガナイト","クンツァイト","ラリマー",
  "アイオライト","トルコ石","ラピスラズリ",
];

// ===== カラーダイヤモンドデータ =====
const YELLOW_DIA_GRADES = {
  "Very Light Yellow": 190000,
  "Light Yellow": 200000,
  "Fancy Light Yellow": 240000,
  "Fancy Yellow": 400000,
  "Fancy Intense Yellow": 1000000,
  "Fancy Vivid Yellow": 1100000,
  "Deep color": 350000,
};
const PINK_DIA_GRADES = {
  "Light Pink": 2800000,
  "Fancy Light Pink": 3500000,
  "Fancy Pink": 5500000,
  "Fancy Intense Pink": 8000000,
  "Fancy Vivid Pink": 8000000,
};
const COLOR_DIA_CERT = { GIA:1.0, CGL:0.85, "その他":0.80, "なし":0.72 };

// ===== 計算関数 =====
function ctToGram(ct) { return ct * 0.2; }
function fmt(n) { return n.toLocaleString('ja-JP'); }

function getMetalPricePerG(metalType, k24, pt1000) {
  const m = METAL_PURITY[metalType];
  const raw = m.source === 'k24' ? k24 : pt1000;
  if (!raw || raw <= 0) return 0;
  return Math.round((raw / 1.1) * m.purity);
}
function getChainPrice(chainType, metalType) {
  const mk = metalType === 'K18' ? 'K18' : 'PT850';
  return CHAIN_PRICES[chainType + '_' + mk] || 0;
}
function calcProcessingCost(type, meleeCount, centerCount) {
  const base = type === 'cast_oneoff' ? PROCESSING.cast_oneoff : type === 'cast_mass' ? PROCESSING.cast_mass : PROCESSING.handmade;
  return base + meleeCount * PROCESSING.meleeSetPerPc + centerCount * PROCESSING.centerSetPerPc + PROCESSING.polish;
}

// メレ
function getMeleeWeightBand(perStoneCt) {
  if (perStoneCt < 0.10) return "〜0.10ct";
  if (perStoneCt < 0.30) return "0.10〜0.30ct";
  if (perStoneCt < 0.50) return "0.30〜0.50ct";
  return "0.50ct〜";
}
function calcMeleeGuide(color, hc, clarity, cut, totalCt, count) {
  const perStone = count > 0 ? totalCt / count : totalCt;
  const band = getMeleeWeightBand(perStone);
  return Math.round(MELEE_BASE * MELEE_COLOR[color] * MELEE_HC[hc] * MELEE_CLARITY[clarity] * MELEE_CUT[cut] * MELEE_WEIGHT[band]);
}

// センターダイヤ
function getCenterCaratCoeff(ct) {
  let coeff = 0.72;
  for (const b of CENTER_CARAT_BANDS) { if (ct >= b.min) coeff = b.coeff; }
  return coeff;
}
function calcCenterDiamondGuide(color, clarity, cut, cert, ct, shape) {
  const shapeC = SHAPE_COEFF[shape] || 1.0;
  return Math.round(CENTER_BASE * CENTER_COLOR[color] * CENTER_CLARITY[clarity] * CENTER_CUT[cut] * CENTER_CERT[cert] * getCenterCaratCoeff(ct) * shapeC);
}

// サイズ係数（線形補間）
function getSizeCoeff(ct, sizeMap) {
  const points = Object.keys(sizeMap).map(Number).sort((a,b)=>a-b);
  if (ct <= points[0]) return sizeMap[points[0]];
  if (ct >= points[points.length-1]) return sizeMap[points[points.length-1]];
  for (let i = 0; i < points.length-1; i++) {
    if (ct >= points[i] && ct < points[i+1]) {
      const ratio = (ct - points[i]) / (points[i+1] - points[i]);
      return sizeMap[points[i]] + ratio * (sizeMap[points[i+1]] - sizeMap[points[i]]);
    }
  }
  return 1.0;
}

// 色石ガイド計算
function calcColoredGuide(stoneName, colorGrade, clarity, ct, shape, heat, originCert) {
  const stone = STONE_DB[stoneName];
  if (!stone) return 0;
  const clarityC = CS_CLARITY[clarity] || 1.0;
  const shapeC = SHAPE_COEFF[shape] || 1.0;

  let basePrice1ct = 0; // 1.0ct/内包物少ないの単価

  if (stone.type === 'std') {
    // 標準石: basePrice × 色味係数
    const colorC = STD_COLOR[colorGrade] || 1.0;
    basePrice1ct = stone.basePrice * colorC;
  } else if (stone.type === 'simple') {
    // エメラルド、パパラチア、翡翠: 色グレード別の固定価格
    basePrice1ct = stone.prices[colorGrade] || 0;
  } else if (stone.type === 'heat') {
    // ルビー、サファイア: 色グレード × 加熱/非加熱
    const heatPrices = stone.prices[colorGrade];
    if (heatPrices) basePrice1ct = heatPrices[heat] || 0;
  } else if (stone.type === 'origin') {
    // パライバ: 色グレード × 産地証明
    const originPrices = stone.prices[colorGrade];
    if (originPrices) basePrice1ct = originPrices[originCert] || 0;
  }

  const sizeMap = stone.sizeCoeff || SIZE_STD;
  const sizeC = getSizeCoeff(ct, sizeMap);
  let guide = Math.round(basePrice1ct * sizeC * clarityC * shapeC);

  // パライバ特例: 0.3ct以下 + GIAブラジル + 色最高 → 最低1,000,000円/ct
  if (stone.specialMin) {
    const sm = stone.specialMin;
    if (colorGrade === sm.condition.color && originCert === sm.condition.origin && ct <= sm.condition.maxCt) {
      guide = Math.max(guide, sm.minPrice);
    }
  }

  return guide;
}

// カラーダイヤガイド計算
function calcColorDiaGuide(type, grade, cert, ct, shape) {
  const grades = type === "ピンクダイヤモンド" ? PINK_DIA_GRADES : YELLOW_DIA_GRADES;
  const basePrice1ct = grades[grade] || 0;
  const certC = COLOR_DIA_CERT[cert] || 1.0;
  // サイズ係数: センターダイヤのカラット帯を1.0ct基準に正規化
  const caratCoeffAt1 = getCenterCaratCoeff(1.0); // 1.333
  const caratC = getCenterCaratCoeff(ct) / caratCoeffAt1;
  const shapeC = SHAPE_COEFF[shape] || 1.0;
  return Math.round(basePrice1ct * certC * caratC * shapeC);
}

// 仕入れ判断コメント
function getJudgmentComment(impliedGuide, refGuide) {
  if (refGuide <= 0) return null;
  const ratio = (impliedGuide - refGuide) / refGuide;
  if (ratio <= 0) return { cls:'great', text:'💰 お買い得商品！ガイドより安い仕入れです。' };
  if (ratio <= 0.05) return { cls:'good', text:'👍 色味や見た目がよければ買い。ガイドとほぼ同等です。' };
  if (ratio <= 0.10) return { cls:'fair', text:'🤔 ものによって検討の余地あり。石の力（輝き・色味）がほしい。' };
  if (ratio <= 0.15) return { cls:'caution', text:'⚠ 希少で他では手に入らないならあり。慎重に判断を。' };
  return { cls:'warn', text:'🚫 売れる自信がないと厳しい水準です。ガイドの'+Math.round(ratio*100)+'%超過。' };
}

// ===== UI状態 =====
let currentTab = 'forward';
let itemType = 'ring';
let itemTypeR = 'ring';
let centerTypeF = 'diamond';
let centerTypeR = 'diamond';

// 石種セレクト初期化
function populateStoneSelect(selId) {
  const sel = document.getElementById(selId);
  sel.innerHTML = '';
  STONE_LIST.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name; opt.textContent = name;
    sel.appendChild(opt);
  });
}

// 色味セレクト更新
function updateColorGradeOptions(prefix) {
  const stoneName = document.getElementById(prefix+'-coloredStone').value;
  const sel = document.getElementById(prefix+'-coloredColor');
  const stone = STONE_DB[stoneName];
  sel.innerHTML = '';

  let grades;
  if (stone.type === 'std') {
    grades = ["色最高","色キレイ","くすみ感"];
  } else {
    grades = stone.colorGrades;
  }
  grades.forEach((g,i) => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    if ((stone.type === 'std' && g === '色キレイ') || (!stone.type !== 'std' && i === Math.min(1, grades.length-1))) opt.selected = true;
    sel.appendChild(opt);
  });
  // デフォルト選択: 色キレイがあればそれを選択
  const kirei = Array.from(sel.options).find(o => o.value === '色キレイ');
  if (kirei) kirei.selected = true;
}

// 石種変更時のUI切り替え
function onStoneChange(prefix) {
  const stoneName = document.getElementById(prefix+'-coloredStone').value;
  const stone = STONE_DB[stoneName];

  // 色味オプション更新
  updateColorGradeOptions(prefix);

  // 加熱/非加熱の表示切替
  const heatRow = document.getElementById(prefix+'-coloredHeatRow');
  heatRow.classList.toggle('hidden', stone.type !== 'heat');

  // 産地証明の表示切替 + 選択肢の動的変更
  const originRow = document.getElementById(prefix+'-coloredOriginCertRow');
  originRow.classList.toggle('hidden', stone.type !== 'origin');
  if (stone.type === 'origin') {
    const sel = document.getElementById(prefix+'-coloredOriginCert');
    sel.innerHTML = '';
    // 石種に応じた産地証明選択肢を生成
    const firstKey = Object.keys(stone.prices)[0];
    const certOptions = Object.keys(stone.prices[firstKey]);
    certOptions.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt; o.textContent = opt;
      sel.appendChild(o);
    });
  }
}

// カラーダイヤグレード更新
function updateColorDiaGradeOptions(prefix) {
  const type = document.getElementById(prefix+'-colorDiaType').value;
  const sel = document.getElementById(prefix+'-colorDiaGrade');
  const grades = type === "ピンクダイヤモンド" ? PINK_DIA_GRADES : YELLOW_DIA_GRADES;
  sel.innerHTML = '';
  Object.keys(grades).forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    sel.appendChild(opt);
  });
}
function onColorDiaTypeChange(prefix) {
  updateColorDiaGradeOptions(prefix);
}

// タブ切替
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((t,i) => t.classList.toggle('active', (i===0&&tab==='forward')||(i===1&&tab==='reverse')));
  document.getElementById('tab-forward').classList.toggle('hidden', tab!=='forward');
  document.getElementById('tab-reverse').classList.toggle('hidden', tab!=='reverse');
}

function setItemType(t) {
  itemType = t;
  document.querySelectorAll('#tab-forward > .section:first-child .item-type-btn').forEach((btn,i) =>
    btn.classList.toggle('active', ['ring','necklace','other'][i]===t));
  document.getElementById('f-chainSection').classList.toggle('hidden', t!=='necklace');
}
function setItemTypeR(t) {
  itemTypeR = t;
  document.querySelectorAll('#tab-reverse .section:first-child .item-type-btn').forEach((btn,i) =>
    btn.classList.toggle('active', ['ring','necklace','other'][i]===t));
  document.getElementById('r-chainSection').classList.toggle('hidden', t!=='necklace');
}

function setCenterType(t, prefix) {
  if (prefix === 'f') {
    centerTypeF = t;
    const types = ['diamond','colored','color_dia','manual'];
    document.querySelectorAll('#tab-forward .cs-type-btn').forEach((btn,i) =>
      btn.classList.toggle('active', types[i]===t));
    types.forEach(ty => {
      const el = document.getElementById('f-center' + ({diamond:'Diamond',colored:'Colored',color_dia:'ColorDia',manual:'Manual'}[ty]));
      if (el) el.classList.toggle('hidden', ty !== t);
    });
  } else {
    centerTypeR = t;
    const types = ['diamond','colored','color_dia'];
    document.querySelectorAll('#tab-reverse .cs-type-btn').forEach((btn,i) =>
      btn.classList.toggle('active', types[i]===t));
    types.forEach(ty => {
      const el = document.getElementById('r-center' + ({diamond:'Diamond',colored:'Colored',color_dia:'ColorDia'}[ty]));
      if (el) el.classList.toggle('hidden', ty !== t);
    });
  }
}

function toggleSwitch(el) {
  el.classList.toggle('on');
  const id = el.id;
  if (id === 'f-hasCenter') document.getElementById('f-centerSection').classList.toggle('hidden', !el.classList.contains('on'));
  if (id === 'f-hasMelee') document.getElementById('f-meleeSection').classList.toggle('hidden', !el.classList.contains('on'));
  if (id === 'r-hasMelee') document.getElementById('r-meleeSection').classList.toggle('hidden', !el.classList.contains('on'));
}

function updateMetalPrice() {
  const metal = document.getElementById('f-metal').value;
  const k24 = parseFloat(document.getElementById('f-k24').value) || 0;
  const pt1000 = parseFloat(document.getElementById('f-pt1000').value) || 0;
  const ppg = getMetalPricePerG(metal, k24, pt1000);
  document.getElementById('f-metalPriceDisplay').textContent = metal + '単価: ' + (ppg > 0 ? fmt(ppg) + '円/g' : '---円/g');
}
function updateMetalPriceR() {
  const metal = document.getElementById('r-metal').value;
  const k24 = parseFloat(document.getElementById('r-k24').value) || 0;
  const pt1000 = parseFloat(document.getElementById('r-pt1000').value) || 0;
  const ppg = getMetalPricePerG(metal, k24, pt1000);
  document.getElementById('r-metalPriceDisplay').textContent = metal + '単価: ' + (ppg > 0 ? fmt(ppg) + '円/g' : '---円/g');
}

// メレ1石ct自動計算
['f','r'].forEach(prefix => {
  const totalEl = document.getElementById(prefix+'-meleeTotalCt');
  const countEl = document.getElementById(prefix+'-meleeCount');
  const perEl = document.getElementById(prefix+'-meleePerStone');
  if (totalEl && countEl && perEl) {
    [totalEl, countEl].forEach(el => el.addEventListener('input', () => {
      const t = parseFloat(totalEl.value) || 0;
      const c = parseInt(countEl.value) || 0;
      perEl.value = (c > 0 && t > 0) ? (t/c).toFixed(3) + 'ct' : '';
    }));
  }
});

// 色石1石ct自動計算
['f','r'].forEach(prefix => {
  const totalEl = document.getElementById(prefix+'-coloredTotalCt');
  const countEl = document.getElementById(prefix+'-coloredCount');
  const perEl = document.getElementById(prefix+'-coloredPerStone');
  if (totalEl && countEl && perEl) {
    [totalEl, countEl].forEach(el => el.addEventListener('input', () => {
      const t = parseFloat(totalEl.value) || 0;
      const c = parseInt(countEl.value) || 0;
      perEl.value = (c > 0 && t > 0) ? (t/c).toFixed(3) + 'ct' : '';
    }));
  }
});

// 初期化
populateStoneSelect('f-coloredStone');
populateStoneSelect('r-coloredStone');
onStoneChange('f');
onStoneChange('r');
updateColorDiaGradeOptions('f');
updateColorDiaGradeOptions('r');

// ===== 原価計算 =====
function calcForward() {
  const metal = document.getElementById('f-metal').value;
  const totalWeight = parseFloat(document.getElementById('f-totalWeight').value) || 0;
  const k24 = parseFloat(document.getElementById('f-k24').value) || 0;
  const pt1000 = parseFloat(document.getElementById('f-pt1000').value) || 0;
  const processingType = document.getElementById('f-processing').value;
  const hasCenter = document.getElementById('f-hasCenter').classList.contains('on');
  const hasMelee = document.getElementById('f-hasMelee').classList.contains('on');
  const metalPPG = getMetalPricePerG(metal, k24, pt1000);
  if (metalPPG <= 0) { alert('地金価格を入力してください'); return; }
  if (totalWeight <= 0) { alert('総重量を入力してください'); return; }

  let centerCt = 0, centerGuide = 0, centerCount = 0, centerLabel = '';
  if (hasCenter) {
    if (centerTypeF === 'diamond') {
      centerCt = parseFloat(document.getElementById('f-centerCt').value) || 0;
      centerCount = parseInt(document.getElementById('f-centerCount').value) || 1;
      const color = document.getElementById('f-centerColor').value;
      const clarity = document.getElementById('f-centerClarity').value;
      const cut = document.getElementById('f-centerCut').value;
      const cert = document.getElementById('f-centerCert').value;
      const shape = document.getElementById('f-centerShape').value;
      centerGuide = calcCenterDiamondGuide(color, clarity, cut, cert, centerCt, shape);
      centerLabel = 'ダイヤ '+color+'/'+clarity+'/'+cut+'/'+cert+(shape!=='round'?' ('+shape+')':'');
      document.getElementById('f-centerGuideDisplay').textContent = 'ガイド単価: '+fmt(centerGuide)+'円/ct';
    } else if (centerTypeF === 'colored') {
      const coloredTotalCt = parseFloat(document.getElementById('f-coloredTotalCt').value) || 0;
      centerCount = parseInt(document.getElementById('f-coloredCount').value) || 1;
      centerCt = centerCount > 0 ? coloredTotalCt / centerCount : coloredTotalCt;
      const stoneName = document.getElementById('f-coloredStone').value;
      const colorGrade = document.getElementById('f-coloredColor').value;
      const clarity = document.getElementById('f-coloredClarity').value;
      const shape = document.getElementById('f-coloredShape').value;
      const heat = document.getElementById('f-coloredHeat').value;
      const originCert = document.getElementById('f-coloredOriginCert').value;
      centerGuide = calcColoredGuide(stoneName, colorGrade, clarity, centerCt, shape, heat, originCert);
      const stone = STONE_DB[stoneName];
      let extra = '';
      if (stone.type === 'heat') extra = '/'+heat;
      if (stone.type === 'origin') extra = '/'+originCert;
      centerLabel = stoneName+' '+colorGrade+'/'+clarity+extra;
      document.getElementById('f-coloredGuideDisplay').textContent = 'ガイド単価: '+fmt(centerGuide)+'円/ct (1石'+centerCt.toFixed(2)+'ct)';
    } else if (centerTypeF === 'color_dia') {
      centerCt = parseFloat(document.getElementById('f-colorDiaCt').value) || 0;
      centerCount = parseInt(document.getElementById('f-colorDiaCount').value) || 1;
      const diaType = document.getElementById('f-colorDiaType').value;
      const grade = document.getElementById('f-colorDiaGrade').value;
      const cert = document.getElementById('f-colorDiaCert').value;
      const shape = document.getElementById('f-colorDiaShape').value;
      centerGuide = calcColorDiaGuide(diaType, grade, cert, centerCt, shape);
      centerLabel = diaType+' '+grade+'/'+cert;
      document.getElementById('f-colorDiaGuideDisplay').textContent = 'ガイド単価: '+fmt(centerGuide)+'円/ct';
    } else {
      centerCt = parseFloat(document.getElementById('f-manualCt').value) || 0;
      centerGuide = parseFloat(document.getElementById('f-manualGuide').value) || 0;
      centerCount = parseInt(document.getElementById('f-manualCount').value) || 1;
      centerLabel = '手動入力';
    }
  }

  let meleeTotalCt = 0, meleeCount = 0, meleeGuide = 0;
  if (hasMelee) {
    meleeTotalCt = parseFloat(document.getElementById('f-meleeTotalCt').value) || 0;
    meleeCount = parseInt(document.getElementById('f-meleeCount').value) || 0;
    meleeGuide = calcMeleeGuide(
      document.getElementById('f-meleeColor').value, document.getElementById('f-meleeHC').value,
      document.getElementById('f-meleeClarity').value, document.getElementById('f-meleeCut').value,
      meleeTotalCt, meleeCount);
    document.getElementById('f-meleeGuideDisplay').textContent = 'ガイド単価: '+fmt(meleeGuide)+'円/ct';
  }

  let stoneWeightG = 0;
  if (hasCenter) stoneWeightG += ctToGram(centerCt * centerCount);
  if (hasMelee) stoneWeightG += ctToGram(meleeTotalCt);
  const metalWeightG = Math.max(0, totalWeight - stoneWeightG);
  const metalCost = Math.round(metalWeightG * metalPPG);
  const centerStoneCost = hasCenter ? Math.round(centerGuide * centerCt * centerCount) : 0;
  const meleeStoneCost = hasMelee ? Math.round(meleeGuide * meleeTotalCt) : 0;
  const totalStoneCost = centerStoneCost + meleeStoneCost;
  const processingCost = calcProcessingCost(processingType, meleeCount, hasCenter ? centerCount : 0);
  let chainCost = 0;
  if (itemType === 'necklace') chainCost = getChainPrice(document.getElementById('f-chainType').value, metal);

  const subtotal = metalCost + totalStoneCost + processingCost + chainCost;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;
  // 販売価格4段階（税込合計に対する倍率）
  const priceUsed = Math.round(total * 1.3);
  const priceOnline = Math.round(total * 1.7);
  const priceShop = Math.round(total * 2.2);
  const priceDept = Math.round(total * 3.0);

  const el = document.getElementById('forward-result');
  el.classList.remove('hidden');
  el.innerHTML = '<div class="result-card">'
    + '<div class="result-row"><span class="label">地金 ('+metal+' '+metalWeightG.toFixed(2)+'g × '+fmt(metalPPG)+'円)</span><span class="value">'+fmt(metalCost)+'円</span></div>'
    + (hasCenter ? '<div class="result-row"><span class="label">中石 ('+centerLabel+' '+(centerTypeF==='colored'?(centerCt*centerCount).toFixed(2)+'ct('+centerCount+'石)':centerCt+'ct×'+centerCount+'石')+' @'+fmt(centerGuide)+')</span><span class="value">'+fmt(centerStoneCost)+'円</span></div>' : '')
    + (hasMelee ? '<div class="result-row"><span class="label">メレ ('+meleeTotalCt+'ct×'+meleeCount+'石 @'+fmt(meleeGuide)+')</span><span class="value">'+fmt(meleeStoneCost)+'円</span></div>' : '')
    + '<div class="result-row"><span class="label">加工費</span><span class="value">'+fmt(processingCost)+'円</span></div>'
    + (chainCost > 0 ? '<div class="result-row"><span class="label">チェーン</span><span class="value">'+fmt(chainCost)+'円</span></div>' : '')
    + '<div class="result-row"><span class="label">小計</span><span class="value">'+fmt(subtotal)+'円</span></div>'
    + '<div class="result-row"><span class="label">消費税 (10%)</span><span class="value">'+fmt(tax)+'円</span></div>'
    + '<div class="result-row total"><span class="label">税込原価合計</span><span class="value">'+fmt(total)+'円</span></div>'
    + '<div style="border-top:1px solid var(--gold-light);margin:10px 0;padding-top:10px">'
    + '<div style="font-size:11px;color:var(--sub);margin-bottom:6px;letter-spacing:1px">▼ 販売価格目安（税込原価×倍率）</div>'
    + '<div class="result-row"><span class="label">中古販売価格 (×1.3)</span><span class="value">'+fmt(priceUsed)+'円</span></div>'
    + '<div class="result-row"><span class="label">無店舗販売価格 (×1.7)</span><span class="value">'+fmt(priceOnline)+'円</span></div>'
    + '<div class="result-row"><span class="label">店舗販売価格 (×2.2)</span><span class="value" style="color:var(--warn)">'+fmt(priceShop)+'円</span></div>'
    + '<div class="result-row"><span class="label">百貨店等価格 (×3.0)</span><span class="value" style="color:var(--warn);font-size:15px">'+fmt(priceDept)+'円</span></div>'
    + '</div>'
    + '<div style="font-size:10px;color:var(--sub);margin-top:8px;text-align:center">※ 上記は参考試算値であり、実際の市場価格を保証するものではありません</div>'
    + '</div>';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== 仕入れ値逆算 =====
function calcReverse() {
  const purchasePrice = parseFloat(document.getElementById('r-purchasePrice').value) || 0;
  if (purchasePrice <= 0) { alert('仕入れ値を入力してください'); return; }
  const metal = document.getElementById('r-metal').value;
  const totalWeight = parseFloat(document.getElementById('r-totalWeight').value) || 0;
  const k24 = parseFloat(document.getElementById('r-k24').value) || 0;
  const pt1000 = parseFloat(document.getElementById('r-pt1000').value) || 0;
  const processingType = document.getElementById('r-processing').value;
  const hasMelee = document.getElementById('r-hasMelee').classList.contains('on');
  const metalPPG = getMetalPricePerG(metal, k24, pt1000);
  if (metalPPG <= 0) { alert('地金価格を入力してください'); return; }
  if (totalWeight <= 0) { alert('総重量を入力してください'); return; }

  let centerCt = 0, centerCount = 1, refGuide = 0, refLabel = '';
  if (centerTypeR === 'diamond') {
    centerCt = parseFloat(document.getElementById('r-centerCt').value) || 0;
    centerCount = parseInt(document.getElementById('r-centerCount').value) || 1;
    const shape = document.getElementById('r-centerShape').value;
    const color = document.getElementById('r-centerColor').value;
    const clarity = document.getElementById('r-centerClarity').value;
    const cut = document.getElementById('r-centerCut').value;
    const cert = document.getElementById('r-centerCert').value;
    refGuide = calcCenterDiamondGuide(color, clarity, cut, cert, centerCt, shape);
    refLabel = 'ダイヤ '+color+'/'+clarity+'/'+cut+'/'+cert;
  } else if (centerTypeR === 'colored') {
    const coloredTotalCt = parseFloat(document.getElementById('r-coloredTotalCt').value) || 0;
    centerCount = parseInt(document.getElementById('r-coloredCount').value) || 1;
    centerCt = centerCount > 0 ? coloredTotalCt / centerCount : coloredTotalCt;
    const shape = document.getElementById('r-coloredShape').value;
    const stoneName = document.getElementById('r-coloredStone').value;
    const colorGrade = document.getElementById('r-coloredColor').value;
    const clarity = document.getElementById('r-coloredClarity').value;
    const heat = document.getElementById('r-coloredHeat').value;
    const originCert = document.getElementById('r-coloredOriginCert').value;
    refGuide = calcColoredGuide(stoneName, colorGrade, clarity, centerCt, shape, heat, originCert);
    const stone = STONE_DB[stoneName];
    let extra = '';
    if (stone.type === 'heat') extra = '/'+heat;
    if (stone.type === 'origin') extra = '/'+originCert;
    refLabel = stoneName+' '+colorGrade+'/'+clarity+extra;
  } else if (centerTypeR === 'color_dia') {
    centerCt = parseFloat(document.getElementById('r-colorDiaCt').value) || 0;
    centerCount = parseInt(document.getElementById('r-colorDiaCount').value) || 1;
    const shape = document.getElementById('r-colorDiaShape').value;
    const diaType = document.getElementById('r-colorDiaType').value;
    const grade = document.getElementById('r-colorDiaGrade').value;
    const cert = document.getElementById('r-colorDiaCert').value;
    refGuide = calcColorDiaGuide(diaType, grade, cert, centerCt, shape);
    refLabel = diaType+' '+grade+'/'+cert;
  }
  if (centerCt <= 0) { alert('中石のカラット数を入力してください'); return; }

  let meleeTotalCt = 0, meleeCount = 0, meleeGuide = 0, meleeCost = 0;
  if (hasMelee) {
    meleeTotalCt = parseFloat(document.getElementById('r-meleeTotalCt').value) || 0;
    meleeCount = parseInt(document.getElementById('r-meleeCount').value) || 0;
    meleeGuide = calcMeleeGuide(
      document.getElementById('r-meleeColor').value, document.getElementById('r-meleeHC').value,
      document.getElementById('r-meleeClarity').value, document.getElementById('r-meleeCut').value,
      meleeTotalCt, meleeCount);
    meleeCost = Math.round(meleeGuide * meleeTotalCt);
    document.getElementById('r-meleeGuideDisplay').textContent = 'ガイド単価: '+fmt(meleeGuide)+'円/ct';
  }

  let stoneWeightG = ctToGram(centerCt * centerCount);
  if (hasMelee) stoneWeightG += ctToGram(meleeTotalCt);
  const metalWeightG = Math.max(0, totalWeight - stoneWeightG);
  const metalCost = Math.round(metalWeightG * metalPPG);
  const processingCost = calcProcessingCost(processingType, meleeCount, centerCount);
  let chainCost = 0;
  if (itemTypeR === 'necklace') chainCost = getChainPrice(document.getElementById('r-chainType').value, metal);

  const subtotal = Math.round(purchasePrice / 1.1);
  const tax = purchasePrice - subtotal;
  const centerStoneCost = subtotal - metalCost - meleeCost - processingCost - chainCost;
  const totalCenterCt = centerCt * centerCount;
  const impliedGuide = totalCenterCt > 0 ? Math.round(centerStoneCost / totalCenterCt) : 0;

  const judgment = getJudgmentComment(impliedGuide, refGuide);

  const el = document.getElementById('reverse-result');
  el.classList.remove('hidden');
  el.innerHTML = '<div class="result-card reverse">'
    + '<div class="result-row"><span class="label">仕入れ値（税込）</span><span class="value">'+fmt(purchasePrice)+'円</span></div>'
    + '<div class="result-row"><span class="label">税抜小計</span><span class="value">'+fmt(subtotal)+'円</span></div>'
    + '<div style="border-top:1px solid #e2e8f0; margin:6px 0"></div>'
    + '<div class="result-row"><span class="label">地金 ('+metal+' '+metalWeightG.toFixed(2)+'g)</span><span class="value">-'+fmt(metalCost)+'円</span></div>'
    + (hasMelee ? '<div class="result-row"><span class="label">メレ ('+meleeTotalCt+'ct @'+fmt(meleeGuide)+')</span><span class="value">-'+fmt(meleeCost)+'円</span></div>' : '')
    + '<div class="result-row"><span class="label">加工費</span><span class="value">-'+fmt(processingCost)+'円</span></div>'
    + (chainCost > 0 ? '<div class="result-row"><span class="label">チェーン</span><span class="value">-'+fmt(chainCost)+'円</span></div>' : '')
    + '<div class="result-row total reverse"><span class="label">中石コスト ('+totalCenterCt+'ct)</span><span class="value">'+(centerStoneCost>=0?fmt(centerStoneCost):'<span style="color:red">'+fmt(centerStoneCost)+'</span>')+'円</span></div>'
    + '<div class="result-row" style="margin-top:8px;font-size:15px"><span class="label" style="font-weight:700;color:var(--accent2)">逆算ガイド単価</span><span class="value" style="color:var(--accent2);font-size:18px">'+fmt(impliedGuide)+'円/ct</span></div>'
    + (refGuide > 0 ? '<div style="font-size:12px;color:var(--sub);text-align:right;margin-top:4px">登録ガイド('+refLabel+'): '+fmt(refGuide)+'円/ct → 差額'+(impliedGuide>=refGuide?'+':'')+fmt(impliedGuide-refGuide)+'円 ('+(impliedGuide>=refGuide?'+':'')+((impliedGuide-refGuide)/refGuide*100).toFixed(1)+'%)</div>' : '')
    + (judgment ? '<div class="comment-box '+judgment.cls+'">'+judgment.text+'</div>' : '')
    + (centerStoneCost < 0 ? '<div style="color:red;font-size:12px;margin-top:8px;text-align:center">⚠ 中石コストがマイナスです。仕入れ値が地金+加工費より低い可能性があります。</div>' : '')
    + '</div>';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
