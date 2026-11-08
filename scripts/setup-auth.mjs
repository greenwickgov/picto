// Run only after authenticating the Convex CLI to the intended deployment.
// Signing secrets stay in memory and are sent to the official CLI through stdin.
import {generateKeyPair,exportJWK,exportPKCS8} from 'jose';
import {spawn} from 'node:child_process';
const keys=await generateKeyPair('RS256',{extractable:true});
const privateKey=(await exportPKCS8(keys.privateKey)).trimEnd().replace(/\n/g,' ');
const publicKey=await exportJWK(keys.publicKey);
async function set(name,value){await new Promise((resolve,reject)=>{const p=spawn(process.execPath,['node_modules/convex/bin/main.js','env','set',name],{stdio:['pipe','inherit','inherit']});p.stdin.end(value+'\n');p.on('close',code=>code===0?resolve():reject(new Error('Could not configure '+name)));});}
await set('JWT_PRIVATE_KEY',privateKey);
await set('JWKS',JSON.stringify({keys:[{use:'sig',...publicKey}]}));
console.log('Convex Auth signing keys configured.');
