// À propos : la tête de panda faite de taches d'encre. Les taches se rassemblent quand la section
// arrive à l'écran ; la souris (ou un toucher) les disperse, puis elles reviennent.

import { SVG_NS, prefersReducedMotion } from '../utils';

/** Dessine le panda en taches et anime leur retour vers leur place. */
function initAboutPanda() {
	const box = document.querySelector<HTMLElement>('[data-about-panda]');
	if (!box) return;

	const svg = box.querySelector('svg')!;
	const layers = [...box.querySelectorAll<SVGGElement>('[data-layer]')];
	const pupils = [...box.querySelectorAll<SVGCircleElement>('[data-pupil]')];
	const reduce = prefersReducedMotion();
	const vb = svg.viewBox.baseVal;

	// chaque tache : x, y, rayon, calque
	const targets: [number, number, number, number][] = [];
	// remplit une ellipse (inclinée) de taches assez serrées pour former une forme pleine
	const fill = (cx: number, cy: number, rx: number, ry: number, rot: number, r: number, layer: number) => {
		const step = r * 1.15,
			c = Math.cos(rot),
			s = Math.sin(rot);
		for (let y = -ry; y <= ry; y += step)
			for (let x = -rx; x <= rx; x += step) {
				const jx = x + (Math.random() - 0.5) * step * 0.4,
					jy = y + (Math.random() - 0.5) * step * 0.4;
				if ((jx / (rx - r * 0.6)) ** 2 + (jy / (ry - r * 0.6)) ** 2 > 1) continue;
				targets.push([cx + jx * c - jy * s, cy + jx * s + jy * c, r * (0.85 + Math.random() * 0.3), layer]);
			}
	};
	// oreilles : un bord crème, puis le noir par-dessus, posées en haut de la tête
	for (const x of [205, 395]) {
		fill(x, 112, 50, 50, 0, 16, 0);
		fill(x, 112, 38, 38, 0, 15, 1);
	}
	// visage crème bien rond
	fill(300, 215, 132, 118, 0, 20, 2);
	// taches des yeux, en goutte inclinée vers l'extérieur
	fill(258, 212, 30, 44, 0.6, 13, 3);
	fill(342, 212, 30, 44, -0.6, 13, 3);
	// nez
	fill(300, 262, 18, 11, 0, 9, 3);
	// petites éclaboussures autour, pour l'effet encre
	for (const [x, y, r] of [
		[150, 300, 5],
		[455, 280, 4],
		[440, 330, 3],
		[160, 70, 3],
		[470, 170, 4],
		[140, 200, 3],
	])
		targets.push([x, y, r, 4]);

	const drops = targets.map((t) => {
		const c = document.createElementNS(SVG_NS, 'circle');
		layers[t[3]].appendChild(c);
		const st = reduce
			? { x: t[0], y: t[1] }
			: { x: vb.x + Math.random() * vb.width, y: vb.y + Math.random() * vb.height };
		return { c, x: st.x, y: st.y, vx: 0, vy: 0, t };
	});

	let mx = -999,
		my = -999,
		running = false,
		visible = false;
	const draw = () =>
		drops.forEach((p) => {
			p.c.setAttribute('cx', p.x.toFixed(1));
			p.c.setAttribute('cy', p.y.toFixed(1));
			p.c.setAttribute('r', p.t[2].toFixed(1));
		});
	const loop = () => {
		let err = 0,
			speed = 0;
		for (const p of drops) {
			const [tx, ty] = p.t;
			let ax = (tx - p.x) * 0.03,
				ay = (ty - p.y) * 0.03;
			const dx = p.x - mx,
				dy = p.y - my,
				d = Math.hypot(dx, dy);
			if (d < 90 && d > 0) {
				const f = ((90 - d) / 90) * 6;
				ax += (dx / d) * f;
				ay += (dy / d) * f;
			}
			p.vx = (p.vx + ax) * 0.86;
			p.vy = (p.vy + ay) * 0.86;
			p.x += p.vx;
			p.y += p.vy;
			err += Math.hypot(tx - p.x, ty - p.y);
			speed += Math.abs(p.vx) + Math.abs(p.vy);
		}
		draw();
		box.classList.toggle('formed', err / drops.length < 6);
		if (visible && (speed > 0.05 || mx > -999)) requestAnimationFrame(loop);
		else running = false;
	};
	const start = () => {
		if (!running && !reduce) {
			running = true;
			requestAnimationFrame(loop);
		}
	};

	if (!reduce)
		setInterval(() => {
			if (!box.classList.contains('formed')) return;
			pupils.forEach((pu) => pu.setAttribute('r', '1.5'));
			setTimeout(() => pupils.forEach((pu) => pu.setAttribute('r', '5')), 140);
		}, 4500);

	draw();
	if (reduce) box.classList.add('formed');
	else {
		// les taches se rassemblent quand la section arrive à l'écran
		new IntersectionObserver(
			([e]) => {
				visible = e.isIntersecting;
				if (visible) start();
			},
			{ threshold: 0.3 },
		).observe(box);
		const toSvg = (e: PointerEvent) => {
			const r = svg.getBoundingClientRect();
			return [vb.x + ((e.clientX - r.left) / r.width) * vb.width, vb.y + ((e.clientY - r.top) / r.height) * vb.height];
		};
		box.addEventListener('pointermove', (e) => {
			if (e.pointerType === 'touch') return;
			[mx, my] = toSvg(e);
			start();
		});
		box.addEventListener('pointerleave', () => {
			mx = my = -999;
		});
		box.addEventListener('pointerdown', (e) => {
			if (e.pointerType !== 'touch') return;
			drops.forEach((p) => {
				p.vx = (Math.random() - 0.5) * 40;
				p.vy = (Math.random() - 0.5) * 40;
			});
			start();
		});
	}
}

initAboutPanda();
