/* eslint-disable */
/* global WebImporter */
/**
 * Parser for references.
 * Source: .cmp-container holding .text.text--small modules (each > .cmp-text):
 *   module 1: indication footnote <p>, empty spacer <p>, abbreviations <p>
 *   module 2: "Références :" label (<p><b>…</b></p>)
 *   module 3: <ol> numbered citations
 * Target: one row per spaced text segment (a source module, or a run of paragraphs separated
 * by an empty spacer <p>); a label-only segment shares its row with the list that follows it
 * (label cell + list cell). Nodes within one row render flush, every further row opens a
 * spaced module (block contract).
 * Options derived from source: space-bottom when the last .text module keeps its canon
 * bottom margin (no text--b-space-0).
 */
function cleanText(el) {
  return el.textContent.replace(/\s+/g, ' ').trim();
}

function isEmpty(el) {
  return !cleanText(el) && !el.querySelector('img, picture');
}

function isLabel(el) {
  if (el.tagName !== 'P') return false;
  const bold = el.querySelector('strong, b');
  return !!bold && cleanText(bold) === cleanText(el);
}

export default function parse(element, { document }) {
  const modules = [...element.querySelectorAll(':scope > .text')];
  const sources = modules.length ? modules : [element];

  // segments: one per non-empty authored node. The source separates its notes with empty
  // spacer paragraphs, which the import pipeline strips before parsing, so the spacing is
  // carried by rows (one spaced module per note) rather than by detecting the spacers.
  const segments = [];
  sources.forEach((mod) => {
    const root = mod.querySelector('.cmp-text') || mod;
    [...root.children].forEach((node) => {
      if (!isEmpty(node)) segments.push([node]);
    });
  });

  const cells = [];
  for (let i = 0; i < segments.length; i += 1) {
    const seg = segments[i];
    const next = segments[i + 1];
    if (seg.length === 1 && isLabel(seg[0]) && next) {
      cells.push([seg, next]);
      i += 1;
    } else {
      cells.push([seg]);
    }
  }

  // keep the table rectangular
  const width = Math.max(1, ...cells.map((r) => r.length));
  cells.forEach((r) => { while (r.length < width) r.push(''); });

  const variants = [];
  const last = modules[modules.length - 1];
  if (last && last.classList.contains('text--small') && !last.classList.contains('text--b-space-0')) {
    variants.push('space-bottom');
  }

  const name = variants.length ? `references (${variants.join(', ')})` : 'references';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
