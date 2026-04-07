import { useState } from 'react';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = { border: 'rgba(255,255,255,0.06)', amber: '#ffb300', panel: '#151720', panel2: '#1a1c26' };
const focusIn = e => { e.currentTarget.style.borderColor = c.amber; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,179,0,0.12)'; };
const focusOut = e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; };

export default function AddUserModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Mechanic');
  const [accessKey, setAccessKey] = useState(() => generateKey('Mechanic', ''));
  const [copied, setCopied] = useState(false);

  function generateKey(r, n) {
    const clean = (n || 'User').replace(/\s+/g, '');
    const rand = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    return r + rand + clean;
  }

  const copyKey = () => {
    navigator.clipboard.writeText(accessKey).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200); });
  };

  const handleCreate = () => {
    if (!name.trim() || !username.trim()) return;
    onCreate({ name: name.trim(), role, status: 'Active' });
  };

  const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '0.72rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#eef2ff', fontFamily: font, fontSize: '0.88rem', outline: 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' };
  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.02em' };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <div style={{ background: c.panel, border: '1px solid rgba(255,179,0,0.25)', borderRadius: '16px', width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.3rem 1.6rem', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9800" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>Add New User</h2>
          </div>
          <button onClick={onClose}
            style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, lineHeight: 1 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >&times;</button>
        </div>
        {/* Body */}
        <div style={{ padding: '1.6rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={labelStyle}>Name</label>
            <input type="text" placeholder="Ex : Yi Sang" value={name}
              onChange={e => { setName(e.target.value); setAccessKey(generateKey(role, e.target.value)); }}
              style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={labelStyle}>Username</label>
            <input type="text" placeholder="Yisang01" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={labelStyle}>Access Key</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="text" readOnly value={accessKey} style={{ ...inputStyle, flex: 1 }} />
              <button onClick={copyKey} title="Copy"
                style={{ width: '38px', height: '38px', borderRadius: '8px', border: copied ? '1px solid rgba(76,175,80,0.4)' : '1px solid rgba(255,255,255,0.12)', background: copied ? 'rgba(76,175,80,0.15)' : 'rgba(255,255,255,0.04)', color: copied ? '#66bb6a' : 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease', padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              </button>
              <button onClick={() => setAccessKey(generateKey(role, name))} title="Generate"
                style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid rgba(255,152,0,0.3)', background: 'rgba(255,255,255,0.04)', color: '#ff9800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease', padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={labelStyle}>Role</label>
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <select value={role} onChange={e => { setRole(e.target.value); setAccessKey(generateKey(e.target.value, name)); }}
                style={{ width: '100%', appearance: 'none', WebkitAppearance: 'none', background: c.panel2, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.6rem 2.4rem 0.6rem 1rem', color: '#d4d4d4', fontFamily: font, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', outline: 'none', boxSizing: 'border-box' }}
              >
                <option value="Mechanic">Mechanic</option><option value="Admin">Admin</option><option value="Operator">Operator</option>
              </select>
              <svg style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', padding: '1.2rem 1.6rem', borderTop: `1px solid ${c.border}` }}>
          <button onClick={onClose}
            style={{ padding: '0.7rem 1.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#d4d4d4', fontFamily: font, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >Cancel</button>
          <button onClick={handleCreate}
            style={{ padding: '0.7rem 1.8rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#ffbe0b,#f5a623)', color: '#111', fontFamily: font, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,179,0,0.25)', transition: 'transform 0.2s ease, box-shadow 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,179,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,179,0,0.25)'; }}
          >Create User</button>
        </div>
      </div>
    </div>
  );
}
