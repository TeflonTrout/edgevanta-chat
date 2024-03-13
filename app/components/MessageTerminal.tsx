"use client";
import React, { useRef, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Message from "./Message";
import Loading from "./Loading/Loading";

const MessageTerminal = () => {
  const [displayedMessageCount, setDisplayedMessageCount] = useState(10);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const listRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useQuery(api.messages.getAllMessages);
  const path = usePathname();
  // Parse the current route and set it to the sender
  // And capitalize sender
  let messageSender = path.split("/")?.[2];
  messageSender = messageSender?.[0].toUpperCase() + messageSender.slice(1);
  const createMessage = useMutation(api.messages.createMessage);

  // Loading listener
  useEffect(() => {
    setIsLoading(false);
    if (messages?.length && messages?.length > 0) {
    }
  }, [messages]);

  // Scroll to bottom of chat after loading
  useEffect(() => {
    const element = listRef.current;
    if (element) {
      listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage({ text, sender: messageSender });
    setText("");
  };

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Increase the number of displayed messages by 10
    setDisplayedMessageCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    // Preserve scroll position when messages are added
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-h-full sm:max-w-2/3 justify-start items-center bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white">
      <div
        className="flex flex-col w-5/6 lg:w-1/2 border-4 rounded-lg z-10 scrollbar border-zinc-800 dark:border-zinc-200"
        style={{ maxHeight: "70vh" }}
      >
        {isLoading ? (
          <div className="flex flex-col w-full h-svh justify-center items-center border rounded border-zinc-800 bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white">
            <Loading />
          </div>
        ) : (
          <div
            ref={listRef}
            className="flex flex-col w-full h-svh justify-start py-6 px-4 pb-0 overflow-y-auto overflow-x-hidden bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white"
          >
            {messages?.length && displayedMessageCount < messages?.length ? (
              <button
                className="flex w-full flex-col justify-center items-center text-lg text-black dark:text-white"
                onClick={(e) => handleLoadMore(e)}
              >
                Load More Messages...
              </button>
            ) : null}
            {messages?.length != 0 ? (
              messages
                ?.slice(-displayedMessageCount)
                ?.map(({ _id, message, sender, _creationTime }, idx) => (
                  <div key={_id} ref={idx === 0 ? messagesEndRef : null}>
                    <Message
                      message={message}
                      sender={sender}
                      isCurrentSender={sender == messageSender ? true : false}
                      timestamp={_creationTime}
                    />
                  </div>
                ))
            ) : (
              <div className="flex flex-col w-full h-svh justify-center overflow-y-auto overflow-x-hidden bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white">
                <h1 className="text-2xl text-center">No current messages.</h1>
              </div>
            )}
          </div>
        )}
        <form
          className="flex flex-row w-5/6 lg:w-1/2 justify-between items-center absolute bottom-6 gap-4 bg-zinc-200 text-black dark:bg-zinc-500 dark:text-white"
          action="submit"
          onSubmit={(e) => sendMessage(e)}
        >
          <input
            className="flex p-2 w-2/3 rounded h-10 text-black outline-none"
            name="message"
            type="text"
            disabled={isLoading ? true : false}
            placeholder="Write Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button
            className="flex justify-center items-center w-1/3 p-2 border bg-zinc-800 text-white border-zinc-800 rounded hover:bg-zinc-500 transition-colors duration-200"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageTerminal;
