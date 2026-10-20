/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq.
 * Source: .accordion.panelcontainer > .cmp-accordion > .cmp-accordion__item
 *   .cmp-accordion__header > button > span.cmp-accordion__title  (question)
 *   .cmp-accordion__panel  > nested containers > .text > .cmp-text  (answer: <p>, lists,
 *   .text--small footnotes)
 * Target (2 columns): one row per item — [question] [answer content].
 */
function hasContent(el) {
  return !!el.textContent.replace(/\s+/g, ' ').trim() || !!el.querySelector('img, picture');
}

export default function parse(element, { document }) {
  const cells = [];
  element.querySelectorAll('.cmp-accordion__item').forEach((item) => {
    const titleEl = item.querySelector('.cmp-accordion__title') || item.querySelector('.cmp-accordion__header');
    const question = titleEl ? titleEl.textContent.replace(/\s+/g, ' ').trim() : '';

    const panel = item.querySelector('.cmp-accordion__panel');
    const answer = [];
    if (panel) {
      const texts = [...panel.querySelectorAll('.cmp-text')];
      if (texts.length) {
        texts.forEach((t) => [...t.children].filter(hasContent).forEach((el) => answer.push(el)));
      } else {
        [...panel.querySelectorAll('p, ul, ol, table, img')]
          .filter((el) => !el.parentElement.closest('p, ul, ol, table'))
          .filter(hasContent)
          .forEach((el) => answer.push(el));
      }
    }

    if (!question && !answer.length) return;
    cells.push([question, answer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
