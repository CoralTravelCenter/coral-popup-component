import {PopUpManager} from "./types/types.ts";

declare const window: {
	_popUpManager: PopUpManager[]
} & Window

window._popUpManager = [
	{
		title: '3000 бонусов<br> на путешествие',
		visual: '/promo-1.jpg'
	},
	{
		title: 'Ищите что-то<br> особенное?',
		visual: '/promo-2.jpg'
	},
	{
		title: 'Бонусы<br> за отзыв',
		visual: '/promo-3.jpg'
	}
]