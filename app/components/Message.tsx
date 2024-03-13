"use client";
import React from "react";
import { formatDistance } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface MessageProps {
  message: string;
  sender: string;
  isCurrentSender: boolean;
  timestamp: number;
}

const Message = ({
  message,
  sender,
  isCurrentSender,
  timestamp,
}: MessageProps) => {
  const getUserByUsername = useQuery(api.users.getUserByUsername, {
    username: sender,
  });

  return (
    <div
      className={
        isCurrentSender
          ? "flex flex-col w-full py-4 justify-start items-end"
          : "flex flex-col w-full py-4 justify-start items-start"
      }
    >
      <p
        style={{
          background: `${getUserByUsername?.[0]?.color}`,
          mixBlendMode: "difference",
        }}
        className={
          isCurrentSender
            ? "flex flex-col text-xl max-w-md w-auto py-2 px-3 h-auto break-normal rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-slate-300 text-black"
            : "flex flex-col text-xl max-w-md w-auto py-2 px-3 h-auto break-normal rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-slate-800 text-white"
        }
      >
        {message}
      </p>
      <p
        className={
          isCurrentSender
            ? "flex w-auto py-1 text-sm justify-end items-start text-zinc-400 dark:text-zinc-300"
            : "flex w-auto py-1 text-sm justify-start items-start text-zinc-400 dark:text-zinc-300"
        }
      >
        {isCurrentSender ? `${sender} (You)` : sender}{" "}
        {formatDistance(timestamp, new Date(), { addSuffix: true })}
      </p>
    </div>
  );
};

export default Message;
