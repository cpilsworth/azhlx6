/* eslint-disable */
/* global WebImporter */
/**
 * Parser for split-teaser.
 * Source: .teaser--text-image (without teaser--text-left) > .cmp-teaser:
 *   .cmp-teaser__image-desktop img, .cmp-teaser__image-mobile a > img (linked mobile image)
 *   .cmp-teaser__content: optional .cmp-teaser__title, .cmp-teaser__description <p>s
 *   (empty &nbsp; spacers dropped), .cmp-teaser__action-link (CTA)
 * Target: one row, 2 cells: [optional heading, copy, CTA as <p><strong><a>] [desktop + mobile picture].
 */
function cleanText(el) {
  return el.textContent.replace(/\s+/g, ' ').trim();
}

function hasContent(el) {
  return !!cleanText(el) || !!el.querySelector('img, picture');
}

function imageFrom(container, document) {
  if (!container) return null;
  const src = container.querySelector('img');
  if (!src) return null;
  const url = src.getAttribute('src') || src.getAttribute('data-src');
  if (!url) return null;
  const img = document.createElement('img');
  img.src = url;
  img.alt = src.getAttribute('alt') || '';
  const link = src.closest('a[href]');
  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.append(img);
    return a;
  }
  return img;
}

function buildHeading(src, document) {
  const tag = /^H[1-6]$/.test(src.tagName) ? src.tagName.toLowerCase() : 'h3';
  const h = document.createElement(tag);
  const parts = src.querySelectorAll('p').length ? [...src.querySelectorAll('p')] : [src];
  const target = document.createElement('span');
  parts.forEach((p, i) => {
    if (i > 0) target.append(' ');
    target.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
  });
  target.querySelectorAll('a').forEach((a) => a.replaceWith(...a.childNodes));
  const link = src.querySelector('a[href]');
  if (link) {
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.append(...target.childNodes);
    h.append(a);
  } else {
    h.append(...target.childNodes);
  }
  return cleanText(h) ? h : null;
}

export default function parse(element, { document }) {
  const teaser = element.querySelector('.cmp-teaser') || element;

  const copy = [];
  const title = teaser.querySelector('.cmp-teaser__title');
  if (title) {
    const heading = buildHeading(title, document);
    if (heading) copy.push(heading);
  }
  const description = teaser.querySelector('.cmp-teaser__description');
  if (description) {
    [...description.children].filter(hasContent).forEach((el) => copy.push(el));
  }
  teaser.querySelectorAll('.cmp-teaser__action-link').forEach((link) => {
    const text = cleanText(link);
    const href = link.getAttribute('href');
    if (!text || !href) return;
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    strong.append(a);
    p.append(strong);
    copy.push(p);
  });

  const media = [];
  const desktop = imageFrom(teaser.querySelector('.cmp-teaser__image-desktop'), document);
  const mobile = imageFrom(teaser.querySelector('.cmp-teaser__image-mobile'), document);
  if (desktop) media.push(desktop);
  if (mobile) media.push(mobile);
  if (!media.length) {
    const any = imageFrom(teaser.querySelector('.cmp-teaser__image'), document);
    if (any) media.push(any);
  }

  const cells = [[copy, media]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'split-teaser', cells });
  element.replaceWith(block);
}
