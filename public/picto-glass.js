import {createGlass} from './liquid-glass.js';
const active=new Map();
function sync(){
 for(const [el,g] of active)if(!el.isConnected){g.destroy();active.delete(el)}
 for(const el of document.querySelectorAll('.segment,.image-tag,.sniplet-top,.story-text')){
  if(active.has(el))continue;
  const g=createGlass(el,{mode:'backdrop',refraction:8,bezel:.35,curvature:4,radius:24,blur:3,specular:.5,specularWidth:1.5,fit:true});active.set(el,g);
 }
}
let pending=false;new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;sync()})}}).observe(document.body,{childList:true,subtree:true});sync();
