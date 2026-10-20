/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero.
 * Source: .teaser--home-hero > .cmp-teaser
 *   .cmp-teaser__image-desktop img, .cmp-teaser__image-mobile img, .cmp-teaser__content h1.cmp-teaser__title (lines as <p>)
 * Target (1 column): row 1 desktop image, row 2 mobile image (optional), row 3 <h1> (+ optional lead).
 */
function imageFrom(container, document) {
  if (!container) return null;
  const src = container.querySelector('img');
  if (!src) return null;
  const url = src.getAttribute('src') || src.getAttribute('data-src');
  if (!url) return null;
  const img = document.createElement('img');
  img.src = url;
  img.alt = src.getAttribute('alt') || '';
  return img;
}

export default function parse(element, { document }) {
  const cells = [];

  const desktop = imageFrom(element.querySelector('.cmp-teaser__image-desktop'), document);
  const mobile = imageFrom(element.querySelector('.cmp-teaser__image-mobile'), document);
  if (desktop) cells.push([desktop]);
  if (mobile) cells.push([mobile]);

  const content = [];
  const title = element.querySelector('.cmp-teaser__title');
  if (title) {
    const h1 = document.createElement('h1');
    const lines = [...title.querySelectorAll('p')].map((p) => p.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean);
    h1.textContent = lines.length ? lines.join(' ') : title.textContent.replace(/\s+/g, ' ').trim();
    content.push(h1);
  }
  const description = element.querySelector('.cmp-teaser__description');
  if (description) {
    [...description.children]
      .filter((el) => el.textContent.replace(/ /g, ' ').trim())
      .forEach((el) => content.push(el));
  }
  if (content.length) cells.push([content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
