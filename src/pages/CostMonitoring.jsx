import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = {
  bg: '#0d0f14', panel: '#151720', panel2: '#1a1c26',
  border: 'rgba(255,255,255,0.06)', amber: '#ffb300',
  white: '#fff', muted: 'rgba(255,255,255,0.45)', text: 'rgba(255,255,255,0.75)',
};

const sparePartsData = [
  { name: 'Hydraulic Pump Assy', pn: 'PN: 708-2L-00440', equipment: 'EX-200 Komatsu Excavator', date: '12 Oct 2026', cost: 'Rp 45.200.000' },
  { name: 'Main Control Valve', pn: 'PN: 723-40-70100', equipment: 'D155A Dozer', date: '14 Oct 2026', cost: 'Rp 112.500.000' },
  { name: 'Turbocharger S6D125', pn: 'PN: 6152-82-8210', equipment: 'HD785-7 Dump Truck', date: '15 Oct 2026', cost: 'Rp 28.750.000' },
];

const costHistoryData = [
  { equip: 'PC2000-8 Excavator', serial: 'SERIAL: 20054', date: '02 Oct 2026', spare: 'Engine Rebuild Kit', labor: 'Rp 12.000.000', total: 'Rp 340.500.000' },
  { equip: 'GD825A-2 Grader', serial: 'SERIAL: 10423', date: '05 Oct 2026', spare: 'Cutting Edge Bolts (Set)', labor: 'Rp 1.500.000', total: 'Rp 8.250.000' },
  { equip: 'D375A-6 Dozer', serial: 'SERIAL: 60211', date: '08 Oct 2026', spare: 'Radiator Core Replacement', labor: 'Rp 8.400.000', total: 'Rp 62.100.000' },
];

const th = { padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase', borderBottom: `1px solid ${c.border}`, background: c.panel2 };
const td = { padding: '0.95rem 1rem', fontSize: '0.84rem', color: c.text, borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle' };

export default function CostMonitoring() {
  const [spareParts, setSpareParts] = useState(sparePartsData.map(s => ({ ...s, status: 'pending' })));

  const handleAction = (idx, action) => {
    setSpareParts(prev => prev.map((s, i) => i === idx ? { ...s, status: action } : s));
  };

  const pendingCount = spareParts.filter(s => s.status === 'pending').length;

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: font, color: c.white }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1.4rem 2rem 2.5rem', overflowY: 'auto', boxSizing: 'border-box' }}>
          <Topbar title="Cost Monitoring" />

          {/* ── Stat Cards ── */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.6rem' }}>
            {/* Total Maintenance Cost */}
            <article style={{ background: c.panel, border: '1px solid rgba(255,179,0,0.18)', borderRadius: '14px', padding: '1.3rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: '#ff9800', textTransform: 'uppercase' }}>TOTAL MAINTENANCE COST</span>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Rp</span>
                <strong style={{ fontSize: '1.8rem', fontWeight: 800, color: c.white, marginLeft: '0.2rem', lineHeight: 1.1 }}>4.285.000.000</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                <span style={{ fontSize: '0.75rem', color: '#4caf50', fontWeight: 600 }}>+12% vs last quarter</span>
              </div>
            </article>

            {/* Monthly Cost */}
            <article style={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '1.3rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase' }}>MONTHLY COST (OCT 2026)</span>
              <strong style={{ fontSize: '1.7rem', fontWeight: 800, color: c.white, lineHeight: 1.1 }}>Rp 842.150.000</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Projected: Rp 900.000.000</span>
              </div>
            </article>

            {/* Sparepart Expenses */}
            <article style={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '1.3rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase' }}>SPAREPART EXPENSES</span>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Rp</span>
                <strong style={{ fontSize: '1.8rem', fontWeight: 800, color: c.white, marginLeft: '0.2rem', lineHeight: 1.1 }}>1.520.400.000</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                <span style={{ fontSize: '0.75rem', color: '#ef5350', fontWeight: 600 }}>Over budget by 4.2%</span>
              </div>
            </article>
          </section>

          {/* ── Approve Spare Parts ── */}
          <section style={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '1.5rem 1.6rem', marginBottom: '1.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.3rem' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e8e8e8', margin: 0 }}>Approve Spare Parts</h2>
              {pendingCount > 0 && (
                <span style={{ display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', background: 'rgba(255,179,0,0.15)', color: c.amber, border: '1px solid rgba(255,179,0,0.3)', textTransform: 'uppercase' }}>
                  {pendingCount} PENDING ACTIONS
                </span>
              )}
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: `1px solid ${c.border}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['PART NAME', 'EQUIPMENT', 'REQUESTED DATE', 'EST. COST (RP)', 'ACTIONS'].map(col => (
                      <th key={col} style={th}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spareParts.map((part, idx) => (
                    <tr key={idx}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={td}>
                        <strong style={{ display: 'block', color: '#e4e4e8', fontWeight: 700, fontSize: '0.86rem' }}>{part.name}</strong>
                        <small style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>{part.pn}</small>
                      </td>
                      <td style={td}>{part.equipment}</td>
                      <td style={td}>{part.date}</td>
                      <td style={{ ...td, color: '#ff9800', fontWeight: 700 }}>{part.cost}</td>
                      <td style={td}>
                        {part.status === 'pending' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <button onClick={() => handleAction(idx, 'approved')}
                              style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', border: '1px solid #4caf50', background: 'rgba(76,175,80,0.15)', color: '#66bb6a', fontFamily: font, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s ease' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(76,175,80,0.3)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(76,175,80,0.15)'}
                            >APPROVE</button>
                            <button onClick={() => handleAction(idx, 'rejected')}
                              style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', border: '1px solid #ef5350', background: 'rgba(244,67,54,0.15)', color: '#ef5350', fontFamily: font, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s ease' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,67,54,0.3)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,67,54,0.15)'}
                            >REJECT</button>
                          </div>
                        ) : (
                          <span style={{
                            display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px',
                            fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                            background: part.status === 'approved' ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)',
                            color: part.status === 'approved' ? '#66bb6a' : '#ef5350',
                            border: `1px solid ${part.status === 'approved' ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`,
                          }}>{part.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Maintenance Cost History ── */}
          <section style={{ background: c.panel, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '1.5rem 1.6rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e8e8e8', margin: '0 0 1.3rem' }}>Maintenance Cost History</h2>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: `1px solid ${c.border}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['EQUIPMENT NAME', 'REPAIR DATE', 'SPARE PART', 'LABOR COST (RP)', 'TOTAL COST (RP)'].map(col => (
                      <th key={col} style={th}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costHistoryData.map((row, idx) => (
                    <tr key={idx}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={td}>
                        <strong style={{ display: 'block', color: '#e4e4e8', fontWeight: 700, fontSize: '0.86rem' }}>{row.equip}</strong>
                        <small style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>{row.serial}</small>
                      </td>
                      <td style={td}>{row.date}</td>
                      <td style={td}>{row.spare}</td>
                      <td style={td}>{row.labor}</td>
                      <td style={{ ...td, color: c.white, fontWeight: 700 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
