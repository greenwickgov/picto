import {defineSchema,defineTable} from 'convex/server';
import {v} from 'convex/values';
export default defineSchema({
 profiles:defineTable({subject:v.string(),name:v.string(),handle:v.string(),bio:v.string(),avatar:v.optional(v.id('_storage'))}).index('by_subject',['subject']).index('by_handle',['handle']),
 posts:defineTable({author:v.id('profiles'),caption:v.string(),media:v.id('_storage'),kind:v.union(v.literal('post'),v.literal('story'),v.literal('sniplet')),expiresAt:v.optional(v.number()),hidden:v.boolean()}).index('by_author',['author']).index('by_kind',['kind']),
 reactions:defineTable({subject:v.string(),post:v.id('posts'),kind:v.union(v.literal('like'),v.literal('save'))}).index('by_subject',['subject']).index('by_post',['post']).index('unique',['subject','post','kind']),
 comments:defineTable({author:v.id('profiles'),post:v.id('posts'),text:v.string()}).index('by_post',['post']),
 follows:defineTable({subject:v.string(),creator:v.id('profiles')}).index('unique',['subject','creator']).index('by_subject',['subject']),
 reports:defineTable({subject:v.string(),post:v.id('posts'),reason:v.string(),status:v.literal('pending')}).index('by_post',['post'])
});
