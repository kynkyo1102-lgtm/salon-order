#!/usr/bin/env node
/* Read-only Members Guide maintenance audit. Run: node scripts/check-guide-links.js */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const files=fs.readdirSync(root).filter(x=>/^(ninaguide|guide-|check|faq)/.test(x)&&/\.(html|js|css)$/.test(x));
let errors=0,checked=0;
for(const file of files){
 const source=fs.readFileSync(path.join(root,file),'utf8');
 const refs=[...source.matchAll(/(?:href|src)\s*=\s*["']([^"'<>]+)["']/g)].map(m=>m[1]);
 for(const ref of refs){
  if(!ref.startsWith('./')&&!ref.startsWith('../'))continue;
  const target=decodeURIComponent(ref.split(/[?#]/)[0]);
  if(!target)continue;
  checked++;
  const resolved=path.resolve(root,path.dirname(file),target);
  if(!resolved.startsWith(root+path.sep)||!fs.existsSync(resolved)){console.error('MISSING',file,'→',ref);errors++}
 }
}
const home=fs.readFileSync(path.join(root,'ninaguide.html'),'utf8');
const chrome=fs.readFileSync(path.join(root,'guide-shared-chrome.js'),'utf8');
const category=home.match(/<section class="category-section">([\s\S]*?)<\/section>/);
const categories=category?[...category[1].matchAll(/<h3>([^<]+)<\/h3>/g)].map(m=>m[1]):[];
for(const label of categories){if(!chrome.includes("['"+label+"'")){console.error('NAV CATEGORY MISMATCH:',label);errors++}}
console.log('Guide audit:',files.length,'files,',checked,'local references,',errors,'issues');
process.exitCode=errors?1:0;
