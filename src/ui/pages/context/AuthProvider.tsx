import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { To, useNavigate } from "react-router-dom";

interface AuthContextProps {
	user: any;
	login: (
		payload: UserLoginPayload,
		gotoSuccess?: To,
		gotoFail?: To
	) => Promise<boolean>;
	logout: () => Promise<void>;
	errorMessage: string;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
	login: () => Promise.resolve(false),
	logout: () => Promise.resolve(),
	errorMessage: "",
	loading: false,
});

async function SendLoginRequest(payload: UserLoginPayload): Promise<any> {
	return await window.requestUser.login(payload);
}

async function RefreshAccount(payload: RequestByID): Promise<any> {
	return await window.requestUser.getByID(payload);
}

export function AuthProvider({ children }: any) {
	const navigate = useNavigate();
	const [user, setUser] = useState<any>(null);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const loginResolver = useRef<(result: boolean) => void>();
	const sound = new Audio(
		new URL(
			"../../assets/sounds/notification-18-270129.mp3",
			import.meta.url
		).href
	);
	const mutation = useMutation({
		gcTime: 0,

		mutationFn: (payload: UserLoginPayload) => SendLoginRequest(payload),
		onSuccess: (result: any) => {
			if (!result.success) {
				loginResolver.current?.(false);
				return setErrorMessage("Something went wrong. Please try again later.");
			}
			const userData = result.data[0];
			if (!userData) {
				loginResolver.current?.(false);
				setErrorMessage("Invalid email or password.");
				return;
			}
			setUser(userData);
			console.log(userData);
			window.storedSettings.saveAccount(userData).then(() => {
				window.webSocket.connect();
				console.log("Account saved");
				loginResolver.current?.(true);
				window.storedSettings.getAccount().then((account: any) => {
					console.log(account);
				})
			});
		},
		onError: (error: any) => {
			console.error(error);
			loginResolver.current?.(false);
			setErrorMessage("Something went wrong. Please try again later.");
		},

	});

	const { data: refreshedAccount } = useQuery({
		queryKey: ["account", user?.id],
		queryFn: () => RefreshAccount([user?.id]),
		enabled: !!user,
		refetchInterval: 1000 * 60 * 5, // 5 minutes
	});

	useEffect(() => {
		if (!refreshedAccount) return;
		const userData = refreshedAccount.data[0];
		if (!userData) {
			logout();
			return setErrorMessage(
				"Your account has been modified and you have been logged out."
			);
		}
		setUser(userData);
	}, [refreshedAccount]);

	useLayoutEffect(() => {
		if (user) return;
		window.storedSettings.getAccount().then((account: any) => {
			if (!account) return;
			setUser(account);
		});
	}, []);

	const login = async (
		payload: UserLoginPayload,
		gotoSuccess?: To,
		gotoFail?: To
	) => {
		return new Promise<boolean>((resolve) => {
			loginResolver.current = resolve;
			mutation.mutate(payload);
		}).then((res: boolean) => {
			if (res && gotoSuccess) {
				navigate(gotoSuccess);
				sound.play().catch((err: any) => console.error("Playback error:", err));
			} else if (!res && gotoFail) {
				navigate(gotoFail);
				sound.play().catch((err: any) => console.error("Playback error:", err));
			}
			return res;
		});
	};

	const logout = async () => {
		setUser(null);
		window.storedSettings.deleteAccount();
		window.webSocket.disconnect();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				errorMessage,
				loading: mutation.isPending,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
export const useAuth = () => useContext(AuthContext);
