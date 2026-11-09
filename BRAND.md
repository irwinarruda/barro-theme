# Brand

Barro started as one color, the brick `#B64D3F`, and the marks grew around it. Every mark here is generated from [`src/targets/brand.ts`](src/targets/brand.ts) into [`brand/`](brand), so they can be rebuilt, never redrawn.

<p align="center">
  <img src="brand/irwin/irwin-arruda-dark.svg#gh-dark-mode-only" alt="irwin arruda" width="420">
  <img src="brand/irwin/irwin-arruda-light.svg#gh-light-mode-only" alt="irwin arruda" width="420">
</p>

## The lettering

The marks are not set in a font. Each letter is drawn from straight strokes on one grid, the same grid as Barro's and Favo's logos:

- **x-height 100 units, ascenders to 152.** Strokes are 20 units wide, with round ends and round joins.
- **Bowls are half hexagons.** The round parts of `a`, `b`, `c` and `d` turn at 60°, 28.87 units across and 50 up, so even round letters have corners. This is what [Chakra Petch](TYPE.md#why-chakra-petch) echoes.
- **The prompt chevron, `>`, leads product marks.** It is 26 units wide, a little heavier than the letters.

The drawn letters so far are `a b c d f h i n r t u v w`. A new word needs its missing letters drawn on the same grid and added to `Glyphs` in `brand.ts`.

## Spacing

Every mark is spaced by the same rule, so a new word comes out right without tuning. The gap between two letters depends on the shapes that face each other, because a pointed or open side leaves white space of its own. Each letter declares its two sides, and `brand.ts` looks the gap up. Gaps are measured between stroke centers, in units.

| Side    | What it looks like               | Letters                                              |
| ------- | -------------------------------- | ---------------------------------------------------- |
| `stem`  | A straight vertical stroke       | Left of `b h i n r u`, right of `a d h i n u`        |
| `point` | A bowl's corner, at mid height   | Left of `a c d`, right of `b`                        |
| `bar`   | The tip of a crossbar            | Left of `f t`                                        |
| `arm`   | A stroke at the top, empty below | Right of `f r`                                       |
| `open`  | Arms at the top and the bottom   | Right of `c t`                                       |
| `diag`  | A diagonal stroke                | Both sides of `v w`                                  |

| Left letter ends in | Then `stem` | Then `point` | Then `bar` | Then `diag` |
| ------------------- | ----------- | ------------ | ---------- | ----------- |
| `stem`              | 38          | 34           | 32         | 36          |
| `point`             | 34          | 30           | 30         | 32          |
| `arm`               | 34          | 18           | 30         | 34          |
| `open`              | 34          | 30           | 30         | 32          |
| `diag`              | 36          | 28           | 30         | 30          |

- **Two straight strokes sit 38 apart.** Everything else is tighter, by how much white the shapes already leave.
- **A point tucks under an arm,** which is why `fa` is only 18.
- **After the chevron,** a `stem` starts 84 from its tip, a `point` or a `bar` 69, and a `diag` 72. In a mark, the shape starts 48.82 from the tip.
- **Around a shape,** each shape lists its own gaps in `brand.ts`: the hexagon tucks into `v` at 5.59, the block sits 25.76 after `r`, and the bubble sits 22 after `b` and 24 before `t`.
- **A space between words is 46,** on top of the letter gap.

Favo's logo was set by hand and is the reference: the table reproduces it exactly, and Barro, The Chatbot and Irwin Arruda follow it.

## Two families of marks

**Products** are the chevron, the name, and a last `o` replaced by a solid shape that says what the product is:

| Product     | The `o`                                  | Where                                                                                           |
| ----------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Favo        | A honeycomb cell                         | [`brand/favo/`](brand/favo), the same drawing [favo-theme](https://github.com/irwinarruda/favo-theme) ships |
| Barro       | A brick block                            | [`assets/logo.svg`](assets/logo.svg) and `assets/mark.svg`                                      |
| The Chatbot | A round speech bubble with a 60° tail    | [`brand/chatbot/`](brand/chatbot)                                                               |

Each shape is as tall as a letter with its stroke, 120 units. The block is 112, because a rectangle looks bigger than a round shape of the same height. The bubble stays a full circle so it still reads as an `o`, and its tail is cut at 60° like the letters.

**Irwin Arruda**, the personal mark, has no chevron. The dot of the first `i` is a brick square, and that dot is the signature: it is the only brick in the mark.

## Color

- **Brick is the only color in a mark.** It fills the shape or the dot.
- **The rest is ink:** `#E6EAEF` on dark backgrounds (`-dark` files), `#21272D` on light ones (`-light`), and a mid gray, `#7E848A`, where the background is unknown (no suffix).
- **Icons are slate tiles:** `#111418` with white ink and the brick. A brick-filled tile was tried for The Chatbot and rejected: in a browser tab it read as a red blob, and a dark tile matches the `ia` icon beside it.
- **Mark colors are constants in `brand.ts`,** not read from `palette.json`, so tuning the theme never recolors a logo by accident.

## Irwin Arruda

| File                                                                  | What it is                        | Used in                                       |
| --------------------------------------------------------------------- | --------------------------------- | --------------------------------------------- |
| `irwin-arruda.svg`, `irwin-arruda-dark.svg`, `irwin-arruda-light.svg` | The wordmark                      | The masthead of irwinarruda.com, 22 px tall on desktop and 20 on phones, and its README |
| `irwin.svg`, `irwin-dark.svg`, `irwin-light.svg`                      | The short form, `irwin`           | Nothing yet. It hides the `a` the favicon needs |
| `ia.svg`, `ia-dark.svg`, `ia-light.svg`                               | The `ia` monogram                 | Nothing yet                                   |
| `i.svg`, `i-dark.svg`, `i-light.svg`                                  | The `i` monogram                  | Nothing yet                                   |
| `icon-ia.svg`, `icon-ia.ico`, `icon-ia-512.png`                       | `ia` on a rounded slate tile      | The favicon and the social image              |
| `icon-ia-square.svg`, `icon-ia-180.png`                               | The same tile, square             | The iPhone and iPad home screen               |
| `icon-i.svg`, `icon-i.ico`, `icon-i-180.png`, `icon-i-512.png`        | `i` on a slate tile               | Nothing yet                                   |

## The Chatbot

| File                                          | What it is                                      | Used in                                         |
| --------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `logo.svg`, `logo-dark.svg`, `logo-light.svg` | The `>chatbot` wordmark                         | The app's title bar and its README              |
| `mark.svg`, `mark-dark.svg`, `mark-light.svg` | The `>o` mark                                   | Places that set the mark on their own background |
| `icon.svg`, `favicon.ico`, `icon-512.png`     | `>o` on a rounded slate tile                    | The favicon and app icon                        |
| `icon-square.svg`, `apple-touch-icon.png`     | The same tile, square                           | The iPhone and iPad home screen                 |
| `avatar.svg`, `avatar-{1024,640,512,256,120}.png` | `>o` on a full slate square                 | WhatsApp (640), Google sign-in (120) and other profile pictures |

## Rules for icons and avatars

- **Tiles are 512 units with a corner radius of 112,** about 22%, and the mark fills about three quarters of the width, so it still reads at 16 px.
- **Touch icons are square.** iOS rounds the corners itself, and transparent corners turn black.
- **Avatars are full squares** with the mark at about half the width, so a circle crop never touches it.
- **Favicons carry 16, 32 and 48 px** in one `.ico`, beside the SVG icon.

## Changing a mark

1. Change `src/targets/brand.ts`, never the files in `brand/`.
2. Run `bun run build` to write the SVGs, and `bun run check`, which fails while any generated file is stale.
3. Run `bun run brand:render` to redraw every PNG and `.ico` from those SVGs. It needs macOS and Google Chrome (set `CHROME` for another path).
4. Copy the files into the site or app that uses them. Each project keeps its own copy in `public/brand`, with the favicon at `public/favicon.ico`.
