import Editor from "@/components/Editor/index";
import { motion } from "framer-motion";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiFileText,
  FiPlus,
  FiTrash,
} from "react-icons/fi";

export default function Home({ session }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const links = [
    {
      name: "New Note",
    },
    // {
    //   name: "Untitled",
    // },
    // {
    //   name: "Untitled",
    // },
    // {
    //   name: "Untitled",
    // },
    // {
    //   name: "Untitled",
    // },
    // {
    //   name: "Untitled",
    // },
  ];

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const sidebarVariants = {
    closed: {
      opacity: 0,
      x: -200,
    },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen text-zinc-50">
      <div
        className={`relative min-h-screen mx-auto overflow-hidden w-full shadow-md bg-zinc-800 border-black/20 break-words ${
          isSidebarOpen && "md:grid md:grid-cols-[16rem_auto]"
        }`}
      >
        {!isSidebarOpen && (
          <div className="fixed z-[90] bg-zinc-800 w-full flex items-center gap-4 pt-6 pb-6 bg-800">
            <FiChevronsRight
              className="absolute w-6 h-6 z-40 left-4  text-zinc-400 hover:bg-zinc-700 rounded-sm p-0.5 cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />

            <div className="ml-16 flex gap-2 items-center">
              <FiFileText className="w-4 h-4 text-zinc-400" />
              <span>{links[0].name}</span>
            </div>
          </div>
        )}

        {isSidebarOpen && <div></div>}
        <motion.div
          initial={"closed"}
          animate={isSidebarOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="fixed overflow-hidden min-h-full z-50 bg-zinc-900 border-r border-r-zinc-700 w-[16rem] min-w-[16rem]"
        >
          <aside className="static w-[16rem] min-w-[16rem]">
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

              <FiChevronsLeft
                className="w-6 h-6 text-zinc-400 hover:bg-zinc-700 rounded-sm p-0.5 cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-0.5 px-2">
              {links &&
                links.map((link, index) => (
                  <div
                    key={index}
                    className="first:mt-6 first:bg-zinc-700 gap-2 flex justify-between items-center text-sm cursor-pointer bg-zinc-900 hover:bg-zinc-600 px-6 py-1 font-medium text-white rounded-sm transition-colors"
                  >
                    <div className="flex gap-2 items-center">
                      <FiFileText className="w-4 h-4 text-zinc-400" />
                      <span>{link.name}</span>
                    </div>
                    <FiTrash className="w-4 h-4 text-zinc-400" />
                  </div>
                ))}

              <div className="mt-1 gap-2 flex justify-between items-center text-sm cursor-pointer hover:bg-zinc-600 px-6 py-1 text-zinc-400 rounded-sm transition-colors">
                <div className="flex gap-2 items-center">
                  <FiPlus className="w-4 h-4" />
                  <span className="font-medium">Add a page</span>
                </div>
              </div>
            </div>
          </aside>
        </motion.div>
        <main className="px-8 md:px-20 py-4 mt-10 md:mt-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-4 mt-2">
              <div className="flex gap-2 items-center">
                <FiFileText className="w-4 h-4 text-zinc-400" />
                <span>{links[0].name}</span>
              </div>
            </div>
          )}
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
