# Tasks

## Task List

- [x] 1. Set up project file structure
  - [x] 1.1 Create `index.html` with HTML5 boilerplate, Tailwind CDN `<link>`, and empty `<script>` block at bottom of `<body>`

- [x] 2. Build HTML structure
  - [x] 2.1 Add cat element (emoji 🐱 in a `<button>`) centered on page using Tailwind flex utilities
  - [x] 2.2 Add click counter display element (`<p>` showing "Clicks: 0")
  - [x] 2.3 Add reaction display element (`<div>`) positioned near the cat

- [x] 3. Add CSS animations
  - [x] 3.1 Add `@keyframes catBounce` (scale 1 → 1.3 → 1, ≤300ms) in a `<style>` block
  - [x] 3.2 Add `@keyframes reactionFloat` (opacity 0→1, translateY 10px→0, ≤500ms) in the same `<style>` block

- [x] 4. Implement app state and core logic in `<script>`
  - [x] 4.1 Declare `clickCount`, `lastReactionIndex`, and `reactions` pool (8 entries)
  - [x] 4.2 Implement `selectReaction()` — picks random index, retries if same as `lastReactionIndex`, updates `lastReactionIndex`
  - [x] 4.3 Implement `updateCounter()` — sets counter element `textContent` to `"Clicks: " + clickCount`
  - [x] 4.4 Implement `showReaction(text)` — sets reaction element text, removes animation class, forces reflow, re-adds animation class
  - [x] 4.5 Implement `playClickAnimation()` — removes bounce class, forces reflow, re-adds bounce class on cat element
  - [x] 4.6 Implement `handleCatClick()` — increments `clickCount`, calls `updateCounter`, `selectReaction`, `showReaction`, `playClickAnimation`
  - [x] 4.7 Attach `handleCatClick` as click listener on the cat element

- [x] 5. Write tests
  - [x] 5.1 Write unit tests: cat element exists on load, reaction pool has ≥6 distinct entries, bounce class added on click, reaction animation class added on click, Tailwind CDN link present, no framework script tags
  - [x] 5.2 Write property test for Property 1 (Counter-DOM Sync) using fast-check, min 100 runs
  - [x] 5.3 Write property test for Property 2 (Reaction Always In Pool) using fast-check, min 100 runs
  - [x] 5.4 Write property test for Property 3 (No Consecutive Duplicate Reactions) using fast-check, min 100 runs
