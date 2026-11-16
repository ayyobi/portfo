export interface ProjectImage {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption: string;
	presentation?: 'mobile' | 'page';
}

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
	context?: string;
	problem?: string;
	objective?: string;
	solution?: string;
	development?: string;
	role: string;
	liveUrl?: string;
	githubUrl?: string;
	behanceUrl?: string;
	cover?: string;
	coverImages?: string[];
	images?: {
		context?: ProjectImage;
		objectives?: ProjectImage[];
		ui?: ProjectImage[];
		result?: ProjectImage;
	};
}

export const projects: Project[] = [
	{
		slug: 'zozzo',
		number: '01',
		name: 'ZOZZO',
		cover: '/zozzo/intro_1.avif',
		images: {
			context: {
				src: '/zozzo/galaxytabs8ultra%20(3).avif',
				alt: 'Accueil de Zozzo sur tablette, avec son personnage dans un univers illustré et coloré.',
				width: 894, height: 626,
				caption: 'L’univers de Zozzo, présenté sur tablette.',
			},
			objectives: [
				{
					src: '/zozzo/galaxytabs8ultra%20(1).avif',
					alt: 'Écran Histoires de Zozzo sur tablette, avec les aventures Rentrée au primaire, Jardin magique et Fait du sport.',
					width: 658, height: 494,
					caption: 'Choisir une histoire pour découvrir la langue des signes.',
				},
				{
					src: '/zozzo/galaxytabs8ultra%20(2).avif',
					alt: 'Histoire illustrée de Zozzo sur tablette, avec un bouton de lecture vidéo devant une école.',
					width: 700, height: 524,
					caption: 'Un récit illustré à regarder en vidéo.',
				},
			],
			ui: [
				{
					src: '/zozzo/_hpelitedragonfly%20(2).avif',
					alt: 'Page Leçons de Zozzo sur ordinateur convertible, avec les leçons sur la rentrée et le jardin magique.',
					width: 788, height: 627,
					caption: 'Le catalogue des leçons et ses cartes illustrées.',
				},
				{
					src: '/zozzo/_hpelitedragonfly%20(1).avif',
					alt: 'Quiz de langue des signes sur ordinateur convertible, avec une vidéo et quatre réponses possibles.',
					width: 820, height: 614,
					caption: 'Un quiz pour reconnaître les signes et mettre en pratique ses connaissances.',
				},
			],
			result: {
				src: '/zozzo/lecon_reussi.avif',
				alt: 'Interface du quiz Zozzo avec le personnage et les choix Merci, Ensemble, Bonjour et Au revoir ; Bonjour est affiché en vert.',
				width: 2880, height: 2048,
				caption: 'L’interface du quiz et le retour visuel sur une réponse.',
			},
		},
		year: '2025',
		category: 'Développement web · UI/UX · Accessibilité',
		summary:
			"ZOZZO est une application web éducative destinée aux enfants de 6 à 12 ans pour faciliter la découverte et l'apprentissage de la Langue des Signes Française (LSF). L'application utilise un univers graphique ludique et un personnage appelé Zozzo pour accompagner l'enfant pendant son apprentissage.",
		context:
			"La Langue des Signes Française reste peu connue et peu enseignée aux enfants entendants. ZOZZO sensibilise dès le plus jeune âge à une communication plus inclusive entre enfants sourds, malentendants et entendants.",
		audience:
			'Enfants de 6 à 12 ans, ainsi que les familles souhaitant découvrir la Langue des Signes Française.',
		problem:
			'Comment rendre la découverte de la Langue des Signes Française accessible, ludique et motivante pour des enfants de 6 à 12 ans ?',
		objective:
			"Faciliter la découverte de la LSF grâce à une expérience progressive, ludique et adaptée au rythme d'apprentissage de chaque enfant.",
		solution:
			"Créer une application web qui mêle apprentissage et jeu : leçons, vidéos, histoires, quiz et mini-jeux permettent de découvrir progressivement les signes dans un univers accompagné par Zozzo.",
		development:
			"J'ai participé à la conception de l'expérience utilisateur, à la création de l'identité visuelle et au développement de l'interface de l'application, avec l'intégration de PocketBase pour les comptes, les scores et la progression.",
		tech: ['Astro', 'Tailwind CSS', 'PocketBase', 'JavaScript / TypeScript'],
		skills: [
			'Développement d’interfaces',
			'Conception UI/UX',
			'Interfaces adaptatives',
			'Base de données',
			'Conception d’interfaces',
			'Accessibilité',
			'Prototypage',
			'Git',
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
  "cover": "/washroll/cover-landscape.png",
  "images": {
    "context": {
      "src": "/washroll/landing_page.avif",
      "alt": "Page complète de Washroll présentant la réservation à distance et les différents états des machines.",
      "width": 3024,
      "height": 5760,
      "caption": "La page de présentation de Washroll et du service de réservation.",
      "presentation": "page"
    },
    "objectives": [
      {
        "src": "/washroll/home.avif",
        "alt": "Accueil mobile de Washroll avec les accès aux machines et aux réservations.",
        "width": 804,
        "height": 1748,
        "caption": "Accéder aux machines, aux réservations et à leur historique.",
        "presentation": "mobile"
      },
      {
        "src": "/washroll/machine-2.avif",
        "alt": "Liste mobile des machines de laverie avec leurs états affichés en couleur.",
        "width": 804,
        "height": 1748,
        "caption": "Repérer les machines disponibles, réservées ou hors service.",
        "presentation": "mobile"
      }
    ],
    "ui": [
      {
        "src": "/washroll/machine.avif",
        "alt": "Écran mobile de réservation avec une machine, un calendrier, un récapitulatif et les boutons Annuler et Valider.",
        "width": 804,
        "height": 2876,
        "caption": "Choisir une machine, une date et un créneau.",
        "presentation": "mobile"
      }
    ],
    "result": {
      "src": "/washroll/reservation.avif",
      "alt": "Page mobile des réservations Washroll avec les réservations à venir et leur historique.",
      "width": 804,
      "height": 1748,
      "caption": "Retrouver les réservations à venir et les précédentes.",
      "presentation": "mobile"
    }
  },
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
		skills: ['Développement web', 'UX/UI', 'Base de données', 'Interfaces adaptatives'],
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
  "cover": "/olyvia/cover-landscape.png",
  "images": {
    "context": {
      "src": "/olyvia/chatgpt_image_28_mai_2026__15_00_45-removebg-preview1%20(1).avif",
      "alt": "Présentation du site Olyvia sur trois appareils : ordinateur portable, tablette et téléphone.",
      "width": 1642,
      "height": 820,
      "caption": "Olyvia sur ordinateur, tablette et mobile."
    },
    "objectives": [
      {
        "src": "/olyvia/captured'%C3%A9cran2026-05-280216101.avif",
        "alt": "Grille de neuf thématiques illustrées : fatigue, bouffées de chaleur, sommeil, alimentation et autres sujets autour de la ménopause.",
        "width": 1108,
        "height": 944,
        "caption": "Des thématiques pour comprendre la ménopause."
      },
      {
        "src": "/olyvia/captured'%C3%A9cran2026-05-280216311.avif",
        "alt": "Liste des articles Olyvia sur les symptômes, dont les difficultés de concentration, les douleurs articulaires et la fatigue.",
        "width": 1304,
        "height": 1004,
        "caption": "Accéder aux articles consacrés aux symptômes."
      }
    ],
    "ui": [
      {
        "src": "/olyvia/captured'%C3%A9cran2026-05-280217481.avif",
        "alt": "Page Conseils et Bien-être avec des articles sur l’activité physique, l’alimentation et le sommeil.",
        "width": 810,
        "height": 630,
        "caption": "Une rubrique de conseils pour le bien-être au quotidien."
      },
      {
        "src": "/olyvia/captured'%C3%A9cran2026-05-280220511.avif",
        "alt": "Page de la communauté Olyvia avec son bandeau de présentation et les discussions du forum.",
        "width": 1084,
        "height": 982,
        "caption": "Un forum pour échanger au sein de la communauté."
      }
    ],
    "result": {
      "src": "/olyvia/captured'%C3%A9cran2026-05-280221121.avif",
      "alt": "Formulaire d’inscription au forum Olyvia avec les champs identifiant, adresse e-mail et les conditions d’inscription.",
      "width": 1276,
      "height": 608,
      "caption": "Le formulaire pour rejoindre la communauté."
    }
  },
		year: '2025',
		category: 'UI/UX · Identité visuelle',
		summary: 'OLYVIA est un projet réalisé en équipe autour de la ménopause.',
		audience: 'Femmes de 40 à 55 ans.',
		objective:
			"Créer une plateforme numérique permettant d'informer, accompagner et créer un espace d'échange destiné principalement aux femmes de 40 à 55 ans.",
		tech: ['WordPress', 'Figma', 'Extensions WordPress', 'Outils de conception graphique'],
		skills: [
			'UI/UX',
			'Conception web',
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
