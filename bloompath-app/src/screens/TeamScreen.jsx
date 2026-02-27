import { C } from '../constants/colors';
import { DEMO } from '../constants/demo';
import SectionHeader from '../components/SectionHeader';

export default function TeamScreen() {
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:C.cream}}>
      <div style={{padding:"10px 20px 14px",background:C.white,borderBottom:`1.5px solid ${C.grayLight}`,flexShrink:0}}>
        <div style={{fontSize:20,fontWeight:800,color:C.teal}}>Care Team</div>
        <div style={{fontSize:12,color:C.gray,marginTop:2}}>Your BloomPath clinical team</div>
      </div>
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
    </div>
  );
}
