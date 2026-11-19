// Pages projet : couverture révélée à l'encre, pinceau aux couleurs de l'affiche,
// terminal « npm run deploy » et cadre site en ligne ↔ code.
import { SVG_NS, prefersReducedMotion } from '../utils';

const reduce = prefersReducedMotion();

/** Lance `fn` une seule fois, quand l'élément arrive à l'écran. */
const onVisible = (el: Element, fn: () => void, threshold = 0.25) => {
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries)
				if (e.isIntersecting) {
					fn();
					io.disconnect();
				}
		},
		{ threshold },
	);
	io.observe(el);
};

/** Couverture : l'encre s'étale et révèle l'image. */
function initInkCover() {
	const blobs = document.querySelector('[data-ink-blobs]');
	const splats = document.querySelector('[data-ink-splats]');
	if (!blobs) return;

	const drops: [SVGCircleElement, number][] = [];
	for (let i = 0; i < 22; i++) {
		const c = document.createElementNS(SVG_NS, 'circle');
		const a = (i / 22) * Math.PI * 2;
		const ring = i % 2 ? 0.85 : 0.55;
		c.setAttribute('cx', String(640 + Math.cos(a) * 520 * ring));
		c.setAttribute('cy', String(300 + Math.sin(a) * 230 * ring));
		c.setAttribute('r', '0');
		blobs.appendChild(c);
		drops.push([c, 150 + ((i * 37) % 70)]);
	}
	const core = document.createElementNS(SVG_NS, 'ellipse');
	core.setAttribute('cx', '640');
	core.setAttribute('cy', '300');
	blobs.appendChild(core);
	for (const [x, y, r] of [
		[60, 50, 9],
		[1220, 70, 6],
		[1240, 540, 12],
		[40, 520, 6],
		[1150, 25, 4],
		[700, 585, 5],
	]) {
		const s = document.createElementNS(SVG_NS, 'circle');
		s.setAttribute('cx', String(x));
		s.setAttribute('cy', String(y));
		s.setAttribute('r', String(r));
		splats?.appendChild(s);
	}
	const start = performance.now();
	const grow = (now: number) => {
		const p = reduce ? 1 : Math.min(1, Math.max(0, (now - start) / 1800));
		const e = 1 - Math.pow(1 - p, 3);
		drops.forEach(([c, r], i) => c.setAttribute('r', String(r * Math.max(0, Math.min(1, e * 1.4 - i * 0.015)))));
		core.setAttribute('rx', String(520 * e));
		core.setAttribute('ry', String(220 * e));
		if (p < 1) requestAnimationFrame(grow);
	};
	requestAnimationFrame(grow);
}

/**
 * Pinceau d'encre aux couleurs de l'affiche : les gouttes fusionnent, coulent puis sèchent.
 * Clic = éclaboussure. Les pastilles choisissent la couleur.
 */
function initPaintBrush() {
	const hero = document.querySelector<HTMLElement>('.hero');
	const layer = document.querySelector<SVGGElement>('[data-paint]');
	const palette: string[] = hero ? JSON.parse(hero.dataset.palette || '[]') : [];
	if (!hero || !layer || !palette.length || reduce) return;

	type Drop = {
		el: SVGCircleElement;
		x: number;
		y: number;
		r: number;
		max: number;
		vx: number;
		vy: number;
		age: number;
		life: number;
	};
	const drops: Drop[] = [];
	let brush = '',
		k = 0,
		lx = -999,
		ly = -999,
		running = false;
	const pick = () => brush || palette[Math.floor(k++ / 7) % palette.length];
	const add = (x: number, y: number, max: number, color: string, vx = 0, vy = 0, life = 1.6) => {
		const el = document.createElementNS(SVG_NS, 'circle');
		el.setAttribute('fill', color);
		layer.appendChild(el);
		drops.push({ el, x, y, r: 0, max, vx, vy, age: 0, life });
		if (drops.length > 90) drops.shift()!.el.remove();
		if (!running) {
			running = true;
			requestAnimationFrame(loop);
		}
	};
	let last = performance.now();
	const loop = (now: number) => {
		const dt = Math.min(0.05, (now - last) / 1000);
		last = now;
		for (let i = drops.length - 1; i >= 0; i--) {
			const d = drops[i];
			d.age += dt;
			const t = d.age / d.life;
			d.vy += 260 * dt * Math.min(1, t * 1.5); // l'encre coule vers le bas
			d.vx *= 0.92;
			d.x += d.vx * dt;
			d.y += d.vy * dt * 0.25;
			d.r = t < 0.15 ? d.max * (t / 0.15) : d.max * Math.max(0, 1 - (t - 0.15) / 0.85) ** 0.7;
			d.el.setAttribute('cx', d.x.toFixed(1));
			d.el.setAttribute('cy', d.y.toFixed(1));
			d.el.setAttribute('r', d.r.toFixed(1));
			if (t >= 1) {
				d.el.remove();
				drops.splice(i, 1);
			}
		}
		if (drops.length) requestAnimationFrame(loop);
		else running = false;
	};
	const pos = (e: PointerEvent) => {
		const r = hero.getBoundingClientRect();
		return [e.clientX - r.left, e.clientY - r.top];
	};
	hero.addEventListener('pointermove', (e) => {
		const [x, y] = pos(e);
		const dist = Math.hypot(x - lx, y - ly);
		if (dist < 14) return;
		const speed = Math.min(1, dist / 60);
		lx = x;
		ly = y;
		add(x, y, 16 + speed * 22 + Math.random() * 8, pick());
	});
	hero.addEventListener('pointerdown', (e) => {
		if ((e.target as HTMLElement).closest('button, a')) return;
		const [x, y] = pos(e);
		const c = pick();
		add(x, y, 70, c, 0, 0, 2.4);
		for (let i = 0; i < 12; i++) {
			const a = Math.random() * Math.PI * 2,
				v = 250 + Math.random() * 450;
			add(x, y, 6 + Math.random() * 14, i % 3 ? c : pick(), Math.cos(a) * v, Math.sin(a) * v * 2, 1.4 + Math.random());
		}
	});
	// la tache-curseur du titre goutte de temps en temps, aux couleurs de l'affiche
	const caretEl = hero.querySelector<HTMLElement>('.caret');
	let ci = 0;
	setInterval(() => {
		if (!caretEl || document.hidden) return;
		const r = caretEl.getBoundingClientRect(),
			h = hero.getBoundingClientRect();
		if (r.bottom < 0 || r.top > innerHeight) return;
		add(r.left - h.left + r.width / 2, r.bottom - h.top, 13, brush || palette[ci++ % palette.length], 0, 40, 2.2);
	}, 1800);
	hero.querySelectorAll<HTMLButtonElement>('.pot').forEach((b) =>
		b.addEventListener('click', () => {
			brush = b.dataset.color || '';
			hero.querySelectorAll('.pot').forEach((o) => o.classList.toggle('on', o === b));
			const r = b.getBoundingClientRect(),
				h = hero.getBoundingClientRect();
			add(r.left - h.left + r.width / 2, r.top - h.top - 10, 30, pick(), 0, -300, 1.2);
		}),
	);
}

/**
 * Le projet raconté comme un déploiement : chaque ligne du terminal s'écrit à son tour,
 * puis le cadre « site en ligne ↔ code » s'ouvre. Le bouton jaune rejoue l'animation.
 */
function initDeploy(onDone: () => void) {
	const term = document.querySelector<HTMLElement>('[data-deploy]');
	const wrap = document.querySelector<HTMLElement>('[data-compare-wrap]');
	if (!term || !wrap) return;
	const lines = [...term.querySelectorAll<HTMLElement>('[data-line]')];
	const replay = term.querySelector<HTMLButtonElement>('[data-replay]')!;
	if (reduce) return onDone();

	// on garde le HTML de chaque ligne, puis on la retape caractère par caractère
	const full = lines.map((l) => l.innerHTML);
	const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
	let run = 0;

	const typeLine = async (line: HTMLElement, html: string, id: number, speed: number) => {
		line.innerHTML = html;
		const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
		const nodes: [Text, string][] = [];
		while (walker.nextNode()) {
			const node = walker.currentNode as Text;
			nodes.push([node, node.data]);
			node.data = '';
		}
		const cur = document.createElement('span');
		cur.className = 'cur';
		line.appendChild(cur);
		line.classList.add('shown');
		for (const [node, text] of nodes)
			for (let i = 1; i <= text.length; i++) {
				if (id !== run) return;
				node.data = text.slice(0, i);
				await wait(speed);
			}
		cur.remove();
	};

	const play = async () => {
		const id = ++run;
		replay.hidden = true;
		wrap.classList.add('closed');
		term.classList.add('typing');
		lines.forEach((l) => l.classList.remove('shown'));
		for (let n = 0; n < lines.length; n++) {
			if (id !== run) return;
			await typeLine(lines[n], full[n], id, n === 0 ? 45 : 12);
			await wait(n === 0 ? 400 : 200);
		}
		if (id !== run) return;
		wrap.classList.remove('closed');
		replay.hidden = false;
		setTimeout(onDone, 900);
	};

	wrap.classList.add('closed');
	term.classList.add('typing');
	replay.addEventListener('click', play);
	onVisible(term, play, 0.5);
}

/**
 * Site en ligne à gauche, code à droite : la frontière est une coulure d'encre qui ondule.
 * On la fait glisser à la souris, au doigt ou avec les flèches du clavier.
 * Renvoie une fonction qui fait faire un aller-retour à la tache (démonstration).
 */
function initCompare(): () => void {
	const box = document.querySelector<HTMLElement>('[data-compare]');
	if (!box) return () => {};
	const clip = box.querySelector<SVGPathElement>('[data-clip]')!;
	const edge = box.querySelector<SVGPathElement>('[data-edge]')!;
	const knob = box.querySelector<SVGElement>('[data-knob]')!;
	let pos = 0.5;
	let t = 0;
	let dragging = false;

	const wave = (y: number) => pos + Math.sin(y * 9 + t) * 0.012 + Math.sin(y * 23 + t * 1.7) * 0.006;
	const draw = () => {
		const pts: [number, number][] = [];
		for (let i = 0; i <= 40; i++) pts.push([wave(i / 40), i / 40]);
		// le code est à droite de la frontière
		clip.setAttribute('d', `M1 0 L${pts.map(([x, y]) => `${x.toFixed(4)} ${y.toFixed(4)}`).join(' L')} L1 1 Z`);
		edge.setAttribute('d', `M${pts.map(([x, y]) => `${(x * 1000).toFixed(1)} ${(y * 625).toFixed(1)}`).join(' L')}`);
		knob.style.left = `${wave(0.5) * 100}%`;
		box.style.setProperty('--pos', pos.toFixed(4));
		box.setAttribute('aria-valuenow', String(Math.round(pos * 100)));
	};
	const setFrom = (e: PointerEvent) => {
		const r = box.getBoundingClientRect();
		pos = Math.min(0.98, Math.max(0.02, (e.clientX - r.left) / r.width));
		draw();
	};

	box.addEventListener('pointerdown', (e) => {
		dragging = true;
		box.setPointerCapture(e.pointerId);
		setFrom(e);
	});
	box.addEventListener('pointermove', (e) => {
		if (dragging || e.pointerType === 'mouse') setFrom(e);
	});
	box.addEventListener('pointerup', () => (dragging = false));
	box.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') pos = Math.max(0.02, pos - 0.05);
		else if (e.key === 'ArrowRight') pos = Math.min(0.98, pos + 0.05);
		else return;
		e.preventDefault();
		draw();
	});
	draw();
	if (reduce) return () => {};

	// l'encre ondule doucement, seulement quand le cadre est à l'écran
	let visible = false;
	const loop = () => {
		if (!visible) return;
		t += 0.03;
		draw();
		requestAnimationFrame(loop);
	};
	new IntersectionObserver(([e]) => {
		visible = e.isIntersecting;
		if (visible) requestAnimationFrame(loop);
	}).observe(box);

	return () => {
		const start = performance.now();
		const demo = (now: number) => {
			const k = (now - start) / 2400;
			if (k > 1 || dragging) return;
			pos = 0.5 + Math.sin(k * Math.PI * 2) * 0.3;
			draw();
			requestAnimationFrame(demo);
		};
		requestAnimationFrame(demo);
	};
}

initInkCover();
initPaintBrush();
initDeploy(initCompare());
