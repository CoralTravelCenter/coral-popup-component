import styles from './index.css?inline';
import {_createElement} from '../../utils.ts'


export class PromotionComponent extends HTMLElement {
	private rendered: boolean = false;
	private shadow: ShadowRoot = this.attachShadow({mode: 'open'})

	constructor() {
		super();
	}

	render() {
		const style: HTMLElement = _createElement('style', []);
		const slot = _createElement('slot', [])
		const closeButton = _createElement('close-button', ['close-button'])
		style.textContent = styles;
		this.shadow.append(style, closeButton, slot)
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
}
