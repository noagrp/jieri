class JieriEngine{
  constructor(catalog){this.catalog=catalog;this.items=[...(catalog.festivals||[])];this.cache=new Map();}
  getMeta(){return this.catalog.meta||{};}
  list(){return this.items.slice();}
  getCatalogItem(id){return this.items.find(x=>x.id===id)||null;}
  search(q){
    const s=String(q||"").trim().toLowerCase();
    if(!s)return this.list();
    return this.items.filter(x=>[x.name,x.dateRule,x.calendarSystem,x.summary].join(" ").toLowerCase().includes(s));
  }
  async loadFestival(id){
    if(this.cache.has(id))return this.cache.get(id);
    const item=this.getCatalogItem(id);
    if(!item)throw new Error("Unknown festival: "+id);
    const r=await fetch(item.file,{cache:"no-cache"});
    if(!r.ok)throw new Error("Unable to load festival: "+id);
    const data=await r.json();
    this.cache.set(id,data);
    return data;
  }
}
async function loadJieriEngine(url="./data/festivals.json"){
  const r=await fetch(url,{cache:"no-cache"});
  if(!r.ok)throw new Error("Unable to load 传统节日 catalog");
  return new JieriEngine(await r.json());
}
if(typeof window!=="undefined"){window.JieriEngine=JieriEngine;window.loadJieriEngine=loadJieriEngine;}
if(typeof module!=="undefined"&&module.exports)module.exports={JieriEngine,loadJieriEngine};