<p align="center">
  <img src="assets/logo-dark.svg#gh-dark-mode-only" alt="barro" width="300">
  <img src="assets/logo-light.svg#gh-light-mode-only" alt="barro" width="300">
</p>

<h3 align="center">Clay on slate, with the contrast to read code all day.<br>Slate for the dark, Kaolin for the light.</h3>

<p align="center">
  <a href="https://github.com/irwinarruda/barro-theme/actions/workflows/check.yml"><img src="https://img.shields.io/github/actions/workflow/status/irwinarruda/barro-theme/check.yml?branch=main&label=contrast%20check&labelColor=0B0E11" alt="Contrast check status"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-B64D3F?labelColor=0B0E11" alt="MIT license"></a>
  <img src="https://img.shields.io/badge/Neovim%20%C2%B7%20Vim%20%C2%B7%20VS%20Code%20%C2%B7%20Cursor%20%C2%B7%20Zed%20%C2%B7%20Ghostty%20%C2%B7%20OpenCode%20%C2%B7%20T3%20Code%20%C2%B7%20Herdr%20%C2%B7%20favo-E6EAEF?labelColor=0B0E11" alt="Neovim, Vim, VS Code, Cursor, Zed, Ghostty, OpenCode, T3 Code, Herdr and favo">
</p>

<p align="center">
  <a href="#install">Install</a> ·
  <a href="#why-barro">Why Barro</a> ·
  <a href="SPEC.md">The spec</a> ·
  <a href="APPS.md">For apps</a> ·
  <a href="CREDITS.md">Credits</a>
</p>

<p align="center">
  <img src="assets/preview-slate.png#gh-dark-mode-only" alt="TypeScript code in Barro Slate, with clay keywords, sky functions, teal types and sage strings on a cool near-black background" width="820">
  <img src="assets/preview-kaolin.png#gh-light-mode-only" alt="TypeScript code in Barro Kaolin, with the same color roles on a cool off-white background" width="820">
</p>

<p align="center">
  <img src="assets/palette-slate.svg#gh-dark-mode-only" alt="Barro Slate code colors" width="820">
  <img src="assets/palette-kaolin.svg#gh-light-mode-only" alt="Barro Kaolin code colors" width="820">
</p>

Barro is clay, in Portuguese: the raw stuff that bricks, tiles and pots are shaped from. It started as a personal brand color, a brick on slate, and grew into a theme for everything around it: your editor, your terminal and your coding agents. Its sibling is [Favo](https://github.com/irwinarruda/favo-theme), built the same way. Switch GitHub between dark and light to see both variants.

## Why Barro

**Clay on slate.** A warm brick on cool, nearly colorless neutrals. The surfaces stay out of the way, and clay is rare enough to mean something. Slate is clay turned to stone, and kaolin is the white clay porcelain is made from, so each variant is named after its own surfaces.

| Variant          | Mode  | Surfaces         |
| ---------------- | ----- | ---------------- |
| **Barro Slate**  | dark  | Cool near-black  |
| **Barro Kaolin** | light | Cool off-white   |

**Clay leads.** Keywords carry the clay color, so a file has a shape before you read a word of it.

**Each color has one job.** Sky is what runs, teal is the shape of data, sage is text, lavender is a fixed value, straw is what was passed in, and rose is a pattern. Errors get a red of their own, so a problem never looks like a keyword. Variables and properties stay in the plain text color, so color marks structure rather than everything.

**Tags and components never blur.** In JSX, `<div>` is clay and `<LoginCard>` is teal italic, so you can see what is markup and what is yours.

**Italic means "from somewhere else".** Parameters, type parameters, attributes and components are italic, because they arrive from outside the line you are reading.

**One brick, white text.** Buttons are the brick `#B64D3F` with white text, the same in both variants. It is the color of the logo too.

**Contrast is a contract, not a feeling.** These numbers are checked on every commit:

|                                      | Slate  | Kaolin |
| ------------------------------------ | ------ | ------ |
| Weakest code color on the background | 7.11:1 | 4.57:1 |
| Comments on the background           | 7.23:1 | 5.26:1 |
| Weakest code color on a selection    | 5.08:1 | 3.56:1 |
| Closest two code colors (OKLab)      | 0.12   | 0.11   |
| Errors on the background             | 5.67:1 | 5.18:1 |
| White on the brick                   | 5.09:1 | 5.09:1 |

Slate clears WCAG AAA, and Kaolin clears AA, for all code. Everything else is in [SPEC.md](SPEC.md): every color, every token rule and every interface rule, written so you can port Barro to anything.

## Install

Clone this repository for any app below that copies files, or run `bun run install-themes` from a clone to copy the Ghostty, Zed, OpenCode, T3 Code, Herdr and favo files and install the VS Code and Cursor extension at once.

### Neovim

Written in Lua, and tested on Neovim 0.12. With [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
{
  "irwinarruda/barro-theme",
  name = "barro",
  lazy = false,
  priority = 1000,
  config = function()
    require("barro").setup({ transparent = false, italics = true })
    vim.cmd.colorscheme("barro-slate")
  end,
}
```

Use `barro-kaolin` for the light variant. It covers tree-sitter, LSP semantic tokens, diagnostics and popular plugins: gitsigns, Telescope, nvim-cmp, blink.cmp, which-key, noice, nvim-notify, indent-blankline, rainbow-delimiters, neo-tree, nvim-tree, Trouble, nvim-dap, lazy.nvim, mason, alpha-nvim and fzf-lua.

For lualine, set `theme = "barro"`.

### Vim

With [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'irwinarruda/barro-theme', { 'rtp': 'vim' }

set termguicolors
colorscheme barro-slate
```

The light variant is `barro-kaolin`.

Without a plugin manager, copy `vim/colors/*.vim` to `~/.vim/colors/`. Colors are approximated in 256-color terminals, so use `termguicolors` when you can.

### VS Code and Cursor

In VS Code, search for **Barro** in Extensions, install it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=irwinarruda.barro-theme), or run:

```sh
code --install-extension irwinarruda.barro-theme
```

Cursor gets its extensions from [Open VSX](https://open-vsx.org/extension/irwinarruda/barro-theme) and scans each one before listing it, so Barro can take a while to reach its search. To install it now, download the `.vsix` from the [latest release](https://github.com/irwinarruda/barro-theme/releases/latest), then run:

```sh
cursor --install-extension barro-theme-*.vsix
```

Then pick a Barro variant with `Preferences: Color Theme`.

It covers language server highlighting, rainbow brackets, diffs, the terminal and the whole interface. In `settings.json`, the theme ids are `barro-slate` and `barro-kaolin`.

### Zed

Copy [`zed/themes/barro.json`](zed/themes/barro.json) to `~/.config/zed/themes/`, then pick a Barro variant from the theme selector.

For the full effect, add [`zed/semantic-tokens.jsonc`](zed/semantic-tokens.jsonc) to your Zed settings. It turns on language server highlighting and maps it to Barro, including read-only variables, which a Zed theme can't do alone.

### Ghostty

Copy the files in `ghostty/` to `~/.config/ghostty/themes/`, then set one in your config, or a pair that follows your system:

```
theme = light:barro-kaolin,dark:barro-slate
```

### OpenCode

Copy `opencode/*.json` to `~/.config/opencode/themes/`, then run `/theme` to pick one.

### T3 Code

Copy `t3code/*.json` to `~/.t3/userdata/themes/`, then run `t3 theme set barro-slate`. These have to be real files, because T3 Code ignores symlinks there.

### Herdr

Paste the contents of `herdr/barro-slate.toml`, or `herdr/barro-kaolin.toml`, into `~/.config/herdr/config.toml`, replacing any `[theme]` section, then run `herdr server reload-config`.

### favo

Copy `favo/*.json` to `~/.favo/themes/`, then run `favo theme barro-slate`, or press `t` in [favo](https://github.com/irwinarruda/favo-cli) to pick one.

## Apps and websites

Barro has a palette for websites and apps too: slate, twelve steps for every Barro color, and tokens with one job each, ready as CSS, Tailwind and JSON. [APPS.md](APPS.md) has it all.

## Port it

Barro is one [`palette.json`](palette.json) and one [spec](SPEC.md). If your favorite app is missing, the spec has everything you need, and [CONTRIBUTING.md](CONTRIBUTING.md) explains how to add it here.

## Credits

Barro is Favo's sibling, and like Favo it is inspired by how [Dracula](https://draculatheme.com) handles contrast and syntax highlighting, especially in TypeScript projects. The full story, including Barro's closest relatives, is in [CREDITS.md](CREDITS.md).

## License

[MIT](LICENSE)
