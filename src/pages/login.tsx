import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

export default function Login({ session }: any) {
  const router = useRouter();
  const { handleSignInWithGoogle, handleSignInWithGithub, user } = useAuth();

  async function handleLoginWithGoogle() {
    handleSignInWithGoogle();
  }

  async function handleLoginWithGitHub() {
    handleSignInWithGithub();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Noting | Log In</title>
        <meta
          name="description"
          content="Access your notes anytime, anywhere. Log in now to enjoy secure and seamless note-taking. Streamline your productivity and stay organized with our user-friendly notes app."
        />
      </Head>
      {!user ? (
        <div className="min-h-screen min-w-full bg-zinc-900 flex items-center justify-center">
          <div className="p-2 md:p-10 rounded">
            <Image
              width={200}
              height={200}
              quality={50}
              className="rounded-full w-24 mx-auto"
              src="/assets/noting-light.png"
              alt="Noting Notes App"
            />
            <h1 className="text-zinc-50 text-3xl font-bold text-center mt-4">
              Log in
            </h1>
            <button
              className="mt-12 font-medium text-sm md:text-base bg-zinc-800 text-zinc-300 rounded px-4 py-3 md:px-10 md:py-4 flex items-center gap-2 hover:bg-zinc-700 transition-colors"
              onClick={handleLoginWithGoogle}
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
            <button
              onClick={handleLoginWithGitHub}
              className="mt-4 font-medium text-sm md:text-base bg-zinc-800 text-zinc-300 rounded px-4 py-3 md:px-10 md:py-4  flex items-center gap-2 hover:bg-zinc-700 transition-colors"
            >
              <AiFillGithub size={22} />
              Continue with Github
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen min-w-full bg-zinc-900 flex items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <Image
              width={200}
              height={200}
              quality={50}
              className="rounded-full w-24 mx-auto"
              src={user.avatar ? user.avatar : "/assets/noting-light.png"}
              alt={user.name ? user.name : "Noting Notes App"}
            />
            <h1 className="text-zinc-50 text-3xl font-bold text-center mt-4">
              {user.name}
            </h1>
            <button
              className="mt-12 font-medium text-sm md:text-base bg-zinc-800 text-zinc-300 rounded px-4 py-3 md:px-10 md:py-4 flex items-center gap-2 hover:bg-zinc-700 transition-colors"
              onClick={() => router.push("/")}
            >
              <BiLogIn size={22} />
              Go to Noting
            </button>
          </div>
        </div>
      )}
    </>
  );
}
