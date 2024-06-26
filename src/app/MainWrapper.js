"use client";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/layout/Header";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
const MainWrapper = ({ children }) => {
  const path = usePathname();

  return (
    <main className={`main-wrapper `}>
      <Toaster />
      {path == "/login" ? null : <Header />}

      <Suspense fallback={"Loading..."}>
        <main className={`page-wrapper`}>{children}</main>
      </Suspense>
    </main>
  );
};

export default MainWrapper;
