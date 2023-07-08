import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Home({ session }: any) {
  return (
    <div className={`pb-20`}>
      <header className="h-[700px] md:h-[100vh] w-full relative flex flex-col px-2"></header>
      <main className="px-6 mt-[45rem] md:mt-80 lg:mt-20 max-w-[1120px] mx-auto flex flex-col items-center justify-center gap-20"></main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
