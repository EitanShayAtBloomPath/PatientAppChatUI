import { C } from '../constants/colors';

export default function WeekRings({ days }) {
  const labels = ['M','T','W','T','F','S','S'];
  return (
    <div style={{display:'flex',gap:5}}>
      {days.map((done,i) => (
        <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
          <div style={{
            width:24,height:24,borderRadius:'50%',
            background: done===true ? C.green : done===null ? C.grayLight : '#FFE6E0',
            border: done===true
              ? `2px solid ${C.greenDark}`
              : done===null
                ? `2px dashed ${C.gray}`
                : `2px solid #F4A49A`,
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:11
          }}>
            {done===true ? '✓' : done===null ? '' : '–'}
          </div>
          <span style={{fontSize:9,color:C.gray}}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
