export interface Project {
	slug: string;
	number: string;
	name: string;
	year: string;
	category: string;
	tech: string[];
	skills: string[];
	features: string[];
	summary: string;
	audience?: string;
	problem?: string;
	objective?: string;
	role: string;
	liveUrl?: string;
	githubUrl?: string;
	behanceUrl?: string;
	cover?: string;
}

export const projects: Project[] = [
	{
		slug: 'zozzo',
		number: '01',
		name: 'ZOZZO',
		year: '2025',
		category: 'Développement web · UI/UX · Accessibilité',
		summary:
			"ZOZZO est une application web éducative destinée aux enfants de 6 à 12 ans pour faciliter la découverte et l'apprentissage de la Langue des Signes Française (LSF). L'application utilise un univers graphique ludique et un personnage appelé Zozzo pour accompagner l'enfant pendant son apprentissage.",
		audience:
			'Enfants de 6 à 12 ans, dans un cadre scolaire ou familial, en découverte de la Langue des Signes Française.',
		tech: ['Astro', 'Tailwind CSS', 'PocketBase', 'JavaScript / TypeScript'],
		skills: [
			'Développement web',
			'UI/UX',
			'Responsive Design',
			'Base de données',
			'Conception',
			'Accessibilité',
		],
		features: [
			'Leçons de LSF',
			'Dictionnaire de signes',
			'Vidéos',
			'Histoires',
			'Quiz',
			'Mini-jeux',
			'Progression',
			'Scores',
			'Profils utilisateurs',
		],
		role: 'Développement & conception UI/UX',
		liveUrl: 'https://zozzo.fr',
		githubUrl: 'https://github.com/ayyobi/zozzo-on-fire',
	},
	{
		slug: 'washroll',
		number: '02',
		name: 'WASHROLL',
		year: '2025',
		category: 'Développement web · UX/UI',
		summary:
			"WASHROLL est une application web imaginée pour faciliter l'utilisation des machines de laverie dans une résidence étudiante.",
		audience: "Étudiants d'une résidence universitaire.",
		problem:
			'Les étudiants peuvent descendre jusqu’à la laverie et découvrir que les machines sont déjà utilisées.',
		objective:
			'Permettre aux étudiants de consulter la disponibilité des machines et réserver un créneau à l’avance.',
		tech: ['Astro', 'Tailwind CSS', 'PocketBase'],
		skills: ['Développement web', 'UX/UI', 'Base de données', 'Responsive Design'],
		features: [
			'Connexion utilisateur',
			'Consultation des machines',
			'Réservation d’un créneau',
			'Calendrier',
			'Confirmation',
			'Historique des réservations',
			'Gestion du temps / créneau',
		],
		role: 'Développement & conception UX/UI',
		liveUrl: 'https://washroll.ayyobi.fr',
		githubUrl: 'https://github.com/ayyobi/washroll',
	},
	{
		slug: 'olyvia',
		number: '03',
		name: 'OLYVIA',
		year: '2025',
		category: 'UI/UX · Identité visuelle',
		summary: 'OLYVIA est un projet réalisé en équipe autour de la ménopause.',
		audience: 'Femmes de 40 à 55 ans.',
		objective:
			"Créer une plateforme numérique permettant d'informer, accompagner et créer un espace d'échange destiné principalement aux femmes de 40 à 55 ans.",
		tech: ['WordPress', 'Figma', 'Plugins WordPress', 'Outils de conception graphique'],
		skills: [
			'UI/UX',
			'Web Design',
			'WordPress',
			'Identité visuelle',
			'Communication',
			'Travail en équipe',
		],
		features: [
			'Informations sur les symptômes',
			'Articles',
			'FAQ',
			'Témoignages',
			'Communauté',
			'Questions / réponses',
			'Page de contact',
		],
		role: 'UI/UX & identité visuelle — projet d’équipe',
		liveUrl: 'https://olyvia.ayyobi.fr',
	},
];

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
	const index = projects.findIndex((project) => project.slug === slug);
	return projects[(index + 1) % projects.length];
}
