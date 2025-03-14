// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getaRoute, routes } from "../Router";

// const fetchData = async (payload: UserLoginPayload): Promise<any> => {
// 	return await window.requestUser.login(payload);
// };

// function fetchAccount(payload: RequestByID) {
//    if (!payload) return null;
//    return window.requestUser.getByID(payload);
// }


// export default function useAuthentication() {
   // const navigate = useNavigate();
   // const [user, setUser] = useState<any>(null);
   // const [errorMessage, setErrorMessage] = useState<string>("");
   // const loginResolver = useRef<(result: boolean) => void>();
   
   // useEffect(() => {
   //    const getSavedUser = async () => {
   //       const savedUser = await window.storedSettings.getAccount();
   //       // console.log(savedUser);
   //       if (savedUser) {
   //          const result = await login({
   //             email: savedUser.email,
   //             password: savedUser.password
   //          });
   //          if (result) {
   //             navigate("/main/records/dashboard");

   //          }
   //       }         
   //    }
   //    getSavedUser();
   // }, []);

   // const login = async (payload: UserLoginPayload): Promise<boolean> => {
   //    mutation.mutate(payload);
   //    return new Promise((resolve) => {
   //       loginResolver.current = resolve;
   //    })
   // }

   // const logout = async () => {
   //    setUser(null);
   //    disconnectFromServer();
   // }

   // sends password and email for login
	// const mutation = useMutation({
	// 	gcTime: 0,
	// 	mutationFn: (payload: UserLoginPayload) => fetchData(payload),
	// 	onSuccess: (result) => {
   //       if (result.success){
   //          if (result.data.length === 0) {
   //             loginResolver.current?.(false);
   //             setErrorMessage("Invalid email or password.");
   //          } else {
   //             setUser(result.data[0]);
   //             connectToServer(result.data[0]);
   //          }
   //       } else {
   //          loginResolver.current?.(false);
   //          setErrorMessage("Something went wrong. Please try again later.");
   //       }
	// 	},
	// 	onError: (e) => {
   //       loginResolver.current?.(false);
	// 	},
	// });

   // fetches user data periodically
	// const { data: refetchData } = useQuery({
	// 	queryKey: ["account", user?.id],
	// 	queryFn: () => fetchAccount([user?.id]),
	// 	refetchIntervalInBackground: true,
	// 	refetchOnReconnect: true,
	// 	refetchInterval: 120000,
	// 	staleTime: 0,
	// });

   // useEffect(() => {
   //    if (!refetchData) return;
   //    if (refetchData.success) {
   //       if (refetchData.data.length === 0) {
   //          logout();
   //       } else {
   //          setUser(refetchData.data[0]);
   //       }
   //    }
   // }, [refetchData]);

   // const connectToServer = async (newUser: any) => {
   //    await window.storedSettings.saveAccount(newUser);
   // 	await window.webSocket.connect();
   //    await loginResolver.current?.(true);
   // };

   // const disconnectFromServer = async () => {
   //    await window.storedSettings.deleteAccount();
   // 	await window.webSocket.disconnect();
   // };

//    return { user, errorMessage, login, logout, loading: mutation.isPending };
// }