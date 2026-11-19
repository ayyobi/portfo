// Accueil (hero) : le nom animé, les rôles qui se réécrivent, les mots-clés, la pastille aimantée
// et la boucle `while (alive)` qui tourne comme dans un débogueur.
import { gsap } from 'gsap';
import { prefersReducedMotion, hasFinePointer } from '../utils';

/** Le nom : les lettres tombent comme des gouttes, s'épaississent près de la souris et sautent au clic. */
function initName(fine: boolean) {
	const name = document.querySelector<HTMLElement>('[data-name]');
	if (!name) return;

	const chars = [...name.querySelectorAll<HTMLElement>('.ch')];
	const eyes = [...name.querySelectorAll<HTMLElement>('[data-eye]')];

	// 1. arrivée : les lettres tombent comme des gouttes, puis les yeux clignent
	gsap.from(chars, {
		yPercent: -120,
		opacity: 0,
		rotate: () => gsap.utils.random(-25, 25),
		duration: 0.9,
		ease: 'bounce.out',
		stagger: 0.05,
	});
	gsap.from(eyes, { scale: 0, duration: 0.5, ease: 'back.out(3)', delay: 0.9, stagger: 0.15 });
	setInterval(() => gsap.to(eyes, { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 }), 5000);

	// 2. lettres « aimantées » : plus la souris est proche, plus la lettre s'épaissit et se soulève
	if (fine) {
		const setters = chars.map((c) => ({
			c,
			w: gsap.quickTo(c, '--w', { duration: 0.4, ease: 'power3' }),
			y: gsap.quickTo(c, 'y', { duration: 0.4, ease: 'power3' }),
		}));
		const eyeX = eyes.map((e) => gsap.quickTo(e, 'x', { duration: 0.3 }));
		const eyeY = eyes.map((e) => gsap.quickTo(e, 'y', { duration: 0.3 }));
		addEventListener(
			'pointermove',
			(e) => {
				for (const s of setters) {
					const r = s.c.getBoundingClientRect();
					const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
					const k = Math.max(0, 1 - d / 220);
					s.w(700 + k * 200);
					s.y(-k * 10);
				}
				// les taches-yeux des « i » regardent la souris
				eyes.forEach((eye, i) => {
					const r = eye.getBoundingClientRect();
					const dx = e.clientX - (r.left + r.width / 2),
						dy = e.clientY - (r.top + r.height / 2);
					const d = Math.hypot(dx, dy) || 1;
					eyeX[i]((dx / d) * 3);
					eyeY[i]((dy / d) * 3);
				});
			},
			{ passive: true },
		);
		// clic sur une lettre : elle saute et retombe
		chars.forEach((c) =>
			c.addEventListener('click', () => {
				gsap.fromTo(
					c,
					{ y: 0 },
					{
						y: -40,
						rotate: gsap.utils.random(-30, 30),
						duration: 0.3,
						ease: 'power2.out',
						yoyo: true,
						repeat: 1,
						onComplete: () => gsap.set(c, { rotate: 0 }),
					},
				);
			}),
		);
	}
}

/** Le rôle se réécrit en boucle, comme si on le tapait. */
function initRoles() {
	const role = document.querySelector<HTMLElement>('[data-roles]');
	if (!role) return;

	const list: string[] = JSON.parse(role.dataset.roles || '[]');
	let k = 0;
	const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
	const cycle = async () => {
		await wait(2600);
		const cur = role.textContent || '';
		for (let i = cur.length; i >= 0; i--) {
			role.textContent = cur.slice(0, i);
			await wait(28);
		}
		k = (k + 1) % list.length;
		for (let i = 1; i <= list[k].length; i++) {
			role.textContent = list[k].slice(0, i);
			await wait(55);
		}
		cycle();
	};
	cycle();
}

/** « interactives » sautille au survol. */
function initKeywords() {
	document.querySelectorAll<HTMLElement>('[data-kw="jump"]').forEach((el) => {
		el.addEventListener('mouseenter', () =>
			gsap.fromTo(el, { y: 0 }, { y: -8, duration: 0.18, yoyo: true, repeat: 3, ease: 'power1.inOut' }),
		);
	});
}

/** La pastille « alternance » est aimantée par la souris. */
function initMagnet() {
	const pill = document.querySelector<HTMLElement>('[data-magnet]');
	if (!pill) return;

	const x = gsap.quickTo(pill, 'x', { duration: 0.4, ease: 'power3' });
	const y = gsap.quickTo(pill, 'y', { duration: 0.4, ease: 'power3' });
	pill.addEventListener('pointermove', (e) => {
		const r = pill.getBoundingClientRect();
		x((e.clientX - r.left - r.width / 2) * 0.3);
		y((e.clientY - r.top - r.height / 2) * 0.4);
	});
	pill.addEventListener('pointerleave', () =>
		gsap.to(pill, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }),
	);
}

/**
 * La boucle `while (alive)` s'écrit, puis tourne pour de vrai : chaque ligne s'allume à son tour
 * et le petit terminal raconte ce qui se passe. Le bouton jaune met en pause.
 */
function initLoop() {
	const loopBox = document.querySelector<HTMLElement>('[data-loop]');
	const loopCode = document.querySelector<HTMLElement>('[data-loop-code]');
	if (!loopBox || !loopCode) return;

	const full = loopCode.textContent || '';
	const out = loopBox.querySelector<HTMLElement>('[data-out]')!;
	const dayEl = loopBox.querySelector<HTMLElement>('[data-day]')!;
	const pp = loopBox.querySelector<HTMLButtonElement>('[data-pp]')!;
	const pre = loopBox.querySelector<HTMLElement>('.loop-code')!;
	const cur = loopBox.querySelector<HTMLElement>('.cur')!;
	const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];
	const say: Record<number, string[]> = {
		1: ['bambou ×3 croqué 🎋', 'thé + gâteau', 'nouilles de minuit', 'goûter validé ✓'],
		2: ['z z z…', '8 h… enfin 5 h', 'rêve en CSS', 'sieste de panda'],
		3: [
			'+1 commit',
			'bug corrigé ✓',
			'flexbox aligné du 1er coup',
			"console.log('ici')",
			'pixel décalé de 1px → corrigé',
		],
	};
	let day = 1,
		step = 0,
		paused = false,
		visible = true,
		timer = 0;

	// écrit la sortie du terminal lettre par lettre
	let typing = 0;
	const print = (txt: string) => {
		clearInterval(typing);
		let i = 0;
		out.textContent = '';
		typing = window.setInterval(() => {
			out.textContent = txt.slice(0, ++i);
			if (i >= txt.length) clearInterval(typing);
		}, 28);
	};

	const lines: HTMLElement[] = [];
	const zzz = (line: HTMLElement) => {
		for (let k = 0; k < 3; k++)
			setTimeout(() => {
				const z = document.createElement('span');
				z.className = 'z';
				z.textContent = 'z';
				z.style.left = `${8 + k * 0.6}rem`;
				z.style.top = `${line.offsetTop}px`;
				pre.appendChild(z);
				setTimeout(() => z.remove(), 1700);
			}, k * 350);
	};

	const tick = () => {
		if (paused || !visible) return;
		lines.forEach((l) => l.classList.remove('on'));
		const n = [0, 1, 2, 3, 4][step];
		const line = lines[n];
		line.classList.add('on');
		loopBox.classList.toggle('asleep', n === 2);
		if (n === 0) print('alive === true ✓');
		else if (n === 4) {
			day++;
			dayEl.textContent = `jour ${day}`;
			print(`↻ jour ${day}`);
		} else print(`${['', 'eat', 'sleep', 'code'][n]}() → ${pick(say[n])}`);
		if (n === 2) zzz(line);
		step = (step + 1) % 5;
		timer = window.setTimeout(tick, n === 2 ? 2200 : 1500);
	};

	const run = () => {
		// découpe le code en lignes pour pouvoir les allumer
		loopCode.innerHTML = '';
		full.split('\n').forEach((t) => {
			const l = document.createElement('span');
			l.className = 'ln';
			l.textContent = t || ' ';
			loopCode.appendChild(l);
			lines.push(l);
		});
		cur.remove();
		pp.hidden = false;
		new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			clearTimeout(timer);
			if (visible) timer = window.setTimeout(tick, 400);
		}).observe(loopBox);
	};

	pp.addEventListener('click', () => {
		paused = !paused;
		pp.textContent = paused ? '▶' : '❚❚';
		pp.setAttribute('aria-label', paused ? 'Relancer la boucle' : 'Mettre la boucle en pause');
		clearTimeout(timer);
		if (paused) {
			print('^C  boucle en pause');
			loopBox.classList.remove('asleep');
		} else timer = window.setTimeout(tick, 300);
	});

	loopCode.textContent = '';
	let i = 0;
	const type = () => {
		loopCode.textContent = full.slice(0, ++i);
		if (i < full.length) setTimeout(type, full[i - 1] === '\n' ? 220 : 45);
		else setTimeout(run, 500);
	};
	setTimeout(type, 600);
}

if (!prefersReducedMotion()) {
	const fine = hasFinePointer();
	initName(fine);
	initRoles();
	initKeywords();
	if (fine) initMagnet();
	initLoop();
}
