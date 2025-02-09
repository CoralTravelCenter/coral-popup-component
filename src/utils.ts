export function _createElement(tag: string, className: string[]): HTMLElement {
	const element = document.createElement(tag);
	if (className.length) element.classList.add(...className);
	return element;
}
