// Cartes projet de l'accueil (fenêtres de code) : le code s'écrit quand la carte arrive à l'écran,
// survoler une feature y pose une tache, et la capture est cachée sous un papier crème qu'on peint
// avec la souris ; `slug.run()` enlève tout le papier, un second clic ouvre l'étude de cas.
import { INK, PAPER, prefersReducedMotion } from '../utils';

const reduce = prefersReducedMotion();

/** Rend une carte projet interactive. */
function initProjectCard(win: HTMLElement) {
	const code = win.querySelector<HTMLElement>('[data-code]')!;
	const lines = [...code.querySelectorAll<HTMLElement>('.l')];

	// 1. le code s'écrit quand la carte arrive à l'écran
	if (!reduce) {
		code.classList.add('typing');
		const io = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting) return;
				io.disconnect();
				let i = 0;
				const next = () => {
					const l = lines[i];
					if (!l) return code.classList.remove('typing');
					const chars = Math.max(1, l.textContent!.length + 3);
					let n = 0;
					const step = () => {
						n += 2;
						const p = Math.min(1, n / chars);
						l.style.clipPath = `inset(0 ${100 - p * 100}% 0 0)`;
						if (p < 1) setTimeout(step, 14);
						else {
							l.style.clipPath = 'none';
							i++;
							setTimeout(next, 40);
						}
					};
					step();
				};
				next();
			},
			{ threshold: 0.35 },
		);
		io.observe(win);
	}

	// 2. la capture est sous un papier crème : on peint pour la découvrir
	const shot = win.querySelector<HTMLElement>('[data-shot]')!;
	const paper = win.querySelector<HTMLCanvasElement>('[data-cover]')!;
	const hint = win.querySelector<HTMLElement>('[data-hint]')!;
	const run = win.querySelector<HTMLAnchorElement>('[data-run]')!;
	const note = win.querySelector<HTMLElement>('[data-run-note]')!;
	const ctx = paper.getContext('2d')!;
	let revealed = reduce;
	let painted = 0;

	const size = () => {
		if (revealed) return;
		const r = shot.getBoundingClientRect();
		const dpr = Math.min(2, devicePixelRatio || 1);
		paper.width = r.width * dpr;
		paper.height = r.height * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = PAPER;
		ctx.fillRect(0, 0, r.width, r.height);
		// quelques taches d'encre décoratives sur le papier
		ctx.fillStyle = INK;
		for (const [x, y, rad] of [
			[0.12, 0.2, 6],
			[0.86, 0.78, 9],
			[0.78, 0.14, 4],
			[0.2, 0.84, 5],
		]) {
			ctx.beginPath();
			ctx.ellipse(x * r.width, y * r.height, rad, rad * 1.3, -0.5, 0, Math.PI * 2);
			ctx.fill();
		}
	};
	if (!reduce) {
		size();
		new ResizeObserver(size).observe(shot);
	}

	// une tache irrégulière qui « mange » le papier
	const erase = (x: number, y: number, r: number) => {
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		for (let i = 0; i < 5; i++) {
			const a = Math.random() * Math.PI * 2,
				d = Math.random() * r * 0.45;
			const cx = x + Math.cos(a) * d,
				cy = y + Math.sin(a) * d;
			ctx.moveTo(cx + r * 0.7, cy);
			ctx.ellipse(
				cx,
				cy,
				r * (0.55 + Math.random() * 0.3),
				r * (0.45 + Math.random() * 0.3),
				Math.random() * 3,
				0,
				Math.PI * 2,
			);
		}
		ctx.fill();
	};

	let last: [number, number] | null = null;
	const paint = (e: PointerEvent) => {
		if (revealed) return;
		const r = shot.getBoundingClientRect();
		const x = e.clientX - r.left,
			y = e.clientY - r.top;
		if (last) {
			const d = Math.hypot(x - last[0], y - last[1]);
			const steps = Math.ceil(d / 12);
			for (let i = 1; i <= steps; i++)
				erase(last[0] + ((x - last[0]) * i) / steps, last[1] + ((y - last[1]) * i) / steps, 24 + Math.min(16, d / 4));
		} else erase(x, y, 26);
		last = [x, y];
		if (++painted === 3) hint.classList.add('gone');
	};
	shot.addEventListener('pointermove', (e) => {
		if (e.pointerType !== 'touch') paint(e);
	});
	shot.addEventListener('pointerdown', (e) => {
		if (e.pointerType === 'touch') {
			last = null;
			paint(e);
		}
	});
	shot.addEventListener('pointerleave', () => (last = null));

	// 3. run() : tout le papier s'efface en taches, la capture apparaît entièrement
	const reveal = () => {
		if (revealed) return;
		revealed = true;
		hint.classList.add('gone');
		note.textContent = '// ✓ lancé · clique encore pour l’étude de cas';
		const r = shot.getBoundingClientRect();
		let n = 0;
		const tick = () => {
			for (let i = 0; i < 10; i++) erase(Math.random() * r.width, Math.random() * r.height, 30 + n * 2.5);
			if (++n < 26) requestAnimationFrame(tick);
			else paper.classList.add('gone');
		};
		tick();
	};
	run.addEventListener('click', (e) => {
		if (revealed || e.metaKey || e.ctrlKey) return; // déjà lancé : le lien ouvre l'étude de cas
		e.preventDefault();
		reveal();
	});
}

document.querySelectorAll<HTMLElement>('.win').forEach(initProjectCard);
