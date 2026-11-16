// Données propres aux pages projet : la capture du site en ligne et les couleurs de l’affiche (pinceau du haut de page).

export interface CaseStudy {
	/** capture du site en ligne */
	live: { src: string; alt: string };
	/** couleurs de l’affiche, utilisées par le pinceau d’encre du hero */
	palette: string[];
}

export const caseStudies: Record<string, CaseStudy> = {
	zozzo: {
		live: {
			src: '/zozzo/site-en-ligne.webp',
			alt: 'Page d’accueil de zozzo.fr : « Apprendre la langue des signes aux enfants », avec le personnage Zozzo et le bouton Télécharger ZOZZO.',
		},
		palette: ['#2445d8', '#ed8543', '#6ad0b2', '#d6dc7a', '#87a4f1'],
	},
	washroll: {
		live: {
			src: '/washroll/site-en-ligne.webp',
			alt: 'Page d’accueil de washroll.ayyobi.fr : « Réserve ta machine sans te déplacer », avec l’illustration d’une machine à laver.',
		},
		palette: ['#ed5d89', '#4fa89a', '#f6c945', '#a4ded2', '#e28f8d'],
	},
	olyvia: {
		live: {
			src: '/olyvia/site-en-ligne.webp',
			alt: 'Page d’accueil de olyvia.ayyobi.fr : « OLYVIA, un espace rassurant pour toutes les femmes qui veulent souffler et avancer ».',
		},
		palette: ['#c196ee', '#f290b2', '#f1b09c', '#98b4f5', '#dea5cb'],
	},
};
