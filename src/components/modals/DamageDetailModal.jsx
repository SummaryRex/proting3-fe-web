const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = { border: 'rgba(255,255,255,0.06)', amber: '#ffb300', white: '#fff', muted: 'rgba(255,255,255,0.45)' };

const statusBadge = () => ({
  display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px',
  fontSize: '0.72rem', fontWeight: 600, background: 'rgba(255,179,0,0.15)',
  color: '#ffb300', border: '1px solid rgba(255,179,0,0.3)',
});

export default function DamageDetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <div style={{ background: '#151720', border: '1px solid rgba(255,179,0,0.25)', borderRadius: '16px', width: '100%', maxWidth: '820px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.3rem 1.6rem', borderBottom: `1px solid ${c.border}` }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: c.white, margin: 0 }}>{data.id}</h2>
          <button onClick={onClose}
            style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font, lineHeight: 1 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >&times;</button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', overflowY: 'auto', flex: 1 }}>
          {/* Left column */}
          <div style={{ padding: '1.4rem 1.6rem', borderRight: `1px solid ${c.border}` }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff9800', textTransform: 'uppercase', margin: '0 0 0.8rem 0' }}>DAMAGE DESCRIPTION</h4>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.border}`, borderRadius: '10px', padding: '1rem 1.1rem', fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)' }}>
                {data.description}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff9800', textTransform: 'uppercase', margin: '0 0 0.8rem 0' }}>REQUESTED SPARE PARTS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.spareParts.map(p => (
                  <div key={p.part} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.border}`, borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#e0e0e0' }}>{p.name}</strong>
                      <small style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.15rem', display: 'block' }}>{p.part}</small>
                    </div>
                    <span style={statusBadge()}>Pending</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ padding: '1.4rem 1.6rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff9800', textTransform: 'uppercase', margin: '0 0 0.8rem 0' }}>EQUIPMENT INFO</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'EQUIPMENT NAME', value: data.equipName },
                  { label: 'ASSET ID', value: data.assetId },
                  { label: 'TYPE', value: data.equipType },
                  { label: 'HOUR METER', value: data.hourMeter },
                ].map(f => (
                  <div key={f.label}>
                    <small style={{ display: 'block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{f.label}</small>
                    <strong style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e0e0e0' }}>{f.value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff9800', textTransform: 'uppercase', margin: '0 0 0.8rem 0' }}>OPERATOR INFO</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2a2c36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', flexShrink: 0 }}>{data.operatorInitials}</div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#e0e0e0' }}>{data.operator}</strong>
                  <small style={{ fontSize: '0.72rem', color: c.muted }}>Operator</small>
                </div>
                <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255,179,0,0.3)', background: 'rgba(255,179,0,0.08)', color: c.amber, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,179,0,0.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,179,0,0.08)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffb300" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff9800', textTransform: 'uppercase', margin: '0 0 0.8rem 0' }}>REPORT DETAILS</h4>
              <div>
                {[
                  { label: 'Submission Date', value: data.submitDate, style: {} },
                  { label: 'Severity Level', value: data.severity, style: { color: data.severity.includes('Critical') ? '#ef5350' : c.amber } },
                  { label: 'Report Status', value: data.status, style: { color: c.amber } },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ fontSize: '0.82rem', color: c.muted }}>{row.label}</span>
                    <strong style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e0e0e0', ...row.style }}>{row.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '1rem', padding: '1.2rem 1.6rem', borderTop: `1px solid ${c.border}` }}>
          <button style={{ flex: 1, padding: '0.85rem 1.5rem', borderRadius: '10px', fontFamily: font, fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', background: 'rgba(244,67,54,0.18)', border: '1px solid #ef5350', color: '#ef5350', transition: 'background 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,67,54,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,67,54,0.18)'}
          >REJECT REPORT</button>
          <button style={{ flex: 1, padding: '0.85rem 1.5rem', borderRadius: '10px', fontFamily: font, fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', background: 'linear-gradient(135deg,#ff9800,#f57c00)', border: 'none', color: '#fff', boxShadow: '0 6px 20px rgba(255,152,0,0.3)', transition: 'box-shadow 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 28px rgba(255,152,0,0.45)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.3)'}
          >APPROVE REPORT</button>
        </div>
      </div>
    </div>
  );
}
