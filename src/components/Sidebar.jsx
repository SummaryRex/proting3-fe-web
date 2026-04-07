import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import iconImg from '../assets/Icon.png';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

const navItems = [
  { label: 'Dashboard', route: '/dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg> },
  { label: 'Damage Reports', route: '/damage-reports', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  { label: 'Maintenance Scheduling', route: '/maintenance-scheduling', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
  { label: 'Cost Monitoring', route: null, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> },
  { label: 'User Management', route: '/user-management', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
];

const navBtn = (active) => ({
  display: 'flex', alignItems: 'center', gap: '0.65rem',
  padding: '0.65rem 0.85rem', borderRadius: '10px', border: 'none',
  width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: font,
  fontSize: '0.82rem', fontWeight: active ? 700 : 500,
  color: active ? '#111' : '#ff9800',
  background: active ? '#ff9800' : 'transparent',
  transition: 'background 0.2s ease',
});

/* ── Logout Confirmation Modal ── */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onCancel()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <div style={{ background: '#151720', border: '1px solid rgba(255,179,0,0.25)', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 32px 80px rgba(0,0,0,0.6)', overflow: 'hidden' }}>
        {/* Icon + Message */}
        <div style={{ padding: '2rem 2rem 1.2rem', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(244,67,54,0.15)', border: '1px solid rgba(244,67,54,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem' }}>Konfirmasi Logout</h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
            Apakah Anda yakin ingin logout?
          </p>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', padding: '1.2rem 2rem 1.6rem', justifyContent: 'center' }}>
          <button onClick={onCancel}
            style={{ flex: 1, padding: '0.72rem 1.4rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#d4d4d4', fontFamily: font, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          >Batal</button>
          <button onClick={onConfirm}
            style={{ flex: 1, padding: '0.72rem 1.4rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#ef5350,#d32f2f)', color: '#fff', fontFamily: font, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(244,67,54,0.35)', transition: 'transform 0.2s ease, box-shadow 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(244,67,54,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(244,67,54,0.35)'; }}
          >Ya, Logout</button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    navigate('/');
  };

  return (
    <>
      <aside style={{
        width: '220px', minWidth: '220px', background: '#111318',
        borderRight: '1px solid rgba(255,255,255,0.06)', padding: '1.4rem 1rem',
        display: 'flex', flexDirection: 'column', gap: '0.6rem',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', boxSizing: 'border-box',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <img src={iconImg} alt="DJATI logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ff9800', letterSpacing: '0.02em' }}>DJATI Mining</span>
        </div>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.4rem' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#ff9800,#e65100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#fff', flexShrink: 0 }}>W</div>
          <div>
            <strong style={{ display: 'block', fontSize: '0.82rem', color: '#e0e0e0', fontWeight: 600 }}>Windah Basudara</strong>
            <small style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Admin</small>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.4rem', flex: 1 }}>
          {navItems.map((item) => {
            const active = item.route === location.pathname;
            return (
              <button
                key={item.label}
                onClick={() => item.route && navigate(item.route)}
                style={navBtn(active)}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,152,0,0.08)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ opacity: active ? 1 : 0.8, flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.6rem', marginTop: '0.4rem' }}>
          <button
            onClick={() => setShowLogout(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.65rem',
              padding: '0.65rem 0.85rem', borderRadius: '10px', border: 'none',
              width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: font,
              fontSize: '0.82rem', fontWeight: 600, color: '#ef5350',
              background: 'transparent', transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,67,54,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </span>
            Logout
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Popup */}
      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
    </>
  );
}
