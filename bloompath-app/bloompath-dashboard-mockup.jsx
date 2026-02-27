import { useState, useEffect } from "react";

const C = {
  coral:'#FF8C76', coralLight:'#FFF0ED', coralDark:'#D96B57',
  teal:'#005F73', tealLight:'#E6F2F5', tealDark:'#003E4D',
  green:'#94D2BD', greenLight:'#EAF6F2', greenDark:'#2D7A3E',
  yellow:'#E9D8A6', yellowLight:'#FDF9EE',
  cream:'#FDFBF7', slate:'#2B2D42', gray:'#8A8D9F', grayLight:'#F3F3F6',
  white:'#FFFFFF', rose:'#D66F6F',
  purple:'#6B4FA0', purpleLight:'#F0ECFA',
  bg:'#0F1923',
};

const DEMO = {
  childName:"Maya", streak:8, xp:380, level:3,
  sessionsTotal:20, sessionsDone:3,
  nextSession:{ number:4, title:"Physical Activity I", date:"Today, 4:00 PM", provider:"Behavioral Coach", durationMin:60 },
  goals:[
    { id:"n1", emoji:"💧", text:"Replace one sugary drink with water", freq:"Every day", weekDays:[true,true,false,true,true,true,false], streak:5 },
    { id:"a1", emoji:"🚶", text:"Take a 15-minute walk after school", freq:"4× / week", weekDays:[true,false,true,true,false,null,null], streak:3 },
  ],
  recentBadge:{ emoji:"🌱", label:"First Week Done" },
  bmiTrend:[{month:"Oct",val:28.4},{month:"Nov",val:28.1},{month:"Dec",val:27.9},{month:"Jan",val:27.7},{month:"Feb",val:27.4}],
  careTeam:[
    { initials:"JN", name:"Dr. Nordgren", role:"Physician", color:C.teal },
    { initials:"AL", name:"Amy Lin", role:"Registered Dietitian", color:C.green },
    { initials:"MS", name:"Mark Singh", role:"Behavioral Coach", color:C.purple },
  ],
  messages:[
    { from:"Amy Lin", preview:"Great job logging your meals this week! I love seeing…", time:"2h ago", unread:true },
    { from:"Mark Singh", preview:"Reminder: We'll be doing a role-play exercise in Session 4.", time:"Yesterday", unread:false },
  ],
};

const FOOD_DB = [
  {name:"Apple",color:"green"},{name:"Banana",color:"green"},{name:"Grapes",color:"green"},
  {name:"Chicken & rice",color:"green"},{name:"Yogurt",color:"green"},{name:"Carrots",color:"green"},
  {name:"Broccoli",color:"green"},{name:"Eggs",color:"green"},{name:"Oatmeal",color:"green"},
  {name:"Orange juice",color:"yellow"},{name:"Cheese",color:"yellow"},{name:"Granola bar",color:"yellow"},
  {name:"Peanut butter",color:"yellow"},{name:"Whole milk",color:"yellow"},{name:"Corn",color:"yellow"},
  {name:"Chips",color:"red"},{name:"Soda",color:"red"},{name:"Cookies",color:"red"},
  {name:"French fries",color:"red"},{name:"Candy",color:"red"},{name:"Ice cream",color:"red"},
];

const BARCODE_FOODS = [
  {name:"Cheerios",brand:"General Mills",color:"yellow",cal:110},
  {name:"Goldfish Crackers",brand:"Pepperidge Farm",color:"yellow",cal:140},
  {name:"Coke Zero",brand:"Coca-Cola",color:"red",cal:0},
  {name:"Greek Yogurt",brand:"Chobani",color:"green",cal:90},
  {name:"Oreos",brand:"Nabisco",color:"red",cal:160},
];

const GALLERY_FOODS = [
  {id:1,emoji:"🥗",label:"Salad",color:"green"},{id:2,emoji:"🍌",label:"Banana",color:"green"},
  {id:3,emoji:"🍕",label:"Pizza slice",color:"red"},{id:4,emoji:"🥛",label:"Glass of milk",color:"yellow"},
  {id:5,emoji:"🍎",label:"Apple",color:"green"},{id:6,emoji:"🍟",label:"Fries",color:"red"},
];

const COLOR_META = {
  green:{ label:"Go Food",   sub:"Eat plenty!",        bg:C.greenLight,  border:C.green,     dot:"#3AAA72", textColor:C.greenDark },
  yellow:{ label:"Slow Food", sub:"Sometimes okay",     bg:C.yellowLight, border:"#D4B96A",   dot:"#C9A227", textColor:"#8B6914"  },
  red:{ label:"Whoa Food",   sub:"Once in a while",    bg:C.coralLight,  border:"#F4A49A",   dot:C.rose,    textColor:C.coralDark },
};

// ─── Shared ───────────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 6px"}}>
      <span style={{fontSize:15,fontWeight:700,color:C.slate}}>9:41</span>
      <div style={{display:"flex",gap:6,alignItems:"center",fontSize:13}}>
        <span>●●●</span><span>WiFi</span><span>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active="home" }) {
  const tabs=[{id:"home",icon:"🏠",label:"Home"},{id:"journey",icon:"🗺️",label:"Journey"},{id:"goals",icon:"🎯",label:"Goals"},{id:"diet",icon:"🚦",label:"Diet"},{id:"team",icon:"👩‍⚕️",label:"Team"}];
  return (
    <div style={{display:"flex",borderTop:`1.5px solid ${C.grayLight}`,background:C.white,paddingBottom:20,paddingTop:8,flexShrink:0}}>
      {tabs.map(t=>(
        <div key={t.id} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer"}}>
          <span style={{fontSize:20}}>{t.icon}</span>
          <span style={{fontSize:10,fontWeight:t.id===active?700:400,color:t.id===active?C.teal:C.gray}}>{t.label}</span>
          {t.id===active&&<div style={{width:20,height:3,borderRadius:2,background:C.coral,marginTop:1}}/>}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({label,action}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <span style={{fontSize:14,fontWeight:700,color:C.slate}}>{label}</span>
      {action&&<span style={{fontSize:12,fontWeight:600,color:C.teal,cursor:"pointer"}}>{action} →</span>}
    </div>
  );
}

function WeekRings({days}) {
  const labels=["M","T","W","T","F","S","S"];
  return (
    <div style={{display:"flex",gap:5}}>
      {days.map((done,i)=>(
        <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{width:24,height:24,borderRadius:"50%",
            background:done===true?C.green:done===null?C.grayLight:"#FFE6E0",
            border:done===true?`2px solid ${C.greenDark}`:done===null?`2px dashed ${C.gray}`:`2px solid #F4A49A`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>
            {done===true?"✓":done===null?"":"–"}
          </div>
          <span style={{fontSize:9,color:C.gray}}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// Animated scan line
function ScanLine({ color }) {
  const [pos,setPos] = useState(0);
  useEffect(()=>{
    const id = setInterval(()=>setPos(p=>(p+3)%100),20);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",overflow:"hidden"}}>
      <div style={{position:"absolute",left:0,right:0,top:`${pos}%`,height:2,
        background:color,boxShadow:`0 0 8px ${color},0 0 16px ${color}55`}}/>
    </div>
  );
}

// Confirm + meal picker — shared across all log modes
function ConfirmCard({ food, color, meal, onMealChange, meals, onConfirm, onReset, resetLabel }) {
  const m = COLOR_META[color];
  const foodEmoji = color==="green"?"🥦":color==="yellow"?"🍊":"🍕";
  return (
    <div>
      <div style={{background:m.bg,borderRadius:14,padding:"14px",marginBottom:12,
        border:`1.5px solid ${m.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:11,color:m.textColor,fontWeight:600,marginBottom:4}}>
            {color==="green"?"🟢":color==="yellow"?"🟡":"🔴"} {m.label}
          </div>
          <div style={{fontSize:16,fontWeight:800,color:C.slate}}>{food}</div>
          <div style={{fontSize:11,color:m.textColor,marginTop:2}}>{m.sub}</div>
        </div>
        <div style={{fontSize:36}}>{foodEmoji}</div>
      </div>
      <div style={{fontSize:12,color:C.gray,marginBottom:8,fontWeight:600}}>Which meal?</div>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {meals.map(ml=>(
          <div key={ml} onClick={()=>onMealChange(ml)}
            style={{padding:"7px 14px",borderRadius:99,cursor:"pointer",fontSize:12,
              fontWeight:meal===ml?700:500,
              background:meal===ml?C.tealLight:C.grayLight,
              color:meal===ml?C.teal:C.gray,
              border:meal===ml?`1.5px solid ${C.teal}`:`1.5px solid transparent`}}>
            {ml}
          </div>
        ))}
      </div>
      <button onClick={onConfirm}
        style={{width:"100%",padding:"13px",borderRadius:12,marginBottom:8,
          background:`linear-gradient(135deg,${C.teal},${C.tealDark})`,
          color:C.white,fontWeight:700,fontSize:14,border:"none",cursor:"pointer",
          boxShadow:`0 4px 12px rgba(0,95,115,.3)`}}>
        ✓ Log This Food
      </button>
      <button onClick={onReset}
        style={{width:"100%",padding:"10px",borderRadius:12,background:C.grayLight,
          color:C.gray,fontWeight:600,fontSize:12,border:"none",cursor:"pointer"}}>
        {resetLabel}
      </button>
    </div>
  );
}

// ─── DIET SCREEN ──────────────────────────────────────────────────────────────
function DietScreen() {
  const [logged, setLogged] = useState([
    {id:1, food:"Apple slices",  color:"green",  meal:"Snack",     time:"3:15 PM"},
    {id:2, food:"Chicken & rice",color:"green",  meal:"Lunch",     time:"12:00 PM"},
    {id:3, food:"Orange juice",  color:"yellow", meal:"Breakfast", time:"7:30 AM"},
  ]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [mode, setMode] = useState(null); // null | 'type' | 'camera' | 'gallery' | 'barcode'
  const [meal, setMeal] = useState("Snack");
  const MEALS = ["Breakfast","Lunch","Dinner","Snack"];

  // TYPE
  const [query, setQuery]       = useState("");
  const [typePick, setTypePick] = useState(null);

  // CAMERA
  const [camPhase, setCamPhase] = useState("idle"); // idle|scanning|done
  const [camFood,  setCamFood]  = useState(null);

  // GALLERY
  const [galPick, setGalPick] = useState(null);

  // BARCODE
  const [barcPhase, setBarcPhase] = useState("idle");
  const [barcFood,  setBarcFood]  = useState(null);

  function reset() {
    setQuery(""); setTypePick(null);
    setCamPhase("idle"); setCamFood(null);
    setGalPick(null);
    setBarcPhase("idle"); setBarcFood(null);
  }
  function openPanel()     { setPanelOpen(true);  setMode(null); reset(); }
  function closePanel()    { setPanelOpen(false); setMode(null); reset(); }
  function chooseMode(m)   { setMode(m); reset(); }

  function logFood(food, color) {
    setLogged(p=>[{id:Date.now(), food, color, meal, time:"Just now"}, ...p]);
    closePanel();
  }

  function startCam() {
    setCamPhase("scanning");
    setTimeout(()=>{ setCamFood({name:"Chicken & rice", color:"green"}); setCamPhase("done"); }, 2600);
  }
  function startBarc() {
    setBarcPhase("scanning");
    setTimeout(()=>{
      setBarcFood(BARCODE_FOODS[Math.floor(Math.random()*BARCODE_FOODS.length)]);
      setBarcPhase("done");
    }, 2200);
  }

  const filtered = query.length > 0
    ? FOOD_DB.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())).slice(0,7)
    : FOOD_DB.slice(0,7);

  const counts = {green:0, yellow:0, red:0};
  logged.forEach(l=>counts[l.color]++);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <StatusBar/>

      {/* Header */}
      <div style={{padding:"8px 20px 12px",background:C.white,
        borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}>
        <div style={{fontSize:20,fontWeight:800,color:C.teal}}>Traffic Light Tracker</div>
        <div style={{fontSize:12,color:C.gray,marginTop:2}}>Today · Thursday</div>
      </div>

      {/* Scrollable body */}
      <div style={{flex:1,overflowY:"auto",padding:"0 16px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>

        {/* Go/Slow/Whoa summary */}
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {["green","yellow","red"].map(c=>{
            const m=COLOR_META[c];
            return (
              <div key={c} style={{flex:1,background:m.bg,borderRadius:16,padding:"12px 10px",
                textAlign:"center",border:`1.5px solid ${m.border}`}}>
                <div style={{width:14,height:14,borderRadius:"50%",background:m.dot,margin:"0 auto 5px"}}/>
                <div style={{fontSize:22,fontWeight:800,color:C.slate}}>{counts[c]}</div>
                <div style={{fontSize:10,fontWeight:700,color:m.textColor,marginTop:2}}>{m.label}</div>
              </div>
            );
          })}
        </div>

        {/* ── LOG BUTTON ── */}
        <button onClick={panelOpen ? closePanel : openPanel}
          style={{width:"100%",padding:"13px",borderRadius:14,marginBottom:14,
            background:panelOpen?C.grayLight:`linear-gradient(135deg,${C.coral},${C.coralDark})`,
            color:panelOpen?C.gray:C.white,fontWeight:700,fontSize:14,
            border:"none",cursor:"pointer",
            boxShadow:panelOpen?"none":`0 4px 14px rgba(255,140,118,.3)`}}>
          {panelOpen ? "✕  Close" : "+ Log a Food"}
        </button>

        {/* ════════════ LOG PANEL ════════════ */}
        {panelOpen && (
          <div style={{background:C.white,borderRadius:20,marginBottom:16,
            boxShadow:"0 8px 32px rgba(0,0,0,.12)",
            border:`1.5px solid ${C.coralLight}`,overflow:"hidden"}}>

            {/* ── Method selector ── */}
            {!mode && (
              <div style={{padding:"18px 16px"}}>
                <div style={{fontSize:14,fontWeight:700,color:C.slate,
                  textAlign:"center",marginBottom:14}}>
                  How do you want to log?
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[
                    {id:"type",    icon:"⌨️",  label:"Type Food",    sub:"Search by name",        bg:C.tealLight,   accent:C.teal},
                    {id:"camera",  icon:"📸",  label:"Take Photo",   sub:"AI detects the food",   bg:C.coralLight,  accent:C.coralDark},
                    {id:"gallery", icon:"🖼️", label:"Upload Photo", sub:"Choose from camera roll",bg:C.greenLight,  accent:C.greenDark},
                    {id:"barcode", icon:"📊",  label:"Scan Barcode", sub:"Works on packages",     bg:C.yellowLight, accent:"#8B6914"},
                  ].map(btn=>(
                    <div key={btn.id} onClick={()=>chooseMode(btn.id)}
                      style={{background:btn.bg,borderRadius:18,padding:"18px 12px",
                        cursor:"pointer",textAlign:"center",
                        border:`1.5px solid ${btn.bg}`,
                        boxShadow:"0 2px 8px rgba(0,0,0,.06)"}}>
                      <div style={{fontSize:32,marginBottom:8}}>{btn.icon}</div>
                      <div style={{fontSize:13,fontWeight:700,color:btn.accent}}>{btn.label}</div>
                      <div style={{fontSize:10,color:C.gray,marginTop:3}}>{btn.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ TYPE MODE ══ */}
            {mode==="type" && (
              <div style={{padding:"16px"}}>
                {/* Back row */}
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <button onClick={()=>chooseMode(null)}
                    style={{background:C.grayLight,border:"none",cursor:"pointer",
                      fontSize:13,padding:"6px 12px",borderRadius:8,color:C.slate,fontWeight:600}}>
                    ← Back
                  </button>
                  <div style={{fontSize:14,fontWeight:700,color:C.slate}}>⌨️ Type a Food</div>
                </div>

                {/* Search box */}
                <div style={{display:"flex",gap:8,alignItems:"center",
                  background:C.grayLight,borderRadius:12,padding:"10px 14px",marginBottom:12,
                  border:query?`1.5px solid ${C.teal}`:`1.5px solid transparent`}}>
                  <span style={{fontSize:16}}>🔍</span>
                  <input value={query} onChange={e=>{setQuery(e.target.value);setTypePick(null);}}
                    placeholder="e.g. apple, chicken, chips…"
                    autoFocus
                    style={{flex:1,border:"none",background:"transparent",fontSize:13,
                      color:C.slate,outline:"none"}}/>
                  {query&&(
                    <span onClick={()=>{setQuery("");setTypePick(null);}}
                      style={{cursor:"pointer",fontSize:14,color:C.gray}}>✕</span>
                  )}
                </div>

                {/* Suggestions list */}
                {!typePick && (
                  <div>
                    <div style={{fontSize:11,color:C.gray,marginBottom:8}}>
                      {query?"Matching foods":"Common foods — tap to select"}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {filtered.map(f=>{
                        const m=COLOR_META[f.color];
                        return (
                          <div key={f.name} onClick={()=>setTypePick(f)}
                            style={{display:"flex",alignItems:"center",gap:12,
                              padding:"10px 12px",borderRadius:12,background:C.cream,
                              cursor:"pointer",border:`1.5px solid ${C.grayLight}`}}>
                            <div style={{width:10,height:10,borderRadius:"50%",
                              background:m.dot,flexShrink:0}}/>
                            <span style={{flex:1,fontSize:13,fontWeight:500,color:C.slate}}>
                              {f.name}
                            </span>
                            <span style={{fontSize:11,color:m.textColor,background:m.bg,
                              padding:"2px 8px",borderRadius:99,fontWeight:600}}>
                              {m.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {typePick && (
                  <ConfirmCard food={typePick.name} color={typePick.color}
                    meal={meal} onMealChange={setMeal} meals={MEALS}
                    onConfirm={()=>logFood(typePick.name, typePick.color)}
                    onReset={()=>setTypePick(null)} resetLabel="← Pick a different food"/>
                )}
              </div>
            )}

            {/* ══ CAMERA MODE ══ */}
            {mode==="camera" && (
              <div style={{overflow:"hidden"}}>
                {camPhase!=="done" ? (
                  <>
                    {/* Viewfinder */}
                    <div style={{background:"#0A0A0A",height:220,
                      display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                      {/* Corner brackets */}
                      {[
                        {top:24,left:24},  {top:24,right:24},
                        {bottom:24,left:24},{bottom:24,right:24}
                      ].map((pos,i)=>(
                        <div key={i} style={{position:"absolute",width:28,height:28,...pos,
                          borderTop:   ("top"   in pos)?`3px solid ${C.coral}`:"none",
                          borderBottom:("bottom"in pos)?`3px solid ${C.coral}`:"none",
                          borderLeft:  ("left"  in pos)?`3px solid ${C.coral}`:"none",
                          borderRight: ("right" in pos)?`3px solid ${C.coral}`:"none"}}/>
                      ))}
                      {camPhase==="scanning" ? (
                        <div style={{textAlign:"center",position:"relative",zIndex:1}}>
                          <div style={{fontSize:40,marginBottom:8}}>🍽️</div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>
                            Analyzing food…
                          </div>
                          <ScanLine color={C.coral}/>
                        </div>
                      ) : (
                        <div style={{textAlign:"center",padding:20}}>
                          <div style={{fontSize:44,marginBottom:8}}>📷</div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,.55)"}}>
                            Point camera at your food
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Controls bar */}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"12px 24px 16px",background:"#111"}}>
                      <button onClick={()=>chooseMode(null)}
                        style={{background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",
                          color:C.white,padding:"8px 14px",borderRadius:10,fontSize:12}}>
                        ← Back
                      </button>
                      <button onClick={startCam} disabled={camPhase==="scanning"}
                        style={{width:64,height:64,borderRadius:"50%",
                          background:camPhase==="scanning"?C.gray:C.coral,
                          border:`3px solid ${C.white}`,cursor:"pointer",fontSize:22}}>
                        {camPhase==="scanning"?"⏳":"📸"}
                      </button>
                      <div style={{width:60}}/>
                    </div>
                  </>
                ) : (
                  <div style={{padding:16}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span style={{fontSize:20}}>✅</span>
                      <div style={{fontSize:14,fontWeight:700,color:C.slate}}>
                        Food detected!
                      </div>
                    </div>
                    <ConfirmCard food={camFood.name} color={camFood.color}
                      meal={meal} onMealChange={setMeal} meals={MEALS}
                      onConfirm={()=>logFood(camFood.name, camFood.color)}
                      onReset={()=>{setCamPhase("idle");setCamFood(null);}}
                      resetLabel="← Retake photo"/>
                  </div>
                )}
              </div>
            )}

            {/* ══ GALLERY MODE ══ */}
            {mode==="gallery" && (
              <div style={{padding:16}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <button onClick={()=>chooseMode(null)}
                    style={{background:C.grayLight,border:"none",cursor:"pointer",
                      fontSize:13,padding:"6px 12px",borderRadius:8,color:C.slate,fontWeight:600}}>
                    ← Back
                  </button>
                  <div style={{fontSize:14,fontWeight:700,color:C.slate}}>🖼️ Upload a Photo</div>
                </div>

                {!galPick ? (
                  <>
                    <div style={{fontSize:11,color:C.gray,marginBottom:10}}>
                      Recent photos — tap one, AI identifies the food
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                      {GALLERY_FOODS.map(g=>{
                        const m=COLOR_META[g.color];
                        return (
                          <div key={g.id} onClick={()=>setGalPick(g)}
                            style={{aspectRatio:"1",borderRadius:14,cursor:"pointer",
                              background:`linear-gradient(135deg,${m.bg},${C.white})`,
                              display:"flex",flexDirection:"column",
                              alignItems:"center",justifyContent:"center",
                              border:`1.5px solid ${m.border}`,overflow:"hidden"}}>
                            <div style={{fontSize:30}}>{g.emoji}</div>
                            <div style={{fontSize:9,color:C.slate,fontWeight:600,
                              marginTop:4,textAlign:"center",padding:"0 4px"}}>
                              {g.label}
                            </div>
                            <div style={{width:8,height:8,borderRadius:"50%",
                              background:m.dot,marginTop:4}}/>
                          </div>
                        );
                      })}
                    </div>
                    {/* Upload from device */}
                    <div style={{padding:"14px",borderRadius:14,
                      border:`2px dashed ${C.teal}`,textAlign:"center",
                      cursor:"pointer",background:C.tealLight}}>
                      <div style={{fontSize:24,marginBottom:4}}>📁</div>
                      <div style={{fontSize:12,fontWeight:600,color:C.teal}}>
                        Browse device photos
                      </div>
                      <div style={{fontSize:10,color:C.gray,marginTop:2}}>
                        Tap to open your camera roll
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div style={{background:COLOR_META[galPick.color].bg,borderRadius:16,
                      padding:14,marginBottom:12,textAlign:"center",
                      border:`1.5px solid ${COLOR_META[galPick.color].border}`}}>
                      <div style={{fontSize:48,marginBottom:6}}>{galPick.emoji}</div>
                      <div style={{fontSize:11,color:C.gray}}>AI identified:</div>
                    </div>
                    <ConfirmCard food={galPick.label} color={galPick.color}
                      meal={meal} onMealChange={setMeal} meals={MEALS}
                      onConfirm={()=>logFood(galPick.label, galPick.color)}
                      onReset={()=>setGalPick(null)}
                      resetLabel="← Choose different photo"/>
                  </div>
                )}
              </div>
            )}

            {/* ══ BARCODE MODE ══ */}
            {mode==="barcode" && (
              <div style={{overflow:"hidden"}}>
                {barcPhase!=="done" ? (
                  <>
                    {/* Scanner viewfinder */}
                    <div style={{background:"#0A0A0A",height:220,
                      display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                      {/* Barcode rectangle target */}
                      <div style={{width:230,height:84,border:`2.5px solid ${C.green}`,
                        borderRadius:6,position:"relative",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {/* Corner circles */}
                        {[{top:-5,left:-5},{top:-5,right:-5},{bottom:-5,left:-5},{bottom:-5,right:-5}].map((pos,i)=>(
                          <div key={i} style={{position:"absolute",width:10,height:10,
                            borderRadius:"50%",background:C.green,...pos}}/>
                        ))}
                        {barcPhase==="scanning" ? (
                          <>
                            <ScanLine color={C.green}/>
                            <div style={{fontSize:11,color:C.green,opacity:.8,zIndex:1}}>
                              Reading barcode…
                            </div>
                          </>
                        ) : (
                          <div style={{textAlign:"center"}}>
                            <div style={{fontFamily:"monospace",fontSize:18,color:"rgba(255,255,255,.5)",letterSpacing:2}}>
                              | || | ||| ||
                            </div>
                            <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:4}}>
                              Align barcode within frame
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Red corners on outer frame */}
                      {[{top:16,left:16},{top:16,right:16},{bottom:16,left:16},{bottom:16,right:16}].map((pos,i)=>(
                        <div key={i} style={{position:"absolute",width:20,height:20,...pos,
                          borderTop:   ("top"   in pos)?`2px solid rgba(255,255,255,.3)`:"none",
                          borderBottom:("bottom"in pos)?`2px solid rgba(255,255,255,.3)`:"none",
                          borderLeft:  ("left"  in pos)?`2px solid rgba(255,255,255,.3)`:"none",
                          borderRight: ("right" in pos)?`2px solid rgba(255,255,255,.3)`:"none"}}/>
                      ))}
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"12px 24px 16px",background:"#111"}}>
                      <button onClick={()=>chooseMode(null)}
                        style={{background:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",
                          color:C.white,padding:"8px 14px",borderRadius:10,fontSize:12}}>
                        ← Back
                      </button>
                      <button onClick={startBarc} disabled={barcPhase==="scanning"}
                        style={{background:barcPhase==="scanning"?C.gray:C.green,
                          border:"none",cursor:"pointer",color:C.white,
                          padding:"12px 24px",borderRadius:12,fontWeight:700,fontSize:13}}>
                        {barcPhase==="scanning"?"Scanning…":"Scan Barcode"}
                      </button>
                      <div style={{width:60}}/>
                    </div>
                  </>
                ) : (
                  <div style={{padding:16}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <span style={{fontSize:20}}>✅</span>
                      <div style={{fontSize:14,fontWeight:700,color:C.slate}}>Barcode found!</div>
                    </div>
                    {/* Product detail card */}
                    <div style={{background:COLOR_META[barcFood.color].bg,borderRadius:14,
                      padding:"12px 14px",marginBottom:12,
                      border:`1.5px solid ${COLOR_META[barcFood.color].border}`,
                      display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:15,fontWeight:800,color:C.slate}}>{barcFood.name}</div>
                        <div style={{fontSize:11,color:C.gray,marginTop:2}}>
                          {barcFood.brand} · {barcFood.cal} cal / serving
                        </div>
                      </div>
                      <div style={{fontSize:11,fontWeight:700,
                        color:COLOR_META[barcFood.color].textColor,
                        background:C.white,padding:"5px 10px",borderRadius:99,
                        border:`1px solid ${COLOR_META[barcFood.color].border}`}}>
                        {COLOR_META[barcFood.color].label}
                      </div>
                    </div>
                    <ConfirmCard food={barcFood.name} color={barcFood.color}
                      meal={meal} onMealChange={setMeal} meals={MEALS}
                      onConfirm={()=>logFood(barcFood.name, barcFood.color)}
                      onReset={()=>{setBarcPhase("idle");setBarcFood(null);}}
                      resetLabel="← Scan again"/>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Today's log ── */}
        <SectionHeader label="Today's Log"/>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {logged.map(l=>{
            const m=COLOR_META[l.color];
            return (
              <div key={l.id} style={{background:C.white,borderRadius:14,padding:"11px 14px",
                display:"flex",gap:12,alignItems:"center",
                border:`1.5px solid ${m.border}`,boxShadow:"0 2px 6px rgba(0,0,0,.04)"}}>
                <div style={{width:12,height:12,borderRadius:"50%",background:m.dot,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.slate}}>{l.food}</div>
                  <div style={{fontSize:11,color:C.gray}}>{l.meal} · {l.time}</div>
                </div>
                <div style={{fontSize:11,fontWeight:600,color:m.textColor,
                  background:m.bg,padding:"3px 8px",borderRadius:99}}>
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{background:C.greenLight,borderRadius:16,padding:14,
          border:`1.5px solid ${C.green}`,marginBottom:8}}>
          <div style={{fontSize:11,fontWeight:700,color:C.greenDark,marginBottom:4}}>💡 Tip from Amy (RD)</div>
          <div style={{fontSize:12,color:C.slate,lineHeight:1.5}}>
            Try adding one green food at every meal — even an apple counts!
          </div>
        </div>
      </div>

      <BottomNav active="diet"/>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen() {
  const [goalsChecked,setGoalsChecked] = useState({n1:false,a1:false});
  const toggle=(id)=>setGoalsChecked(p=>({...p,[id]:!p[id]}));
  const allDone=Object.values(goalsChecked).every(Boolean);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <StatusBar/>
      <div style={{background:`linear-gradient(160deg,${C.tealDark},${C.teal})`,padding:"12px 20px 22px",borderRadius:"0 0 28px 28px",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div>
            <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:2}}>Good afternoon,</div>
            <div style={{fontSize:22,fontWeight:800,color:C.white}}>{DEMO.childName} 👋</div>
          </div>
          <div style={{position:"relative",cursor:"pointer"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🔔</div>
            <div style={{position:"absolute",top:2,right:2,width:10,height:10,borderRadius:"50%",background:C.coral,border:`2px solid ${C.teal}`}}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <div style={{flex:1,background:"rgba(255,255,255,.13)",borderRadius:14,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:22}}>🔥</span>
            <div><div style={{fontSize:18,fontWeight:800,color:C.white,lineHeight:1}}>{DEMO.streak}</div><div style={{fontSize:10,color:"rgba(255,255,255,.7)"}}>Day Streak</div></div>
          </div>
          <div style={{flex:2,background:"rgba(255,255,255,.13)",borderRadius:14,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Level {DEMO.level}</span>
              <span style={{fontSize:11,fontWeight:700,color:C.yellow}}>⚡ {DEMO.xp} XP</span>
            </div>
            <div style={{height:8,borderRadius:99,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:99,width:`${Math.round(((DEMO.xp%200)/200)*100)}%`,background:`linear-gradient(90deg,${C.green},${C.yellow})`}}/>
            </div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.12)",borderRadius:14,padding:"10px 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,.85)",fontWeight:600}}>Program Progress</span>
            <span style={{fontSize:12,color:C.yellow,fontWeight:700}}>{DEMO.sessionsDone}/{DEMO.sessionsTotal} sessions</span>
          </div>
          <div style={{height:8,borderRadius:99,background:"rgba(255,255,255,.2)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:99,width:`${Math.round((DEMO.sessionsDone/DEMO.sessionsTotal)*100)}%`,background:`linear-gradient(90deg,${C.yellow},${C.coral})`}}/>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:16}}/>
        <SectionHeader label="Next Session" action="See all"/>
        <div style={{background:C.white,borderRadius:18,padding:16,boxShadow:"0 2px 12px rgba(0,95,115,.08)",marginBottom:20,border:`1.5px solid ${C.tealLight}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,color:C.teal,background:C.tealLight,borderRadius:6,padding:"2px 8px",display:"inline-block",marginBottom:6}}>Session {DEMO.nextSession.number}</div>
              <div style={{fontSize:16,fontWeight:700,color:C.slate}}>{DEMO.nextSession.title}</div>
              <div style={{fontSize:12,color:C.gray,marginTop:3}}>with {DEMO.nextSession.provider}</div>
            </div>
            <div style={{background:C.coralLight,borderRadius:12,padding:"8px 12px",textAlign:"center"}}>
              <div style={{fontSize:18}}>📅</div>
              <div style={{fontSize:10,fontWeight:700,color:C.coralDark,marginTop:2}}>TODAY</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[{icon:"🕐",t:`${DEMO.nextSession.durationMin} min`},{icon:"📹",t:"Telehealth"},{icon:"⚡",t:"+50 XP",bg:C.greenLight,c:C.greenDark}].map((tag,i)=>(
              <div key={i} style={{background:tag.bg||C.grayLight,borderRadius:8,padding:"4px 10px",fontSize:11,color:tag.c||C.slate}}>{tag.icon} {tag.t}</div>
            ))}
          </div>
          <button style={{width:"100%",padding:"12px",borderRadius:12,background:`linear-gradient(135deg,${C.coral},${C.coralDark})`,color:C.white,fontWeight:700,fontSize:14,border:"none",cursor:"pointer",boxShadow:`0 4px 12px rgba(255,140,118,.35)`}}>
            Join Session · {DEMO.nextSession.date}
          </button>
        </div>
        <SectionHeader label="Today's Goals"/>
        {allDone&&<div style={{background:C.greenLight,borderRadius:14,padding:"12px 14px",marginBottom:12,border:`1.5px solid ${C.green}`,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>🎉</span><div><div style={{fontSize:13,fontWeight:700,color:C.greenDark}}>All done today!</div><div style={{fontSize:11,color:C.greenDark,opacity:.8}}>🔥 Streak extended to {DEMO.streak+1} days!</div></div></div>}
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
          {DEMO.goals.map(g=>(
            <div key={g.id} onClick={()=>toggle(g.id)} style={{background:goalsChecked[g.id]?C.greenLight:C.white,borderRadius:16,padding:"12px 14px",display:"flex",gap:12,alignItems:"center",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.05)",border:`1.5px solid ${goalsChecked[g.id]?C.green:C.grayLight}`}}>
              <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:goalsChecked[g.id]?C.green:C.grayLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{goalsChecked[g.id]?"✓":""}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:C.slate,textDecoration:goalsChecked[g.id]?"line-through":"none",opacity:goalsChecked[g.id]?.6:1}}>{g.emoji} {g.text}</div>
                <div style={{fontSize:11,color:C.gray,marginTop:2}}>{g.freq} · 🔥 {g.streak}-day streak</div>
                <div style={{marginTop:6}}><WeekRings days={g.weekDays}/></div>
              </div>
            </div>
          ))}
        </div>
        <SectionHeader label="Quick Actions"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
          {[{icon:"📸",label:"Scan Progress",sub:"Monthly photo",color:C.tealLight,accent:C.teal},{icon:"🚦",label:"Log a Meal",sub:"Traffic light",color:C.coralLight,accent:C.coralDark},{icon:"📊",label:"My Reports",sub:"BMI + activity",color:C.greenLight,accent:C.greenDark},{icon:"📚",label:"Resources",sub:"Recipes & tips",color:C.yellowLight,accent:C.slate}].map((a,i)=>(
            <div key={i} style={{background:a.color,borderRadius:16,padding:"14px",cursor:"pointer"}}><div style={{fontSize:24,marginBottom:6}}>{a.icon}</div><div style={{fontSize:13,fontWeight:700,color:a.accent}}>{a.label}</div><div style={{fontSize:10,color:C.gray,marginTop:2}}>{a.sub}</div></div>
          ))}
        </div>
      </div>
      <BottomNav active="home"/>
    </div>
  );
}

// ─── JOURNEY SCREEN ───────────────────────────────────────────────────────────
function JourneyScreen() {
  const sessions=[
    {n:1,title:"Welcome & Intake",done:true},{n:2,title:"Nutrition Foundations",done:true},
    {n:3,title:"Building Healthy Routines",done:true},{n:4,title:"Physical Activity I",done:false,active:true},
    {n:5,title:"Parents as Agents of Change",done:false},{n:6,title:"Healthy Snacking & Beverages",done:false},
    {n:7,title:"Sleep, Stress & Emotional Eating",done:false},{n:8,title:"Eating Out & Social Situations",done:false},
    {n:9,title:"Physical Activity II",done:false},{n:10,title:"Family Meal Planning",done:false},
    {n:11,title:"Screen Time & Sedentary Behaviors",done:false},{n:12,title:"Midpoint Check-in",done:false},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <StatusBar/>
      <div style={{padding:"10px 20px 16px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}>
        <div style={{fontSize:20,fontWeight:800,color:C.teal}}>My Journey</div>
        <div style={{fontSize:12,color:C.gray,marginTop:2}}>Phase 1 · Session {DEMO.sessionsDone}/{DEMO.sessionsTotal}</div>
        <div style={{marginTop:10}}>
          <div style={{height:8,borderRadius:99,background:C.grayLight,overflow:"hidden"}}><div style={{height:"100%",width:`${(DEMO.sessionsDone/DEMO.sessionsTotal)*100}%`,borderRadius:99,background:`linear-gradient(90deg,${C.green},${C.teal})`}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontSize:10,color:C.gray}}>{Math.round((DEMO.sessionsDone/DEMO.sessionsTotal)*100)}% complete</span><span style={{fontSize:10,color:C.teal,fontWeight:600}}>{DEMO.sessionsTotal-DEMO.sessionsDone} sessions left</span></div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>
        <div style={{background:`linear-gradient(135deg,${C.tealLight},${C.greenLight})`,borderRadius:14,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,fontWeight:700,color:C.teal}}>Phase 1 · Intensive</div><div style={{fontSize:11,color:C.gray}}>Weeks 1–12 · 12 sessions</div></div><div style={{fontSize:24}}>🌱</div></div>
        {sessions.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,marginBottom:4,alignItems:"flex-start"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:40,flexShrink:0}}>
              <div style={{width:36,height:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,background:s.done?C.green:s.active?C.coral:C.grayLight,color:s.done||s.active?C.white:C.gray,boxShadow:s.active?`0 0 0 4px ${C.coralLight}`:"none",border:s.done||s.active?"none":`1.5px dashed #CCC`}}>{s.done?"✓":s.n}</div>
              {i<sessions.length-1&&<div style={{width:2,height:20,marginTop:2,background:s.done?C.green:C.grayLight}}/>}
            </div>
            <div style={{flex:1,background:s.active||s.done?C.white:"transparent",borderRadius:14,padding:s.active||s.done?"10px 14px":"6px 0",marginBottom:s.active||s.done?8:2,border:s.active?`1.5px solid ${C.coral}`:s.done?`1.5px solid ${C.green}`:"none",boxShadow:s.active?`0 4px 14px rgba(255,140,118,.2)`:s.done?"0 2px 8px rgba(0,0,0,.05)":"none"}}>
              <div style={{fontSize:s.active?13:12,fontWeight:s.active||s.done?700:500,color:s.active?C.coral:s.done?C.slate:C.gray}}>{s.title}</div>
              {s.active&&<div style={{marginTop:6}}><div style={{fontSize:11,color:C.gray,marginBottom:6}}>📅 Today, 4:00 PM · 60 min</div><button style={{padding:"8px 16px",borderRadius:10,background:`linear-gradient(135deg,${C.coral},${C.coralDark})`,color:C.white,fontWeight:700,fontSize:12,border:"none",cursor:"pointer"}}>Join Session →</button></div>}
              {s.done&&<div style={{fontSize:11,color:C.gray,marginTop:3}}>✅ Completed · ⚡ +50 XP</div>}
            </div>
          </div>
        ))}
        <div style={{marginTop:8,borderRadius:14,padding:"12px 14px",background:C.grayLight,border:`1.5px dashed ${C.gray}`}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:13,fontWeight:700,color:C.gray}}>Phase 2 · Maintenance</div><div style={{fontSize:11,color:C.gray}}>Months 4–6 · Unlocks at Session 12</div></div><div style={{fontSize:20}}>🔒</div></div></div>
        <div style={{height:16}}/>
      </div>
      <BottomNav active="journey"/>
    </div>
  );
}

// ─── GOALS SCREEN ─────────────────────────────────────────────────────────────
function GoalsScreen() {
  const [checks,setChecks] = useState({n1:[true,true,false,true,true,true,false],a1:[true,false,true,true,false,null,null]});
  const weekDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];const today=4;
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <StatusBar/>
      <div style={{padding:"10px 20px 14px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}><div style={{fontSize:20,fontWeight:800,color:C.teal}}>My Goals</div><div style={{fontSize:12,color:C.gray,marginTop:2}}>This week · Set with Amy (RD)</div></div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>
        <div style={{background:`linear-gradient(135deg,${C.teal},${C.tealDark})`,borderRadius:18,padding:16,marginBottom:20,color:C.white}}>
          <div style={{fontSize:13,fontWeight:600,opacity:.8,marginBottom:6}}>Week Overview</div>
          <div style={{display:"flex",gap:6}}>
            {weekDays.map((d,i)=>{const n1=checks.n1[i],a1=checks.a1[i];const both=n1===true&&a1===true,one=(n1===true||a1===true)&&!both,miss=n1===false||a1===false,future=n1===null&&a1===null;const isToday=i===today;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:"100%",height:32,borderRadius:8,background:future?"rgba(255,255,255,.1)":both?C.green:one?C.yellow:miss?"rgba(255,100,80,.4)":"rgba(255,255,255,.1)",border:isToday?`2px solid ${C.coral}`:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{both?"✓✓":one?"✓":miss?"•":""}</div><span style={{fontSize:9,color:isToday?C.coral:"rgba(255,255,255,.6)",fontWeight:isToday?700:400}}>{d[0]}</span></div>);})}
          </div>
          <div style={{marginTop:10,display:"flex",gap:10}}><div style={{fontSize:11,opacity:.8}}>🔥 {DEMO.streak}-day streak</div><div style={{fontSize:11,opacity:.8}}>⚡ {DEMO.xp} XP</div></div>
        </div>
        {DEMO.goals.map(g=>(
          <div key={g.id} style={{background:C.white,borderRadius:18,padding:16,marginBottom:16,boxShadow:"0 2px 12px rgba(0,95,115,.07)",border:`1.5px solid ${C.tealLight}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:38,height:38,borderRadius:12,background:C.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{g.emoji}</div><div><div style={{fontSize:13,fontWeight:700,color:C.slate}}>{g.text}</div><div style={{fontSize:11,color:C.gray}}>{g.freq}</div></div></div><div style={{fontSize:11,fontWeight:700,color:C.teal,background:C.tealLight,borderRadius:8,padding:"4px 8px"}}>🔥 {g.streak}</div></div>
            <div style={{display:"flex",gap:6}}>
              {weekDays.map((d,i)=>{const state=checks[g.id][i],future=state===null,isToday=i===today;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div onClick={()=>{if(future)return;setChecks(p=>{const c={...p,[g.id]:[...p[g.id]]};c[g.id][i]=c[g.id][i]===true?false:true;return c;})}} style={{width:30,height:30,borderRadius:"50%",cursor:future?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,background:future?C.grayLight:state===true?C.green:C.coralLight,border:isToday?`2px solid ${C.coral}`:future?`1.5px dashed ${C.gray}`:state===true?`2px solid ${C.greenDark}`:`2px solid #F4A49A`,color:state===true?C.white:state===false?C.rose:C.gray}}>{state===true?"✓":state===false?"✕":""}</div><span style={{fontSize:9,color:isToday?C.coral:C.gray,fontWeight:isToday?700:400}}>{d[0]}</span></div>);})}
            </div>
            <div style={{marginTop:12,padding:"8px 10px",background:C.greenLight,borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,color:C.greenDark}}>{checks[g.id].filter(x=>x===true).length} completions</span><span style={{fontSize:11,fontWeight:700,color:C.greenDark}}>⚡ +{checks[g.id].filter(x=>x===true).length*15} XP</span></div>
          </div>
        ))}
        <div style={{background:C.tealLight,borderRadius:16,padding:14,border:`1.5px solid ${C.green}`}}><div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}><div style={{width:32,height:32,borderRadius:"50%",background:C.green,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:700,fontSize:12,flexShrink:0}}>AL</div><div><div style={{fontSize:12,fontWeight:700,color:C.teal}}>Amy (RD)</div></div></div><div style={{fontSize:12,color:C.slate,fontStyle:"italic",lineHeight:1.5}}>"You're doing amazing with your water goal! 💙"</div></div>
        <div style={{height:8}}/>
      </div>
      <BottomNav active="goals"/>
    </div>
  );
}

// ─── TEAM SCREEN ──────────────────────────────────────────────────────────────
function TeamScreen() {
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <StatusBar/>
      <div style={{padding:"10px 20px 14px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}><div style={{fontSize:20,fontWeight:800,color:C.teal}}>Care Team</div><div style={{fontSize:12,color:C.gray,marginTop:2}}>Your BloomPath clinical team</div></div>
      <div style={{flex:1,overflowY:"auto",padding:"0 20px 20px",scrollbarWidth:"none"}}>
        <div style={{height:12}}/>
        <SectionHeader label="Your Team"/>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
          {DEMO.careTeam.map((m,i)=>(<div key={i} style={{background:C.white,borderRadius:18,padding:16,display:"flex",gap:14,alignItems:"center",boxShadow:"0 2px 12px rgba(0,95,115,.07)",border:`1.5px solid ${C.grayLight}`}}><div style={{width:52,height:52,borderRadius:"50%",background:m.color,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:700,fontSize:16,flexShrink:0,boxShadow:`0 4px 12px ${m.color}55`}}>{m.initials}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:C.slate}}>{m.name}</div><div style={{fontSize:12,color:C.gray}}>{m.role}</div></div><button style={{padding:"6px 14px",borderRadius:10,background:C.tealLight,color:C.teal,fontWeight:700,fontSize:11,border:"none",cursor:"pointer"}}>Message</button></div>))}
        </div>
        <SectionHeader label="Upcoming Appointments"/>
        {[{with:"Mark Singh",role:"Behavioral Coach",date:"Today, 4:00 PM",session:"Session 4",today:true},{with:"Amy Lin",role:"Registered Dietitian",date:"Next Wed, 3:30 PM",session:"Session 6",today:false}].map((a,i)=>(
          <div key={i} style={{background:C.white,borderRadius:16,padding:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)",marginBottom:10,border:a.today?`1.5px solid ${C.coral}`:`1.5px solid ${C.grayLight}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div><div style={{fontSize:13,fontWeight:700,color:C.slate}}>{a.with}</div><div style={{fontSize:11,color:C.gray}}>{a.role}</div></div><div style={{fontSize:11,fontWeight:600,color:a.today?C.coralDark:C.gray,background:a.today?C.coralLight:C.grayLight,padding:"4px 10px",borderRadius:8,height:"fit-content"}}>{a.today?"TODAY":"Upcoming"}</div></div>
            <div style={{fontSize:11,color:C.gray,marginBottom:a.today?10:0}}>📅 {a.date} · {a.session}</div>
            {a.today&&<button style={{width:"100%",padding:"10px",borderRadius:12,background:`linear-gradient(135deg,${C.coral},${C.coralDark})`,color:C.white,fontWeight:700,fontSize:13,border:"none",cursor:"pointer"}}>Join Telehealth Session</button>}
          </div>
        ))}
        <SectionHeader label="Messages" action="See all"/>
        {DEMO.messages.map((m,i)=>(<div key={i} style={{background:C.white,borderRadius:16,padding:"12px 14px",display:"flex",gap:12,alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,.05)",marginBottom:10,border:m.unread?`1.5px solid ${C.coralLight}`:`1.5px solid ${C.grayLight}`}}><div style={{width:40,height:40,borderRadius:"50%",background:i===0?C.green:C.purple,display:"flex",alignItems:"center",justifyContent:"center",color:C.white,fontWeight:700,fontSize:13,flexShrink:0}}>{m.from.split(" ").map(w=>w[0]).join("")}</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:13,fontWeight:700,color:C.slate}}>{m.from}</span><span style={{fontSize:10,color:C.gray}}>{m.time}</span></div><div style={{fontSize:11,color:C.gray,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.preview}</div></div>{m.unread&&<div style={{width:10,height:10,borderRadius:"50%",background:C.coral,flexShrink:0}}/>}</div>))}
        <div style={{height:8}}/>
      </div>
      <BottomNav active="team"/>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
const SCREENS=[
  {id:"home",    label:"🏠 Home",     C:HomeScreen},
  {id:"journey", label:"🗺️ Journey", C:JourneyScreen},
  {id:"goals",   label:"🎯 Goals",    C:GoalsScreen},
  {id:"diet",    label:"🚦 Diet",     C:DietScreen},
  {id:"team",    label:"👩‍⚕️ Team",  C:TeamScreen},
];

export default function App() {
  const [active,setActive] = useState("diet");
  const Screen = SCREENS.find(s=>s.id===active)?.C ?? DietScreen;
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",
      alignItems:"center",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
      padding:"32px 20px 40px"}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:24}}>
        {SCREENS.map(s=>(
          <button key={s.id} onClick={()=>setActive(s.id)}
            style={{padding:"8px 16px",borderRadius:99,border:"none",cursor:"pointer",
              fontSize:13,fontWeight:600,
              background:active===s.id?C.coral:"rgba(255,255,255,.12)",
              color:active===s.id?C.white:"rgba(255,255,255,.65)",
              boxShadow:active===s.id?`0 4px 12px rgba(255,140,118,.4)`:"none"}}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{width:390,height:780,borderRadius:52,overflow:"hidden",
        boxShadow:"0 32px 80px rgba(0,0,0,.6),0 0 0 12px #1a2030,0 0 0 13px #0a0e18",
        background:C.cream,display:"flex",flexDirection:"column"}}>
        <Screen/>
      </div>
      <div style={{marginTop:20,fontSize:12,color:"rgba(255,255,255,.35)",letterSpacing:".05em"}}>
        BloomPath Health · Patient App · Dashboard Mockup
      </div>
    </div>
  );
}
