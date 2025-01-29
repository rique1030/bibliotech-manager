import lightTheme from "../themes/LightTheme";
import darkTheme from "../themes/DarkTheme";
import { useEffect, useState } from "react";

export default function useTheme() {
	const [theme, setTheme] = useState(lightTheme);

	const toggleTheme = async () => {
		if (theme === lightTheme) {
			setTheme(darkTheme);
			await window.storedSettings.saveTheme("dark");
		} else {
			setTheme(lightTheme);
			await window.storedSettings.saveTheme("light");
		}
	};

	useEffect(() => {
		const getCurrentTheme = async () => {
			const theme = await window.storedSettings.getTheme();
			if (theme === "dark") {
				setTheme(darkTheme);
			} else {
				setTheme(lightTheme);
			}
		};
		getCurrentTheme();
	}, []);

	return { theme, toggleTheme };
}
