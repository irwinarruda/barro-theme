import type { Output } from '../palette';

const Brick = '#B64D3F';
const White = '#FFFFFF';
const Slate = '#111418';
const Tones = ['dark', 'light', 'neutral'] as const;

type Tone = (typeof Tones)[number];
type Side = 'stem' | 'point' | 'bar' | 'diag' | 'arm' | 'open';
type Glyph = { d: string; width: number; left: Side; right: Side; dot?: boolean };
type Shape = { d: string; width: number; after: Partial<Record<Side, number>>; before: Partial<Record<Side, number>> };
type Colors = Record<Tone, { ink: string; fill: string }>;
type Word = { text: string; chevron: boolean; shape?: Shape; ink: string; fill: string };

const Glyphs: Record<string, Glyph> = {
  a: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53M93.53 -100V0', width: 93.53, left: 'point', right: 'stem' },
  b: { d: 'M0 -152V0H64.67L93.53 -50L64.67 -100H0', width: 93.53, left: 'stem', right: 'point' },
  c: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53', width: 93.53, left: 'point', right: 'open' },
  d: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53M93.53 -152V0', width: 93.53, left: 'point', right: 'stem' },
  f: { d: 'M30 0V-117.36L50 -152H80M0 -100H76', width: 80, left: 'bar', right: 'arm' },
  h: { d: 'M0 -152V0M0 -100H50L78.87 -50V0', width: 78.87, left: 'stem', right: 'stem' },
  i: { d: 'M0 0V-100', width: 0, left: 'stem', right: 'stem', dot: true },
  n: { d: 'M0 0V-100H50L78.87 -50V0', width: 78.87, left: 'stem', right: 'stem' },
  r: { d: 'M0 0V-65.36L20 -100H50', width: 50, left: 'stem', right: 'arm' },
  t: { d: 'M30 -140V-34.64L50 0H80M0 -100H76', width: 80, left: 'bar', right: 'open' },
  u: { d: 'M0 -100V-50L28.87 0H78.87V-100', width: 78.87, left: 'stem', right: 'stem' },
  v: { d: 'M0 -100L57.73 0L115.47 -100', width: 115.47, left: 'diag', right: 'diag' },
  w: { d: 'M0 -100L34 0L68 -100L102 0L136 -100', width: 136, left: 'diag', right: 'diag' },
};

const Gaps: Record<string, number> = {
  'stem>stem': 38,
  'stem>point': 34,
  'stem>bar': 32,
  'stem>diag': 36,
  'point>stem': 34,
  'point>point': 30,
  'point>bar': 30,
  'point>diag': 32,
  'arm>stem': 34,
  'arm>point': 18,
  'arm>bar': 30,
  'arm>diag': 34,
  'open>stem': 34,
  'open>point': 30,
  'open>bar': 30,
  'open>diag': 32,
  'diag>stem': 36,
  'diag>point': 28,
  'diag>bar': 30,
  'diag>diag': 30,
};

const Lead: Partial<Record<Side, number>> = { stem: 84, point: 69, bar: 69, diag: 72 };
const LeadToShape = 48.82;
const WordSpace = 46;
const ChevronTip = 44.18;
const Chevron = 'M13 -104L44.18 -50L13 4';

const Hexagon: Shape = {
  d: 'M135.56 -55.2Q138.56 -50 135.56 -44.8L106.92 4.8Q103.92 10 97.92 10L40.64 10Q34.64 10 31.64 4.8L3 -44.8Q0 -50 3 -55.2L31.64 -104.8Q34.64 -110 40.64 -110L97.92 -110Q103.92 -110 106.92 -104.8Z',
  width: 138.56,
  after: { diag: 5.59, stem: 22, arm: 14, point: 18, open: 18 },
  before: { stem: 22, point: 18, bar: 18, diag: 14 },
};
const Block: Shape = {
  d: 'M16 -106H120A16 16 0 0 1 136 -90V-10A16 16 0 0 1 120 6H16A16 16 0 0 1 0 -10V-90A16 16 0 0 1 16 -106Z',
  width: 136,
  after: { arm: 25.76, stem: 28, point: 24, open: 24, diag: 14 },
  before: { stem: 28, point: 24, bar: 24, diag: 20 },
};
const Bubble: Shape = {
  d: 'M60 10H10.39A6 6 0 0 1 5.2 1L13.06 -12.63A60 60 0 1 1 60 10Z',
  width: 120,
  after: { point: 22, stem: 26, arm: 18, open: 22, diag: 10 },
  before: { bar: 24, stem: 28, point: 22, diag: 22 },
};

const Honey: Colors = {
  dark: { ink: '#F3E7CF', fill: '#F5A623' },
  light: { ink: '#33291A', fill: '#B8720A' },
  neutral: { ink: '#B8720A', fill: '#F5A623' },
};
const Clay: Colors = {
  dark: { ink: '#E6EAEF', fill: Brick },
  light: { ink: '#21272D', fill: Brick },
  neutral: { ink: '#7E848A', fill: Brick },
};

function number(value: number) {
  return String(Number(value.toFixed(2)));
}

function svg(viewBox: string, label: string, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}">\n<title>${label}</title>\n${body}\n</svg>\n`;
}

function chevron(ink: string) {
  return `<path d="${Chevron}" fill="none" stroke="${ink}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function strokes(ink: string, paths: string[]) {
  const lines = paths.map((path) => `\n  ${path}`).join('');
  return `<g fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">${lines}\n</g>`;
}

function set(word: Word) {
  let x = word.chevron ? ChevronTip : 25;
  let previous: Side | 'chevron' | 'shape' | 'start' = word.chevron ? 'chevron' : 'start';
  const paths: string[] = [];
  const solids: string[] = [];
  let firstDot = true;
  for (const char of word.text) {
    if (char === ' ') {
      x += WordSpace;
      continue;
    }
    if (char === 'o' && word.shape) {
      if (previous === 'chevron') x += LeadToShape;
      else if (previous !== 'start' && previous !== 'shape') x += word.shape.after[previous]!;
      solids.push(`<path transform="translate(${number(x)} 0)" d="${word.shape.d}" fill="${word.fill}"/>`);
      x += word.shape.width;
      previous = 'shape';
      continue;
    }
    const glyph = Glyphs[char]!;
    if (previous === 'chevron') x += Lead[glyph.left]!;
    else if (previous === 'shape') x += word.shape!.before[glyph.left]!;
    else if (previous !== 'start') x += Gaps[`${previous}>${glyph.left}`]!;
    paths.push(`<path transform="translate(${number(x)} 0)" d="${glyph.d}"/>`);
    if (glyph.dot) {
      solids.push(`<rect x="${number(x - 15)}" y="-153" width="30" height="30" rx="7" fill="${firstDot ? Brick : word.ink}"/>`);
      firstDot = false;
    }
    x += glyph.width;
    previous = glyph.right;
  }
  const parts = [...(word.chevron ? [chevron(word.ink)] : []), ...(paths.length ? [strokes(word.ink, paths)] : []), ...solids];
  return { body: parts.join('\n'), parts, right: previous === 'shape' ? x : x + 10 };
}

function suffix(tone: Tone) {
  return tone === 'neutral' ? '' : `-${tone}`;
}

function tile(label: string, inner: string, radius = 112) {
  const corner = radius ? ` rx="${radius}"` : '';
  return svg('0 0 512 512', label, `<rect width="512" height="512"${corner} fill="${Slate}"/>\n${inner}`);
}

function product(folder: string, name: string, label: string, text: string, shape: Shape, colors: Colors) {
  const shapeRight = ChevronTip + LeadToShape + shape.width;
  const center = shapeRight / 2;
  const logo = (tone: Tone) => {
    const { body, right } = set({ text, chevron: true, shape, ...colors[tone] });
    return svg(`-4 -166 ${number(right + 8)} 187`, label, body);
  };
  const mark = (tone: Tone) => {
    const { body } = set({ text: 'o', chevron: true, shape, ...colors[tone] });
    return svg(`${number(center - 124)} -174 248 248`, label, body);
  };
  const onTile = (scale: number, ink: string, x = 256, y = 256) =>
    `<g transform="translate(${x} ${y}) scale(${scale}) translate(${number(-center)} 50)">${set({ text: 'o', chevron: true, shape, ink, fill: colors.dark.fill }).parts.join('')}</g>`;
  const files: Output[] = Tones.flatMap((tone) => [
    { path: `${folder}/${name}logo${suffix(tone)}.svg`, text: logo(tone) },
    { path: `${folder}/${name}mark${suffix(tone)}.svg`, text: mark(tone) },
  ]);
  return { files, onTile };
}

function favo(): Output[] {
  return product('brand/favo', '', 'favo', 'favo', Hexagon, Honey).files;
}

function barro(): Output[] {
  return product('assets', '', 'barro', 'barro', Block, Clay).files;
}

function chatbot(): Output[] {
  const label = 'The Chatbot';
  const { files, onTile } = product('brand/chatbot', '', label, 'chatbot', Bubble, Clay);
  const avatar = svg('0 0 1024 1024', label, `<rect width="1024" height="1024" fill="${Slate}"/>\n${onTile(2.3, Clay.dark.ink, 512, 512)}`);
  return [
    ...files,
    { path: 'brand/chatbot/icon.svg', text: tile(label, onTile(1.8, White)) },
    { path: 'brand/chatbot/icon-square.svg', text: tile(label, onTile(1.8, White), 0) },
    { path: 'brand/chatbot/avatar.svg', text: avatar },
  ];
}

function irwin(): Output[] {
  const label = 'Irwin Arruda';
  const wordmark = (text: string, ink: string, name: string) => {
    const { body, right } = set({ text, chevron: false, ink, fill: Brick });
    return svg(`0 -170 ${number(right + 10)} 190`, name, body);
  };
  const monogramI = (ink: string) =>
    svg(
      '0 0 128 128',
      label,
      `<path d="M64 112V60" fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round"/>\n<rect x="47" y="10" width="34" height="34" rx="8" fill="${Brick}"/>`,
    );
  const ia = (ink: string) => {
    const { body, right } = set({ text: 'ia', chevron: false, ink, fill: Brick });
    return { body, center: (15 + right) / 2, size: right + 15 + 60 };
  };
  const monogramIA = (ink: string) => {
    const { body, size } = ia(ink);
    return svg(`-30 -178 ${number(size)} ${number(size)}`, label, body);
  };
  const tileI = (radius: number) =>
    tile(
      label,
      `<path d="M256 392V236" fill="none" stroke="${White}" stroke-width="64" stroke-linecap="round"/>\n<rect x="203" y="96" width="106" height="106" rx="24" fill="${Brick}"/>`,
      radius,
    );
  const tileIA = (radius: number) => {
    const { body, center } = ia(White);
    return tile(label, `<g transform="translate(256 262) scale(2.05) translate(${number(-center)} 64)">${body}</g>`, radius);
  };
  return [
    ...Tones.flatMap((tone) => [
      { path: `brand/irwin/irwin${suffix(tone)}.svg`, text: wordmark('irwin', Clay[tone].ink, 'irwin') },
      { path: `brand/irwin/irwin-arruda${suffix(tone)}.svg`, text: wordmark('irwin arruda', Clay[tone].ink, label) },
      { path: `brand/irwin/i${suffix(tone)}.svg`, text: monogramI(Clay[tone].ink) },
      { path: `brand/irwin/ia${suffix(tone)}.svg`, text: monogramIA(Clay[tone].ink) },
    ]),
    { path: 'brand/irwin/icon-i.svg', text: tileI(112) },
    { path: 'brand/irwin/icon-ia.svg', text: tileIA(112) },
    { path: 'brand/irwin/icon-ia-square.svg', text: tileIA(0) },
  ];
}

export function brand(): Output[] {
  return [...favo(), ...barro(), ...chatbot(), ...irwin()];
}
