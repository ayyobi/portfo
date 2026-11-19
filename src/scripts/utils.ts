// Petits outils partagés par les scripts du site.

/** La personne a demandé moins d'animations dans son système. */
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Souris ou pavé tactile (et non un écran tactile). */
export const hasFinePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Espace de noms pour créer des éléments SVG en JavaScript. */
export const SVG_NS = 'http://www.w3.org/2000/svg';

/** Couleurs de la maquette, pour les dessins en canvas et en SVG (mêmes valeurs que `global.css`). */
export const INK = '#111111';
export const PAPER = '#f7f4ee';
