import type { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { FiArrowLeftCircle } from "react-icons/fi";
export default function Login({ session }: any) {
  const router = useRouter();

  async function handleLogin() {
    await signIn("google");
    router.push("/share");
  }

  return (
    <div className="bg-white grid lg:grid-cols-share-plan select-none">
      <div className="px-4 md:px-0 mt-20 mb-20 lg:mb-0 lg:mt-0 lg:h-screen w-full flex items-center lg:justify-center flex-col">
        <div className="w-full max-w-[360px] mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900">
            PlanMyJourney
          </h2>

          <span className="mt-5 block text-gray-700 text-sm text-center">
            Sign in to share your trip plans
          </span>

          <button
            onClick={handleLogin}
            className="mt-10 flex justify-center items-center gap-4 px-2 py-4 rounded-lg text-white bg-blue-500 border w-full hover:bg-blue-400 transition-colors"
          >
            <FaGoogle size={22} />
            Sign in with Google
          </button>

          <div className="mt-10 mb-8 bg-gray-300 h-[2px] w-full"></div>

          <button
            className="flex gap-4 items-center justify-center mt-4 px-2 py-4 rounded-lg text-red-500 border border-red-500 w-full hover:bg-red-500 hover:text-white transition-colors"
            onClick={() => router.push("/")}
          >
            <FiArrowLeftCircle size={22} />
            Cancel
          </button>
        </div>
      </div>
      <div className="h-[50vh] lg:h-screen w-full overflow-hidden">
        <Image
          src="/assets/login_image.png"
          alt=""
          width={900}
          height={900}
          className="w-full h-full object-cover"
          loading="lazy"
        />
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
