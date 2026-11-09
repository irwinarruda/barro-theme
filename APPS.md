# Barro for apps

Barro's editor themes put the color in the code and keep everything else quiet. An app works the other way around. Backgrounds, cards, borders and body text cover most of the screen, so they have to be calmer than an editor's, and clay has to be rare to mean anything. This page is how to build a website or an app with Barro.

A product has two kinds of screens, and color works differently on each:

- **App screens** are controls and status: lists, forms, dashboards, settings. Color is rare and means one thing. [Using color](#using-color) is for them.
- **Reading surfaces** are text someone reads top to bottom: an essay, a chat reply, a note. Color marks what kind of thing each piece of text is, the way it does in code. [Reading surfaces](#reading-surfaces) is for them.

Type, the brand marks and recurring patterns are in [TYPE.md](TYPE.md), [BRAND.md](BRAND.md) and [PATTERNS.md](PATTERNS.md).

<p align="center">
  <img src="assets/app-palette-dark.svg#gh-dark-mode-only" alt="The Barro app palette in dark mode: slate and eight colors, twelve steps each" width="860">
  <img src="assets/app-palette-light.svg#gh-light-mode-only" alt="The Barro app palette in light mode: slate and eight colors, twelve steps each" width="860">
</p>

## Quick start

1. Copy [`app/barro.css`](app/barro.css) into your project and load it before your own styles. With Tailwind v4, copy [`app/tailwind.css`](app/tailwind.css) too and import that one instead.
2. Style with the [tokens](#tokens), such as `--barro-surface`, `--barro-fg` and `--barro-primary`. Use a raw step only when no token fits.
3. Choose the mode on `<html>`:

```html
<html data-theme="dark">
```

`data-theme` is `dark` or `light`. Leave it out to follow the system.

```css
.card {
  background: var(--barro-surface);
  border: 1px solid var(--barro-line);
  color: var(--barro-fg);
}

.button {
  background: var(--barro-primary);
  color: var(--barro-on-primary);
}
```

With Tailwind, every token is a color: `bg-surface border-line text-fg`, and `bg-primary text-on-primary hover:bg-primary-hover`.

For anything that isn't CSS, such as a mobile app or a design tool, [`app/tokens.json`](app/tokens.json) holds every color in both modes and what each token points to.

## One neutral

**Slate** is the only neutral. It is the editor's own surfaces: a cool near-black in dark mode and a cool off-white in light mode, with just a hint of blue. A warm brick on cool neutrals is what makes Barro look like itself, so there is no second, warmer neutral to switch to.

## Twelve steps

Every scale has the same twelve steps, and each step has the same job in dark and light. Learn the steps once and every color works the same way.

| Step | Slate                                           | A color                                     |
| ---- | ----------------------------------------------- | ------------------------------------------- |
| 1    | Dark page, light card                           | Tinted page                                 |
| 2    | Dark card; light page, controls and hovered rows | Tinted card                                |
| 3    | Dark controls and hovered rows; light hover     | Soft background: badges, selected navigation |
| 4    | Dark hover; light pressed                       | Soft hover, light selection                 |
| 5    | Dark pressed                                    | Soft pressed, dark selection                |
| 6    | Separators                                      | Subtle border                               |
| 7    | Borders of cards and inputs                     | Border                                      |
| 8    | Strong borders                                  | Strong border                               |
| 9    | Placeholders and disabled text                  | Solid fill: buttons, chips                  |
| 10   | Solid slate, hovered                            | Solid fill, hovered                         |
| 11   | Secondary text                                  | Colored text and icons                      |
| 12   | Text                                            | High-contrast colored text                  |

A few things hold for every color:

- **Step 9 is the same in both modes, and text on it is white,** from `--barro-on-<color>`. Clay's step 9 is the brick `#B64D3F`, Barro's main color. Straw is the one exception: a yellow dark enough for white text turns to mud, so its solid stays light and takes near-black text.
- **Step 10 is darker than step 9,** not lighter, so white text stays readable when a button is hovered. Straw's step 10 is lighter, for the same reason in reverse.
- **Step 11 is the code color.** In dark mode it is exactly the Barro Slate color for that role, so `clay-11` is the keyword color and `sky-11` the function color. In light mode it is the Barro Kaolin color, darkened only where it would not read on its own soft background.
- **Tinted steps share slate's lightness,** so a badge sits on a card the way a slate chip would.

## Colors and their jobs

| Scale      | In code    | In an app                                                       |
| ---------- | ---------- | --------------------------------------------------------------- |
| `clay`     | keywords   | The brand: primary buttons, links, focus, selection, current navigation |
| `sky`      | functions  | Information                                                     |
| `sage`     | strings    | Success, and money coming in                                    |
| `red`      | errors     | Danger and errors, and money going out                          |
| `straw`    | parameters | Warnings                                                        |
| `teal`     | types      | Charts and tags                                                 |
| `lavender` | constants  | Charts and tags                                                 |
| `rose`     | regex      | Charts and tags                                                 |

## Tokens

Each token is a CSS variable, `--barro-<token>`, and a Tailwind color of the same name. The steps are of slate unless a color is named.

| Token           | Dark       | Light      | Use                                              |
| --------------- | ---------- | ---------- | ------------------------------------------------ |
| `page`          | 1          | 2          | Behind everything                                |
| `surface`       | 2          | 1          | Cards, panels and the main content               |
| `raised`        | 3          | 2          | Inputs, secondary buttons, hovered rows          |
| `hover`         | 4          | 3          | Hovered controls                                 |
| `pressed`       | 5          | 4          | Pressed controls, selected rows                  |
| `overlay`       | 3          | 1          | Menus, popovers and dialogs, with a shadow       |
| `line-subtle`   | 6          | 6          | Separators inside a card                         |
| `line`          | 7          | 7          | Borders of cards and inputs                      |
| `line-strong`   | 8          | 8          | Hovered inputs, strong dividers                  |
| `fg`            | 12         | 12         | Text                                             |
| `fg-muted`      | 11         | 11         | Labels, dates and other secondary text           |
| `fg-faint`      | 9          | 9          | Placeholders and disabled text                   |
| `primary`       | clay 9     | clay 9     | Primary buttons                                  |
| `primary-hover` | clay 10    | clay 10    | Primary buttons, hovered                         |
| `on-primary`    | white      | white      | Text on a primary button                         |
| `primary-soft`  | clay 3     | clay 3     | Current navigation item, highlighted rows        |
| `primary-fg`    | clay 11    | clay 11    | Brand-colored text, links and icons              |
| `focus`         | clay 11    | clay 11    | Focus rings                                      |
| `selection`     | clay 5     | clay 4     | Selected text                                    |

Each status, `success`, `warning`, `danger` and `info`, comes with five tokens. `success` is sage, `warning` straw, `danger` red and `info` sky.

| Token          | Step | Use                                   |
| -------------- | ---- | ------------------------------------- |
| `<status>`       | 11   | Status text and icons                 |
| `<status>-soft`  | 3    | Badge and banner backgrounds          |
| `<status>-line`  | 6    | Badge and banner borders              |
| `<status>-solid` | 9    | Solid alerts that must interrupt      |
| `on-<status>`    | white, near-black on `warning` | Text on a solid alert |

## Using color

1. **Slate carries the screen.** Most of what people see should be `page`, `surface`, `fg` and `fg-muted`. If a screen looks red, too much of it is clay.
2. **Keep clay to one thing per view:** the primary action, or where the reader is. On app screens, headings, bullets and decorative icons stay neutral. Reading surfaces are the exception, below.
3. **Primary buttons are brick with white text, in both modes.** The brick is dark enough for white to reach 5:1, so the same button works on the dark page and the light one.
4. **Status color means something.** Use one status per element, and pair it with an icon or a word. Clay and red are neighbors, so an error has to say it is an error, and color alone fails readers who can't tell hues apart.
5. **Badges are soft:** `<status>-soft` behind, `<status>` for the text, `<status>-line` around. Solid fills are for the rare alert that must interrupt.
6. **Color a number only when its sign is the news.** A balance that went negative is `danger`. Amounts in a long list stay `fg`, and the sign does the talking.
7. **Higher is lighter in dark mode.** In light mode the card is the lightest thing, and the page sits one step below it.

## Reading surfaces

On a reading surface, color says what kind of thing a piece of text is, so a reader can scan it the way they scan code. The jobs are Barro's code roles, carried over from the editor:

| In code     | On a reading surface                          | Token                 |
| ----------- | --------------------------------------------- | --------------------- |
| Keywords    | Section headings, the current page            | `primary-fg`, clay 11 |
| Functions   | Links                                         | `sky-11`              |
| Types       | Tags, subheadings, the first group of chips   | `teal-11`             |
| Parameters  | Dates and italics                             | `straw-11`            |
| Constants   | A second group of chips                       | `lavender-11`         |

Color marks the kind; size and weight mark importance. Keep one color per kind on every page, so a date always looks like a date.

**Three text tones, not one.** Body text sits a step below `fg`, so bold has somewhere to go. When paragraphs are already `fg`, bold barely shows and the page reads flat.

| Tone       | Value                                                                  | Dark      | Light     | On `surface`    |
| ---------- | ---------------------------------------------------------------------- | --------- | --------- | --------------- |
| Body       | `color-mix(in oklab, var(--barro-fg) 45%, var(--barro-fg-muted))`      | `#BAC0C7` | `#434A51` | 10.1:1 / 8.6:1  |
| Bold       | `fg`, weight 700                                                       | `#E6EAEF` | `#21272D` | 15.3:1 / 14.4:1 |
| Italic     | `straw-11`, italic                                                     | `#F0BF54` | `#876300` | 10.8:1 / 5.3:1  |
| Details    | `fg-muted`: reading time, descriptions, labels                         | `#979FA8` | `#616971` | 6.9:1 / 5.3:1   |

Define the body tone once on the reading surface's container, for paragraphs, list items and quotes. It is a mix rather than a token, so it works on any palette, Favo included.

A few rules keep this from turning into noise:

- **Only inside the reading surface.** The navigation, buttons and forms around it follow the app rules.
- **Links are sky here because clay is taken by headings.** On app screens, links stay `primary-fg`.
- **Status colors keep their meaning.** Red is never decoration, and sage stays success. A straw date is fine inside an essay; on an app screen, straw is a warning.
- **Code sits on step 1 of slate,** in both modes: `page` in dark mode and `surface` in light mode, with a `line-subtle` border. That is the editor's own background, and the colors Barro Kaolin uses for code are tuned to it. One step darker, on light `page`, the weakest of them fall to 4.25:1.

Live examples: [irwinarruda.com](https://www.irwinarruda.com) for essays, and The Chatbot's replies and notes.

## Contrast

`bun run check` measures these in both modes, and fails if one breaks.

| Rule                                                                  | At least |
| --------------------------------------------------------------------- | -------- |
| `fg` on `page`, `surface`, `raised`, `hover`, `pressed` and `overlay` | 7:1      |
| `fg-muted` on `page`, `surface`, `raised`, `hover` and `overlay`      | 4.5:1    |
| `fg-faint` on `surface`                                               | 3:1      |
| `primary-fg` and each status on `page`, `surface` and its soft background | 4.5:1 |
| Text on `primary`, `primary-hover` and every solid status            | 4.5:1    |
| `focus` on `surface`                                                  | 3:1      |
| Reading body, bold and italic on `surface` (not checked by the script) | 4.5:1    |

## How the scales are made

Everything here is generated by [`src/interface.ts`](src/interface.ts) from [`palette.json`](palette.json), so a palette change reaches the app colors too. Change the generator, not the files in `app/`, then run `bun run build` and `bun run check`.

- **Slate** takes its lightness, hue and color from the editor's surfaces at steps 1, 2, 3, 6, 9, 11 and 12, and fills the steps between. It keeps the editor's exact colors at steps 1, 2, 3, 6 and 12.
- **Each color** takes its hue from its code color. Steps 1 to 8 sit at slate's lightness with a little more color each step. Step 9 is a solid at the same lightness across every color, dark enough for white text; clay's steps 9 and 10 are the editor's `fill` and `fillHover`, and straw's solid is light instead. Step 11 is the code color.
- **Secondary text and light step 11** are darkened just enough to pass the contrast rules above.
