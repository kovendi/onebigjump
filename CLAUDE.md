# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## App

Name: **One Big Jump**

## Stack

Static HTML/CSS/JavaScript mockup. No build step, no framework, no backend. Pages are opened directly via `file://` (no dev server, ever) — this means **no ES modules (`type="module"`, `import`/`export`) and no `fetch`**, since browsers block both under the `file://` origin. All JS is classic `<script src="...">` files that attach their API to `window` (e.g. `window.buttonModule.renderButton(...)`).

## Viewport

This is a mobile app mockup — design and test for mobile viewport first, always.

- Avoid vertically tall elements; keep components compact.
- Be conservative with padding/margin — mobile screen space is limited.
- Avoid "box in a box" nesting (e.g. a card inside a card, or a bordered container inside another bordered container) — it reads as a desktop-web pattern, not a native mobile one.

## Project Structure

```
mockup/
├── index.html      # overview page, links to every page in /pages
├── global.css      # global rules only: color variables, base typography, resets
├── assets/         # all SVG files live here, referenced by path from pages/modules
├── pages/          # one folder per app screen
│   └── <name>/
│       ├── <name>.html
│       └── <name>.css  # page-specific styles only
└── modules/        # one folder per reusable component
    └── <name>/
        ├── <name>.js   # classic script; assigns a namespace on window, e.g. window.buttonModule.renderButton(props) — does not auto-run on load
        └── <name>.css
```

Every SVG belongs in `assets/`, regardless of which page or module uses it — never place an SVG file inside a `pages/<name>/` or `modules/<name>/` folder.

Each page links `global.css`, its own `<name>.css`, plus the CSS of every module it uses, and loads (`<script src="...">`, no `type="module"`) the JS of every module it uses, in dependency order (e.g. locale files and `i18n.js` before any script that calls `t()`).

## i18n

Languages: hu (default), en, ro. Translations live in `locales/{hu,en,ro}.js` — each file assigns a flat, dot-notation object to `window.LOCALES.<code>` (e.g. `window.LOCALES.hu = { "nav.home": "...", "button.buy_ticket": "..." }`), never full sentences as keys. Plain `.js` (not `.json`) because `file://` pages can't `fetch()` JSON.

Every page must include all three locale scripts (`locales/hu.js`, `locales/en.js`, `locales/ro.js`) before `modules/i18n/i18n.js`.

`modules/i18n/i18n.js` exposes `window.i18n`:
- `initI18n()` — call once on page load
- `t(key)` — returns the translated string for the current language
- `setLanguage(code)` / `getLanguage()` — switch/read current language, persisted in `localStorage`

Pages/modules must render text via `t('some.key')`, never hardcoded strings. This module has no paired CSS (logic-only, exception to the module js+css pairing rule).

## Data / Storage

No backend, so `localStorage` simulates a database. `modules/storage/storage.js` exposes `window.storage` over a single `localStorage` key `oneBigJumpDb`, whose value is a JSON object with one property per "table" (e.g. `dogs: []`).

- `getDb()` / `saveDb(db)` — read/write the whole object; `getDb()` auto-initializes `{ dogs: [] }` on first use.
- Per-entity helpers (e.g. `getDogs()`, `addDog(dog)`) live alongside the generic ones — add more as new entities are introduced, don't call `getDb()`/`saveDb()` directly from pages.
- Don't store `File`/`Blob` objects (not JSON-serializable) — convert to a base64 data URL via `FileReader.readAsDataURL` first (see `pages/add-dog/add-dog.html`'s photo handling).
- Any page reading/writing data must link `modules/storage/storage.js` (no paired CSS — logic-only, same exception as `i18n.js`).

## Modules (reusable components)

If an element looks like it could repeat elsewhere (button, input, card, etc.), ask the user before building it whether it should be a module — don't decide this unilaterally.

When the user says an element is repeating and should be a "common module" (e.g. button, input, card):

- Build it as a module: one JS file that builds the HTML, plus one paired CSS file.
- A page that uses the module imports both the JS file and its CSS file.
- Before building any element, check if a matching module already exists — if so, reuse/import it instead of recreating it.
- Do not duplicate/reimplement an existing module's markup on a new page — import it.

## Rules

Project-specific rules and conventions will be collected here as the project develops.

### Efficient workflow

When starting a new page/element, do the module-existence check (`modules/`) and any new-string i18n additions (`locales/hu.js`, `locales/en.js`, `locales/ro.js`) together in one batch of tool calls rather than as separate round trips later in the task.

### Form fields

Every form input needs a `<label>`, not just a `placeholder` — placeholders disappear on focus/input and are not a substitute for a label.

### Style guide

`pages/style-guide/style-guide.html` must stay up to date with the current set of modules. Whenever a module is added, update the style guide to showcase it; whenever a module is removed, remove its section from the style guide. Treat this as part of the module change itself, not a follow-up task.

### File length

Keep files short. If a file is approaching 500 lines, flag it to the user and suggest splitting it (e.g. extracting a sub-component into its own module) instead of letting it keep growing.

### No horizontal scroll

Pages must never produce horizontal scroll. Watch for decorative elements (e.g. background blobs) positioned with negative `left`/`right`/`top` offsets that extend past the viewport edge — the scrollable content container (e.g. `#screen-content`) should set `overflow-x: hidden` as a safeguard.

### Bottom nav pinning

On pages using `bottom-nav` (which is `position: sticky; bottom: 0;`), the content element directly above it inside `#screen-content`'s flex column must have `flex: 1` (all sibling states — loaded, empty, error, etc.) so it fills the remaining viewport height. Without this, short content leaves `bottom-nav` floating right below it instead of pinned to the bottom of the screen.

### iPhone frame

Every page must wrap its content in the `iphone-frame` module so the mockup looks right in a desktop browser without forcing anyone into mobile view. On a real mobile device the frame is skipped and the content renders natively full-width.

Page template:

```html
<body>
  <div id="screen-content">
    <!-- actual page content -->
  </div>

  <script src="../../modules/iphone-frame/iphone-frame.js"></script>
  <script>
    if (!window.iphoneFrame.isRealMobileDevice()) {
      document.body.appendChild(window.iphoneFrame.renderIphoneFrame(document.getElementById('screen-content')));
      document.body.classList.add('has-iphone-frame');
    }
  </script>
</body>
```

Also link `modules/iphone-frame/iphone-frame.css` in `<head>`.

Exception: `index.html` (root landing page) and `pages/style-guide/style-guide.html` are meta/overview pages, not app screens — they render full-width and must NOT be wrapped in `iphone-frame`.

## Color Palette

- Primary `#2f9e44` (green, from logo): loyalty points, leaderboard, success states, active nav, "add to calendar"
- Accent/CTA `#da291c` (red, from logo): primary CTAs only — "buy ticket", "register for exam", "check-in" (Host UI)
- Highlight `#f2a93b` (gold, from logo): badges, small highlights/icons — use sparingly, not for large surfaces
- Secondary text `#64748b` (slate grey): dates, stats, descriptions, inactive nav
- Main text `#1a2221` (charcoal, not pure black): titles, button labels, key info
- Background `#f4f7f6`: app screen background
- Card background `#ffffff`: cards, profile boxes, inputs (subtle shadow)
