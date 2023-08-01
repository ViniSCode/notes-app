import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps, router }: AppProps) {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setIsPageLoading(true);
    });

    router.events.on("routeChangeComplete", (url) => {
      setIsPageLoading(false);
    });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
