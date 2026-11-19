// Animations GSAP du site.
// Tout passe par gsap.matchMedia : si la personne préfère moins d'animations, rien ne bouge
// et le texte reste lisible tout de suite.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { prefersReducedMotion } from './utils';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
	// 1. Titres : les lignes montent derrière un masque quand elles arrivent à l'écran
	document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
		SplitText.create(el, {
			type: el.dataset.split === 'chars' ? 'chars,lines' : 'words,lines',
			mask: 'lines',
			autoSplit: true,
			onSplit(self) {
				const parts = el.dataset.split === 'chars' ? self.chars : self.words;
				return gsap.from(parts, {
					yPercent: 110,
					duration: 0.9,
					ease: 'expo.out',
					stagger: el.dataset.split === 'chars' ? 0.025 : 0.06,
					scrollTrigger: { trigger: el, start: 'top 88%', once: true },
				});
			},
		});
	});
});

mm.add('(prefers-reduced-motion: no-preference)', () => {
	// 2. Paragraphes : chaque ligne apparaît l'une après l'autre
	document.querySelectorAll<HTMLElement>('[data-lines]').forEach((el) => {
		SplitText.create(el, {
			type: 'lines',
			mask: 'lines',
			autoSplit: true,
			onSplit(self) {
				return gsap.from(self.lines, {
					yPercent: 100,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.08,
					scrollTrigger: { trigger: el, start: 'top 90%', once: true },
				});
			},
		});
	});

	// 3. Images : elles se dévoilent du bas vers le haut, en se resserrant
	document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((el) => {
		gsap.fromTo(
			el,
			{ clipPath: 'inset(100% 0% 0% 0% round 8px)' },
			{
				clipPath: 'inset(0% 0% 0% 0% round 8px)',
				duration: 1.2,
				ease: 'expo.out',
				scrollTrigger: { trigger: el, start: 'top 85%', once: true },
			},
		);
		const img = el.querySelector('img');
		if (img)
			gsap.from(img, {
				scale: 1.3,
				duration: 1.6,
				ease: 'expo.out',
				scrollTrigger: { trigger: el, start: 'top 85%', once: true },
			});
	});

	// 4. Parallaxe : l'image glisse doucement dans son cadre pendant le défilement
	document.querySelectorAll<HTMLElement>('[data-parallax-img]').forEach((img) => {
		gsap.fromTo(
			img,
			{ yPercent: -6, scale: 1.14 },
			{
				yPercent: 6,
				scale: 1.14,
				ease: 'none',
				scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
			},
		);
	});
});

// 5. Inclinaison 3D sous la souris (seulement avec une vraie souris)
mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
	const cleanups: (() => void)[] = [];
	document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
		gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
		const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
		const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
		const move = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width - 0.5;
			const y = (e.clientY - r.top) / r.height - 0.5;
			ry(x * 10);
			rx(-y * 10);
		};
		const leave = () => {
			gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1, ease: 'elastic.out(1, 0.4)' });
		};
		el.addEventListener('pointermove', move);
		el.addEventListener('pointerleave', leave);
		cleanups.push(() => {
			el.removeEventListener('pointermove', move);
			el.removeEventListener('pointerleave', leave);
		});
	});
	return () => cleanups.forEach((f) => f());
});

// 6. Texte brouillé façon code au survol (menu, liens du contact)
mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
	const els = document.querySelectorAll<HTMLElement>('[data-scramble], .nav-link');
	const handlers = [...els].map((el) => {
		const text = el.textContent?.trim() || '';
		const run = () =>
			gsap.to(el, { duration: 0.6, scrambleText: { text, chars: '{}[]();<>/=_01', speed: 0.6 }, overwrite: true });
		el.addEventListener('mouseenter', run);
		el.addEventListener('focus', run);
		return () => {
			el.removeEventListener('mouseenter', run);
			el.removeEventListener('focus', run);
		};
	});
	return () => handlers.forEach((f) => f());
});

// 7. Grille de points d'encre (contact) : ils s'écartent sous la souris et reviennent en rebondissant
const dotsBox = document.querySelector<HTMLElement>('[data-dotgrid]');
if (dotsBox) {
	const zone = dotsBox.parentElement!;
	let dots: [HTMLElement, number, number][] = [];
	const build = () => {
		dotsBox.innerHTML = '';
		dots = [];
		const w = zone.clientWidth,
			h = zone.clientHeight,
			gap = 28;
		for (let y = gap / 2; y < h; y += gap) {
			for (let x = gap / 2; x < w; x += gap) {
				const d = document.createElement('i');
				d.style.left = `${x}px`;
				d.style.top = `${y}px`;
				dotsBox.appendChild(d);
				dots.push([d, x, y]);
			}
		}
	};
	build();
	let rw = zone.clientWidth;
	new ResizeObserver(() => {
		if (Math.abs(zone.clientWidth - rw) > 40) {
			rw = zone.clientWidth;
			build();
		}
	}).observe(zone);

	mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
		const move = (e: PointerEvent) => {
			const r = zone.getBoundingClientRect();
			const mx = e.clientX - r.left,
				my = e.clientY - r.top;
			for (const [d, x, y] of dots) {
				const dx = x - mx,
					dy = y - my,
					dist = Math.hypot(dx, dy);
				if (dist < 90 && dist > 0) {
					const f = ((90 - dist) / 90) * 30;
					gsap.to(d, {
						x: (dx / dist) * f,
						y: (dy / dist) * f,
						scale: 1 + f / 25,
						backgroundColor: '#111111',
						duration: 0.3,
						overwrite: 'auto',
					});
					gsap.to(d, {
						x: 0,
						y: 0,
						scale: 1,
						backgroundColor: '#d9d3c7',
						duration: 1.6,
						delay: 0.3,
						ease: 'elastic.out(1, 0.3)',
						overwrite: false,
					});
				}
			}
		};
		zone.addEventListener('pointermove', move);
		return () => zone.removeEventListener('pointermove', move);
	});
}

// 8. Changement de page : une vague d'encre recouvre l'écran, puis se retire sur la nouvelle page
const wave = document.querySelector<SVGPathElement>('[data-wave] path');
if (wave) {
	const shape = (p: number) => {
		// p : 0 = vide, 1 = écran couvert, 2 = vague partie en haut
		const W = 100,
			H = 100,
			top = H - Math.min(p, 1) * (H + 20),
			bottom = p > 1 ? H - (p - 1) * (H + 20) : H;
		let d = `M0 ${bottom} L0 ${top}`;
		for (let x = 0; x < W; x += 10) d += ` Q${x + 5} ${(x / 10) % 2 ? top - 6 : top + 6} ${x + 10} ${top}`;
		return `${d} L${W} ${bottom} Z`;
	};
	const reduce = prefersReducedMotion();
	const o = { p: 0 };
	const draw = () => wave.setAttribute('d', shape(o.p));

	// arrivée sur une page après un clic : l'encre se retire
	let came = false;
	try {
		came = sessionStorage.getItem('ink-nav') === '1';
		sessionStorage.removeItem('ink-nav');
	} catch {}
	if (came && !reduce) {
		o.p = 1;
		draw();
		gsap.to(o, { p: 2, duration: 0.8, ease: 'power2.out', delay: 0.1, onUpdate: draw });
	}

	// départ : on recouvre l'écran avant de changer de page
	document.addEventListener('click', (e) => {
		if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const a = (e.target as HTMLElement).closest('a');
		if (!a || a.target || a.hasAttribute('download')) return;
		const url = new URL(a.href, location.href);
		if (url.origin !== location.origin || url.pathname === location.pathname || /\.[a-z0-9]+$/i.test(url.pathname))
			return;
		e.preventDefault();
		try {
			sessionStorage.setItem('ink-nav', '1');
		} catch {}
		o.p = 0;
		gsap.to(o, {
			p: 1,
			duration: 0.55,
			ease: 'power2.in',
			onUpdate: draw,
			onComplete: () => {
				location.href = a.href;
			},
		});
	});
}
