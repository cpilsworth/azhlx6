# Page brief: COPD (BPCO) therapy-area page

What the French COPD page of the myAstraZeneca Switzerland HCP portal must contain, so it can be recreated on Edge Delivery Services. Layout, blocks, block options and section styles are defined by the page template; this brief covers content and checks only.

| | |
|---|---|
| **Template** | [`docs/templates/copd-therapy-area-template.html`](templates/copd-therapy-area-template.html) (Document Authoring / Experience Workspace document) |
| **Source** | https://www.myastrazeneca.ch/fr/startseite/therapiegebiete/ri/copd.html |
| **EDS path** | `/fr/startseite/therapiegebiete/ri/copd` |
| **Audience** | Healthcare professionals in Switzerland; French; regulatory copy must stay verbatim |
| **Job code** | `CH-12804 05/2026` |

## Using the template

Start a new document from the template, then replace every `[bracketed placeholder]` with the content below, section by section. Keep the template's blocks, block options and `spaced` section styles as they are; the template already carries the design (see `DESIGN.md` and `styles/styles.css` for the design system itself).

- **Repeat or drop rows** where the content needs it: cards, FAQ items, table rows and references are rows of their block.
- **In-page nav:** each link's target is the id generated from its H2 text (lowercase, spaces become `-`, accents kept). When you replace "Section title 1" etc., update the matching link in the in-page nav block, using the targets listed below.
- **Images:** the template reuses the COPD images, so it renders realistically. Replace them where the content differs and set real alt text.

## Metadata

| Field | Value |
|---|---|
| Title | BPCO - Symptômes, diagnostic et prise en charge |
| Description | En savoir plus sur la bronchopneumopathie chronique obstructive (BPCO) : ses causes, ses symptômes, les approches thérapeutiques actuelles et des informations cliniques importantes pour les proches et les professionnels de la santé. |
| Image | none |

## Content by template section

| # | Template section | COPD content |
|---|---|---|
| 1 | Breadcrumb | Home › Domaines thérapeutiques › R&I › Bronchopneumopathie chronique obstructive |
| 2 | Hero | H1 "Bronchopneumopathie chronique obstructive"; images `copd-teaser-desktop.jpeg` / `copd-teaser.jpg` (alt "COPD - header") |
| 3 | Social | as template |
| 4 | In-page nav | Définition, Symptômes, Diagnostic, Traitement, Exacerbations, Recommandations, FAQ → the section 5, 7, 8, 10, 11, 12 and 13 H2s |
| 5 | Overview + key figures | H2 "Aperçu de la bronchopneumopathie chronique obstructive" + intro. Cards: Incidence en Suisse (≈400 000 patients)¹ / Exacerbations (>70 % within 3 years)¹,³,⁴ / Mortalité (1 in 5 within a year of first hospitalisation)⁵ |
| 6 | Topic text | H3 "Qu'est-ce que la BPCO ?" (definition, causes, third cause of death, list of 4 consequences, exacerbations, cardiovascular risk); H3 "Classification GOLD de la BPCO" (2 paragraphs) |
| 7 | Symptoms | H2 "Symptômes de la BPCO" + intro. Band: "Quels sont les symptômes typiques de la BPCO ?" (3 paragraphs). Back-to-top link |
| 8 | Diagnosis intro | H2 "Diagnostic de la BPCO et critères de dépistage". Band copy: "Le diagnostic de la BPCO repose sur…" |
| 9 | Diagnosis details | H3 "Groupes à risque"; H3 "Confirmation du diagnostic par spirométrie" + table GOLD 1–4 (Stade GOLD / VEMS₁ / Degré d'obstruction), caption "Adapté d'après GOLD 2026, fig. 2.10"; H3 "Évaluation clinique initiale de la BPCO" + 7-item list + table A/B/E (Groupe / Charge symptomatique / Risque d'exacerbation), caption "fig. 2.13"; H3 "Guide de poche GOLD 2026" + download link; H3 "Guide de poche sur la BPCO" + download link. Back-to-top link |
| 10 | Treatment | H2 "Traitement de la BPCO et options thérapeutiques en Suisse" + intro. Band: "Traitement de la BPCO : inhalateurs, rééducation et oxygénothérapie". H3s: médicamenteux; GOLD-ABE + table A/B/E (Initial / Intensification) + "Nouveauté dans GOLD 2026" and footnotes (* trithérapie not approved initially in Switzerland); inhalation + table DPI / pMDI / SMI / Nébuliseur (Conditions préalables / Limites); Oxygénothérapie; Rééducation pulmonaire; Traitement non pharmacologique (smoking cessation, vaccination list: Grippe, SARS-CoV-2, Pneumocoques, RSV/herpès zoster). Back-to-top link |
| 11 | Exacerbations | H2 "Reconnaître et traiter les exacerbations de la BPCO" + intro. Band: "Reconnaissance d'une exacerbation aiguë de la BPCO (AECOPD)". Table Initial / Critères: légère, modérée, sévère (criteria lists). H3s: "Traitement aigu…" (5-item list), "BPCO : quand une hospitalisation est-elle indiquée ?" + flowchart `aecopd-exacerbation-management-flowchart-fr.png` (desktop version only) + link "Guide de poche sur la BPCO « Plan d'urgence », page 19", "Suivi et prévention" (4-item list, link to the fiche). Card: "Fiche d'information sur la BPCO" with DE / FR links |
| 12 | Resources | H2 "Recommandations et ressources". Cards: Guide de poche sur la BPCO 2025 (Ligue pulmonaire PDF), Recommandations GOLD 2026, Guide de poche GOLD 2026 — each "Téléchargement PDF" |
| 13 | FAQ | H2 "FAQ". 6 items: symptômes typiques; diagnostic selon le « COPD Pocketguide »; traitement groupe B; trithérapie; oxygénothérapie; rééducation pulmonaire |
| 14 | References | #TRIXEO AEROSPHERE indication note with swissmedicinfo-pro.ch link; abbreviations (AECOPD … EVA); "Références :" + 16 references |
| 15 | Campaign | H2 "Act on COPD"; copy "Découvrez l'impact réel des exacerbations…"; CTA "Découvrir maintenant" → https://www.actoncopd.ch/fr/index.html |
| 16 | Product info | H2 "Informations utiles sur les produits"; teaser copy + "Découvrir maintenant" → `/fr/startseite/produkte.html#tabs-33184fd05f-item-72a3dc38cf-tab`. Back-to-top link; job code `CH-12804 05/2026` |

**In-page nav targets** (from the COPD H2s): `#aperçu-de-la-bronchopneumopathie-chronique-obstructive`, `#symptômes-de-la-bpco`, `#diagnostic-de-la-bpco-et-critères-de-dépistage`, `#traitement-de-la-bpco-et-options-thérapeutiques-en-suisse`, `#reconnaître-et-traiter-les-exacerbations-de-la-bpco`, `#recommandations-et-ressources`, `#faq`.

**Images** come from the source host (`https://www.myastrazeneca.ch/content/…/chronisch-obstruktive-lungenerkrankung/…`); the imported page `content/fr/startseite/therapiegebiete/ri/copd.plain.html` has the full URLs.

## Regulatory checks

- Job code `CH-12804 05/2026` present and last.
- Indication note, abbreviations and all 16 references verbatim; superscript reference numbers kept in the body text.
- External links unchanged (GOLD, Ligue pulmonaire, swissmedicinfo-pro.ch, actoncopd.ch).

## Recreate by import instead

The import tooling in `tools/importer/` rebuilds the page from the source in the same structure as the template:

```bash
S=/home/node/.excat-marketplaces/excat-marketplace/excat/skills/excat-content-import/scripts
$S/aem-import-bundle.sh --importjs tools/importer/import-ri.js
node $S/run-bulk-import.js --import-script tools/importer/import-ri.bundle.js \
  --urls tools/importer/urls-ri.txt --force
```

The importer's "content completeness" warning (~70%) is a known miscount caused by menu and footer text; against page content only the import scores 99.5%.
