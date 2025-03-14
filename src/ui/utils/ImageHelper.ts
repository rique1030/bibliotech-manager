import defaultProfile from "../assets/defaults/user_photos/default.png";
import defaultCover from "../assets/defaults/book_cover/default.png";
let CONFIG: any = null;
window.server.getURL().then((config: any) => {
	CONFIG = config;
})

export function convertCover(cover: string): string {
	if (cover === "default" || !cover) {
		return defaultCover;
	}
	return `${CONFIG.HOST}/images/book_covers/${cover}.png`;
}

export function convertProfile(profile: string): string {
	if (profile === "default" || !profile) {
		return defaultProfile;
	}
	return `${CONFIG.HOST}/images/user_photos/${profile}.png?timestamp=${new Date().getMinutes()}`;
}

export function convertQRCode(qrCode: string | null): string {
	if (!qrCode) return "";
	return `${CONFIG.HOST}/qr-codes/${qrCode}.png`;
}
