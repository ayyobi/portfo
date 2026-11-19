// Pied de page : une flaque d'encre en canvas qui monte quand on arrive en bas de page
// et fait des ondulations au passage de la souris. Elle se met en pause hors écran.

import { INK, prefersReducedMotion } from '../utils';

/** Dessine et anime la flaque d’encre. */
function initInkFooter() {
	const foot = document.querySelector<HTMLElement>('[data-ink-footer]');
	if (!foot) return;

	const canvas = foot.querySelector('canvas')!;
	const ctx = canvas.getContext('2d')!;
	const reduce = prefersReducedMotion();
	let W = 0,
		H = 0,
		dpr = 1;
	let level = reduce ? 1 : 0; // 0 = vide, 1 = encre montée
	let ripples: { x: number; t: number }[] = [];
	let visible = false,
		running = false;

	const fit = () => {
		dpr = Math.min(2, devicePixelRatio || 1);
		W = canvas.width = foot.clientWidth * dpr;
		H = canvas.height = foot.clientHeight * dpr;
	};

	const draw = (now: number) => {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = INK;
		ctx.beginPath();
		const top = H - H * 0.72 * level;
		ctx.moveTo(0, H);
		for (let x = 0; x <= W; x += 6 * dpr) {
			let y = top + (reduce ? 0 : Math.sin(x / (60 * dpr) + now / 500) * 6 * dpr);
			for (const r of ripples) {
				const d = x - r.x,
					spread = (40 + r.t * 3) * dpr;
				y += Math.exp(-(d * d) / (2 * spread * spread)) * Math.sin(r.t / 4) * 14 * dpr * Math.max(0, 1 - r.t / 90);
			}
			ctx.lineTo(x, y);
		}
		ctx.lineTo(W, H);
		ctx.fill();
	};

	const loop = (now: number) => {
		if (level < 1) level = Math.min(1, level + 0.012);
		ripples = ripples.filter((r) => ++r.t < 90).slice(-30);
		draw(now);
		if (visible) requestAnimationFrame(loop);
		else running = false;
	};
	const start = () => {
		if (running || reduce) return;
		running = true;
		requestAnimationFrame(loop);
	};

	fit();
	draw(0);
	new ResizeObserver(() => {
		fit();
		draw(performance.now());
	}).observe(foot);
	new IntersectionObserver(([e]) => {
		visible = e.isIntersecting;
		if (visible) start();
	}).observe(foot);

	// la souris ou le doigt fait des ondulations dans l'encre
	if (!reduce) {
		foot.addEventListener('pointermove', (e) => {
			const r = canvas.getBoundingClientRect();
			ripples.push({ x: (e.clientX - r.left) * dpr, t: 0 });
		});
	}
}

initInkFooter();
