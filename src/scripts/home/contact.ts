// Contact : le formulaire façon IDE. Il vérifie les champs, puis envoie le message à Web3Forms
// (qui le transfère dans ma boîte Gmail) et affiche le résultat dans la « console ».

/** Validation et envoi du formulaire de contact. */
function initContact() {
	const form = document.querySelector<HTMLFormElement>('[data-contact]');
	if (!form) return;

	const out = form.querySelector<HTMLElement>('[data-console]')!;
	const say = (html: string) => (out.innerHTML = html);
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const fields = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')];
		const bad = fields.filter((f) => !f.checkValidity());
		fields.forEach((f) => f.setAttribute('aria-invalid', String(bad.includes(f))));
		if (bad.length) {
			const name = bad[0].name;
			say(
				bad[0].type === 'email' && bad[0].value
					? `<span class="err">TypeError: message.email n’est pas une adresse valide.</span>`
					: `<span class="err">Error: message.${name} est vide. Merci de remplir tous les champs.</span>`,
			);
			bad[0].focus();
			return;
		}
		const data = new FormData(form);
		const key = form.dataset.key || '';
		const send = form.querySelector<HTMLButtonElement>('[data-send]')!;

		if (!key || key.startsWith('COLLE')) {
			say('<span class="err">Error: clé Web3Forms manquante dans Contact.astro.</span>');
			return;
		}

		send.disabled = true;
		say('&gt; send(message) … envoi en cours');
		try {
			const res = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: key,
					subject: `Portfolio — message de ${data.get('nom')}`,
					from_name: 'Portfolio Nargis Ayyobi',
					name: data.get('nom'),
					email: data.get('email'),
					replyto: data.get('email'),
					message: data.get('message'),
					botcheck: (form.querySelector<HTMLInputElement>('[name="botcheck"]')?.checked ?? false) || '',
				}),
			});
			const json = await res.json();
			if (!res.ok || !json.success) throw new Error(json.message || res.statusText);
			say('<span class="ok">✓ 200 OK</span> — message envoyé, merci ! Je vous réponds vite.');
			form.reset();
		} catch {
			say(`<span class="err">NetworkError: l’envoi a échoué. Réessayez, ou écrivez à ${form.dataset.to}.</span>`);
		} finally {
			send.disabled = false;
		}
	});
	document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) =>
		b.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText(b.dataset.copy || '');
				b.textContent = 'copié ✓';
			} catch {
				b.textContent = 'sélectionne le texte';
			}
			setTimeout(() => (b.textContent = 'copier'), 1800);
		}),
	);
	form.addEventListener('input', (e) => {
		(e.target as HTMLElement).removeAttribute('aria-invalid');
		say('<span class="c">&gt;</span> en train d’écrire…');
	});
}

initContact();
