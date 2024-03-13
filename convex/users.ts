import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserByUsername = query({
  args: { username: v.string()},
  handler: async (ctx, args) => {
    return await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("username"), args.username))
    .collect();
  },
});

// Create a new user
export const createUser = mutation({
  args: { username: v.string(), color: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", { username: args.username, color: args.color, avatar: null });
    return
  },
});

// Update a user's info based on _id
export const updateUserByUsername = mutation({
  args: { id: v.id("users"), username: v.string(), color: v.string() },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.patch(id, { username: args.username, color: args.color });
    return
  },
});