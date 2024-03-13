import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  messages: defineTable({
    message: v.string(),
    sender: v.string(),
  }),
});