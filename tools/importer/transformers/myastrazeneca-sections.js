/* eslint-disable */
/* global WebImporter */

/**
 * Section transformer for www.myastrazeneca.ch (template "ri").
 * beforeTransform: inserts <hr> section breaks before every non-first section
 * (while the parser target elements still exist). Styled sections get a temporary
 * data-excat-section-id marker; afterTransform turns it into Section Metadata.
 */

const MARKER = 'data-excat-section-id';

function findSectionElement(root, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (const sel of selectors) {
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // invalid selector for this DOM, try the next one
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const sections = payload && payload.template && payload.template.sections;
  if (!sections || sections.length < 2) return;
  const document = element.ownerDocument;

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = findSectionElement(element, section);
      if (!el || !el.parentNode) continue;
      if (i === 0 && !section.style) continue;
      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(MARKER, section.id);
      if (i === 0) hr.setAttribute('data-excat-first-section', 'true');
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;
      const marker = element.querySelector(`hr[${MARKER}="${section.id}"]`);
      const meta = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      // section metadata goes at the end of the section: before the next break
      let anchor = marker;
      if (!anchor) {
        const el = findSectionElement(element, section);
        if (el) {
          el.after(meta);
        }
        continue;
      }
      let node = anchor.nextSibling;
      let last = anchor;
      while (node && !(node.nodeName === 'HR' && node !== anchor)) {
        last = node;
        node = node.nextSibling;
      }
      last.after(meta);
    }
    element.querySelectorAll(`hr[${MARKER}]`).forEach((hr) => hr.removeAttribute(MARKER));
    element.querySelectorAll('hr[data-excat-first-section]').forEach((hr) => hr.remove());
  }
}
