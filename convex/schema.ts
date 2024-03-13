import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...
  users: defineTable({
    username: v.string(),
    color: v.string(),
    avatar: v.any()
  }),
  messages: defineTable({
    message: v.string(),
    sender: v.string(),
  }),
});