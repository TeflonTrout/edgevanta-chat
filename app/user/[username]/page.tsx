"use client";
import { useMutation, useQuery } from "convex/react";
import React, { useState, useEffect } from "react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const User = ({ params }: { params: { username: string } }) => {
  const [isUpdated, setIsUpdated] = useState<boolean | null>(null);
  const getUserByUsername = useQuery(api.users.getUserByUsername, {
    username: params.username,
  });
  const updateUserByUsername = useMutation(api.users.updateUserByUsername);

  const [username, setUsername] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("");
  const [userId, setUserId] = useState<any>("");
  const [userFound, setUserFound] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (getUserByUsername?.length) {
      setUsername(getUserByUsername?.[0]?.username);
      setUserColor(getUserByUsername?.[0]?.color);
      setUserId(getUserByUsername?.[0]?._id);
      setUserFound(true);
    }
  }, [getUserByUsername]);

  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateUserByUsername({
        username: username,
        color: userColor,
        id: userId,
      });
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(null);
      }, 5000);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      {userFound == true ? (
        <div className="flex flex-col justify-center items-center w-1/2">
          <h1 className="text-2xl text-center mb-5 underline">
            Welcome Back {username}!
          </h1>
          <form
            action="submit"
            onSubmit={(e) => updateUser(e)}
            className="flex flex-col w-full justify-center items-center gap-2"
          >
            <div className="flex justify-between items-center m-2 w-full">
              <label htmlFor="username" className="flex w-1/2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex justify-center items-center w-1/2 indent-1 outline-none"
              />
            </div>
            <div className="flex justify-between m-2 w-full">
              <label htmlFor="userColor" className="flex w-1/2">
                Message Color
              </label>
              <input
                type="color"
                name="userColor"
                value={userColor}
                onChange={(e) => setUserColor(e.target.value)}
                className="flex justify-center items-center w-1/2"
              />
            </div>
            <div className="flex w-2/3 justify-between items-center mt-4">
              <button
                className="flex justify-center items-center w-auto p-2 border bg-zinc-800 text-white border-zinc-800 rounded hover:bg-zinc-500 transition-colors duration-200"
                type="submit"
              >
                Update
              </button>
              <Link href={`/message/${username}`}>
                <h1 className="flex justify-center items-center w-auto p-2 border bg-zinc-800 text-white border-zinc-800 rounded hover:bg-zinc-500 transition-colors duration-200">
                  Messages
                </h1>
              </Link>
            </div>
          </form>
          <h1
            className={
              isUpdated
                ? "text-2xl text-center flex mt-8 transition-all duration-200"
                : "text-transparent transition-all duration-200"
            }
          >
            Profile Updated Successfully!
          </h1>
          <h1
            className={
              isError
                ? "text-2xl text-red-700 text-center flex mt-8 transition-all duration-200"
                : "text-transparent transition-all duration-200"
            }
          >
            Oops, Something Went Wrong!
          </h1>
        </div>
      ) : (
        <div>No User Found.</div>
      )}
    </div>
  );
};

export default User;
