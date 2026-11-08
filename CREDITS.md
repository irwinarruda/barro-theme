# Credits

Barro was designed by [Irwin Arruda](https://github.com/irwinarruda) with [Claude](https://claude.com). The palette, code and documents in this repository are original work, released under the [MIT License](LICENSE).

## Inspiration

**[Dracula](https://draculatheme.com)**, created by Zeno Rocha and carried by its contributors, is why this family of themes exists. Barro, like Favo before it, takes its inspiration from how Dracula handles contrast and syntax highlighting, especially in TypeScript projects.

## What Barro brought

Three things here are Barro's own:

- **Clay on slate.** A brick brand color on cool, nearly colorless neutrals, with clay keywords, sky functions, teal types, sage strings, lavender constants, straw parameters and rose patterns.
- **A red of its own for errors.** Clay already sits in the red-orange range, so errors, removed lines and the terminal's red get their own color instead of sharing one with patterns.
- **One brick, white text.** Buttons and fills are the same brick in both variants, dark enough for white text, so the brand looks the same on a dark page and a light one.

## Built on

- [Favo](https://github.com/irwinarruda/favo-theme), Barro's sibling, by the same author and also MIT licensed. Barro reuses its generator, the structure of its spec, its contrast contract, its twelve-step app palette and its ports for every app.
- The contrast formula from [WCAG 2.1](https://www.w3.org/TR/WCAG21/).
- [OKLab](https://bottosson.github.io/posts/oklab/), by Björn Ottosson, for measuring how different two colors look.
- The public documentation and schemas of each app: the help pages of [Neovim](https://neovim.io/doc/) and [Vim](https://www.vim.org/docs.php), the plugins listed in the README, and the theme docs of [VS Code](https://code.visualstudio.com/api/references/theme-color), [Zed](https://zed.dev/docs/extensions/themes), [Ghostty](https://ghostty.org/docs/features/theme), [OpenCode](https://opencode.ai/docs/themes/) and [Herdr](https://herdr.dev). Each port was written from these and from [SPEC.md](SPEC.md).
- [Radix Colors](https://www.radix-ui.com/colors), for the idea of a twelve-step scale where each step has one job. The app palette in [APPS.md](APPS.md) follows that structure with its own colors.
- [Dracula for Visual Studio Code](https://github.com/dracula/visual-studio-code), as a checklist of which TextMate scopes a theme should cover, through Favo's VS Code port. The scopes were checked against the grammars that ship with VS Code, and which color goes where comes from [SPEC.md](SPEC.md).

## Neighbors

Every color has neighbors, and Barro has relatives. We measured it against the 819 themes that ship with [Ghostty](https://ghostty.org), comparing the background, the text and the twelve bright and normal colors by how different they look.

For Slate, the closest is Eclipse, then Unalive 'Em All. For Kaolin, the closest are Karasu Snow and Grok Day.

The brick itself is not a terminal color, so we looked for it on its own too. The nearest theme red is [Flexoki](https://stephango.com/flexoki)'s red-500, `#C03E35`, where it marks errors rather than being the theme's identity.

We found these after the palette was made, so they are neighbors rather than sources. They are good company, and worth a look if Barro is close to what you want but not quite it.
