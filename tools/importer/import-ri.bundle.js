/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-ri.js
  var import_ri_exports = {};
  __export(import_ri_exports, {
    default: () => import_ri_default
  });

  // tools/importer/parsers/breadcrumb.js
  function parse(element, { document }) {
    const items = [...element.querySelectorAll("li.cmp-breadcrumb__item, ul > li")].filter((li, i, all) => all.indexOf(li) === i);
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const text = item.textContent.replace(/\s+/g, " ").trim();
      if (!text) return;
      const li = document.createElement("li");
      const link = item.querySelector("a[href]");
      if (link && !item.classList.contains("cmp-breadcrumb__item--active")) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = link.textContent.replace(/\s+/g, " ").trim();
        li.append(a);
      } else {
        li.textContent = text;
      }
      ul.append(li);
    });
    const cells = [[ul]];
    const block = WebImporter.Blocks.createBlock(document, { name: "breadcrumb", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero.js
  function imageFrom(container, document) {
    if (!container) return null;
    const src = container.querySelector("img");
    if (!src) return null;
    const url = src.getAttribute("src") || src.getAttribute("data-src");
    if (!url) return null;
    const img = document.createElement("img");
    img.src = url;
    img.alt = src.getAttribute("alt") || "";
    return img;
  }
  function parse2(element, { document }) {
    const cells = [];
    const desktop = imageFrom(element.querySelector(".cmp-teaser__image-desktop"), document);
    const mobile = imageFrom(element.querySelector(".cmp-teaser__image-mobile"), document);
    if (desktop) cells.push([desktop]);
    if (mobile) cells.push([mobile]);
    const content = [];
    const title = element.querySelector(".cmp-teaser__title");
    if (title) {
      const h1 = document.createElement("h1");
      const lines = [...title.querySelectorAll("p")].map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
      h1.textContent = lines.length ? lines.join(" ") : title.textContent.replace(/\s+/g, " ").trim();
      content.push(h1);
    }
    const description = element.querySelector(".cmp-teaser__description");
    if (description) {
      [...description.children].filter((el) => el.textContent.replace(/ /g, " ").trim()).forEach((el) => content.push(el));
    }
    if (content.length) cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/social-features.js
  function parse3(element, { document }) {
    const icons = [];
    element.querySelectorAll(".cmp-socialFeatures__social-share-content img, .cmp-socialFeatures__social-links img").forEach((src) => {
      const url = src.getAttribute("src") || src.getAttribute("data-src");
      if (!url || icons.some((i) => i.getAttribute("src") === url)) return;
      const img = document.createElement("img");
      img.src = url;
      img.alt = src.getAttribute("alt") || "";
      icons.push(img);
    });
    const cells = [[icons]];
    const block = WebImporter.Blocks.createBlock(document, { name: "social-features", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/sub-nav-anchors.js
  function parse4(element, { document }) {
    const ul = document.createElement("ul");
    element.querySelectorAll("li").forEach((item) => {
      const link = item.querySelector("a[href]");
      if (!link) return;
      const label = link.textContent.replace(/\s+/g, " ").trim();
      if (!label) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.textContent = label;
      li.append(a);
      ul.append(li);
    });
    const cells = [[ul]];
    const block = WebImporter.Blocks.createBlock(document, { name: "sub-nav-anchors", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cta-cards.js
  function cleanText(el) {
    return el.textContent.replace(/\s+/g, " ").trim();
  }
  function hasContent(el) {
    return !!cleanText(el) || !!el.querySelector("img, picture");
  }
  function imageFrom2(container, document) {
    if (!container) return null;
    const src = container.querySelector("img");
    if (!src) return null;
    const url = src.getAttribute("src") || src.getAttribute("data-src");
    if (!url) return null;
    const img = document.createElement("img");
    img.src = url;
    img.alt = src.getAttribute("alt") || "";
    const link = src.closest("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(img);
      return a;
    }
    return img;
  }
  function buildHeading(src, tag, document) {
    const h = document.createElement(tag);
    const parts = src.querySelectorAll("p").length ? [...src.querySelectorAll("p")] : [src];
    const target = document.createElement("span");
    parts.forEach((p, i) => {
      if (i > 0) target.append(" ");
      target.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
    });
    target.querySelectorAll("a").forEach((a) => a.replaceWith(...a.childNodes));
    const link = src.querySelector("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(...target.childNodes);
      h.append(a);
    } else {
      h.append(...target.childNodes);
    }
    return cleanText(h) ? h : null;
  }
  function buildCta(link, document) {
    const text = cleanText(link);
    const href = link.getAttribute("href");
    if (!text || !href) return null;
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    const a = document.createElement("a");
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
      if (hasClass(node, "container")) {
        if (hasClass(node, "container--tb-space-md")) return "space-md";
        if (hasClass(node, "container--tb-space")) return "";
      }
      if (node.id === "restyle" || node.tagName === "BODY") break;
      node = node.parentElement;
    }
    return "flush";
  }
  function parse5(element, { document }) {
    const teasers = [...element.querySelectorAll(".teaser")].filter((t) => t.querySelector(".cmp-teaser") && hasContent(t));
    const cells = [];
    teasers.forEach((teaser) => {
      const media = [];
      const desktop = imageFrom2(teaser.querySelector(".cmp-teaser__image-desktop"), document);
      const mobile = imageFrom2(teaser.querySelector(".cmp-teaser__image-mobile"), document);
      if (desktop) media.push(desktop);
      if (mobile) media.push(mobile);
      if (!media.length) {
        const any = imageFrom2(teaser.querySelector(".cmp-teaser__image"), document);
        if (any) media.push(any);
      }
      const body = [];
      const pretitle = teaser.querySelector(".cmp-teaser__pretitle");
      if (pretitle && cleanText(pretitle)) {
        const h5 = buildHeading(pretitle, "h5", document);
        if (h5) body.push(h5);
      }
      const title = teaser.querySelector(".cmp-teaser__title");
      if (title) {
        const h4 = buildHeading(title, "h4", document);
        if (h4) body.push(h4);
      }
      const description = teaser.querySelector(".cmp-teaser__description");
      if (description) {
        [...description.children].filter(hasContent).forEach((el) => body.push(el));
      }
      teaser.querySelectorAll(".cmp-teaser__action-link").forEach((link) => {
        const cta = buildCta(link, document);
        if (cta) body.push(cta);
      });
      if (!media.length && !body.length) return;
      cells.push([media, body]);
    });
    const variants = [];
    if (hasClass(element, "container--3-column-wrap")) variants.push("cols-3");
    else if (hasClass(element, "container--2-column-wrap")) variants.push("cols-2");
    if (teasers.some((t) => hasClass(t, "teaser--border-base"))) variants.push("border");
    if (hasClass(element, "container--content-center") || teasers.length && teasers.every((t) => hasClass(t, "teaser--text-center"))) {
      variants.push("center");
    }
    if (teasers.length && !teasers.some((t) => hasClass(t, "teaser--bgColor-supporting-1"))) {
      variants.push("plain");
    }
    if (teasers.length && teasers.every((t) => hasClass(t, "teaser--title-color-core"))) {
      variants.push("title-core");
    }
    const spacing = spacingClass(element);
    if (spacing) variants.push(spacing);
    const name = variants.length ? `cta-cards (${variants.join(", ")})` : "cta-cards";
    const block = WebImporter.Blocks.createBlock(document, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/image-text-band.js
  function cleanText2(el) {
    return el.textContent.replace(/\s+/g, " ").trim();
  }
  function hasContent2(el) {
    return !!cleanText2(el) || !!el.querySelector("img, picture");
  }
  function hasClass2(el, cls) {
    return !!el && el.classList && el.classList.contains(cls);
  }
  function imageFrom3(container, document) {
    if (!container) return null;
    const src = container.querySelector("img");
    if (!src) return null;
    const url = src.getAttribute("src") || src.getAttribute("data-src");
    if (!url) return null;
    const img = document.createElement("img");
    img.src = url;
    img.alt = src.getAttribute("alt") || "";
    const link = src.closest("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(img);
      return a;
    }
    return img;
  }
  function buildHeading2(src, document) {
    const tag = /^H[1-6]$/.test(src.tagName) ? src.tagName.toLowerCase() : "h3";
    const h = document.createElement(tag);
    const parts = src.querySelectorAll("p").length ? [...src.querySelectorAll("p")] : [src];
    const target = document.createElement("span");
    parts.forEach((p, i) => {
      if (i > 0) target.append(" ");
      target.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
    });
    target.querySelectorAll("a").forEach((a) => a.replaceWith(...a.childNodes));
    const link = src.querySelector("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(...target.childNodes);
      h.append(a);
    } else {
      h.append(...target.childNodes);
    }
    return cleanText2(h) ? h : null;
  }
  function buildCta2(link, document) {
    const text = cleanText2(link);
    const href = link.getAttribute("href");
    if (!text || !href) return null;
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    strong.append(a);
    p.append(strong);
    return p;
  }
  function spacingClass2(element) {
    let node = element.parentElement;
    while (node && node.nodeType === 1) {
      if (hasClass2(node, "container")) {
        if (hasClass2(node, "container--tb-space-md")) return "space-md";
        if (hasClass2(node, "container--tb-space")) return "space";
        if (hasClass2(node, "container--desktop-tb-space-md")) return "space-desktop-md";
        if (hasClass2(node, "container--desktop-tb-space")) return "space-desktop";
        return "";
      }
      if (node.id === "restyle" || node.tagName === "BODY") break;
      node = node.parentElement;
    }
    return "";
  }
  function parse6(element, { document }) {
    const teaser = element.querySelector(".cmp-teaser") || element;
    const media = [];
    const desktop = imageFrom3(teaser.querySelector(".cmp-teaser__image-desktop"), document);
    const mobile = imageFrom3(teaser.querySelector(".cmp-teaser__image-mobile"), document);
    if (desktop) media.push(desktop);
    if (mobile) media.push(mobile);
    if (!media.length) {
      const any = imageFrom3(teaser.querySelector(".cmp-teaser__image"), document);
      if (any) media.push(any);
    }
    const body = [];
    const title = teaser.querySelector(".cmp-teaser__title");
    if (title) {
      const heading = buildHeading2(title, document);
      if (heading) body.push(heading);
    }
    const description = teaser.querySelector(".cmp-teaser__description");
    if (description) {
      [...description.children].filter(hasContent2).forEach((el) => body.push(el));
    }
    teaser.querySelectorAll(".cmp-teaser__action-link").forEach((link) => {
      const cta = buildCta2(link, document);
      if (cta) body.push(cta);
    });
    const cells = [[media, body]];
    const variants = [];
    if (hasClass2(element, "teaser--text-image")) variants.push("text-image");
    if (hasClass2(element, "teaser--text-left")) variants.push("text-left");
    if (hasClass2(element, "teaser--title-color-core")) variants.push("title-core");
    const spacing = spacingClass2(element);
    if (spacing) variants.push(spacing);
    const name = variants.length ? `image-text-band (${variants.join(", ")})` : "image-text-band";
    const block = WebImporter.Blocks.createBlock(document, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-bordered.js
  function hasContent3(el) {
    return !!el.textContent.replace(/\s+/g, " ").trim() || !!el.querySelector("img, picture");
  }
  function parse7(element, { document }) {
    const rows = [...element.querySelectorAll(":scope > thead > tr, :scope > tbody > tr, :scope > tfoot > tr, :scope > tr")];
    const cells = [];
    rows.forEach((tr) => {
      const row = [...tr.children].filter((c) => c.tagName === "TD" || c.tagName === "TH").map((cell) => {
        const nodes = [...cell.childNodes].filter((n) => n.nodeType === 1 ? hasContent3(n) : n.textContent.trim());
        return nodes;
      });
      if (row.length) cells.push(row);
    });
    const width = Math.max(0, ...cells.map((r) => r.length));
    cells.forEach((r) => {
      while (r.length < width) r.push("");
    });
    const name = cells.length > 1 ? "table-bordered" : "table-bordered (no-header)";
    const block = WebImporter.Blocks.createBlock(document, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function hasContent4(el) {
    return !!el.textContent.replace(/\s+/g, " ").trim() || !!el.querySelector("img, picture");
  }
  function parse8(element, { document }) {
    const cells = [];
    element.querySelectorAll(".cmp-accordion__item").forEach((item) => {
      const titleEl = item.querySelector(".cmp-accordion__title") || item.querySelector(".cmp-accordion__header");
      const question = titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : "";
      const panel = item.querySelector(".cmp-accordion__panel");
      const answer = [];
      if (panel) {
        const texts = [...panel.querySelectorAll(".cmp-text")];
        if (texts.length) {
          texts.forEach((t) => [...t.children].filter(hasContent4).forEach((el) => answer.push(el)));
        } else {
          [...panel.querySelectorAll("p, ul, ol, table, img")].filter((el) => !el.parentElement.closest("p, ul, ol, table")).filter(hasContent4).forEach((el) => answer.push(el));
        }
      }
      if (!question && !answer.length) return;
      cells.push([question, answer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/references.js
  function cleanText3(el) {
    return el.textContent.replace(/\s+/g, " ").trim();
  }
  function isEmpty(el) {
    return !cleanText3(el) && !el.querySelector("img, picture");
  }
  function isLabel(el) {
    if (el.tagName !== "P") return false;
    const bold = el.querySelector("strong, b");
    return !!bold && cleanText3(bold) === cleanText3(el);
  }
  function parse9(element, { document }) {
    const modules = [...element.querySelectorAll(":scope > .text")];
    const sources = modules.length ? modules : [element];
    const segments = [];
    sources.forEach((mod) => {
      const root = mod.querySelector(".cmp-text") || mod;
      [...root.children].forEach((node) => {
        if (!isEmpty(node)) segments.push([node]);
      });
    });
    const cells = [];
    for (let i = 0; i < segments.length; i += 1) {
      const seg = segments[i];
      const next = segments[i + 1];
      if (seg.length === 1 && isLabel(seg[0]) && next) {
        cells.push([seg, next]);
        i += 1;
      } else {
        cells.push([seg]);
      }
    }
    const width = Math.max(1, ...cells.map((r) => r.length));
    cells.forEach((r) => {
      while (r.length < width) r.push("");
    });
    const variants = [];
    const last = modules[modules.length - 1];
    if (last && last.classList.contains("text--small") && !last.classList.contains("text--b-space-0")) {
      variants.push("space-bottom");
    }
    const name = variants.length ? `references (${variants.join(", ")})` : "references";
    const block = WebImporter.Blocks.createBlock(document, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/split-teaser.js
  function cleanText4(el) {
    return el.textContent.replace(/\s+/g, " ").trim();
  }
  function hasContent5(el) {
    return !!cleanText4(el) || !!el.querySelector("img, picture");
  }
  function imageFrom4(container, document) {
    if (!container) return null;
    const src = container.querySelector("img");
    if (!src) return null;
    const url = src.getAttribute("src") || src.getAttribute("data-src");
    if (!url) return null;
    const img = document.createElement("img");
    img.src = url;
    img.alt = src.getAttribute("alt") || "";
    const link = src.closest("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(img);
      return a;
    }
    return img;
  }
  function buildHeading3(src, document) {
    const tag = /^H[1-6]$/.test(src.tagName) ? src.tagName.toLowerCase() : "h3";
    const h = document.createElement(tag);
    const parts = src.querySelectorAll("p").length ? [...src.querySelectorAll("p")] : [src];
    const target = document.createElement("span");
    parts.forEach((p, i) => {
      if (i > 0) target.append(" ");
      target.append(...[...p.childNodes].map((n) => n.cloneNode(true)));
    });
    target.querySelectorAll("a").forEach((a) => a.replaceWith(...a.childNodes));
    const link = src.querySelector("a[href]");
    if (link) {
      const a = document.createElement("a");
      a.href = link.getAttribute("href");
      a.append(...target.childNodes);
      h.append(a);
    } else {
      h.append(...target.childNodes);
    }
    return cleanText4(h) ? h : null;
  }
  function parse10(element, { document }) {
    const teaser = element.querySelector(".cmp-teaser") || element;
    const copy = [];
    const title = teaser.querySelector(".cmp-teaser__title");
    if (title) {
      const heading = buildHeading3(title, document);
      if (heading) copy.push(heading);
    }
    const description = teaser.querySelector(".cmp-teaser__description");
    if (description) {
      [...description.children].filter(hasContent5).forEach((el) => copy.push(el));
    }
    teaser.querySelectorAll(".cmp-teaser__action-link").forEach((link) => {
      const text = cleanText4(link);
      const href = link.getAttribute("href");
      if (!text || !href) return;
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      const a = document.createElement("a");
      a.href = href;
      a.textContent = text;
      strong.append(a);
      p.append(strong);
      copy.push(p);
    });
    const media = [];
    const desktop = imageFrom4(teaser.querySelector(".cmp-teaser__image-desktop"), document);
    const mobile = imageFrom4(teaser.querySelector(".cmp-teaser__image-mobile"), document);
    if (desktop) media.push(desktop);
    if (mobile) media.push(mobile);
    if (!media.length) {
      const any = imageFrom4(teaser.querySelector(".cmp-teaser__image"), document);
      if (any) media.push(any);
    }
    const cells = [[copy, media]];
    const block = WebImporter.Blocks.createBlock(document, { name: "split-teaser", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/myastrazeneca-cleanup.js
  var ANCHOR_IDS = ["definition", "symptome", "diagnose", "behandlung", "exazerbationen", "leitllinien", "faq"];
  function slugify(text) {
    return text.trim().toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "").replace(/ /g, "-");
  }
  function preserveAnchors(element) {
    const map = {};
    ANCHOR_IDS.forEach((id) => {
      const container = element.querySelector(`.cmp-container[id="${id}"]`);
      if (!container) return;
      const heading = container.querySelector("h1, h2, h3, h4, h5, h6");
      if (!heading) return;
      const slug = slugify(heading.textContent.replace(/\s+/g, " "));
      if (!slug) return;
      heading.id = slug;
      map[id] = slug;
    });
    element.querySelectorAll('a[href^="#"]').forEach((a) => {
      const target = a.getAttribute("href").slice(1);
      if (map[target]) a.setAttribute("href", `#${map[target]}`);
    });
  }
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "div.experiencefragment.cmp-experiencefragment--customMenu",
        "div.experiencefragment.cmp-experiencefragment--footerSocial",
        "div.languagenavigation",
        "#CookieReportsPanel",
        "input",
        "script",
        "style",
        "noscript",
        "link"
      ]);
      preserveAnchors(element);
      element.querySelectorAll(".cmp-image").forEach((box) => {
        if (!box.querySelector("img.cmp-image--desktop")) return;
        box.querySelectorAll("img.cmp-image--mobile").forEach((img) => img.remove());
      });
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, [
        "script",
        "style",
        "noscript",
        "link",
        "iframe",
        "input",
        "form"
      ]);
      [
        "data-tealium-profilename",
        "data-tealium-env",
        "data-enable-delayed-tealium",
        "data-style-config",
        "data-trigger-url-update",
        "onclick"
      ].forEach((attr) => {
        element.querySelectorAll(`[${attr}]`).forEach((el) => el.removeAttribute(attr));
      });
      if (element.removeAttribute) {
        ["data-tealium-profilename", "data-tealium-env", "data-enable-delayed-tealium", "data-style-config", "data-trigger-url-update"].forEach((attr) => element.removeAttribute(attr));
      }
    }
  }

  // tools/importer/transformers/myastrazeneca-sections.js
  var MARKER = "data-excat-section-id";
  function findSectionElement(root, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;
    const document = element.ownerDocument;
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const el = findSectionElement(element, section);
        if (!el || !el.parentNode) continue;
        if (i === 0 && !section.style) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(MARKER, section.id);
        if (i === 0) hr.setAttribute("data-excat-first-section", "true");
        el.parentNode.insertBefore(hr, el);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`hr[${MARKER}="${section.id}"]`);
        const meta = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
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
        while (node && !(node.nodeName === "HR" && node !== anchor)) {
          last = node;
          node = node.nextSibling;
        }
        last.after(meta);
      }
      element.querySelectorAll(`hr[${MARKER}]`).forEach((hr) => hr.removeAttribute(MARKER));
      element.querySelectorAll("hr[data-excat-first-section]").forEach((hr) => hr.remove());
    }
  }

  // tools/importer/import-ri.js
  var PAGE_TEMPLATE = {
    "name": "ri",
    "urls": [
      "https://www.myastrazeneca.ch/fr/startseite/therapiegebiete/ri/copd.html",
      "https://www.myastrazeneca.ch/fr/startseite/therapiegebiete/ri/lupus.html"
    ],
    "representativeUrl": "https://www.myastrazeneca.ch/fr/startseite/therapiegebiete/ri/copd.html",
    "description": "Therapy-area (R&I) disease information pages: hero, in-page anchor nav, long-form clinical content with teasers, tables, cards, FAQ accordion and references",
    "blocks": [
      {
        "name": "breadcrumb",
        "instances": [
          ".breadcrumb"
        ]
      },
      {
        "name": "hero",
        "instances": [
          ".teaser--home-hero"
        ]
      },
      {
        "name": "social-features",
        "instances": [
          ".socialFeatures"
        ]
      },
      {
        "name": "sub-nav-anchors",
        "instances": [
          ".container--customMenu .text--in-page-nav-hr",
          ".container--customMenu .text"
        ]
      },
      {
        "name": "cta-cards",
        "instances": [
          ".container--3-column-wrap"
        ]
      },
      {
        "name": "image-text-band",
        "instances": [
          ".teaser--text-left:not(.teaser--image-top-text-bottom)",
          ".teaser--title-color-core:not(.teaser--image-top-text-bottom):not(.teaser--text-left)",
          ".title--mobile-center + .teaser:not(.teaser--text-image)"
        ]
      },
      {
        "name": "table-bordered",
        "instances": [
          "#restyle .cmp-text table"
        ]
      },
      {
        "name": "accordion-faq",
        "instances": [
          ".accordion.panelcontainer"
        ]
      },
      {
        "name": "references",
        "instances": [
          ".cmp-container:has(> .text--small.text--t-space-0)"
        ]
      },
      {
        "name": "split-teaser",
        "instances": [
          ".teaser--text-image:not(.teaser--text-left)"
        ]
      }
    ],
    "urlPattern": "/fr/startseite/therapiegebiete/ri/*",
    "sections": [
      {
        "id": "section-1",
        "name": "Breadcrumb",
        "selector": [
          "#restyle div.breadcrumb"
        ],
        "style": null,
        "blocks": [
          "breadcrumb"
        ],
        "defaultContent": []
      },
      {
        "id": "section-2",
        "name": "Hero",
        "selector": [
          ".cmp-container#container-1995088c80"
        ],
        "style": null,
        "blocks": [
          "hero"
        ],
        "defaultContent": []
      },
      {
        "id": "section-3",
        "name": "Social features",
        "selector": [
          ".container--tb-space:has(.socialFeatures)"
        ],
        "style": null,
        "blocks": [
          "social-features"
        ],
        "defaultContent": []
      },
      {
        "id": "section-4",
        "name": "In-page navigation",
        "selector": [
          ".container--customMenu"
        ],
        "style": null,
        "blocks": [
          "sub-nav-anchors"
        ],
        "defaultContent": []
      },
      {
        "id": "section-5",
        "name": "Overview (D\xE9finition)",
        "selector": [
          "#definition"
        ],
        "style": null,
        "blocks": [
          "cta-cards"
        ],
        "defaultContent": [
          "#definition > .title",
          "#definition > .text"
        ]
      },
      {
        "id": "section-6",
        "name": "What is COPD / GOLD classification",
        "selector": [
          ".cmp-container#container-d7f00d4c81"
        ],
        "style": null,
        "blocks": [],
        "defaultContent": [
          ".cmp-container#container-d7f00d4c81 > .title",
          ".cmp-container#container-d7f00d4c81 > .text",
          ".cmp-container#container-1c74fd91e3 > .title",
          ".cmp-container#container-1c74fd91e3 > .text"
        ]
      },
      {
        "id": "section-7",
        "name": "Symptoms",
        "selector": [
          "#symptome"
        ],
        "style": "spaced",
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": [
          "#symptome > .title",
          "#symptome > .text",
          ".cmp-container#container-698f6bd426 .text--right"
        ]
      },
      {
        "id": "section-8",
        "name": "Diagnosis intro",
        "selector": [
          "#diagnose"
        ],
        "style": "spaced",
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": [
          "#diagnose > .title"
        ]
      },
      {
        "id": "section-9",
        "name": "Diagnosis details",
        "selector": [
          ".cmp-container#container-c1991dc3ba"
        ],
        "style": null,
        "blocks": [
          "table-bordered"
        ],
        "defaultContent": [
          ".title",
          ".text",
          ".button",
          ".text--right"
        ]
      },
      {
        "id": "section-10",
        "name": "Treatment",
        "selector": [
          "#behandlung"
        ],
        "style": "spaced",
        "blocks": [
          "image-text-band",
          "table-bordered"
        ],
        "defaultContent": [
          ".title",
          ".text",
          ".text--right"
        ]
      },
      {
        "id": "section-11",
        "name": "Exacerbations",
        "selector": [
          "#exazerbationen"
        ],
        "style": null,
        "blocks": [
          "image-text-band",
          "table-bordered",
          "cta-cards"
        ],
        "defaultContent": [
          ".title",
          ".text",
          ".image"
        ]
      },
      {
        "id": "section-12",
        "name": "Recommendations and resources",
        "selector": [
          "#leitllinien"
        ],
        "style": null,
        "blocks": [
          "cta-cards"
        ],
        "defaultContent": [
          "#leitllinien > .title"
        ]
      },
      {
        "id": "section-13",
        "name": "FAQ",
        "selector": [
          "#faq"
        ],
        "style": null,
        "blocks": [
          "accordion-faq"
        ],
        "defaultContent": [
          "#faq > .title"
        ]
      },
      {
        "id": "section-14",
        "name": "Footnotes and references",
        "selector": [
          ".cmp-container#container-1326d877ee"
        ],
        "style": null,
        "blocks": [
          "references"
        ],
        "defaultContent": []
      },
      {
        "id": "section-15",
        "name": "Act on COPD",
        "selector": [
          ".cmp-container#container-673310ea9a"
        ],
        "style": "spaced",
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": [
          ".cmp-container#container-673310ea9a > .title"
        ]
      },
      {
        "id": "section-16",
        "name": "Useful product information",
        "selector": [
          ".cmp-container#container-a09482dee2"
        ],
        "style": null,
        "blocks": [
          "split-teaser"
        ],
        "defaultContent": [
          ".cmp-container#container-a09482dee2 > .title",
          ".cmp-container#container-225993e4e9 .text--right",
          "#last-vivo-id .text"
        ]
      },
      {
        "id": "lupus-2",
        "name": "Lupus: Hero",
        "selector": [
          ".cmp-container#container-612d5fc905"
        ],
        "style": null,
        "blocks": [
          "hero"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-3",
        "name": "Lupus: Intro",
        "selector": [
          ".cmp-container#container-c922591d97"
        ],
        "style": null,
        "blocks": [
          "social-features"
        ],
        "defaultContent": [
          ".cmp-container#container-c922591d97 > .title",
          ".cmp-container#container-c922591d97 > .text"
        ]
      },
      {
        "id": "lupus-4",
        "name": "Lupus: Key figures",
        "selector": [
          "div.container:has(> .cmp-container#container-a06da34d86)"
        ],
        "style": null,
        "blocks": [
          "cta-cards"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-5",
        "name": "Lupus: Symptoms",
        "selector": [
          ".cmp-container#container-dec109ea2a"
        ],
        "style": null,
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-6",
        "name": "Lupus: Diagnosis",
        "selector": [
          ".cmp-container#container-e9ef234a3f"
        ],
        "style": null,
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-7",
        "name": "Lupus: Treatment",
        "selector": [
          ".cmp-container#container-53d3a52e89"
        ],
        "style": null,
        "blocks": [
          "image-text-band"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-8",
        "name": "Lupus: Abbreviations and references",
        "selector": [
          ".cmp-container#container-949db07bcf"
        ],
        "style": null,
        "blocks": [
          "references"
        ],
        "defaultContent": []
      },
      {
        "id": "lupus-9",
        "name": "Lupus: Useful product information",
        "selector": [
          ".cmp-container#container-c8b2f68deb"
        ],
        "style": null,
        "blocks": [
          "split-teaser"
        ],
        "defaultContent": [
          ".cmp-container#container-c8b2f68deb > .title",
          "#last-vivo-id .text"
        ]
      }
    ]
  };
  var parsers = {
    "breadcrumb": parse,
    "hero": parse2,
    "social-features": parse3,
    "sub-nav-anchors": parse4,
    "cta-cards": parse5,
    "image-text-band": parse6,
    "table-bordered": parse7,
    "accordion-faq": parse8,
    "references": parse9,
    "split-teaser": parse10
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element });
        });
      });
    });
    return pageBlocks;
  }
  var import_ri_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document.createElement("hr"));
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_ri_exports);
})();
