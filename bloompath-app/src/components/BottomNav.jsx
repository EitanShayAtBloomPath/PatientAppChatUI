import { NavLink } from 'react-router-dom';
import { C } from '../constants/colors';

const TABS = [
  { id: 'home',    icon: '🏠',   label: 'Home'    },
  { id: 'journey', icon: '🗺️',  label: 'Journey' },
  { id: 'goals',   icon: '🎯',   label: 'Goals'   },
  { id: 'diet',    icon: '🚦',   label: 'Diet'    },
  { id: 'team',    icon: '👩‍⚕️', label: 'Team'   },
];

export default function BottomNav() {
  return (
    <div className="bp-safe-bottom" style={{display:'flex',borderTop:`1.5px solid ${C.grayLight}`,
      background:C.white,paddingTop:8,flexShrink:0}}>
      {TABS.map(t => (
        <NavLink
          key={t.id}
          to={`/${t.id}`}
          style={{flex:1,display:'flex',flexDirection:'column',
            alignItems:'center',gap:2,cursor:'pointer',textDecoration:'none'}}
        >
          {({ isActive }) => (
            <>
              <span style={{fontSize:20}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:isActive ? 700 : 400,
                color:isActive ? C.teal : C.gray}}>{t.label}</span>
              {isActive && (
                <div style={{width:20,height:3,borderRadius:2,
                  background:C.coral,marginTop:1}}/>
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
