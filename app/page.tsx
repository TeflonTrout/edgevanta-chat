"use client";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center -mt-14 bg-zinc-200 text-black">
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-4xl text-center m-4">Welcome To VantaChat!</h1>
        <p className="text-center m-4">
          Get started by selecting a user from the navbar.
        </p>
      </div>
    </main>
  );
}
