import "@/styles/globals.css";
import { GetServerSideProps } from "next";
import { SessionProvider } from "next-auth/react";
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
    <SessionProvider session={pageProps.session}>
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
    </SessionProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/maps";
  try {
    const res = await fetch(url);
    const { apiKey } = await res.json();

    return {
      props: {
        apiKey,
      },
    };
  } catch (err) {
    console.error("Failed to fetch API key:", err);
    return {
      props: {
        apiKey: "",
      },
    };
  }
};
