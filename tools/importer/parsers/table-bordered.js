/* eslint-disable */
/* global WebImporter */
/**
 * Parser for table-bordered.
 * Source: #restyle .cmp-text table > tbody > tr > td (each cell holds <p>, <b>, <ul>, <sup>);
 *   the first row is the visual header row (plain <td>, no <thead>/<th>).
 * Target: first row = header row (one cell per column), every other row = data row.
 * Rows are padded to the widest row so the block table stays rectangular; a colspan/rowspan-free
 * source is expected (none on this template). Option no-header is added only when the source
 * has no first row to treat as header (single-row table).
 */
function hasContent(el) {
  return !!el.textContent.replace(/\s+/g, ' ').trim() || !!el.querySelector('img, picture');
}

export default function parse(element, { document }) {
  const rows = [...element.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tfoot > tr, :scope > tr')];

  const cells = [];
  rows.forEach((tr) => {
    const row = [...tr.children]
      .filter((c) => c.tagName === 'TD' || c.tagName === 'TH')
      .map((cell) => {
        const nodes = [...cell.childNodes].filter((n) => (n.nodeType === 1 ? hasContent(n) : n.textContent.trim()));
        return nodes;
      });
    if (row.length) cells.push(row);
  });

  const width = Math.max(0, ...cells.map((r) => r.length));
  cells.forEach((r) => { while (r.length < width) r.push(''); });

  const name = cells.length > 1 ? 'table-bordered' : 'table-bordered (no-header)';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
