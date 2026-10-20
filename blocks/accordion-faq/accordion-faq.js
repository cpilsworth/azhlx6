/**
 * accordion-faq — FAQ list of collapsible question/answer items (source accordion component with
 * cmp-accordion items). Based on the block-collection accordion block, using native
 * <details>/<summary>.
 *
 * Authoring: one row per item — first cell = the question (plain text or a heading), second
 * cell = the answer (paragraphs, lists, small footnotes). A row with a single cell becomes a
 * question-only item; empty rows are dropped.
 * @param {Element} block the block element
 */
export default async function decorate(block) {
  const items = [];
  [...block.children].forEach((row) => {
    const [label, body, ...extra] = [...row.children];
    if (!label || (!row.textContent.trim() && !row.querySelector('picture, img'))) return;

    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    // a single authored heading is unwrapped into the summary (keeps the question text only)
    const heading = label.children.length === 1 && label.firstElementChild.matches('h1, h2, h3, h4, h5, h6, p')
      ? label.firstElementChild : null;
    const title = document.createElement('span');
    title.className = 'accordion-faq-item-title';
    title.append(...(heading ? heading.childNodes : label.childNodes));
    summary.append(title);

    const panel = document.createElement('div');
    panel.className = 'accordion-faq-item-body';
    if (body) panel.append(...body.childNodes);
    extra.forEach((cell) => panel.append(...cell.childNodes));
    // a paragraph that opens with a footnote marker (<sup>##</sup>…) is the source's small-type
    // .text--small note under the answer
    panel.querySelectorAll(':scope > p').forEach((p) => {
      const first = [...p.childNodes]
        .find((n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
      if (first && first.nodeName === 'SUP') p.classList.add('accordion-faq-item-note');
    });

    const details = document.createElement('details');
    details.className = 'accordion-faq-item';
    details.append(summary, panel);
    items.push(details);
  });
  block.replaceChildren(...items);
}
