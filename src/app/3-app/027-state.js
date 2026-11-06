/* ================= STATE ================= */
const KEY="limudpath.v1";
const fresh=()=>({v:1,xp:0,daily:{},active:[],lessons:{},srs:{},badges:{},reviewAns:0,settings:{goal:30,il:false,name:""},course:"mishnayos",dayOffset:0,welcomed:false,updated:0});
/* Account → profiles → each profile's own progress. Saved on the device and in the app's database, so it
   survives every update to the app. Old data is upgraded step by step, never thrown away. */
const KEY2="limudpath.v2",DATA_V=2;
const DATA_MIGRATIONS={ /* from version → upgrade function. Add one here whenever the shape of saved data changes. */
 1:d=>{d.v=2;return d}};
function deepFill(def,obj){if(!obj||typeof obj!=="object")return def;const out=Object.assign({},def,obj);
 for(const k in def){const dv=def[k],ov=obj[k];if(dv&&typeof dv==="object"&&!Array.isArray(dv)&&ov&&typeof ov==="object"&&!Array.isArray(ov))out[k]=Object.assign({},dv,ov)}return out}
function upgradeData(d){d=deepFill(fresh(),d||{});let g=0;while((d.v||1)<DATA_V&&g++<50){const m=DATA_MIGRATIONS[d.v||1];if(!m)break;d=m(d)}return d}
const pid=()=>"p"+Date.now().toString(36)+Math.floor(Math.random()*1e5).toString(36);
function catOf(p){if(!p)return null;if(p.age!==null&&p.age!==undefined&&p.age!==""){const a=+p.age;if(!isNaN(a))return p.gender==="f"?(a<12?"girl":"woman"):(a<13?"boy":"man")}
 if(p.cat)return p.cat;return p.gender==="f"?"girl":p.gender==="m"?"boy":null}
function fromV1(s){const d=upgradeData(s);const c=s&&s.profile;const g=c==="woman"||c==="girl"?"f":c?"m":null;
 return {v:2,active:"p1",profiles:{p1:{id:"p1",name:(d.settings||{}).name||"",gender:g,age:null,cat:c||null,created:Date.now(),data:d}},updated:d.updated||0}}
function normAcc(a){a=Object.assign({v:2,active:"p1",profiles:{},updated:0},a||{});
 for(const id in a.profiles){const p=a.profiles[id];p.id=id;p.data=upgradeData(p.data)}
 if(!Object.keys(a.profiles).length){a.profiles.p1={id:"p1",name:"",gender:null,age:null,cat:null,created:Date.now(),data:fresh()}}
 if(!a.profiles[a.active])a.active=Object.keys(a.profiles)[0];return a}
let ACC;try{const r2=localStorage.getItem(KEY2),r1=localStorage.getItem(KEY);ACC=normAcc(r2?JSON.parse(r2):r1?fromV1(JSON.parse(r1)):null)}catch(e){ACC=normAcc(null)}
let S=ACC.profiles[ACC.active].data;
const curP=()=>ACC.profiles[ACC.active];
let dbDoc=null,dbCol=null,saveT=null,lastBackup=null;
function persistLocal(){try{localStorage.setItem(KEY2,JSON.stringify(ACC))}catch(e){}}
function save(){S.updated=Date.now();S.profile=catOf(curP());ACC.updated=S.updated;persistLocal();
 clearTimeout(saveT);saveT=setTimeout(()=>{if(!dbDoc)return;const json=JSON.stringify(ACC);dbDoc.set({json,updated:ACC.updated,v:2}).catch(()=>{});
  const day=Math.floor(Date.now()/864e5);if(lastBackup!==day&&dbCol){lastBackup=day;dbCol.doc("backup-"+(day%7)).set({json,updated:ACC.updated,day}).catch(()=>{})}},700)}
let AUTH=location.protocol==="file:"?"local":"pending";const LOCAL_OK=(()=>{try{return localStorage.getItem("limudpath.v2.local")==="1"}catch(e){return false}})();
(async()=>{const end=st=>{AUTH=st;render()};try{for(let k=0;k<40&&!window.claude?.use;k++)await new Promise(r=>setTimeout(r,100));if(!window.claude?.use){end("local");return}
 const [db,user]=await Promise.all([claude.use("db"),claude.use("user")]);if(!db||!user){end(LOCAL_OK?"local":"out");return}const id=await user.id();if(!id){end(LOCAL_OK?"local":"out");return}
 /* one browser may be shared by several testers: never carry one person's saved progress into another person's account */
 let owner=null;try{owner=localStorage.getItem(KEY2+".owner")}catch(e){}
 if(owner&&owner!==id){ACC=normAcc(null);S=curP().data;PICKED=false;tab="home"}
 try{localStorage.setItem(KEY2+".owner",id)}catch(e){}
 dbCol=db.collection("data/users/"+id);dbDoc=dbCol.doc("account");const snap=await dbDoc.get();
 const adopt=a=>{ACC=normAcc(a);S=curP().data;persistLocal()};
 if(snap.exists){const d=snap.data();if(d&&d.updated>(ACC.updated||0))adopt(JSON.parse(d.json));else if((ACC.updated||0)>(d&&d.updated||0))save()}
 else{const old=await dbCol.doc("progress").get(); /* the earlier save format: kept as-is, upgraded into the new account */
  if(old.exists){const d=old.data();if(d&&(d.updated||0)>(ACC.updated||0))adopt(fromV1(JSON.parse(d.json)))}save()}
 end("in")}catch(e){end(AUTH==="pending"?"local":AUTH)}})();
function switchProfile(id){if(!ACC.profiles[id]||id===ACC.active)return;ACC.active=id;S=curP().data;PICKED=true;save();
 if(LT.room){ltLeave().then(()=>{if(S.settings.together)ltJoin()})}else if(S.settings.together)ltJoin();tab="home";closeSheet();render();toast(`Now learning as ${curP().name||"this profile"}`)}
async function exportData(){const data=JSON.stringify({app:"Limud Path",exported:new Date().toISOString(),account:ACC},null,1);
 const dl=window.claude?.use?await claude.use("downloads"):null;
 if(!dl){toast("Downloading isn't available in this view");return}
 try{await dl.save({filename:`limud-backup-${today()}.json`,data});toast("Backup saved")}catch(e){if(e&&e.code!=="declined")toast("The backup couldn't be saved here")}}
function importData(file){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);const acc=o.account||o;if(!acc.profiles)throw 0;ACC=normAcc(acc);S=curP().data;save();closeSheet();render();toast("Your progress was restored")}catch(e){toast("That file isn't a Masmid backup")}};r.readAsText(file)}

