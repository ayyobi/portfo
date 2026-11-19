// Compétences : un champ façon autocomplétion d'éditeur. On tape ou on choisit une compétence
// avec les flèches, et sa description s'affiche à côté.

import { prefersReducedMotion } from '../utils';

/** Autocomplétion des compétences (clavier, souris et démonstration automatique). */
function initSkills() {
	const box = document.querySelector<HTMLElement>('[data-skillbox]');
	if (!box) return;

	const input = box.querySelector<HTMLInputElement>('[data-q]')!;
	const ghost = box.querySelector<HTMLElement>('[data-ghost]')!;
	const opts = [...box.querySelectorAll<HTMLElement>('.opt')];
	const details = [...box.querySelectorAll<HTMLElement>('[data-d]')];
	const reduce = prefersReducedMotion();
	let current = Number(box.dataset.start || 0);

	const select = (i: number) => {
		current = i;
		opts.forEach((o, k) => o.setAttribute('aria-selected', String(k === i)));
		const id = opts[i].dataset.id;
		details.forEach((d) => (d.hidden = d.dataset.d !== id));
		input.setAttribute('aria-activedescendant', opts[i].id);
	};
	const visible = () => opts.filter((o) => !o.hidden);

	// taper filtre la liste
	const fit = () => (input.style.width = `${input.value.length}ch`);
	input.addEventListener('input', () => {
		ghost.textContent = '';
		box.classList.remove('closed');
		const q = input.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
		opts.forEach((o) => (o.hidden = !o.dataset.id!.toLowerCase().startsWith(q)));
		const v = visible();
		if (v.length) select(opts.indexOf(v[0]));
		fit();
	});
	input.addEventListener('keydown', (e) => {
		const v = visible();
		const pos = v.indexOf(opts[current]);
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			select(opts.indexOf(v[(pos + 1) % v.length]));
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			select(opts.indexOf(v[(pos - 1 + v.length) % v.length]));
		}
		if (e.key === 'Escape') {
			input.value = '';
			input.dispatchEvent(new Event('input'));
		}
	});
	opts.forEach((o, i) => {
		o.addEventListener('mouseenter', () => select(i));
		o.addEventListener('click', () => select(i));
	});
	select(current);

	// au chargement : « ayyobi » s'efface lettre par lettre, puis la liste s'ouvre
	if (!reduce) {
		box.classList.add('closed');
		const io = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting) return;
				io.disconnect();
				const erase = () => {
					if (ghost.textContent) {
						ghost.textContent = ghost.textContent.slice(0, -1);
						setTimeout(erase, 110);
					} else setTimeout(() => box.classList.remove('closed'), 200);
				};
				setTimeout(erase, 500);
			},
			{ threshold: 0.4 },
		);
		io.observe(box);
	} else ghost.textContent = '';
}

initSkills();
