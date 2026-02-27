import { C } from '../../constants/colors';

export default function FormField({ label, icon, value, placeholder, type, onChange }) {
  return (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:'block', fontSize:14, fontWeight:700, color:C.slate, marginBottom:7 }}>
        {icon} {label}
      </label>
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ width:'100%', padding:'13px 16px',
          border:`1.5px solid ${value ? C.teal : '#E0E0E6'}`,
          borderRadius:13, fontSize:15, color:C.slate, background:C.white,
          outline:'none', boxSizing:'border-box', fontFamily:'inherit',
          transition:'border-color 0.2s' }}
      />
    </div>
  );
}
