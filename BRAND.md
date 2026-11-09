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
- **Letters sit 40 units apart, and a space is 50.**
- **The prompt chevron, `>`, leads product marks.** It is 26 units wide, a little heavier than the letters.

The drawn letters so far are `a b c d h i n r t u w`. A new word needs its missing letters drawn on the same grid and added to `Glyphs` in `brand.ts`.

## Two families of marks

**Products** are the chevron, the name, and a last `o` replaced by a solid shape that says what the product is:

| Product     | The `o`                 | Where                                                       |
| ----------- | ----------------------- | ----------------------------------------------------------- |
| Barro       | A brick block           | [`assets/logo.svg`](assets/logo.svg), drawn by hand         |
| Favo        | A honeycomb cell        | [favo-theme](https://github.com/irwinarruda/favo-theme)     |
| The Chatbot | A round speech bubble   | [`brand/chatbot/`](brand/chatbot)                           |

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
| `icon-ia.svg`, `icon-ia.ico`, `icon-ia-180.png`, `icon-ia-512.png`    | `ia` on a slate tile              | The favicon, the touch icon and the social image |
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

- **Tiles are 512 units with a corner radius of 112,** about 22%, and the mark fills about two thirds of the width.
- **Touch icons are square.** iOS rounds the corners itself, and transparent corners turn black. The Chatbot's is square; `icon-ia-180.png` still has rounded corners and should move to a square tile next time it changes.
- **Avatars are full squares** with the mark at about half the width, so a circle crop never touches it.
- **Favicons carry 16, 32 and 48 px** in one `.ico`, beside the SVG icon.

## Changing a mark

1. Change `src/targets/brand.ts`, never the files in `brand/`.
2. Run `bun run build` to write the SVGs, and `bun run check`, which fails while any generated file is stale.
3. Run `bun run brand:render` to redraw every PNG and `.ico` from those SVGs. It needs macOS and Google Chrome (set `CHROME` for another path).
4. Copy the files into the site or app that uses them. Each project keeps its own copy in `public/brand`, with the favicon at `public/favicon.ico`.
