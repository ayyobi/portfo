// Bouton « retour en haut » : un panda dont l'anneau suit la progression du défilement
// et dont les yeux suivent la direction ; un clic remonte en haut de page.

import { prefersReducedMotion } from '../utils';

/** Anneau de progression, regard et retour en haut. */
function initScrollPanda() {
	const btn = document.querySelector<HTMLButtonElement>('[data-scroll-panda]');
	if (!btn) return;

	const reduce = prefersReducedMotion();
	const ring = btn.querySelector<SVGCircleElement>('[data-ring]')!;
	const drop = btn.querySelector<SVGGElement>('[data-drop]')!;
	const lbl = btn.querySelector<HTMLElement>('[data-lbl]')!;
	const pupils = [...btn.querySelectorAll<SVGCircleElement>('[data-pupil]')];
	const base = [
		[29, 35],
		[51, 35],
	];
	let lastY = scrollY,
		lastT = performance.now(),
		idle = 0,
		ticking = false;

	const update = () => {
		ticking = false;
		const max = document.documentElement.scrollHeight - innerHeight;
		const p = max > 0 ? Math.min(1, scrollY / max) : 0;
		ring.style.strokeDasharray = `${(p * 100).toFixed(1)} 100`;
		btn.classList.toggle('show', scrollY > 300);

		const now = performance.now();
		const v = (scrollY - lastY) / Math.max(1, now - lastT); // px/ms, signe = sens
		lastY = scrollY;
		lastT = now;
		if (reduce) return;

		// la goutte s'étire dans le sens du défilement
		const s = Math.min(0.6, Math.abs(v) * 0.25);
		drop.style.transform = `translateY(${Math.sign(v) * s * 8}px) scale(${1 - s * 0.35}, ${1 + s})`;
		btn.classList.add('moving');
		lbl.textContent = `// scroll ${Math.round(p * 100)}%`;
		clearTimeout(idle);
		idle = window.setTimeout(() => {
			drop.style.transform = '';
			btn.classList.remove('moving');
			lbl.textContent = p > 0.98 ? '// fin · remonter ↑' : '// repos';
			// petit clin d'œil en arrivant au repos
			btn.classList.add('blink');
			setTimeout(() => btn.classList.remove('blink'), 140);
		}, 220);
	};

	addEventListener(
		'scroll',
		() => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		},
		{ passive: true },
	);
	update();

	// au repos, le panda suit la souris des yeux
	if (!reduce) {
		addEventListener(
			'pointermove',
			(e) => {
				if (btn.classList.contains('moving')) return;
				const r = btn.getBoundingClientRect();
				const dx = e.clientX - (r.left + r.width / 2),
					dy = e.clientY - (r.top + r.height / 2);
				const d = Math.hypot(dx, dy) || 1,
					m = Math.min(3.5, d / 60);
				pupils.forEach((pu, i) => {
					pu.setAttribute('cx', String(base[i][0] + (dx / d) * m));
					pu.setAttribute('cy', String(base[i][1] + (dy / d) * m));
				});
			},
			{ passive: true },
		);
	}

	btn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
}

initScrollPanda();
