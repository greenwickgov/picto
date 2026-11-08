import {describe,it,expect} from 'vitest';
import {generateKeyPairSync} from 'node:crypto';
import {convexTest} from 'convex-test';
import {anyApi} from 'convex/server';
import schema from '../convex/schema';
const modules={'../convex/_generated/test.ts':async()=>({}),'../convex/social.ts':()=>import('../convex/social'),'../convex/auth.ts':()=>import('../convex/auth')};
const api=anyApi.social;
async function setup(){const t=convexTest(schema,modules);const ids=await t.run(async ctx=>{const a=await ctx.db.insert('users',{email:'a@example.test'}),b=await ctx.db.insert('users',{email:'b@example.test'}),c=await ctx.db.insert('users',{email:'c@example.test'});const pa=await ctx.db.insert('profiles',{userId:a,name:'A',handle:'alice',bio:''}),pb=await ctx.db.insert('profiles',{userId:b,name:'B',handle:'bobby',bio:''}),pc=await ctx.db.insert('profiles',{userId:c,name:'C',handle:'casey',bio:''});return {a,b,c,pa,pb,pc}});return {t,ids,a:t.withIdentity({subject:ids.a+'|session-a'}),b:t.withIdentity({subject:ids.b+'|session-b'}),c:t.withIdentity({subject:ids.c+'|session-c'})};}
describe('Picto authorization',()=>{
 it('denies anonymous writes and message inbox reads',async()=>{const {t,ids}=await setup();await expect(t.mutation(api.openConversation,{other:ids.pb})).rejects.toThrow();await expect(t.query(api.inbox,{})).rejects.toThrow();});
 it('restricts message reads and sends to participants and derives sender on server',async()=>{const {t,a,b,c,ids}=await setup();const conversation=await a.mutation(api.openConversation,{other:ids.pb});await a.mutation(api.sendMessage,{conversation,text:'Private message'});const rows=await b.query(api.messages,{conversation});expect(rows).toHaveLength(1);expect(rows[0].sender).toBe(ids.pa);await expect(c.query(api.messages,{conversation})).rejects.toThrow();await expect(c.mutation(api.sendMessage,{conversation,text:'Intrusion'})).rejects.toThrow();expect(await c.query(api.inbox,{})).toEqual([]);});
 it('enforces blocking for existing messages and new conversations',async()=>{const {a,b,ids}=await setup();const conversation=await a.mutation(api.openConversation,{other:ids.pb});await b.mutation(api.block,{other:ids.pa});await expect(a.mutation(api.sendMessage,{conversation,text:'Blocked'})).rejects.toThrow();await expect(a.mutation(api.openConversation,{other:ids.pb})).rejects.toThrow();});
 it('does not expose email or auth user IDs in public profiles',async()=>{const {t}=await setup();const rows=await t.query(api.people,{search:''});expect(rows).toHaveLength(3);expect(rows[0]).not.toHaveProperty('email');expect(rows[0]).not.toHaveProperty('userId');});
 it('rejects duplicate handles and rate-limits message spam',async()=>{const {a,b,ids}=await setup();await expect(b.mutation(api.saveProfile,{name:'B',handle:'alice',bio:''})).rejects.toThrow();const conversation=await a.mutation(api.openConversation,{other:ids.pb});for(let i=0;i<30;i++)await a.mutation(api.sendMessage,{conversation,text:'Message '+i});await expect(a.mutation(api.sendMessage,{conversation,text:'Too many'})).rejects.toThrow();});
 it('starts the feed empty without seeding fake content',async()=>{const t=convexTest(schema,modules);expect(await t.query(api.feed,{kind:'post',mode:'all',search:''})).toEqual([]);});
});

it('creates a real password account and rejects an incorrect password',async()=>{
const keys=generateKeyPairSync('rsa',{modulusLength:2048});process.env.JWT_PRIVATE_KEY=String(keys.privateKey.export({type:'pkcs8',format:'pem'}));process.env.JWKS=JSON.stringify({keys:[{...keys.publicKey.export({format:'jwk'}),use:'sig'}]});process.env.CONVEX_SITE_URL='https://picto-test.convex.site';
const t=convexTest(schema,modules);const created=await t.action(anyApi.auth.signIn,{provider:'password',params:{email:'real@example.test',password:'A-real-test-password-2026',flow:'signUp'}});expect(created.tokens?.token).toBeTruthy();
const users=await t.run(ctx=>ctx.db.query('users').collect());expect(users).toHaveLength(1);expect(users[0].email).toBe('real@example.test');
await expect(t.action(anyApi.auth.signIn,{provider:'password',params:{email:'real@example.test',password:'Incorrect-password-2026',flow:'signIn'}})).rejects.toThrow();
const signedIn=await t.action(anyApi.auth.signIn,{provider:'password',params:{email:'real@example.test',password:'A-real-test-password-2026',flow:'signIn'}});expect(signedIn.tokens?.token).toBeTruthy();
});
