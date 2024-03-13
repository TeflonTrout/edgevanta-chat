import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const get = query({
  args: {},
  handler: async (ctx) => {
    const lastTenMessages = await ctx.db.query("messages").collect();
    // Get the last 10 items in the array
    return lastTenMessages.slice(-10)
  },
});

export const getAllMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

// Create a new task with the given text
export const createMessage = mutation({
  args: { text: v.string(), sender: v.string() },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert("messages", { message: args.text, sender: args.sender });
    return newMessageId;
  },
});