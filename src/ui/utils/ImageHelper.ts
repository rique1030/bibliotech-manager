import CONFIG from "../config";
import defaultProfile from "../assets/defaults/user_photos/default.png";
import defaultCover from "../assets/defaults/book_cover/default.png";

export function convertCover(cover: string): string {
	if (cover === "default" || !cover) {
		return defaultCover;
	}
	return `${CONFIG.SERVER_HOST}/images/book_covers/${cover}.png`;
}

export function convertProfile(profile: string): string {
	if (profile === "default" || !profile) {
		return defaultProfile;
	}
	return `${CONFIG.SERVER_HOST}/images/user_photos/${profile}.png`;
}

export function convertQRCode(qrCode: string | null): string {
	if (!qrCode) return "";
	return `${CONFIG.SERVER_HOST}/images/qr_codes/${qrCode}.png`;
}
