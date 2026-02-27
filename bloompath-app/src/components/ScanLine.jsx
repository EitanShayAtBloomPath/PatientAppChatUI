import { useState, useEffect } from 'react';

export default function ScanLine({ color }) {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPos(p => (p + 3) % 100), 20);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{
        position:'absolute',left:0,right:0,top:`${pos}%`,height:2,
        background:color,boxShadow:`0 0 8px ${color},0 0 16px ${color}55`
      }}/>
    </div>
  );
}
