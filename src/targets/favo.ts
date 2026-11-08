import { fromOklch, oklch } from '../color';
import type { Output, Variant } from '../palette';

function highlight(variant: Variant) {
  if (variant.appearance === 'light') return variant.accentText;
  const { lightness, chroma, hue } = oklch(variant.accent);
  return fromOklch(lightness + 0.08, chroma, hue);
}

export function favo(variant: Variant): Output {
  const theme = {
    name: variant.name,
    appearance: variant.appearance,
    colors: {
      background: variant.background,
      panel: variant.panel,
      selection: variant.selection,
      border: variant.border,
      accent: variant.accent,
      accentBright: highlight(variant),
      text: variant.foreground,
      muted: variant.comment,
      faint: variant.faint,
      success: variant.string,
      danger: variant.danger,
    },
  };
  return { path: `favo/barro-${variant.id}.json`, text: `${JSON.stringify(theme, undefined, 2)}\n` };
}
