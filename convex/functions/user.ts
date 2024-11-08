import { internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { QueryCtx, MutationCtx } from "../_generated/server";
import { query } from "../_generated/server";
export const upsert = internalMutation({
    args: {
        username: v.string(),
        image: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").withIndex("by_clerk_id", (q)=> q.eq("clerkId", args.clerkId)).unique();
        if(user){
            await ctx.db.patch(user._id,{username:args.username,image:args.image});

        }else{
            await ctx.db.insert("users",{username:args.username,image:args.image,clerkId:args.clerkId});
        }
    }
})

export const remove = internalMutation({
    args:{clerkId: v.string()},
    handler: async (ctx, {clerkId}) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
        .unique();
        if (user) {
            await ctx.db.delete(user._id);
        }
    }
})

export const get = query({
    handler: async (ctx: QueryCtx)=>{
        return await getCurrentUser(ctx);
    }
})

const getUserByClerkId = async (ctx: QueryCtx | MutationCtx, clerkId: string) => {
      return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique();
};

const getCurrentUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  return await getUserByClerkId(ctx, identity.subject); //from jwt


};