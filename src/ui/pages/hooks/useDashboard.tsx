import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
  return await window.requestRecord.getBookCategoryCount(payload);
};

const fetchUser = async (payload: GetPagedPayload): Promise<any> => {
  return await window.requestUser.getPaged(payload);
};

const fetchUserCount = async (): Promise<any> => {
  return await window.requestRecord.getUserCount();
};

const fetchRoleCount = async (): Promise<any> => {
  return await window.requestRecord.getRoleCount();
};

const fetchBookCount = async (): Promise<any> => {
  return await window.requestRecord.getTotalBookCount();
};

const REFETCH_INTERVAL = 1000 * 20;

export default function useDashboard() {
  const [category, setCategory] = useState<any[]>([]);
  const [user, setUser] = useState<any>([]);
  const [userCount, setUserCount] = useState<any>(0);
  const [roleCount, setRoleCount] = useState<any>([]);
  const [bookCount, setBookCount] = useState<any>(0);

  const categoryPayload: GetPagedPayload = {
    page: 0,
    per_page: 100,
    filters: undefined,
    order_by: "name",
    order_direction: "asc",
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["bookCategoryCount", categoryPayload],
        queryFn: () => fetchData(categoryPayload),
        staleTime: 0,
        refetchInterval: REFETCH_INTERVAL,
      },
      {
        queryKey: ["user", { page: 0, per_page: 5 }],
        queryFn: () => fetchUser({ page: 0, per_page: 5 }),
        staleTime: 0,
        refetchInterval: REFETCH_INTERVAL,
      },
      {
        queryKey: ["userCount"],
        queryFn: () => fetchUserCount(),
        staleTime: 0,
        refetchInterval: REFETCH_INTERVAL,
      },
      {
        queryKey: ["roleCount"],
        queryFn: () => fetchRoleCount(),
        staleTime: 0,
        refetchInterval: REFETCH_INTERVAL,
      },
      {
        queryKey: ["bookCount"],
        queryFn: () => fetchBookCount(),
        staleTime: 0,
        refetchInterval: REFETCH_INTERVAL,
      },
    ],
  });

  useEffect(() => {
    if (results[0].data) {
      setCategory(results[0].data.data.items);
    }
    if (results[1].data) {
      setUser(results[1].data.data.items);
    }
    if (results[2].data) {
      setUserCount(results[2].data.data);
    }
    if (results[3].data) {
      setRoleCount(results[3].data.data);
    }
    if (results[4].data) {
      setBookCount(results[4].data.data);
    }
  }, [results]);

  return {
    category,
    user,
    userCount,
    roleCount,
    bookCount,
  };
}
