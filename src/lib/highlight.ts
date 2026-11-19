// Coloration syntaxique minimale, faite au moment du build, pour les extraits de code
// des pages projet (Astro, HTML, blocs WordPress). Renvoie une ligne de HTML par ligne de code.

const TOKENS =
	/(\/\/.*$|<!--.*?-->|^---$)|("[^"]*"|'[^']*')|(<\/?[A-Za-z][\w:.-]*|\/?>)|(\b[a-z][\w-]*(?==))|\b(import|from|const|await|export)\b/g;

const CLASSES = ['c-c', 'c-s', 'c-t', 'c-a', 'c-k'];

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function highlight(source: string): string[] {
	return source.split('\n').map((line) => {
		let html = '';
		let last = 0;
		for (const match of line.matchAll(TOKENS)) {
			const group = match.slice(1).findIndex((g) => g !== undefined);
			html += escape(line.slice(last, match.index)) + `<span class="${CLASSES[group]}">${escape(match[0])}</span>`;
			last = match.index! + match[0].length;
		}
		return html + escape(line.slice(last));
	});
}
