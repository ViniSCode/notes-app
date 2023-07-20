import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
export default function Login({ session }: any) {
  const router = useRouter();

  async function handleLoginWithGoogle() {
    await signIn("google");
    router.push("/");
  }

  async function handleLoginWithGitHub() {
    await signIn("github");
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Noting | Log In</title>
        <meta
          name="description"
          content="Access your notes anytime, anywhere. Log in now to enjoy secure and seamless note-taking. Streamline your productivity and stay organized with our user-friendly notes app."
        />
      </Head>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
