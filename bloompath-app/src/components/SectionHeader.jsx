import { C } from '../constants/colors';

export default function SectionHeader({ label, action }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
      <span style={{fontSize:14,fontWeight:700,color:C.slate}}>{label}</span>
      {action && <span style={{fontSize:12,fontWeight:600,color:C.teal,cursor:'pointer'}}>{action} →</span>}
    </div>
  );
}
