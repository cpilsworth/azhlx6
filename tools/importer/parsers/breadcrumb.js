/* eslint-disable */
/* global WebImporter */
/**
 * Parser for breadcrumb.
 * Source: .breadcrumb > nav.cmp-breadcrumb > ul.cmp-breadcrumb__list > li.cmp-breadcrumb__item
 * Target: one row, one cell holding a <ul>; linked crumbs as <a>, current page as plain text.
 */
export default function parse(element, { document }) {
  const items = [...element.querySelectorAll('li.cmp-breadcrumb__item, ul > li')]
    .filter((li, i, all) => all.indexOf(li) === i);

  const ul = document.createElement('ul');
  items.forEach((item) => {
    const text = item.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;
    const li = document.createElement('li');
    const link = item.querySelector('a[href]');
    if (link && !item.classList.contains('cmp-breadcrumb__item--active')) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = link.textContent.replace(/\s+/g, ' ').trim();
      li.append(a);
    } else {
      li.textContent = text;
    }
    ul.append(li);
  });

  const cells = [[ul]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'breadcrumb', cells });
  element.replaceWith(block);
}
