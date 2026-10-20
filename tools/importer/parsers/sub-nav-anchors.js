/* eslint-disable */
/* global WebImporter */
/**
 * Parser for sub-nav-anchors.
 * Source: .container--customMenu .text--in-page-nav-hr > .cmp-text >
 *   button.cmp-text__arrow (decorative) + ul > li > b > a[href="#anchor"]
 * Target: one row, one cell holding a <ul>; one <li><a href="#anchor">label</a></li> per link.
 * Hrefs are kept as-is (the cleanup transformer already rewrote them to heading-id anchors).
 */
export default function parse(element, { document }) {
  const ul = document.createElement('ul');
  element.querySelectorAll('li').forEach((item) => {
    const link = item.querySelector('a[href]');
    if (!link) return;
    const label = link.textContent.replace(/\s+/g, ' ').trim();
    if (!label) return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.textContent = label;
    li.append(a);
    ul.append(li);
  });

  const cells = [[ul]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'sub-nav-anchors', cells });
  element.replaceWith(block);
}
