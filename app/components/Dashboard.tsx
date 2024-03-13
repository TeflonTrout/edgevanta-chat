import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex w-full h-auto justify-center items-center bg-zinc-200 text-edgevanta dark:bg-zinc-500 dark:text-white">
      <ul className="flex w-5/6 lg:w-1/2 justify-between align-middle items-center mx-4 my-4 bg-zinc-200 text-edgevanta dark:bg-zinc-500 dark:text-white">
        <li className="flex">
          <Link href="/">
            <div className="flex justify-center items-center">
              <img
                src="/images/Edgevanta.webp"
                alt="logo"
                className="h-10 md:h-12 lg:h-16"
              />
              <h1 className="flex text-2xl text-edgevanta dark:text-white">
                VantaChat
              </h1>
            </div>
          </Link>
        </li>
        <li className="flex text-2xl">
          <Link href="/user" className="text-edgevanta dark:text-white">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
