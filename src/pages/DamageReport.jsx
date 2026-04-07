import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DamageDetailModal from '../components/modals/DamageDetailModal';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = {
  bg: '#0d0f14', panel: '#151720', panel2: '#1a1c26',
  border: 'rgba(255,255,255,0.06)', amber: '#ffb300',
  white: '#ffffff', muted: 'rgba(255,255,255,0.45)', text: 'rgba(255,255,255,0.75)',
};

const reportData = {
  'REP-8821': { id: 'REP-8821', equipName: 'Excavator EX-45', assetId: 'ASSET-MINE-045', equipType: 'Heavy Duty Excavator', hourMeter: '12,450.5 hrs', operator: 'Lee Heeseung', operatorInitials: 'LH', date: 'Oct 24, 2023', submitDate: 'Oct 24, 2023 · 08:45 AM', severity: 'High - Critical', status: 'Awaiting Admin Review', description: 'Hydraulic leak detected in the main arm joint during standard morning inspection. Fluid pressure dropping significantly under load. Visible pooling on the track assembly. Immediate attention required to prevent further system contamination.', spareParts: [{ name: 'Hydraulic Seal Kit', part: 'PART #HS-452' }, { name: 'O-Ring Set', part: 'PART #OR-99' }, { name: 'Arm Cylinder Piston', part: 'REQUEST ID: ACP-001' }] },
  'REP-8815': { id: 'REP-8815', equipName: 'Dump Truck DT-08', assetId: 'ASSET-MINE-082', equipType: 'Heavy Haul Truck', hourMeter: '8,320.0 hrs', operator: 'Mackenyu Arata', operatorInitials: 'MA', date: 'Oct 22, 2023', submitDate: 'Oct 22, 2023 · 14:20 PM', severity: 'Medium', status: 'Awaiting Admin Review', description: 'Unusual engine noise detected during haul operation. Possible bearing failure in the transmission assembly. Temperature gauge reading above normal range. Recommended immediate diagnostic check.', spareParts: [{ name: 'Transmission Bearing', part: 'PART #TB-221' }, { name: 'Coolant Sensor', part: 'PART #CS-44' }] },
  'REP-8812': { id: 'REP-8812', equipName: 'Bulldozer BD-12', assetId: 'ASSET-MINE-012', equipType: 'Medium Bulldozer', hourMeter: '15,880.3 hrs', operator: 'Jang Wonyoung', operatorInitials: 'JW', date: 'Oct 20, 2023', submitDate: 'Oct 20, 2023 · 09:10 AM', severity: 'High - Critical', status: 'Awaiting Admin Review', description: 'Track tension system malfunction causing uneven movement. Left track showing signs of excessive wear. Blade hydraulic cylinder leaking fluid. Unit should be removed from service until repairs completed.', spareParts: [{ name: 'Track Link Assembly', part: 'PART #TL-308' }, { name: 'Hydraulic Cylinder Seal', part: 'PART #HC-67' }, { name: 'Blade Edge Kit', part: 'REQUEST ID: BEK-055' }] },
  'REP-8825': { id: 'REP-8825', equipName: 'Loader LD-05', assetId: 'ASSET-MINE-005', equipType: 'Wheel Loader', hourMeter: '6,210.8 hrs', operator: 'Kim Jisoo', operatorInitials: 'KJ', date: 'Oct 25, 2023', submitDate: 'Oct 25, 2023 · 07:30 AM', severity: 'Medium', status: 'Awaiting Admin Review', description: 'Bucket teeth showing significant wear and two teeth missing from the left side. Reduced loading efficiency observed. Minor hydraulic hose leak near the boom pivot point.', spareParts: [{ name: 'Bucket Teeth Set', part: 'PART #BT-112' }, { name: 'Hydraulic Hose 3/4"', part: 'PART #HH-19' }] },
};

const tableRows = [
  { id: 'REP-8821', equip: 'Excavator EX-45', operator: 'Lee Heeseung', date: 'Oct 24, 2023', status: 'Pending' },
  { id: 'REP-8815', equip: 'Dump Truck DT-08', operator: 'Mackenyu Arata', date: 'Oct 22, 2023', status: 'Pending' },
  { id: 'REP-8812', equip: 'Bulldozer BD-12', operator: 'Jang Wonyoung', date: 'Oct 20, 2023', status: 'Pending' },
  { id: 'REP-8825', equip: 'Loader LD-05', operator: 'Kim Jisoo', date: 'Oct 25, 2023', status: 'Pending' },
];

const statusBadge = (label) => {
  const map = {
    Pending: { bg: 'rgba(255,179,0,0.15)', color: '#ffb300', border: 'rgba(255,179,0,0.3)' },
    Approved: { bg: 'rgba(76,175,80,0.15)', color: '#66bb6a', border: 'rgba(76,175,80,0.3)' },
    Rejected: { bg: 'rgba(244,67,54,0.15)', color: '#ef5350', border: 'rgba(244,67,54,0.3)' },
  };
  const t = map[label] || map.Pending;
  return { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, background: t.bg, color: t.color, border: `1px solid ${t.border}` };
};

export default function DamageReport() {
  const [activeFilter, setActiveFilter] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalData, setModalData] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const openDetail = (id) => setModalData(reportData[id]);
  const closeDetail = () => setModalData(null);

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: font, color: c.white }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1.4rem 2rem 2.5rem', overflowY: 'auto', boxSizing: 'border-box' }}>
          <Topbar title="Damage Reports" />

          {/* Filter Panel */}
          <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.4rem', background: c.panel, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '1rem 1.3rem' }}>
            <div style={{ position: 'relative', flex: '0 1 400px' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: c.muted, pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="search" placeholder="Search reports..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '10px', border: searchFocused ? `1px solid ${c.amber}` : '1px solid rgba(255,255,255,0.12)', background: c.panel2, color: '#eef2ff', fontFamily: font, fontSize: '0.85rem', outline: 'none', boxShadow: searchFocused ? '0 0 0 3px rgba(255,179,0,0.12)' : 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: c.muted, fontWeight: 500, marginRight: '0.2rem' }}>Status:</span>
              {['Pending', 'Approved', 'Rejected'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  style={{ background: activeFilter === f ? 'rgba(255,179,0,0.15)' : 'transparent', border: activeFilter === f ? `1px solid ${c.amber}` : '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.45rem 1rem', color: activeFilter === f ? c.amber : '#d4d4d4', fontFamily: font, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = c.amber; e.currentTarget.style.color = c.amber; } }}
                  onMouseLeave={e => { if (activeFilter !== f) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#d4d4d4'; } }}
                >{f}</button>
              ))}
            </div>
          </section>

          {/* Table */}
          <section>
            <div style={{ background: c.panel, borderRadius: '14px 14px 0 0', overflow: 'hidden', border: `1px solid ${c.border}`, borderBottom: 'none' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['REPORT ID', 'EQUIPMENT NAME', 'OPERATOR NAME', 'REPORT DATE', 'STATUS', 'ACTIONS'].map(col => (
                    <th key={col} style={{ background: c.panel2, padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase', borderBottom: `1px solid ${c.border}` }}>{col}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {tableRows.map((r, i) => (
                    <tr key={r.id} style={{ borderBottom: i < tableRows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: c.text }}>{r.id}</td>
                      <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: c.text }}>{r.equip}</td>
                      <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: c.text }}>{r.operator}</td>
                      <td style={{ padding: '0.9rem 1rem', fontSize: '0.82rem', color: c.text }}>{r.date}</td>
                      <td style={{ padding: '0.9rem 1rem' }}><span style={statusBadge(r.status)}>{r.status}</span></td>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button onClick={() => openDetail(r.id)} style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#d4d4d4', fontFamily: font, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#d4d4d4'; }}
                          >View Detail</button>
                          <button style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: `1px solid ${c.amber}`, background: 'rgba(255,179,0,0.15)', color: c.amber, fontFamily: font, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,179,0,0.28)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,179,0,0.15)'}
                          >Approve</button>
                          <button style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #ef5350', background: 'rgba(244,67,54,0.15)', color: '#ef5350', fontFamily: font, fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,67,54,0.28)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,67,54,0.15)'}
                          >Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', borderTop: `1px solid ${c.border}`, background: c.panel, borderRadius: '0 0 14px 14px', border: `1px solid ${c.border}` }}>
              <span style={{ fontSize: '0.78rem', color: c.muted }}>Showing <strong style={{ color: '#4caf50', fontWeight: 700 }}>1</strong> to <strong style={{ color: '#4caf50', fontWeight: 700 }}>4</strong> of <strong style={{ color: '#4caf50', fontWeight: 700 }}>12</strong> reports</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {['Previous', '1', '2', '3', 'Next'].map(p => (
                  <button key={p} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontFamily: font, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', background: p === '1' ? '#4caf50' : 'transparent', border: p === '1' ? '1px solid #4caf50' : '1px solid rgba(255,255,255,0.12)', color: p === '1' ? '#fff' : '#d4d4d4', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { if (p !== '1') { e.currentTarget.style.borderColor = c.amber; e.currentTarget.style.color = c.amber; } }}
                    onMouseLeave={e => { if (p !== '1') { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#d4d4d4'; } }}
                  >{p}</button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <DamageDetailModal data={modalData} onClose={closeDetail} />
    </div>
  );
}
