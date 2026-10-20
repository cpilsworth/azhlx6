/* eslint-disable */
/* global WebImporter */
/**
 * Parser for social-features.
 * Source: .socialFeatures > .cmp-socialFeatures__base (like / share / favourite icon row,
 *   share popup .cmp-socialFeatures__social-share-content li img = share-channel icon).
 * Target: one row, one cell holding the optional share-channel icon. Counters, the static
 * icons and the popup placeholder strings (errorMessage / requestToSignInContent) are
 * rendered by the block itself and are not authored.
 */
export default function parse(element, { document }) {
  const icons = [];
  element.querySelectorAll('.cmp-socialFeatures__social-share-content img, .cmp-socialFeatures__social-links img')
    .forEach((src) => {
      const url = src.getAttribute('src') || src.getAttribute('data-src');
      if (!url || icons.some((i) => i.getAttribute('src') === url)) return;
      const img = document.createElement('img');
      img.src = url;
      img.alt = src.getAttribute('alt') || '';
      icons.push(img);
    });

  const cells = [[icons]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'social-features', cells });
  element.replaceWith(block);
}
