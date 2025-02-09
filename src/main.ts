import {CoralPopupComponent} from "./components/CoralPopup";
import {_createElement} from './utils.ts'
import {PopUpManager} from "./types/types.ts";
import {PromotionComponent} from "./components/Promotion";

declare const window: {
	_popUpManager: PopUpManager[]
} & Window

class PopUpManagerInit {
	private DOM: HTMLElement | null = document.getElementById('app');
	private PARENT: HTMLElement | null = null;
	private SETTINGS: [] | null = null;

	constructor(settings: []) {
		if (settings) {
			this.SETTINGS = settings;
			this.createCustomElements();
		} else {
			console.warn("window._popUpManager не найден");
		}
	}

	private defineCustomElements(): void {
		customElements.define('coral-popup', CoralPopupComponent);
		customElements.define('coral-promotion', PromotionComponent);
	}

	private createPopup(): void {
		const popup = _createElement("coral-popup", ['coral-popup']);
		const headline = _createElement('h2', ['coral-popup__headline'])
		headline.textContent = 'Обратите внимание:'
		this.PARENT = _createElement('div', ['coral-popup__wrapper'])
		this.PARENT.append(headline)
		popup.append(this.PARENT)
		this.DOM?.append(popup);
	}

	private createPromo(el: object) {
		const promo: HTMLElement = _createElement("coral-promotion", ['coral-promo']);
		const span: HTMLElement = _createElement('span', ['coral-promo__title'])
		span.textContent = el.title
		promo.append(span)
		this.PARENT?.append(promo);
	}

	private createCustomElements(): void {
		if (!this.SETTINGS) return; // исправлено обращение к popUpManager
		console.log("Создание кастомных элементов с SETTINGS", this.SETTINGS);
		this.defineCustomElements();
		this.createPopup();
		this.SETTINGS.forEach(el => {
			this.createPromo(el);
		})
	}
}

new PopUpManagerInit(window._popUpManager)

