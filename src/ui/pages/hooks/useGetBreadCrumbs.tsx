import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useGetBreadCrumbs() {
   const location = useLocation();
   const [bread, setBread] = useState<string[]>([]);
	useEffect(() => {
		const loc = location.pathname
			.split("/")
			.filter((x) => x !== "" && x !== "main");
		const newLoc = loc.map((x) => x.toUpperCase());
		setBread(newLoc);
	}, [location.pathname]);
   return { bread };
}