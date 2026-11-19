# Journal de bord — portfolio de Nargis Ayyobi

Ce journal raconte la construction de mon portfolio, de la première ligne jusqu’à la version en ligne :
ce que j’ai fait à chaque étape, pourquoi j’ai fait ces choix, ce qui m’a posé problème et ce que j’ai appris.
Les noms entre `accents graves` sont les messages de mes commits Git.

---

## 1. Démarrage — 27/07/2026

- Création du projet avec **Astro** et **Tailwind CSS**, en **TypeScript**.
- J’ai choisi Astro parce qu’un portfolio est surtout un site de contenu : les pages sont générées à l’avance,
  le site est rapide, et je peux quand même ajouter du JavaScript seulement là où il y a des interactions.
- Premier objectif : avoir une structure simple (accueil, projets, contact) avant de penser au style.

## 2. Première version — 16/09/2026

- `portfolio`, `ajoute de panda et cv`, `panda`, `les modif` : première version en ligne, avec le panda
  (ma mascotte), mon CV à télécharger et mes premiers projets.
- Cette version marchait, mais elle ressemblait à beaucoup d’autres portfolios. Elle ne montrait pas assez
  qui je suis : quelqu’un qui aime à la fois le **code** et le **dessin**.

## 3. Retours des professeurs

| Retour | Ce que j’ai changé |
|---|---|
| **Xavier** — utiliser les « taches » du moodboard (panda) | Les taches d’encre sont devenues le fil rouge du site : les yeux du panda dans le logo, le curseur, les puces du parcours, les éclaboussures. |
| **Xavier** — loi de proximité sur les blocs projet | Le nom, la catégorie, l’année et le lien de chaque projet sont regroupés dans une même barre sous la carte. |
| **Xavier et Pascal** — lignes trop longues | J’ai limité la largeur des textes et fait passer les longues lignes de code à la ligne au lieu d’afficher une barre de défilement. |
| **Pascal** — interface sobre | Une palette courte (noir, crème, beige, vert sauge) et **une seule couleur d’action** : le jaune, réservé aux boutons et aux liens importants. |
| **Pascal** — mettre du code sur l’accueil | Les projets sont présentés comme des fenêtres de code (`zozzo.js`, `washroll.js`…) et l’accueil montre une boucle `while (alive) { eat(); sleep(); code(); repeat(); }`. |
| **Pascal** — un mode « débug » | La boucle de l’accueil s’exécute comme dans un débogueur (la ligne active est surlignée) et un petit terminal affiche ce qui se passe. |
| **Pascal** — ordre des instructions dans le code | J’ai rangé chaque script en fonctions nommées (`initName()`, `initLoop()`…) appelées à la fin du fichier, dans l’ordre d’affichage. |

## 4. Maquette v2 sur Figma

- **Logo `nargıs.ayyobı`** : les points des « ı » deviennent les yeux du panda, le point du milieu son nez.
- **Projets en fenêtres de code**, avec `slug.run()` en jaune comme seule action.
- **À propos à l’encre**, **compétences en autocomplétion** (comme dans un éditeur de code),
  **parcours en `git log`** (chaque diplôme est un commit).
- **Contact en fenêtre `contact.js`**, avec une « console » qui affiche le résultat de l’envoi.
- J’ai créé des **variables de couleur** et des **styles de texte** dans Figma pour que la maquette et le code
  utilisent exactement les mêmes valeurs.

## 5. Recherches pour les animations et les interactions

Avant de coder les animations, j’ai voulu savoir ce qui existe et ce qui marche vraiment, pour ne pas mettre
des effets « pour faire joli ».

**Sur CodePen**, j’ai cherché et testé des exemples pour chaque idée de la maquette :
- des effets d’**encre** et de **taches** (révéler une image en peignant, formes qui fusionnent avec un filtre SVG
  « gooey ») → pour le panda, les couvertures des projets et le pied de page ;
- des **textes qui s’écrivent** et des **textes brouillés** → pour le nom, les rôles et le bouton « Découvrir mes projets » ;
- des **boutons magnétiques** et des **cartes qui s’inclinent** au survol ;
- des **curseurs avant / après** → pour comparer le site en ligne et son code ;
- des **terminaux** et des **consoles** en HTML/CSS → pour le formulaire de contact et les pages projet.

**Sur le site de GSAP**, j’ai lu la documentation et regardé les démos officielles pour choisir les bons outils :
- **ScrollTrigger** pour lancer les animations quand une section arrive à l’écran ;
- **SplitText** pour faire apparaître les titres mot par mot et les paragraphes ligne par ligne ;
- **ScrambleText** pour le texte brouillé ;
- `gsap.matchMedia()` pour respecter le réglage **« réduire les animations »** du système.

**Ce que j’ai retenu de ces recherches :**
- une animation doit **aider à comprendre** (montrer qu’on peut cliquer, guider la lecture), pas seulement décorer ;
- GSAP est idéal pour le défilement et les apparitions, mais pour les effets « dessinés » (taches, encre, physique),
  du JavaScript simple avec un `canvas` ou du SVG est plus léger ;
- chaque animation doit avoir une version **sans mouvement** pour les personnes sensibles aux animations,
  et doit fonctionner **au doigt** sur téléphone, pas seulement à la souris.

## 6. Intégration de l’accueil — 15/11/2026

- `polices`, `logo`, `entete` : polices Inter, Lora et IBM Plex Mono hébergées sur le site, logo et en-tête.
- `accueil` : le nom animé, les rôles qui se réécrivent, la pastille « alternance » aimantée.
- `cartes` : les fenêtres de code des projets ; le code s’écrit tout seul quand la carte arrive à l’écran.
- `apropos`, `competences`, `parcours`, `contact`, `pied` : les autres sections d’après la maquette.
- `chargement`, `scroll` : l’écran de chargement et le panda « retour en haut » dont l’anneau suit le défilement.
- `captures`, `textes`, `etudes`, `projets` : premières pages projet avec les vraies captures des sites en ligne.
- `tiktak` puis `olyvia` : j’ai essayé de présenter TiK•TaK, puis je suis revenue à OLYVIA comme dans la maquette.
- `mentions` : la page des mentions légales.

**Difficultés :**
- Deux composants utilisaient le même attribut `data-…` : l’un « attrapait » les éléments de l’autre.
  J’ai appris à donner des noms uniques (`data-skillbox`, `data-dotgrid`, `data-cover`).
- Les éléments créés en JavaScript ne recevaient pas les styles du composant : avec Astro, les styles sont limités
  au composant, il faut utiliser `:global()` pour ces éléments.
- Après une mauvaise manipulation Git (un `reset`), des fichiers ont disparu et il a fallu réinstaller les
  dépendances (`npm install`). Depuis, je vérifie toujours `git status` avant un commit.

## 7. Contact qui fonctionne vraiment

- Je ne voulais pas d’un simple lien `mailto:` : le formulaire `contact.js` envoie le message avec **Web3Forms**
  et je le reçois directement dans ma boîte Gmail.
- La console du formulaire affiche `✓ 200 OK — message envoyé` ou l’erreur exacte (champ vide, e-mail invalide, réseau).
- J’ai ajouté un champ piège invisible contre les robots, et un bouton pour copier mon adresse.

## 8. Animations et finitions — 18/11/2026

- **Pied de page « flaque d’encre »** : un `canvas` où l’encre monte en vague quand on arrive en bas de page,
  avec des ondulations au passage de la souris. Il se met en pause quand il n’est pas à l’écran.
- `capture` : les images des projets sont cachées sous un papier crème qu’on **peint avec la souris** pour les découvrir ;
  `run()` enlève tout le papier, un second clic ouvre l’étude de cas.
- `apropos`, `panda`, `accueil` : la tête du panda a quitté l’accueil pour la section À propos, redessinée
  pour vraiment ressembler à un panda (visage plein, oreilles rondes, taches autour des yeux).
- `boucle` : la boucle `while (alive)` tourne pour de vrai : surlignage ligne par ligne, terminal qui raconte
  (`sleep() → rêve en CSS`), des « z » qui s’envolent, un compteur de jours et un bouton pause.
- `stage` et `parcours` : ajout de mon stage de 2 mois chez **DM Web** (agence web, Lons-le-Saunier) et parcours
  remis dans l’ordre chronologique, avec `git log --reverse`.

## 9. Rangement du code — 18/11/2026

- `rangement` : je voulais un projet propre, comme dans une vraie équipe :
  - composants rangés en trois dossiers : `layout/` (commun à toutes les pages), `home/` (accueil), `project/` (pages projet) ;
  - chaque script dans son propre fichier TypeScript dans `src/scripts/`, découpé en fonctions nommées ;
  - les couleurs et les polices définies **une seule fois** dans `global.css`, puis réutilisées partout ;
  - une seule page `projects/[slug].astro` qui génère les trois pages projet à partir de `data/projects.ts` ;
  - images renommées clairement (`thematiques.avif` au lieu de `captured'écran2026…`) et couvertures passées
    de PNG à WebP (le dossier `public` est passé de 7 Mo à 2,7 Mo) ;
  - fichiers et code inutilisés supprimés, formatage identique dans tous les fichiers.
- J’ai vérifié que le rendu restait **exactement le même** avant et après, page par page.

## 10. Pages projet — 19/11/2026

- J’ai regardé comment d’autres développeurs présentent leurs projets : les recruteurs passent peu de temps
  sur un portfolio, ils veulent comprendre vite le projet, voir le résultat et pouvoir l’ouvrir.
- Mes anciennes pages avaient trop d’images et trop de texte. J’ai gardé **une image et le résultat** :
  1. l’affiche du projet, révélée à l’encre, avec un pinceau aux couleurs de l’affiche ;
  2. une phrase qui dit ce qu’est le projet ;
  3. un **terminal** `npm run deploy` qui écrit le besoin, ma réponse, la stack et mon rôle ;
  4. un cadre **site en ligne ↔ code** : on fait glisser une coulure d’encre pour passer du site à son code ;
  5. un bouton pour ouvrir le site et le lien GitHub.
- J’ai d’abord comparé deux pistes (un avant / après, et un déploiement en terminal), puis j’ai choisi
  de **mélanger les deux**, avec le code à droite.

## 11. Mobile et accessibilité — 19/11/2026

- `mobile` : j’ai testé chaque page sur un petit téléphone (360 px), un iPhone (390 px) et une tablette (768 px) :
  - aucune page ne déborde sur le côté ;
  - tous les boutons et liens font au moins **24 px de haut** pour être faciles à toucher ;
  - le texte du code est passé à 11 px minimum ;
  - le pied de page laisse de la place au bouton panda ;
  - le terminal se met sur une colonne sur petit écran ;
  - espaces insécables avant « ? » et « ! », comme en typographie française.
- Toutes les animations respectent le réglage « réduire les animations ».

## 12. Maquette v3, textes et mentions légales — 19/11/2026

- **Maquette v3 sur Figma** : j’ai mis la maquette à jour pour qu’elle corresponde au site final
  (accueil, trois pages projet et mentions légales, en desktop et mobile), avec des composants réutilisables
  (boucle `while (alive)`, tête de panda, formulaire `contact.js`, pied de page).
- `apropos` : nouveau texte de présentation, avec ma devise **« A little quiet. Always curious. »**
- `mentions` : mentions légales complétées : hébergeur (Infomaniak), données du formulaire (base légale,
  destinataires, transfert hors UE, durée de conservation, droits, réclamation CNIL), stockage local sans cookie,
  crédits (OLYVIA réalisé en binôme avec Rahma Hamdi).

---

## Ce que j’ai appris

- Partir d’une **idée forte** (le code + l’encre + le panda) et la décliner partout rend un site plus cohérent qu’une suite d’effets.
- **Chercher avant de coder** (CodePen, documentation GSAP) fait gagner du temps et aide à choisir la bonne technique.
- Une interaction doit rester **accessible** : version sans animation, clavier, toucher, tailles de cibles.
- Un code **bien rangé** est plus facile à corriger et à faire évoluer.
- **Tester sur plusieurs écrans** révèle des problèmes qu’on ne voit pas sur son propre ordinateur.

> L’utilisation d’outils d’IA pendant ce projet est détaillée dans `IA.md`.
