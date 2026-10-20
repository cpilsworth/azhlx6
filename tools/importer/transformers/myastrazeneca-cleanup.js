/* eslint-disable */
/* global WebImporter */

/**
 * Cleanup transformer for www.myastrazeneca.ch (template "ri").
 *
 * beforeTransform:
 *  - removes global chrome (header XF, footer XF, language navigation, cookie panel)
 *    so its tables/lists cannot be picked up by block parsers
 *  - preserves in-page anchor targets: the source uses ids on .cmp-container
 *    (#definition, #symptome, ...). EDS drops arbitrary ids and auto-generates heading
 *    ids from heading text, so the first heading of each anchored container gets the
 *    EDS-style slug as id and every in-page link (#definition ...) is rewritten to it.
 * afterTransform:
 *  - strips remaining non-authorable nodes and tracking attributes (comments are kept).
 */

// in-page anchor ids used by the sub-nav (ids live on .cmp-container elements)
const ANCHOR_IDS = ['definition', 'symptome', 'diagnose', 'behandlung', 'exazerbationen', 'leitllinien', 'faq'];

// Mirrors the slug EDS (github-slugger style) generates for heading ids.
function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '')
    .replace(/ /g, '-');
}

function preserveAnchors(element) {
  const map = {};
  ANCHOR_IDS.forEach((id) => {
    const container = element.querySelector(`.cmp-container[id="${id}"]`);
    if (!container) return;
    const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
    if (!heading) return;
    const slug = slugify(heading.textContent.replace(/\s+/g, ' '));
    if (!slug) return;
    heading.id = slug;
    map[id] = slug;
  });
  element.querySelectorAll('a[href^="#"]').forEach((a) => {
    const target = a.getAttribute('href').slice(1);
    if (map[target]) a.setAttribute('href', `#${map[target]}`);
  });
}

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    WebImporter.DOMUtils.remove(element, [
      'div.experiencefragment.cmp-experiencefragment--customMenu',
      'div.experiencefragment.cmp-experiencefragment--footerSocial',
      'div.languagenavigation',
      '#CookieReportsPanel',
      'input',
      'script',
      'style',
      'noscript',
      'link',
    ]);

    preserveAnchors(element);

    // Default-content image components carry a desktop and a mobile rendition of the same
    // image and the source hides one with CSS; keep only the desktop one. (Block teasers use
    // .cmp-teaser__image-desktop/-mobile, which their parsers handle, so they're unaffected.)
    element.querySelectorAll('.cmp-image').forEach((box) => {
      if (!box.querySelector('img.cmp-image--desktop')) return;
      box.querySelectorAll('img.cmp-image--mobile').forEach((img) => img.remove());
    });
  }

  if (hookName === 'afterTransform') {
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'noscript',
      'link',
      'iframe',
      'input',
      'form',
    ]);

    [
      'data-tealium-profilename',
      'data-tealium-env',
      'data-enable-delayed-tealium',
      'data-style-config',
      'data-trigger-url-update',
      'onclick',
    ].forEach((attr) => {
      element.querySelectorAll(`[${attr}]`).forEach((el) => el.removeAttribute(attr));
    });
    if (element.removeAttribute) {
      ['data-tealium-profilename', 'data-tealium-env', 'data-enable-delayed-tealium', 'data-style-config', 'data-trigger-url-update']
        .forEach((attr) => element.removeAttribute(attr));
    }
  }
}
