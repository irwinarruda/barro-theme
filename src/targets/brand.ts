import type { Output } from '../palette';

const Brick = '#B64D3F';
const White = '#FFFFFF';
const Slate = '#111418';
const Ink = { dark: '#E6EAEF', light: '#21272D', neutral: '#7E848A' } as const;
const Tones = ['dark', 'light', 'neutral'] as const;

type Tone = (typeof Tones)[number];
type Glyph = { d: string; width: number; dot?: boolean };

const Glyphs: Record<string, Glyph> = {
  a: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53M93.53 -100V0', width: 93.53 },
  b: { d: 'M0 -152V0H64.67L93.53 -50L64.67 -100H0', width: 93.53 },
  c: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53', width: 93.53 },
  d: { d: 'M93.53 -100H28.87L0 -50L28.87 0H93.53M93.53 -152V0', width: 93.53 },
  h: { d: 'M0 -152V0M0 -100H50L78.87 -50V0', width: 78.87 },
  i: { d: 'M0 0V-100', width: 0, dot: true },
  n: { d: 'M0 0V-100H50L78.87 -50V0', width: 78.87 },
  r: { d: 'M0 0V-65.36L20 -100H50', width: 50 },
  t: { d: 'M30 -140V-34.64L50 0H80M0 -100H76', width: 80 },
  u: { d: 'M0 -100V-50L28.87 0H78.87V-100', width: 78.87 },
  w: { d: 'M0 -100L34 0L68 -100L102 0L136 -100', width: 136 },
};

const Chevron = 'M13 -104L44.18 -50L13 4';
const Bubble = 'M0 10V-50A60 60 0 0 1 60 -110A60 60 0 0 1 120 -50A60 60 0 0 1 60 10H6A6 6 0 0 1 0 4Z';

function svg(viewBox: string, label: string, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}">\n<title>${label}</title>\n${body}\n</svg>\n`;
}

function strokes(ink: string, paths: string) {
  return `<g fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">${paths}\n</g>`;
}

function letters(text: string, ink: string) {
  let x = 25;
  let paths = '';
  let dots = '';
  let first = true;
  for (const char of text) {
    if (char === ' ') {
      x += 50;
      continue;
    }
    const glyph = Glyphs[char]!;
    paths += `\n  <path transform="translate(${x} 0)" d="${glyph.d}"/>`;
    if (glyph.dot) {
      dots += `\n<rect x="${x - 15}" y="-153" width="30" height="30" rx="7" fill="${first ? Brick : ink}"/>`;
      first = false;
    }
    x += glyph.width + 40;
  }
  return { body: `${strokes(ink, paths)}${dots}`, width: x - 40 + 25 };
}

function tile(label: string, inner: string, radius = 112) {
  const corner = radius ? ` rx="${radius}"` : '';
  return svg('0 0 512 512', label, `<rect width="512" height="512"${corner} fill="${Slate}"/>\n${inner}`);
}

function suffix(tone: Tone) {
  return tone === 'neutral' ? '' : `-${tone}`;
}

function irwin(): Output[] {
  const wordmark = (text: string, ink: string, label: string) => {
    const { body, width } = letters(text, ink);
    return svg(`0 -170 ${width} 190`, label, body);
  };
  const monogramI = (ink: string) =>
    svg(
      '0 0 128 128',
      'Irwin Arruda',
      `<path d="M64 112V60" fill="none" stroke="${ink}" stroke-width="20" stroke-linecap="round"/>\n<rect x="47" y="10" width="34" height="34" rx="8" fill="${Brick}"/>`,
    );
  const monogramIA = (ink: string) => {
    const { body, width } = letters('ia', ink);
    return svg(`-30 -178 ${width + 60} ${width + 60}`, 'Irwin Arruda', body);
  };
  const tileI = tile(
    'Irwin Arruda',
    `<path d="M256 392V236" fill="none" stroke="${White}" stroke-width="64" stroke-linecap="round"/>\n<rect x="203" y="96" width="106" height="106" rx="24" fill="${Brick}"/>`,
  );
  const ia = letters('ia', White);
  const tileIA = tile('Irwin Arruda', `<g transform="translate(256 262) scale(2.05) translate(${-ia.width / 2} 64)">${ia.body}</g>`);
  return [
    ...Tones.flatMap((tone) => [
      { path: `brand/irwin/irwin${suffix(tone)}.svg`, text: wordmark('irwin', Ink[tone], 'irwin') },
      { path: `brand/irwin/irwin-arruda${suffix(tone)}.svg`, text: wordmark('irwin arruda', Ink[tone], 'Irwin Arruda') },
      { path: `brand/irwin/i${suffix(tone)}.svg`, text: monogramI(Ink[tone]) },
      { path: `brand/irwin/ia${suffix(tone)}.svg`, text: monogramIA(Ink[tone]) },
    ]),
    { path: 'brand/irwin/icon-i.svg', text: tileI },
    { path: 'brand/irwin/icon-ia.svg', text: tileIA },
  ];
}

function chatbot(): Output[] {
  const label = 'The Chatbot';
  const chevron = (ink: string) =>
    `<path d="${Chevron}" fill="none" stroke="${ink}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bubble = (x: number) => `<path transform="translate(${x} 0)" d="${Bubble}" fill="${Brick}"/>`;
  const logo = (ink: string) => {
    let x = 113;
    let paths = '';
    let shape = '';
    for (const char of 'chatbot') {
      if (char === 'o') {
        shape = bubble(x - 6);
        x += 144;
        continue;
      }
      const glyph = Glyphs[char]!;
      paths += `\n  <path transform="translate(${x} 0)" d="${glyph.d}"/>`;
      x += glyph.width + 40;
    }
    const width = x - 40 + 10 + 4;
    return svg(
      `-4 -166 ${width.toFixed(2)} 187`,
      label,
      `${chevron(ink)}\n${strokes(ink, paths)}\n${shape}`,
    );
  };
  const mark = (ink: string) => svg('-14.5 -174 248 248', label, `${chevron(ink)}\n${bubble(99)}`);
  const onTile = `<g transform="translate(256 256) scale(1.5) translate(-109.5 50)"><path d="${Chevron}" fill="none" stroke="${White}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/><path transform="translate(99 0)" d="${Bubble}" fill="${Brick}"/></g>`;
  const avatar = svg(
    '0 0 1024 1024',
    label,
    `<rect width="1024" height="1024" fill="${Slate}"/>\n<g transform="translate(512 512) scale(2.3) translate(-109.5 50)">\n${chevron(Ink.dark)}\n<path transform="translate(99 0)" d="${Bubble}" fill="${Brick}"/>\n</g>`,
  );
  return [
    ...Tones.flatMap((tone) => [
      { path: `brand/chatbot/logo${suffix(tone)}.svg`, text: logo(Ink[tone]) },
      { path: `brand/chatbot/mark${suffix(tone)}.svg`, text: mark(Ink[tone]) },
    ]),
    { path: 'brand/chatbot/icon.svg', text: tile(label, onTile) },
    { path: 'brand/chatbot/icon-square.svg', text: tile(label, onTile, 0) },
    { path: 'brand/chatbot/avatar.svg', text: avatar },
  ];
}

export function brand(): Output[] {
  return [...irwin(), ...chatbot()];
}
