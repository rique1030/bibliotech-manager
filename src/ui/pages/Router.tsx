import { createHashRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import LoginPage from "./main/login/LoginPage";
import MainWindow from "./window/MainWindow";
import { Box, CircularProgress } from "@mui/material";
import { AuthProvider } from "./context/AuthProvider";

const Dashboard = lazy(() => import("./main/records/Dashboard"));
const BooksView = lazy(() => import("./main/books/BooksView"));
const BooksUpdate = lazy(() => import("./main/books/BooksUpdate"));
const BooksDelete = lazy(() => import("./main/books/BooksDelete"));
const BooksInsert = lazy(() => import("./main/books/BooksInsert"));
const CopyInsert = lazy(() => import("./main/copies/CopyInsert"));
const CopyView = lazy(() => import("./main/copies/CopyView"));
const CopyUpdate = lazy(() => import("./main/copies/CopyUpdate"));
const CopyDelete = lazy(() => import("./main/copies/CopyDelete"));
const CopyQRView = lazy(() => import("./main/books/BooksQRView"));
const CategoryView = lazy(() => import("./main/categories/CategoryView"));
const CategoryInsert = lazy(() => import("./main/categories/CategoryInsert"));
const CategoryUpdate = lazy(() => import("./main/categories/CategoryUpdate"));
const CategoryDelete = lazy(() => import("./main/categories/CategoryDelete"));
const RolesInsert = lazy(() => import("./main/roles/RolesInsert"));
const RolesView = lazy(() => import("./main/roles/RolesView"));
const RolesUpdate = lazy(() => import("./main/roles/RolesUpdate"));
const RolesDelete = lazy(() => import("./main/roles/RolesDelete"));
const AccountInsert = lazy(() => import("./main/account/AccountInsert"));
const AccountView = lazy(() => import("./main/account/AccountView"));
const AccountDelete = lazy(() => import("./main/account/AccountDelete"));
const AccountUpdate = lazy(() => import("./main/account/AccountUpdate"));
const BooksCopy = lazy(() => import("./main/records/BookCopies"));
const BookBorrow = lazy(() => import("./main/records/BookBorrows"));
const BookCategoryCount = lazy(
  () => import("./main/records/BookCategoryCount"),
);

const mainRoutes = {
  CATALOG: "book-title",
  COPIES: "physical-copy",
  CATEGORIES: "category",
  ROLES: "role",
  ACCOUNTS: "account",
};

export const routes = {
  BOOKS: getCrudRoute(mainRoutes.CATALOG),
  COPIES: getCrudRoute(mainRoutes.COPIES, true),
  CATEGORIES: getCrudRoute(mainRoutes.CATEGORIES),
  ROLES: getCrudRoute(mainRoutes.ROLES),
  ACCOUNTS: getCrudRoute(mainRoutes.ACCOUNTS),
};

function getCrudRoute(route: string, qr = false) {
  return {
    INSERT: `${route}/add`,
    VIEW: `${route}/manage`,
    UPDATE: `${route}/manage/edit`,
    DELETE: `${route}/manage/delete`,
    QR: qr ? `${route}/manage/qr` : undefined,
  };
}

export function getRoute(route: string) {
  return `/main/${route}`;
}

function CustomSuspense({ children }: any) {
  const Sus = () => {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size={100} thickness={0.5} />
      </Box>
    );
  };
  return <Suspense fallback={<Sus />}>{children}</Suspense>;
}

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
  {
    path: "/main",
    element: <MainWindow />,
    children: [
      {
        path: mainRoutes.CATALOG,
        children: [
          {
            path: "add",
            element: (
              <CustomSuspense>
                <BooksInsert />
              </CustomSuspense>
            ),
          },
          {
            path: "manage",
            element: (
              <CustomSuspense>
                <BooksView />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/edit",
            element: (
              <CustomSuspense>
                <BooksUpdate />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/delete",
            element: (
              <CustomSuspense>
                <BooksDelete />
              </CustomSuspense>
            ),
          },
        ],
      },
      {
        path: mainRoutes.COPIES,
        children: [
          {
            path: "add",
            element: (
              <CustomSuspense>
                <CopyInsert />
              </CustomSuspense>
            ),
          },
          {
            path: "manage",
            element: (
              <CustomSuspense>
                <CopyView />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/edit",
            element: (
              <CustomSuspense>
                <CopyUpdate />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/delete",
            element: (
              <CustomSuspense>
                <CopyDelete />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/qr",
            element: (
              <CustomSuspense>
                <CopyQRView />
              </CustomSuspense>
            ),
          },
        ],
      },
      {
        path: mainRoutes.CATEGORIES,
        children: [
          {
            path: "add",
            element: (
              <CustomSuspense>
                <CategoryInsert />
              </CustomSuspense>
            ),
          },
          {
            path: "manage",
            element: (
              <CustomSuspense>
                <CategoryView />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/edit",
            element: (
              <CustomSuspense>
                <CategoryUpdate />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/delete",
            element: (
              <CustomSuspense>
                <CategoryDelete />
              </CustomSuspense>
            ),
          },
        ],
      },
      {
        path: mainRoutes.ROLES,
        children: [
          {
            path: "add",
            element: (
              <CustomSuspense>
                <RolesInsert />
              </CustomSuspense>
            ),
          },
          {
            path: "manage",
            element: (
              <CustomSuspense>
                <RolesView />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/edit",
            element: (
              <CustomSuspense>
                <RolesUpdate />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/delete",
            element: (
              <CustomSuspense>
                <RolesDelete />
              </CustomSuspense>
            ),
          },
        ],
      },
      {
        path: mainRoutes.ACCOUNTS,
        children: [
          {
            path: "add",
            element: (
              <CustomSuspense>
                <AccountInsert />
              </CustomSuspense>
            ),
          },
          {
            path: "manage",
            element: (
              <CustomSuspense>
                <AccountView />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/edit",
            element: (
              <CustomSuspense>
                <AccountUpdate />
              </CustomSuspense>
            ),
          },
          {
            path: "manage/delete",
            element: (
              <CustomSuspense>
                <AccountDelete />
              </CustomSuspense>
            ),
          },
        ],
      },
      {
        path: "records",
        children: [
          {
            path: "dashboard",
            element: (
              <CustomSuspense>
                <Dashboard />
              </CustomSuspense>
            ),
          },
          {
            path: "book-copies",
            element: (
              <CustomSuspense>
                <BooksCopy />
              </CustomSuspense>
            ),
          },
          {
            path: "borrowings",
            element: (
              <CustomSuspense>
                <BookBorrow />
              </CustomSuspense>
            ),
          },
          {
            path: "book-categories",
            element: (
              <CustomSuspense>
                <BookCategoryCount />
              </CustomSuspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/main"} />,
  },
]);

export default router;
