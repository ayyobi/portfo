// En-tête : ouverture et fermeture du menu sur mobile (bouton, liens, touche Échap).

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');

const setOpen = (open: boolean) => {
	toggle?.setAttribute('aria-expanded', String(open));
	toggle?.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
	menu?.setAttribute('data-state', open ? 'open' : 'closed');
	document.body.style.overflow = open ? 'hidden' : '';
};

toggle?.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setOpen(false);
});
