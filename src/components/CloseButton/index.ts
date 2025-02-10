import {_createElement} from "../../utils.ts";
import styles from './index.css?inline';
import svg from '/cross.svg?raw'

export class CloseButtonComponent extends HTMLElement {
	private rendered: boolean = false;
	private shadow: ShadowRoot = this.attachShadow({mode: 'open'})

	constructor() {
		super();
	}

	render() {
		const style = _createElement('style', []);
		style.textContent = styles;
		const cross = _createElement('div', ['icon']);
		cross.innerHTML = svg
		this.shadow.append(style, cross)
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
}
