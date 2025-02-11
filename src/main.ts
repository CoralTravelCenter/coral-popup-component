import dayjs from 'dayjs';
dayjs().format()
import {_createElement} from './utils.ts'
import {PopUpManager} from "./types/types.ts";

import {CoralPopupComponent} from "./components/CoralPopup";
import {PromotionComponent} from "./components/Promotion";
import {CloseButtonComponent} from "./components/CloseButton";

export class PopUpManagerInit {
	private DOM: HTMLElement | null = document.getElementById('app');
	private PARENT: HTMLElement | null = null;
	private readonly SETTINGS: PopUpManager[] | null = null;
	private static elementsDefined = false;

	constructor(settings: PopUpManager[]) {
		if (settings.length) {
			this.SETTINGS = this.checkPromoExpires(settings);
			this.init();
		} else {
			console.warn("SETTINGS пуст или не определен!");
		}
	}

	private checkPromoExpires(settings: PopUpManager[]): PopUpManager[] {
		console.log(settings)
    return settings.filter(promo => dayjs().isBefore(dayjs(promo.promo_expires)));
	}

	private init(): void {
		this.defineCustomElements();
		this.createCustomElements();
		this.bindEvents();
	}

	private defineCustomElements(): void {
		if (PopUpManagerInit.elementsDefined) return;
		PopUpManagerInit.elementsDefined = true;

		if (!customElements.get('coral-popup')) customElements.define('coral-popup', CoralPopupComponent);
		if (!customElements.get('coral-promotion')) customElements.define('coral-promotion', PromotionComponent);
		if (!customElements.get('close-button')) customElements.define('close-button', CloseButtonComponent);
	}

	private createPopup(): void {
		const popup = _createElement("coral-popup", ['coral-popup']);
		const headline = _createElement('h2', ['coral-popup__headline']);
		headline.textContent = 'Обратите внимание:';

		this.PARENT = _createElement('div', ['coral-popup__wrapper']);
		this.PARENT.append(headline);
		popup.append(this.PARENT);
		this.DOM?.append(popup);
	}

	private createPromo(el: PopUpManager, idx: number): void {
		const promo = _createElement("coral-promotion",
			['coral-promo', idx === 0 ? "coral-promo-active" : ""].filter(Boolean)
		);
		promo.style.backgroundImage = `url(${el.visual})`;

		const title = _createElement('span', ['coral-promo__title']);
		title.innerHTML = el.title;

		const closeButton = _createElement('close-button', ['close-button']);

		promo.append(title, closeButton);
		this.PARENT?.append(promo);
	}

	private createCustomElements(): void {
		console.log("Список активных акций", this.SETTINGS);
		this.createPopup();

		if (!this.SETTINGS || this.SETTINGS.length === 0) {
			console.warn("SETTINGS пуст или не определен!");
			return;
		}

		this.SETTINGS.forEach((el, idx) => {
			this.createPromo(el, idx);
		});
	}


	private bindEvents(): void {
		const promotions = this.PARENT?.querySelectorAll('coral-promotion');
		if (!promotions) return;

		promotions.forEach(promo => {
			promo.addEventListener('mouseenter', (e) => {
				const current = e.currentTarget as HTMLElement;
				promotions.forEach(item => {
					if (item !== current) item.classList.remove('coral-promo-active');
				});
				current.classList.add('coral-promo-active');
			});
		});
	}
}