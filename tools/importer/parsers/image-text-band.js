/* eslint-disable */
/* global WebImporter */
/**
 * Parser for image-text-band.
 * Source: .teaser (side-by-side, not image-top-text-bottom) > .cmp-teaser:
 *   .cmp-teaser__image-desktop img, .cmp-teaser__image-mobile img (optionally in a link)
 *   .cmp-teaser__content: h3/h4.cmp-teaser__title (<p> lines), .cmp-teaser__description,
 *   .cmp-teaser__action-link (CTA)
 * Only the teaser is consumed: sibling .text modules (e.g. the table next to the
 * exacerbation teaser in container-28b28233af) stay in place for their own parsers.
 * Target: one teaser row, 2 cells: [desktop + mobile picture] [title, copy, CTA].
 * Block options derived from source modifiers:
 *   text-image        teaser--text-image
 *   text-left         teaser--text-left
 *   space-md          container--tb-space-md          (nearest ancestor .container)
 *   space             container--tb-space
 *   space-desktop-md  container--desktop-tb-space-md
 *   space-desktop     container--desktop-tb-space
 *   title-core        teaser--title-color-core
 */
function cleanText(el) {
  return el.textContent.replace(/\s+/g, ' ').trim();
}

function hasContent(el) {
  return !!cleanText(el) || !!el.querySelector('img, picture');
}

function hasClass(el, cls) {
  return !!el && el.classList && el.classList.contains(cls);
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

/** Heading with the source's <p> line wrappers flattened; a title link is kept. */
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

function buildCta(link, document) {
  const text = cleanText(link);
  const href = link.getAttribute('href');
  if (!text || !href) return null;
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  const a = document.createElement('a');
  a.href = href;
  a.textContent = text;
  strong.append(a);
  p.append(strong);
  return p;
}

function spacingClass(element) {
  let node = element.parentElement;
  while (node && node.nodeType === 1) {
    if (hasClass(node, 'container')) {
      if (hasClass(node, 'container--tb-space-md')) return 'space-md';
      if (hasClass(node, 'container--tb-space')) return 'space';
      if (hasClass(node, 'container--desktop-tb-space-md')) return 'space-desktop-md';
      if (hasClass(node, 'container--desktop-tb-space')) return 'space-desktop';
      return '';
    }
    if (node.id === 'restyle' || node.tagName === 'BODY') break;
    node = node.parentElement;
  }
  return '';
}

export default function parse(element, { document }) {
  const teaser = element.querySelector('.cmp-teaser') || element;

  const media = [];
  const desktop = imageFrom(teaser.querySelector('.cmp-teaser__image-desktop'), document);
  const mobile = imageFrom(teaser.querySelector('.cmp-teaser__image-mobile'), document);
  if (desktop) media.push(desktop);
  if (mobile) media.push(mobile);
  if (!media.length) {
    const any = imageFrom(teaser.querySelector('.cmp-teaser__image'), document);
    if (any) media.push(any);
  }

  const body = [];
  const title = teaser.querySelector('.cmp-teaser__title');
  if (title) {
    const heading = buildHeading(title, document);
    if (heading) body.push(heading);
  }
  const description = teaser.querySelector('.cmp-teaser__description');
  if (description) {
    [...description.children].filter(hasContent).forEach((el) => body.push(el));
  }
  teaser.querySelectorAll('.cmp-teaser__action-link').forEach((link) => {
    const cta = buildCta(link, document);
    if (cta) body.push(cta);
  });

  const cells = [[media, body]];

  const variants = [];
  if (hasClass(element, 'teaser--text-image')) variants.push('text-image');
  if (hasClass(element, 'teaser--text-left')) variants.push('text-left');
  if (hasClass(element, 'teaser--title-color-core')) variants.push('title-core');
  const spacing = spacingClass(element);
  if (spacing) variants.push(spacing);

  const name = variants.length ? `image-text-band (${variants.join(', ')})` : 'image-text-band';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
