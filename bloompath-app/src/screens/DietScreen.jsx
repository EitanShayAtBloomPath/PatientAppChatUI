import { useState } from 'react';
import { C } from '../constants/colors';
import { FOOD_DB, BARCODE_FOODS, GALLERY_FOODS, COLOR_META } from '../constants/demo';
import SectionHeader from '../components/SectionHeader';
import ScanLine from '../components/ScanLine';
import ConfirmCard from '../components/ConfirmCard';

export default function DietScreen() {
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
    </div>
  );
}
