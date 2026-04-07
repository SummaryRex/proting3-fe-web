import { useState } from 'react';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = { border: 'rgba(255,255,255,0.06)', amber: '#ffb300' };
const inputStyle = { width: '100%', boxSizing: 'border-box', padding: '0.7rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#eef2ff', fontFamily: font, fontSize: '0.86rem', outline: 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' };
const labelStyle = { fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em' };
const selectStyle = { appearance: 'none', WebkitAppearance: 'none', width: '100%', boxSizing: 'border-box', padding: '0.7rem 2.4rem 0.7rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#eef2ff', fontFamily: font, fontSize: '0.86rem', outline: 'none', cursor: 'pointer', transition: 'border-color 0.25s ease' };
const selectArrow = { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' };
const focusIn = e => { e.currentTarget.style.borderColor = c.amber; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,179,0,0.12)'; };
const focusOut = e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; };

export default function ScheduleModal({ equipName, onClose, onConfirm }) {
  const [mechanic, setMechanic] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('critical');
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    if (!mechanic.trim() || !date) return;
    onConfirm({ mechanic, date, priority, notes });
  };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <div style={{ background: '#151720', border: '1px solid rgba(255,179,0,0.25)', borderRadius: '16px', width: '90%', maxWidth: '540px', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.3rem 1.6rem', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffb300" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>Schedule Maintenance</h2>
          </div>
          <button onClick={onClose} style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, lineHeight: 1 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >&times;</button>
        </div>
        {/* Body */}
        <div style={{ padding: '1.5rem 1.8rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label style={labelStyle}>Equipment</label>
            <input type="text" readOnly value={equipName} style={{ ...inputStyle, opacity: 0.65, cursor: 'default' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label style={labelStyle}>Mechanic Name</label>
              <input type="text" placeholder="Enter mechanic name" value={mechanic} onChange={e => setMechanic(e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <label style={labelStyle}>Scheduled Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label style={labelStyle}>Priority</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={selectStyle} onFocus={focusIn} onBlur={focusOut}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
              </select>
              <svg style={selectArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <label style={labelStyle}>Notes</label>
            <textarea placeholder="Add maintenance notes..." rows={3} value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} onFocus={focusIn} onBlur={focusOut} />
          </div>
        </div>
        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', padding: '1.2rem 1.6rem', borderTop: `1px solid ${c.border}` }}>
          <button onClick={onClose} style={{ padding: '0.65rem 1.6rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#d4d4d4', fontFamily: font, fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          >Cancel</button>
          <button onClick={handleConfirm} style={{ padding: '0.65rem 1.6rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#ffbe0b,#f5a623)', color: '#111', fontFamily: font, fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,179,0,0.25)', transition: 'transform 0.2s ease, box-shadow 0.25s ease, background 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,179,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,179,0,0.25)'; }}
          >Confirm Schedule</button>
        </div>
      </div>
    </div>
  );
}
