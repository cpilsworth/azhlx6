/**
 * table-bordered — data table with a 1px border on every cell (source `.text` modules holding
 * a plain <table>). Based on the block-collection table block.
 *
 * Authoring: first row = header row (rendered as <th scope="col">), every other row = one data
 * row; cells may hold paragraphs, bold text, lists and superscripts. Rows may have uneven cell
 * counts — the cells are copied as authored.
 * Options (block classes):
 *   no-header  the first row is a data row
 * @param {Element} block the block element
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const header = !block.classList.contains('no-header') && rows.length > 1;

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    const isHead = header && i === 0;
    [...row.children].forEach((cell) => {
      const td = document.createElement(isHead ? 'th' : 'td');
      if (isHead) td.setAttribute('scope', 'col');
      td.append(...cell.childNodes);
      tr.append(td);
    });
    if (isHead) thead.append(tr);
    else tbody.append(tr);
  });

  if (thead.children.length) table.append(thead);
  table.append(tbody);

  const scroller = document.createElement('div');
  scroller.className = 'table-bordered-scroll';
  scroller.append(table);
  block.replaceChildren(scroller);
}
