// Les projets du portfolio : une entrée = une carte sur l'accueil + une page projet.
// Pour ajouter un projet, ajoute une entrée ici : sa page `/projects/<slug>` se crée toute seule.

export interface Project {
	slug: string;
	number: string;
	name: string;
	year: string;
	category: string;
	/** contenu de la fenêtre de code sur l'accueil */
	card: { type: string; goal: string; features: string[]; stack: string[] };
	/** une phrase : ce qu'est le projet */
	pitch: string;
	/** une phrase : le besoin de départ */
	need: string;
	/** une phrase : ce que j'ai construit pour y répondre */
	answer: string;
	role: string;
	tech: string[];
	/** l'image du projet (couverture révélée à l'encre) */
	cover: string;
	/** le résultat : capture du site en ligne */
	live: { url: string; image: string; alt: string };
	/** extrait de code (simplifié) montré à côté du site en ligne */
	code: { file: string; source: string };
	githubUrl?: string;
	/** couleurs de l'affiche, utilisées par le pinceau d'encre de la page projet */
	palette: string[];
}

export const projects: Project[] = [
	{
		slug: 'zozzo',
		number: '01',
		name: 'ZOZZO',
		year: '2025',
		category: 'Développement web · UI/UX · Accessibilité',
		card: {
			type: 'Application web éducative',
			goal: 'Apprendre la LSF aux enfants',
			features: ['Leçons', 'Quiz', 'Dictionnaire', 'Histoires', 'Mini-jeux'],
			stack: ['Astro', 'Tailwind', 'PocketBase'],
		},
		pitch: 'Une application web pour faire découvrir la Langue des Signes Française aux enfants de 6 à 12 ans.',
		need: 'La Langue des Signes Française reste peu connue et peu enseignée aux enfants entendants.',
		answer:
			'Une application qui mêle apprentissage et jeu : leçons, vidéos, histoires, quiz et mini-jeux, avec Zozzo pour guide.',
		role: 'Développement & conception UI/UX',
		tech: ['Astro', 'Tailwind CSS', 'PocketBase', 'JavaScript / TypeScript'],
		cover: '/zozzo/cover.avif',
		live: {
			url: 'https://zozzo.fr',
			image: '/zozzo/site-en-ligne.webp',
			alt: 'Page d’accueil de zozzo.fr : « Apprendre la langue des signes aux enfants », avec le personnage Zozzo et le bouton Télécharger ZOZZO.',
		},
		githubUrl: 'https://github.com/ayyobi/zozzo-on-fire',
		code: {
			file: 'index.astro',
			source: `---
// src/pages/index.astro — extrait simplifié
import Layout from '../layouts/Layout.astro';
import Zozzo from '../components/Zozzo.astro';
---
<Layout title="ZOZZO">
  <header class="nav">
    <a href="/a-propos">À propos</a>
    <a href="/contacts">Contacts</a>
    <a class="btn" href="/inscription">Essayer gratuitement</a>
  </header>
  <section class="hero">
    <Zozzo pose="coucou" />
    <h1>Apprendre la langue des signes aux enfants</h1>
    <p>Des histoires qui valent plus que des mots.</p>
    <a class="btn-orange" href="/telecharger">Télécharger ZOZZO</a>
    <small>Pensée pour les enfants de 6 à 12 ans</small>
  </section>
</Layout>`,
		},
		palette: ['#2445d8', '#ed8543', '#6ad0b2', '#d6dc7a', '#87a4f1'],
	},
	{
		slug: 'washroll',
		number: '02',
		name: 'WASHROLL',
		year: '2025',
		category: 'Développement web · UI/UX',
		card: {
			type: 'Application web',
			goal: 'Simplifier l’utilisation de la laverie CROUS',
			features: ['Réservation', 'Créneaux', 'Rappels', 'Lave-linge', 'Sèche-linge'],
			stack: ['Astro', 'Tailwind', 'PocketBase'],
		},
		pitch:
			'Une application web pour voir les machines libres de la laverie d’une résidence étudiante et réserver un créneau.',
		need: 'Les étudiants descendent jusqu’à la laverie et découvrent que les machines sont déjà utilisées.',
		answer:
			'Les machines et leur état en temps réel, un calendrier pour réserver un créneau et l’historique de ses réservations.',
		role: 'Développement & conception UI/UX',
		tech: ['Astro', 'Tailwind CSS', 'PocketBase'],
		cover: '/washroll/cover.webp',
		live: {
			url: 'https://washroll.ayyobi.fr',
			image: '/washroll/site-en-ligne.webp',
			alt: 'Page d’accueil de washroll.ayyobi.fr : « Réserve ta machine sans te déplacer », avec l’illustration d’une machine à laver.',
		},
		githubUrl: 'https://github.com/ayyobi/washroll',
		code: {
			file: 'index.astro',
			source: `---
// src/pages/index.astro — extrait simplifié
import Layout from '../layouts/Layout.astro';
import Machine from '../components/Machine.astro';
---
<Layout title="WASHROLL">
  <section class="hero">
    <Machine etat="libre" />
    <h1>Réserve ta machine sans te déplacer</h1>
    <p>Consulte les machines en temps réel et réserve ton créneau.</p>
    <a class="btn" href="/inscription">Commencez</a>
    <a class="btn-ghost" href="/machines">Voir les machines</a>
    <ul class="atouts">
      <li>En direct</li>
      <li>Rapide</li>
      <li>Par des étudiants</li>
    </ul>
  </section>
</Layout>`,
		},
		palette: ['#ed5d89', '#4fa89a', '#f6c945', '#a4ded2', '#e28f8d'],
	},
	{
		slug: 'olyvia',
		number: '03',
		name: 'OLYVIA',
		year: '2025',
		category: 'UI/UX · Identité visuelle · projet d’équipe',
		card: {
			type: 'Plateforme web',
			goal: 'Informer et accompagner autour de la ménopause',
			features: ['Symptômes', 'Communauté Q/R', 'Articles', 'FAQ', 'Témoignages'],
			stack: ['WordPress', 'Figma'],
		},
		pitch: 'Une plateforme web réalisée en équipe pour informer et accompagner les femmes autour de la ménopause.',
		need: 'Les femmes de 40 à 55 ans ont besoin d’informations fiables et d’un lieu pour échanger sur la ménopause.',
		answer: 'Un site WordPress avec les symptômes expliqués, des articles, des témoignages et un forum d’entraide.',
		role: 'UI/UX & identité visuelle — projet d’équipe',
		tech: ['WordPress', 'Figma'],
		cover: '/olyvia/cover.webp',
		live: {
			url: 'https://olyvia.ayyobi.fr',
			image: '/olyvia/site-en-ligne.webp',
			alt: 'Page d’accueil de olyvia.ayyobi.fr : « OLYVIA, un espace rassurant pour toutes les femmes qui veulent souffler et avancer ».',
		},
		code: {
			file: 'accueil.html — WordPress',
			source: `<!-- page d'accueil — extrait simplifié -->
<!-- wp:cover {"dimRatio":40} -->
<div class="wp-block-cover">
  <!-- wp:heading {"level":1} -->
  <h1>OLYVIA, un espace rassurant pour toutes
    les femmes qui veulent souffler et avancer</h1>
  <!-- /wp:heading -->
  <!-- wp:paragraph -->
  <p>Traverser la ménopause sereinement, ensemble</p>
  <!-- /wp:paragraph -->
  <!-- wp:buttons -->
  <a class="wp-block-button__link" href="/communaute">
    Rejoindre la communauté
  </a>
  <!-- /wp:buttons -->
</div>
<!-- /wp:cover -->`,
		},
		palette: ['#c196ee', '#f290b2', '#f1b09c', '#98b4f5', '#dea5cb'],
	},
];

export function getNextProject(slug: string) {
	const index = projects.findIndex((project) => project.slug === slug);
	return projects[(index + 1) % projects.length];
}
