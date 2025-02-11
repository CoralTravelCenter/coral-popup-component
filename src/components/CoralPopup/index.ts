import styles from './index.css?inline';
import {_createElement} from '../../utils.ts'

export class CoralPopupComponent extends HTMLElement {
	private rendered: boolean = false;
	private shadow: ShadowRoot = this.attachShadow({mode: 'open'})

	constructor() {
		super();
	}

	render() {
		const style: HTMLElement = _createElement('style', []);
		style.textContent = styles;

		const closeContainer: HTMLElement = _createElement('div', ["close-container"]);

		const closeText: HTMLElement = _createElement('span', ['close-container__text']);
		closeText.textContent = 'Закрыть все'

		const closeButton = _createElement('button', ['close-container__button', 'close-button']);
		closeButton.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.303 8.303a1 1 0 0 1 1.414 0L16 14.586l6.283-6.283a1 1 0 1 1 1.414 1.414L17.414 16l6.283 6.283a1 1 0 1 1-1.414 1.414L16 17.414l-6.283 6.283a1 1 0 0 1-1.414-1.414L14.586 16 8.303 9.717a1 1 0 0 1 0-1.414" fill="#535353"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h32v32H0z"/></clipPath></defs></svg>`
		closeContainer.append(closeText, closeButton)

		const slot = _createElement('slot', [])
		this.shadow.append(style, closeContainer, slot)
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
}
