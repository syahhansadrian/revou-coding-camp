// @vitest-environment jsdom
import { beforeAll, describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Setup: parse index.html and inject into jsdom ──────────────────────────

let catEl, counterEl, reactionEl, reactions;

beforeAll(() => {
  const html = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');

  // Write the full HTML into the jsdom document
  document.open();
  document.write(html);
  document.close();

  // Extract and run the <script> block so state/functions land on window
  const scriptContent = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/)?.[1] ?? '';
  // eslint-disable-next-line no-new-func
  new Function(scriptContent).call(window);

  // Grab DOM refs and state from window (set by the script)
  catEl      = document.getElementById('cat');
  counterEl  = document.getElementById('counter');
  reactionEl = document.getElementById('reaction');
  reactions  = window.reactions;
});

// ── Helpers ────────────────────────────────────────────────────────────────

function resetApp() {
  window.clickCount = 0;
  window.lastReactionIndex = -1;
  counterEl.textContent = 'Clicks: 0';
  reactionEl.textContent = '';
  reactionEl.classList.remove('reaction-float');
  catEl.classList.remove('cat-bounce');
}

function simulateClick() {
  window.handleCatClick();
}

function getCounterValue() {
  // "Clicks: N" → N
  return parseInt(counterEl.textContent.replace('Clicks:', '').trim(), 10);
}

function getDisplayedReaction() {
  return reactionEl.textContent;
}

// ── Task 5.1 — Unit Tests ──────────────────────────────────────────────────

describe('Unit tests', () => {
  it('cat element exists on load', () => {
    expect(catEl).not.toBeNull();
  });

  it('reaction pool has at least 6 distinct entries', () => {
    expect(new Set(reactions).size).toBeGreaterThanOrEqual(6);
  });

  it('bounce class added to cat on click', () => {
    resetApp();
    simulateClick();
    expect(catEl.classList.contains('cat-bounce')).toBe(true);
  });

  it('reaction-float class added to reaction on click', () => {
    resetApp();
    simulateClick();
    expect(reactionEl.classList.contains('reaction-float')).toBe(true);
  });

  it('Tailwind CDN script tag is present', () => {
    const tag = document.querySelector('script[src*="cdn.tailwindcss.com"]');
    expect(tag).not.toBeNull();
  });

  it('no framework script tags', () => {
    const frameworks = ['react', 'vue', 'angular', 'jquery'];
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasFw = scripts.some(s =>
      frameworks.some(fw => s.getAttribute('src').toLowerCase().includes(fw))
    );
    expect(hasFw).toBe(false);
  });
});

// ── Task 5.2 — Property 1: Counter-DOM Sync ───────────────────────────────

describe('Property 1: Counter-DOM Sync', () => {
  it('for any N clicks (N >= 0), counter DOM text equals "Clicks: N"', () => {
    // Feature: cat-clicker-app, Property 1: Counter-DOM Sync
    // For any N clicks (N >= 0), counter DOM text equals "Clicks: N"
    // Validates: Requirements 2.2, 2.3
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 200 }), (n) => {
        resetApp();
        for (let i = 0; i < n; i++) simulateClick();
        return getCounterValue() === n;
      }),
      { numRuns: 100 }
    );
  });
});

// ── Task 5.3 — Property 2: Reaction Always In Pool ────────────────────────

describe('Property 2: Reaction Always In Pool', () => {
  it('for any number of clicks, displayed reaction is always in the pool', () => {
    // Feature: cat-clicker-app, Property 2: Reaction Always In Pool
    // For any number of clicks, displayed reaction is always in the pool
    // Validates: Requirements 3.1, 3.3
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (n) => {
        resetApp();
        for (let i = 0; i < n; i++) simulateClick();
        return reactions.includes(getDisplayedReaction());
      }),
      { numRuns: 100 }
    );
  });
});

// ── Task 5.4 — Property 3: No Consecutive Duplicate Reactions ─────────────

describe('Property 3: No Consecutive Duplicate Reactions', () => {
  it('for any sequence of clicks, no two adjacent reactions are the same', () => {
    // Feature: cat-clicker-app, Property 3: No Consecutive Duplicate Reactions
    // For any sequence of clicks, no two adjacent reactions are the same
    // Validates: Requirements 3.5
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 100 }), (n) => {
        resetApp();
        const seen = [];
        for (let i = 0; i < n; i++) {
          simulateClick();
          seen.push(getDisplayedReaction());
        }
        return seen.every((r, i) => i === 0 || r !== seen[i - 1]);
      }),
      { numRuns: 100 }
    );
  });
});
