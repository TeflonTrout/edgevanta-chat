"use client";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewUser = () => {
  const [username, setUsername] = useState<string>("");
  const [color, setColor] = useState<string>("FFFFFF");
  const createNewAccount = useMutation(api.users.createUser);
  const router = useRouter();

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewAccount({ username, color });
    router.push(`/user/${username}`);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <form
        action="submit"
        onSubmit={(e) => createAccount(e)}
        className="flex flex-col w-1/2 justify-between items-center"
      >
        <div className="flex justify-between items-center w-full">
          <label htmlFor="username" className="flex m-2 w-1/2">
            Username
          </label>
          <input
            className="flex w-1/2"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <label htmlFor="color" className="flex m-2 w-1/2">
            Color
          </label>
          <input
            className="flex w-1/2"
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button className="flex justify-center items-center w-auto mt-4 p-2 border bg-zinc-800 text-white border-zinc-800 rounded hover:bg-zinc-500 transition-colors duration-200">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewUser;
