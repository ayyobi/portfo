# Qualité

> Ce qui a été vérifié, et comment. **Complète avec tes propres tests** (Lighthouse, WAVE, test sur ton téléphone…).

## Accessibilité
- Contrastes : textes secondaires en `#65615a` sur `#f7f4ee` (5,6:1), jaune `#fbc832` uniquement sur fond noir ou derrière du texte noir (12:1).
- Le jaune est réservé aux actions (`run()`, « Envoyer », lien survolé).
- Tous les textes sont du vrai HTML ; les dessins (panda ASCII, taches) sont masqués aux lecteurs d’écran (`aria-hidden`) avec une description.
- Navigation au clavier : menu (Échap pour fermer), autocomplétion des compétences (↑ ↓, Échap), « Tout révéler » dans À propos, contour visible au focus.
- `prefers-reduced-motion` : animations coupées (chargement, frappe, encre, loupe, panda du scroll).
- Formulaire : champs étiquetés, message d’erreur annoncé (`aria-live`), champ en erreur marqué `aria-invalid`.
- [À compléter : score Lighthouse / WAVE]

## Responsive
- Vérifié en 1440 px et 393 px (iPhone) : pas de défilement horizontal, code des cartes adapté à la largeur.
- Sur écran tactile, la loupe du panda et l’encre d’À propos s’animent toutes seules.
- [À compléter : test sur ton téléphone]

## Code
- `npx astro check` : 0 erreur, 0 avertissement.
- `npm run build` : toutes les pages se construisent (accueil, 3 projets, mentions légales).
- [À compléter]

## Performance
- Images en AVIF / WebP, chargement différé (`loading="lazy"`).
- Polices locales (Fontsource), pas de requête externe.
- [À compléter : score Lighthouse]

## Points connus
- Mentions légales : hébergeur et membres de l’équipe OLYVIA à compléter.
- Textes « à réécrire » / « À rédiger » dans `src/data/caseStudies.ts`.
