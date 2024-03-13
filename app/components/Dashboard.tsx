import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex w-full justify-center items-center bg-zinc-200 text-edgevanta">
      <ul className="flex w-2/3 md:w-5/6 justify-between align-middle items-center mx-8 my-4">
        <li className="flex">
          <Link href="/">
            <div className="flex justify-center items-center">
              <img
                src="/images/Edgevanta.webp"
                alt="logo"
                className="h-10 md:h-12 lg:h-16"
              />
              <h1 className="flex text-2xl text-edgevanta">VantaChat</h1>
            </div>
          </Link>
        </li>
        <li className="flex text-2xl text-edgevanta">
          <Link href="/alice">Alice</Link>
        </li>
        <li className="flex text-2xl text-edgevanta">
          <Link href="/bob">Bob</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
