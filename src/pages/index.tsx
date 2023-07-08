import Editor from "@/components/Editor/index";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { FiChevronsLeft, FiFileText, FiPlus, FiTrash } from "react-icons/fi";

export default function Home({ session }: any) {
  return (
    <div className="min-h-screen text-zinc-50">
      <div className="min-h-screen mx-auto overflow-hidden w-full shadow-md bg-zinc-800 border-black/20 break-words md:grid md:grid-cols-[16rem_1fr]">
        <div className="hidden md:block overflow-hidden bg-zinc-900 border-r border-r-zinc-700">
          <aside className="fixed w-[16rem] ">
            <div className="flex gap-4 group justify-between items-center px-6 py-6">
              <div className="flex gap-4 group items-center">
                <Image
                  src="https://lh3.googleusercontent.com/a-/AOh14GhL-wIhtHTZsei8k_MhcdQCQAtpnoFNbMm4BRBp=s96-c"
                  alt="Vinícius Rodrigues"
                  width={100}
                  height={100}
                  referrerPolicy="no-referrer"
                  className="rounded w-6 h-6"
                />
                <span className="">Vinícius&apos;s Notes</span>
              </div>

              <FiChevronsLeft className="w-6 h-6 text-zinc-400 hover:bg-zinc-700 rounded-sm p-0.5 cursor-pointer" />
            </div>
            <div className="flex flex-col gap-0.5 px-2">
              <div className="mt-6 gap-2 flex justify-between items-center text-sm cursor-pointer bg-zinc-700 hover:bg-zinc-600 px-6 py-1 text-zinc-400 rounded-sm transition-colors">
                <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4" />
                  <span>TailwindCSS</span>
                </div>
                <FiTrash className="w-4 h-4" />
              </div>

              <div className="gap-2 flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-600 px-6 py-1 text-zinc-400 rounded-sm transition-colors">
                <div className="flex gap-2 items-center">
                  <FiFileText className="w-4 h-4" />
                  <span>TailwindCSS</span>
                </div>
                <FiTrash className="w-4 h-4" />
              </div>

              <div className="mt-1 gap-2 flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-600 px-6 py-1 text-zinc-400 rounded-sm transition-colors">
                <div className="flex gap-2 items-center">
                  <FiPlus className="w-4 h-4" />
                  <span className="font-medium">Add a page</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <main className="px-8 py-4">
          <Editor />
        </main>
      </div>
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
