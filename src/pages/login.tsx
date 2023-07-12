import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
export default function Login({ session }: any) {
  const router = useRouter();

  async function handleLogin() {
    await signIn("google");
    router.push("/share");
  }

  return (
    <div className="min-h-screen min-w-full bg-zinc-900 flex items-center justify-center">
      <div className="p-10 rounded">
        <h1 className="text-zinc-50 text-3xl font-bold">Log in</h1>
        <button className="mt-10 font-medium bg-zinc-800 text-zinc-300 rounded px-6 py-4 flex items-center gap-2 hover:bg-zinc-700 transition-colors">
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <button className="mt-4 font-medium bg-zinc-800 text-zinc-300 rounded px-6 py-4 flex items-center gap-2 hover:bg-zinc-700 transition-colors">
          <AiFillGithub size={22} />
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/share",
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
