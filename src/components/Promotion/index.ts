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
		style.textContent = styles;
		this.shadow.append(style)
	}

	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.rendered = true;
		}
	}
}