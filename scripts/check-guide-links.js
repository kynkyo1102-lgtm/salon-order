#!/usr/bin/env node
/* Read-only Members Guide audit. Run from any directory: node scripts/check-guide-links.js */
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
let errors=0,checked=0;
const fail=message=>{console.error('ERROR:',message);errors++};

// Check static local href/src references (including linked styles, scripts, images).
const files=fs.readdirSync(root).filter(name=>/^(ninaguide|guide-|check|faq)/.test(name)&&/\.(html|js|css)$/.test(name));
for(const file of files){
 const source=read(file);
 const refs=[...source.matchAll(/(?:href|src)\s*=\s*["']([^"'<>]+)["']/g)].map(match=>match[1]);
 for(const ref of refs){
  if(!ref.startsWith('./')&&!ref.startsWith('../'))continue;
  const target=decodeURIComponent(ref.split(/[?#]/)[0]);
  if(!target)continue;
  checked++;
  const resolved=path.resolve(root,path.dirname(file),target);
  if(!resolved.startsWith(root+path.sep)||!fs.existsSync(resolved))fail(file+' → '+ref+' (missing or outside repository)');
 }
}

// Both article navigation and guide-home category cards must have the same
// categories, link text, link targets, and order. No browser script is executed.
const home=read('ninaguide.html');
const chrome=read('guide-shared-chrome.js');
const section=home.match(/<section class="category-section">([\s\S]*?)<\/section>/);
const groupSource=chrome.match(/const groups=\[([\s\S]*?)\n\];/);
if(!section||!groupSource){
 fail('Cannot locate guide categories or shared navigation data');
}else{
 const homeGroups=[...section[1].matchAll(/<div class="category-block"[^>]*>([\s\S]*?)<\/div>/g)].map(match=>{
  const html=match[1];
  return {
   name:html.match(/<h3>([^<]+)<\/h3>/)?.[1]||'',
   links:[...html.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map(link=>[link[2],link[1].replace(/^\.\//,'')])
  };
 });
 const menuGroups=groupSource[1].trim().split('\n').filter(line=>line.startsWith("['")).map(line=>({
  name:line.match(/^\['([^']+)'/)?.[1]||'',
  links:[...line.matchAll(/\['([^']+)','([^']+)'\]/g)].map(link=>[link[1],link[2]])
 }));
 if(!homeGroups.length||!menuGroups.length)fail('No categories found in homepage or shared navigation');
 else if(JSON.stringify(homeGroups)!==JSON.stringify(menuGroups)){
  fail('Homepage category cards and article navigation differ (names, links or ordering)');
  homeGroups.forEach((group,i)=>{
   if(JSON.stringify(group)!==JSON.stringify(menuGroups[i]))console.error('  Different category at position',i+1,group.name,'vs',menuGroups[i]?.name||'(missing)');
  });
 }
}

const utilityTitle=home.match(/<h2 id="guideUtilityHeading">([^<]+)<\/h2>/)?.[1];
const sharedUtilityTitle=chrome.match(/<summary class="guide-shared-group-title">([^<]+)<\/summary>/)?.[1];
if(!utilityTitle||utilityTitle!==sharedUtilityTitle)fail('Convenient-tools menu heading differs from the homepage');

// The shared My Plan model must load before each page's inline calculations.
for(const file of ['guide-myplan-income.html','guide-myplan-title.html']){
 const source=read(file),model='guide-myplan-model-common.js';
 const modelIndex=source.indexOf('<script src="./'+model);
 const inlineIndex=source.indexOf('<script>function diagram(');
 if(modelIndex===-1||inlineIndex===-1||modelIndex>=inlineIndex)fail(file+' is not loading the shared model before its diagram code');
}
console.log('Guide audit:',files.length,'source files,',checked,'local references,',errors,'issues');
process.exitCode=errors?1:0;
