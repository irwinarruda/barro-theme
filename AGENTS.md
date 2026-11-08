# barro-theme

Barro is a clay theme with two variants, Barro Slate (dark) and Barro Kaolin (light), ported to Neovim, Vim, VS Code, Cursor, Zed, Ghostty, OpenCode, T3 Code and Herdr. One palette and one spec generate almost everything, and there are no dependencies to install. Its sibling is [favo-theme](https://github.com/irwinarruda/favo-theme), and the two share the same generator and the same rules.

## Commands

Use Bun `1.3.14`.

- `bun run build` writes every generated file from `palette.json`.
- `bun run check` checks contrast, separation and that generated files are current. CI runs it on every pull request, and every release runs it first.
- `bun run check:release-version vX.Y.Z` checks that both version files match a tag.
- `bun run release:notes vX.Y.Z` prints a version's section of `CHANGELOG.md`.
- `bun run install-themes` copies the theme files into your home folder and installs the extension with `code` and `cursor`. It changes your real setup, so only run it when asked.

## Where things live

- `SPEC.md` is the theme. `palette.json` is the one source of truth for colors.
- `src/targets/` generates `app/`, `favo/`, `ghostty/`, `herdr/`, `opencode/`, `t3code/`, `vim/colors/`, `vscode/themes/` and `zed/themes/`, plus `lua/barro/palette.lua` and `assets/*palette*.svg`. Edit the target, never the output.
- `APPS.md` is the guideline for websites and apps. Its scales and tokens come from `src/interface.ts`. There is one neutral, slate, taken from the editor's own surfaces.
- `lua/` and `colors/` are the hand-written Neovim theme. Only the palette table is generated, so a token change there is manual.
- `vscode/package.json`, `vscode/README.md` and `zed/extension.toml` are hand-written.

## Changing the theme

1. If a rule changes, change `SPEC.md` first. It decides which color goes where for every port.
2. Change `palette.json`, or the targets and hand-written ports the change touches.
3. Run `bun run build`, then `bun run check`, and commit the generated files in the same commit as the change.
4. Add the change to `CHANGELOG.md` in that same commit, as below.
5. Open a pull request, then release it. A change someone using Barro would notice is not done at the merge, it is done when the release is live.

## Releasing

Set the new version in both `vscode/package.json` and `zed/extension.toml`, turn `## [Unreleased]` in `CHANGELOG.md` into `## [X.Y.Z] - YYYY-MM-DD` under a new empty `## [Unreleased]`, update the compare links at its bottom, and land that on `main`. Then push a `vX.Y.Z` tag on the commit that landed, which a rebase merge gives a new hash. That changelog section becomes the description of the GitHub Release, `release:notes` fails the release when the section is missing or empty, and `check:release-version` fails it when either version disagrees with the tag.

`.github/workflows/release.yml` runs on the tag. It checks contrast and generated files, packages the extension, creates the GitHub Release with the `.vsix` attached, then publishes that same file to the VS Code Marketplace and to Open VSX, which is where Cursor gets its extensions. Nothing is published by hand. The Marketplace needs no secret, because it trusts `release.yml` by name through a Trusted Publishing policy on the publisher page, so renaming that file breaks publishing. Before the first release, that policy has to cover this repository, and Open VSX needs the `OVSX_PAT` secret or its own trusted publishing.

Use a patch for fixes, a minor for a new port or a change to how Barro looks, and a major only if a port stops working the way it did. The VS Code extension is the only port with a registry. Every other port is files in this repo, so the release is their version too.

To re-run a failed release, use `gh workflow run release.yml --ref vX.Y.Z -f tag=vX.Y.Z`. A published GitHub Release stays as it is, and a store that already has the version skips it. That skip counts as a success, so a green run alone proves nothing: confirm the new version is on the VS Code Marketplace and on Open VSX before calling a release done. Cursor runs its own scan before it lists a release, and that can take much longer.

## Working agreements

- ALWAYS update `CHANGELOG.md` in the same commit as any change someone using Barro would notice: a color, a token, a new port, a fix or an install step. Add one plain-language line under `## [Unreleased]`, in `Added`, `Changed`, `Fixed` or `Removed`, written for users, not about the code. Refactors, tests, CI and internal docs need no entry.
- Commits follow Conventional Commits.
- No merge commits. Bring a branch up to date with `git rebase`, and land a pull request by rebase.
- Write ports from `SPEC.md` and the app's public docs, never from another theme's files. Token and scope names belong to the app, and which color goes where comes from the spec.
- Check VS Code scopes against the grammars that ship with the app, because scope lists in other themes go stale.
- `danger` is its own role: errors, removed lines and the terminal's red. `regex` is only for patterns. Clay sits in the red-orange range, so a shared red would make errors look like keywords. Keep them apart in every port.
- Buttons are brick with white text in both variants: `fill` with `onFill`, and the app's `primary` with `on-primary`. Hover goes darker, never lighter, so white stays readable. `bun run check` fails if white drops below 4.5:1 on any of them.
- VS Code's current find match is `selection` with an `accent` border, not the spec's `fill` with `onFill`, on purpose. `editor.findMatchForeground` and `editor.findMatchHighlightForeground` were swapped through VS Code 1.144 and still are in Cursor, and no pair of values reads well under both. Keep it until Cursor has the fix.
- `faint` is deliberately low contrast. Use it only for text a reader can safely ignore.
- Do not say a change works until you watched it in the real app. `bun run check` covers the palette, not how a port renders.
