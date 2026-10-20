/**
 * sub-nav-anchors — in-page anchor bar (source `.text` module holding a <ul> of `#anchor`
 * links between two scroll arrows). Forked from sub-nav: same single-list contract, but the
 * links target sections of the CURRENT page, the bar scrolls horizontally with arrow buttons
 * when it overflows, and the link of the section currently in view gets aria-current="true".
 *
 * Authoring: ONE row, ONE cell holding a <ul> — one <li><a href="#anchor">label</a></li> per
 * in-page target (bold wrappers are fine). Missing list: authored nodes are kept visible.
 * @param {Element} block the block element
 */
function targetOf(a) {
  const hash = a.getAttribute('href') || '';
  if (!hash.startsWith('#') || hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function arrow(direction, list) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `sub-nav-anchors-arrow sub-nav-anchors-arrow-${direction}`;
  btn.setAttribute('aria-label', direction === 'left' ? 'Scroll left' : 'Scroll right');
  btn.addEventListener('click', () => {
    const step = Math.max(list.clientWidth * 0.6, 80);
    list.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  });
  return btn;
}

function updateArrows(block, list) {
  const max = list.scrollWidth - list.clientWidth;
  block.classList.toggle('sub-nav-anchors-overflow', max > 1);
  block.classList.toggle('sub-nav-anchors-at-start', list.scrollLeft <= 1);
  block.classList.toggle('sub-nav-anchors-at-end', list.scrollLeft >= max - 1);
}

function setCurrent(links, active) {
  links.forEach((a) => {
    if (a === active) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}

function trackSections(links) {
  if (typeof IntersectionObserver !== 'function') return;
  const byTarget = new Map();
  links.forEach((a) => {
    const target = targetOf(a);
    if (target) byTarget.set(target, a);
  });
  if (!byTarget.size) return;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    // first visible target in document order wins
    const first = [...byTarget.keys()].find((t) => visible.has(t));
    if (first) setCurrent(links, byTarget.get(first));
  }, { rootMargin: '0px 0px -60% 0px' });
  byTarget.forEach((_, target) => io.observe(target));
}

export default async function decorate(block) {
  const list = block.querySelector('ul, ol');
  const wrap = document.createElement('div');
  wrap.className = 'sub-nav-anchors-list';

  if (!list) {
    block.querySelectorAll(':scope > div > div').forEach((cell) => wrap.append(...cell.childNodes));
    block.replaceChildren(wrap);
    return;
  }

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', block.dataset.label || 'On this page');
  wrap.append(list);
  nav.append(arrow('left', list), wrap, arrow('right', list));
  block.replaceChildren(nav);

  const links = [...list.querySelectorAll('a[href]')];
  links.forEach((a) => {
    a.addEventListener('click', () => setCurrent(links, a));
  });

  list.addEventListener('scroll', () => updateArrows(block, list), { passive: true });
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(() => updateArrows(block, list)).observe(list);
  } else {
    updateArrows(block, list);
  }

  // anchor targets may be decorated later than this block — wait for the page to settle
  if (document.readyState === 'complete') trackSections(links);
  else window.addEventListener('load', () => trackSections(links), { once: true });
}
