"use client";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center -mt-20 bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white">
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-4xl text-center m-4 text-black dark:text-white">
          Welcome To VantaChat!
        </h1>
        <p className="text-center m-4 text-black dark:text-white">
          Get started by selecting a user from the navbar.
        </p>
      </div>
    </main>
  );
}
