/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cta-cards.
 * Source: .container--3-column-wrap (or --2-column-wrap) > .cmp-container > .teaser
 *   each .teaser > .cmp-teaser:
 *     .cmp-teaser__image-desktop img, .cmp-teaser__image-mobile img (optionally in a link)
 *     .cmp-teaser__content: .cmp-teaser__pretitle?, h4.cmp-teaser__title (<p> lines, optionally
 *     wrapped in a.cmp-teaser__title-link), .cmp-teaser__description, .cmp-teaser__action-link
 *   Empty .teaser placeholders (no .cmp-teaser) are dropped.
 * Target: one row per card, 2 cells: [desktop + mobile picture] [pretitle, h4 title, copy, CTA].
 * Block options derived from source modifiers:
 *   cols-3 / cols-2  container--3-column-wrap / container--2-column-wrap
 *   center           container--content-center or teaser--text-center
 *   border           teaser--border-base
 *   plain            no card carries teaser--bgColor-supporting-1
 *   space-md / flush nearest container with a tb-space modifier: container--tb-space-md / none
 *   title-core       every card carries teaser--title-color-core
 */
/** Normalised text content. */
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

/** Heading with the source's <p> line wrappers flattened; a title link is kept. */
function buildHeading(src, tag, document) {
  const h = document.createElement(tag);
  const parts = src.querySelectorAll('p').length ? [...src.querySelectorAll('p')] : [src];
  const target = document.createElement('span');
  parts.forEach((p, i) => {
    if (i > 0) target.append(' ');
    target.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
  });
  // drop a nested link copy: the heading link is rebuilt from the source link
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

function hasClass(el, cls) {
  return !!el && el.classList && el.classList.contains(cls);
}

function spacingClass(element) {
  let node = element;
  while (node && node.nodeType === 1) {
    if (hasClass(node, 'container')) {
      if (hasClass(node, 'container--tb-space-md')) return 'space-md';
      if (hasClass(node, 'container--tb-space')) return '';
    }
    if (node.id === 'restyle' || node.tagName === 'BODY') break;
    node = node.parentElement;
  }
  return 'flush';
}

export default function parse(element, { document }) {
  const teasers = [...element.querySelectorAll('.teaser')]
    .filter((t) => t.querySelector('.cmp-teaser') && hasContent(t));

  const cells = [];
  teasers.forEach((teaser) => {
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
    const pretitle = teaser.querySelector('.cmp-teaser__pretitle');
    if (pretitle && cleanText(pretitle)) {
      const h5 = buildHeading(pretitle, 'h5', document);
      if (h5) body.push(h5);
    }
    const title = teaser.querySelector('.cmp-teaser__title');
    if (title) {
      const h4 = buildHeading(title, 'h4', document);
      if (h4) body.push(h4);
    }
    const description = teaser.querySelector('.cmp-teaser__description');
    if (description) {
      [...description.children].filter(hasContent).forEach((el) => body.push(el));
    }
    teaser.querySelectorAll('.cmp-teaser__action-link').forEach((link) => {
      const cta = buildCta(link, document);
      if (cta) body.push(cta);
    });

    if (!media.length && !body.length) return;
    cells.push([media, body]);
  });

  const variants = [];
  if (hasClass(element, 'container--3-column-wrap')) variants.push('cols-3');
  else if (hasClass(element, 'container--2-column-wrap')) variants.push('cols-2');
  if (teasers.some((t) => hasClass(t, 'teaser--border-base'))) variants.push('border');
  if (hasClass(element, 'container--content-center')
    || (teasers.length && teasers.every((t) => hasClass(t, 'teaser--text-center')))) {
    variants.push('center');
  }
  if (teasers.length && !teasers.some((t) => hasClass(t, 'teaser--bgColor-supporting-1'))) {
    variants.push('plain');
  }
  if (teasers.length && teasers.every((t) => hasClass(t, 'teaser--title-color-core'))) {
    variants.push('title-core');
  }
  const spacing = spacingClass(element);
  if (spacing) variants.push(spacing);

  const name = variants.length ? `cta-cards (${variants.join(', ')})` : 'cta-cards';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
