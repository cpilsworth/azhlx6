/* eslint-disable */
/* global WebImporter */

import breadcrumbParser from './parsers/breadcrumb.js';
import heroParser from './parsers/hero.js';
import socialFeaturesParser from './parsers/social-features.js';
import subNavAnchorsParser from './parsers/sub-nav-anchors.js';
import ctaCardsParser from './parsers/cta-cards.js';
import imageTextBandParser from './parsers/image-text-band.js';
import tableBorderedParser from './parsers/table-bordered.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import referencesParser from './parsers/references.js';
import splitTeaserParser from './parsers/split-teaser.js';

import myastrazenecaCleanupTransformer from './transformers/myastrazeneca-cleanup.js';
import myastrazenecaSectionsTransformer from './transformers/myastrazeneca-sections.js';

const PAGE_TEMPLATE = {
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
      "name": "Overview (Définition)",
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

const parsers = {
  'breadcrumb': breadcrumbParser,
  'hero': heroParser,
  'social-features': socialFeaturesParser,
  'sub-nav-anchors': subNavAnchorsParser,
  'cta-cards': ctaCardsParser,
  'image-text-band': imageTextBandParser,
  'table-bordered': tableBorderedParser,
  'accordion-faq': accordionFaqParser,
  'references': referencesParser,
  'split-teaser': splitTeaserParser,
};

const transformers = [
  myastrazenecaCleanupTransformer,
  myastrazenecaSectionsTransformer,
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
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

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
