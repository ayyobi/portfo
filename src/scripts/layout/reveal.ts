// Apparition en fondu des blocs marqués `data-reveal` quand ils arrivent à l'écran
// (le style de départ et d'arrivée est dans `global.css`).

const observer = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add('is-revealed');
			observer.unobserve(entry.target);
		}
	},
	{ threshold: 0.15 },
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
