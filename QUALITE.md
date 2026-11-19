# Qualité web — contrôle du portfolio

Ce fichier présente les contrôles que j’ai faits sur **mon** site, dans les quatre domaines demandés :
ce que j’ai vérifié, comment, et ce que j’ai corrigé.

**Pages contrôlées :** l’accueil, les trois pages projet (ZOZZO, WASHROLL, OLYVIA) et les mentions légales.
**Écrans :** petit téléphone (360 px), iPhone (390 px), tablette (768 px) et ordinateur (1440 px).
**Date :** 19/11/2026, sur la version finale construite avec `npm run build`.

## Outils utilisés

| Outil | Pour quoi |
|---|---|
| **Lighthouse** (Chrome) | Notes de performance, accessibilité, bonnes pratiques et référencement, en mobile et en ordinateur |
| **axe** (intégré à Lighthouse) | Erreurs d’accessibilité : contrastes, attributs ARIA, textes alternatifs |
| **html-validate** | Validité du HTML généré |
| **Navigateur + clavier** | Navigation avec Tab, Entrée, Échap et les flèches |
| **Navigateur en mode responsive** | Affichage à 360, 390, 768 et 1440 px |
| **Réglage « réduire les animations »** | Vérifier le site sans mouvement |

## Résultats Lighthouse (après corrections)

| Page | Performance (mobile / ordi) | Accessibilité | Bonnes pratiques | Référencement |
|---|---|---|---|---|
| Accueil | 99 / 98 | 100 | 100 | 100 |
| ZOZZO | 94 / 99 | 100 | 100 | 100 |
| WASHROLL | 96 / 100 | 100 | 100 | 100 |
| OLYVIA | 94 / 100 | 100 | 100 | 100 |
| Mentions légales | 100 / 100 | 100 | 100 | 100 |

---

## 1. Accessibilité — mon site est-il utilisable par tout le monde ?

| Critère | Ce que j’ai vérifié et comment | Résultat / ce que j’ai corrigé |
|---|---|---|
| **Animations** | Site testé avec le réglage système « réduire les animations » | Toutes les animations ont une version sans mouvement : le panda est déjà formé, le papier des projets n’apparaît pas, la boucle ne tourne pas. GSAP passe par `gsap.matchMedia()`. |
| **Clavier** | Parcours de chaque page avec Tab : 28 éléments sur l’accueil, 19 sur une page projet | Tous les éléments sont atteignables. Le champ des compétences n’avait **pas d’indicateur de focus** (il est invisible quand il est vide) : la fenêtre entière s’entoure maintenant de jaune. Le menu mobile se ferme avec Échap, le cadre site ↔ code se déplace avec les flèches. |
| **Contrastes** | axe / Lighthouse | **3 textes trop clairs** corrigés : les étiquettes du terminal des pages projet (4 → 7,6 : 1), le mot `import` du projet suivant, et le bouton « passer » de l’écran de chargement. |
| **Attributs ARIA** | axe + html-validate | `aria-label` était posé sur des éléments qui ne l’acceptent pas (logo, blocs de code, paragraphes découpés par GSAP) : ajout de `role="img"` sur le logo et les blocs de code, et `aria: 'none'` pour SplitText sur les paragraphes. |
| **Structure** | html-validate, Lighthouse | Un seul `<h1>` par page. Un `<h3>` était placé dans un `<span>` (cartes projet) : remplacé par un `<div>`. |
| **Taille des cibles** | Mesure des boutons et liens sur téléphone | Plusieurs liens faisaient moins de 24 px de haut (`run()`, `send(message)`, « copier », LinkedIn, GitHub…) : zone cliquable agrandie, sans changer la mise en page. |
| **Textes alternatifs** | Lighthouse (`image-alt`) | Toutes les images ont un `alt` qui décrit leur contenu ; les images décoratives ont `alt=""` ou `aria-hidden`. |
| **Langue** | Code source | `<html lang="fr">`, et `lang="en"` sur ma devise en anglais. |

**Choix assumés :** la liste des compétences est une autocomplétion faite à la main (html-validate conseille un `<select>`) : j’ai gardé ce choix pour l’identité « éditeur de code », avec les rôles ARIA `combobox` / `listbox` et le contrôle au clavier.

## 2. Sobriété et performance — que coûte mon site à charger ?

| Critère | Ce que j’ai vérifié et comment | Résultat / ce que j’ai corrigé |
|---|---|---|
| **Poids des pages** | Lighthouse (`total-byte-weight`) | Accueil 573 Ko, pages projet 327 à 376 Ko, mentions légales 200 Ko. |
| **Images** | Taille des fichiers dans `public/` | Couvertures passées de PNG à **WebP** ; couverture de ZOZZO réduite de 2880 à 1920 px (**227 → 103 Ko**) ; images inutilisées supprimées. Le dossier d’images est passé de **7 Mo à 2,7 Mo** (dont 1,4 Mo pour mon CV en PDF). |
| **Chargement de l’image principale** | Lighthouse (LCP) | Ajout d’un préchargement prioritaire de la couverture sur les pages projet. LCP : 0,2 à 0,9 s sur ordinateur ; 2,8 à 3,1 s sur mobile en connexion lente simulée, à cause de l’effet d’encre qui révèle l’image (choix graphique assumé). |
| **Stabilité de la page** | Lighthouse (CLS) | Entre 0,007 et 0,043 : la page ne « saute » pas pendant le chargement. |
| **Polices** | Code source | Inter, Lora et IBM Plex Mono sont **hébergées sur le site** (pas d’appel à Google Fonts), en `woff2`. |
| **JavaScript** | Taille des fichiers générés | 180 Ko de JavaScript au total. Astro génère des pages HTML à l’avance : le JavaScript ne sert qu’aux interactions. |
| **Animations** | Code source | Les animations dessinées (pied de page, panda, cadre site ↔ code) se mettent **en pause quand elles ne sont pas à l’écran**. |
| **Traceurs** | Code source + onglet Réseau | Aucun outil de mesure d’audience, aucune publicité, aucun cookie. |

## 3. Référencement — mon site est-il compréhensible par une machine ?

| Critère | Ce que j’ai vérifié et comment | Résultat / ce que j’ai corrigé |
|---|---|---|
| **Titre et description** | Code source de chaque page | Chaque page a son propre `<title>` (ex. « ZOZZO — Nargis Ayyobi ») et sa `meta description` (la phrase qui résume le projet). |
| **Titres de la page** | html-validate, Lighthouse | Un `<h1>` par page, puis `<h2>` et `<h3>` dans l’ordre. |
| **Liens** | Lighthouse (`link-text`) | Les liens ont un texte clair (« Voir l’étude de cas », « voir le site »). |
| **Partage sur les réseaux** | Code source | L’image de partage `og-image.jpg` était annoncée mais **n’existait pas** : je l’ai créée (1200 × 630 px, capture de l’accueil). |
| **Robots** | `public/robots.txt` | Le site est autorisé à l’indexation. |
| **Adresses** | Code source | Adresses lisibles : `/projects/zozzo/`, `/mentions-legales/`. |

## 4. Conformité juridique — que dois-je à mes visiteurs et aux auteurs ?

| Critère | Ce que j’ai vérifié | Résultat / ce que j’ai corrigé |
|---|---|---|
| **Mentions légales** | Éditrice, directrice de la publication, contact, hébergeur | Ajout de l’hébergeur, qui manquait : **Infomaniak Network SA**, adresse et téléphone. |
| **Données du formulaire (RGPD)** | Informations données aux visiteurs | Ajout de la base légale, des destinataires, du **transfert hors UE** (Web3Forms, serveurs aux États-Unis ; Gmail), de la durée de conservation (3 ans maximum), des droits et de la réclamation à la CNIL. |
| **Cookies** | Code source | Aucun cookie. Deux informations techniques en stockage de session (écran de chargement déjà vu, transition entre pages), effacées à la fermeture de l’onglet : pas de consentement nécessaire, et c’est écrit dans les mentions. |
| **Droits d’auteur** | Crédits | Polices sous licence SIL Open Font License, GSAP cité, projet OLYVIA crédité en binôme avec **Rahma Hamdi**, visuels réalisés avec l’aide d’une IA signalés. Les marques citées dans les projets appartiennent à leurs propriétaires (mention ajoutée). |
| **Librairies** | `package.json` | Toutes les librairies sont déclarées (Astro, Tailwind CSS, GSAP, Fontsource) et adaptées à ma direction artistique. |

---

## Ce qu’il me reste à faire

- Ajouter l’adresse du site dans `astro.config.mjs` (`site:`) une fois le nom de domaine en ligne, pour générer l’adresse canonique et un **plan du site** (sitemap), puis l’indiquer dans `robots.txt`.
- Refaire les mesures Lighthouse **sur le site en ligne** (les notes ci-dessus sont mesurées sur la version construite en local).
- Tester avec un **lecteur d’écran** (NVDA) et sur un vrai téléphone.
