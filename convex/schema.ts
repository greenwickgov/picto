import {defineSchema,defineTable} from 'convex/server';
import {authTables} from '@convex-dev/auth/server';
import {v} from 'convex/values';
export default defineSchema({
 ...authTables,
 profiles:defineTable({userId:v.id('users'),name:v.string(),handle:v.string(),bio:v.string(),avatar:v.optional(v.id('_storage'))}).index('by_user',['userId']).index('by_handle',['handle']),
 posts:defineTable({author:v.id('profiles'),caption:v.string(),media:v.id('_storage'),kind:v.union(v.literal('post'),v.literal('story'),v.literal('sniplet')),expiresAt:v.optional(v.number()),hidden:v.boolean()}).index('by_author',['author']).index('by_kind',['kind']),
 uploads:defineTable({owner:v.id('profiles'),storageId:v.id('_storage'),used:v.boolean()}).index('by_storage',['storageId']),
 reactions:defineTable({owner:v.id('profiles'),post:v.id('posts'),kind:v.union(v.literal('like'),v.literal('save'))}).index('by_owner',['owner']).index('by_post',['post']).index('unique',['owner','post','kind']),
 comments:defineTable({author:v.id('profiles'),post:v.id('posts'),text:v.string()}).index('by_post',['post']),
 follows:defineTable({owner:v.id('profiles'),creator:v.id('profiles')}).index('unique',['owner','creator']).index('by_owner',['owner']),
 reports:defineTable({owner:v.id('profiles'),post:v.id('posts'),reason:v.string()}).index('by_post',['post']),
 conversations:defineTable({key:v.string(),members:v.array(v.id('profiles')),updatedAt:v.number()}).index('by_key',['key']),
 inbox:defineTable({owner:v.id('profiles'),conversation:v.id('conversations')}).index('by_owner',['owner']),
 messages:defineTable({conversation:v.id('conversations'),sender:v.id('profiles'),text:v.string()}).index('by_conversation',['conversation']),
 limits:defineTable({key:v.string(),start:v.number(),count:v.number()}).index('by_key',['key']),
 blocks:defineTable({owner:v.id('profiles'),other:v.id('profiles')}).index('unique',['owner','other'])
});
