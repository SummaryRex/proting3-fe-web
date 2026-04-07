import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ScheduleModal from '../components/modals/ScheduleModal';
import EditScheduleModal from '../components/modals/EditScheduleModal';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = { bg: '#0d0f14', panel: '#16181f', border2: 'rgba(255,255,255,0.07)', amber: '#ffb300', white: '#fff', muted: 'rgba(255,255,255,0.45)' };

const approvedReports = [
  { id: 'EX-102', equip: 'Excavator EX-102', desc: 'Lorem ipsum dolor sit amet', operator: 'Dazai Osamu', date: 'Oct 15, 2026' },
  { id: 'DT-204', equip: 'Dump Truck DT-204', desc: 'Lorem ipsum dolor sit amet', operator: 'Nakahara Chuuya', date: 'Oct 16, 2026' },
  { id: 'L-305', equip: 'Loader L-305', desc: 'Lorem ipsum dolor sit amet', operator: 'Gojo Satoru', date: 'Oct 17, 2026' },
];

const initialSchedules = [
  { id: 'MS-1042', equip: 'Excavator EX-105', mechanic: 'Sarah Williams', date: 'Oct 20, 2023', dateVal: '2023-10-20', priority: 'critical', status: 'scheduled' },
  { id: 'MS-1044', equip: 'Loader L-302', mechanic: 'Robert Taylor', date: 'Oct 19, 2023', dateVal: '2023-10-19', priority: 'low', status: 'completed' },
];

const priorityBadge = (p) => {
  const map = { critical: { bg: 'rgba(211,47,47,0.18)', color: '#ef5350', border: 'rgba(211,47,47,0.35)' }, high: { bg: 'rgba(245,124,0,0.18)', color: '#ffa726', border: 'rgba(245,124,0,0.35)' }, medium: { bg: 'rgba(255,179,0,0.15)', color: '#ffb300', border: 'rgba(255,179,0,0.3)' }, low: { bg: 'rgba(56,142,60,0.18)', color: '#66bb6a', border: 'rgba(56,142,60,0.35)' } };
  const t = map[p] || map.low;
  return { display: 'inline-block', padding: '0.28rem 0.9rem', borderRadius: '20px', fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.01em', whiteSpace: 'nowrap', background: t.bg, color: t.color, border: `1px solid ${t.border}` };
};

const statusBadge = (s) => {
  const map = { scheduled: { bg: 'rgba(33,150,243,0.15)', color: '#42a5f5', border: 'rgba(33,150,243,0.3)' }, in_progress: { bg: 'rgba(255,152,0,0.15)', color: '#ffa726', border: 'rgba(255,152,0,0.3)' }, completed: { bg: 'rgba(56,142,60,0.18)', color: '#66bb6a', border: 'rgba(56,142,60,0.35)' }, cancelled: { bg: 'rgba(158,158,158,0.12)', color: '#9e9e9e', border: 'rgba(158,158,158,0.28)' } };
  const t = map[s] || map.scheduled;
  return { display: 'inline-block', padding: '0.28rem 0.9rem', borderRadius: '20px', fontSize: '0.73rem', fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.01em', background: t.bg, color: t.color, border: `1px solid ${t.border}` };
};

const statusLabels = { scheduled: 'Scheduled', in_progress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' };
const priorityLabels = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };

const th = { padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.76rem', fontWeight: 600, color: 'rgba(200,200,210,0.55)', letterSpacing: '0.02em', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' };
const td = { padding: '0.95rem 1rem', color: '#c8c8cc', verticalAlign: 'middle', borderBottom: '1px solid rgba(255,255,255,0.04)' };
const actBtnStyle = { width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', padding: 0 };

export default function MaintenanceScheduling() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState(initialSchedules);
  const [schedEquip, setSchedEquip] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [editData, setEditData] = useState(null);

  const openScheduleModal = (equipName) => { setSchedEquip(equipName); setShowSchedule(true); };

  const confirmSchedule = ({ mechanic, date, priority }) => {
    const newId = `MS-${1050 + schedules.length}`;
    const formatted = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setSchedules([...schedules, { id: newId, equip: schedEquip, mechanic, date: formatted, dateVal: date, priority, status: 'scheduled' }]);
    setShowSchedule(false);
  };

  const openEditModal = (id) => { const s = schedules.find(x => x.id === id); if (s) setEditData(s); };

  const saveEdit = (updated) => { setSchedules(schedules.map(s => s.id === updated.id ? updated : s)); setEditData(null); };

  const panelStyle = { background: c.panel, border: `1px solid ${c.border2}`, borderRadius: '14px', padding: '1.5rem 1.6rem', marginBottom: '1.6rem' };

  return (
    <div style={{ background: c.bg, minHeight: '100vh', fontFamily: font, color: c.white }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1.4rem 2rem 2.5rem', overflowY: 'auto', boxSizing: 'border-box' }}>
          <Topbar title="Maintenance Scheduling" />

          {/* Approved Damage Reports */}
          <section style={panelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.3rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e8e8e8', margin: 0 }}>Approved Damage Reports</h2>
              <a href="#" onClick={e => { e.preventDefault(); navigate('/damage-reports'); }} style={{ fontSize: '0.8rem', fontWeight: 600, color: c.amber, textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead><tr>{['Equipment Name', 'Damage Description', 'Operator', 'Report Date', 'Action'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                <tbody>
                  {approvedReports.map(r => (
                    <tr key={r.id} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={td}><strong style={{ color: '#e4e4e8', fontWeight: 600 }}>{r.equip}</strong></td>
                      <td style={{ ...td, maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(200,200,210,0.7)' }}>{r.desc}</td>
                      <td style={td}>{r.operator}</td>
                      <td style={td}>{r.date}</td>
                      <td style={td}>
                        <button onClick={() => openScheduleModal(r.equip)} style={{ background: 'linear-gradient(135deg,#ffbe0b,#f5a623)', border: 'none', borderRadius: '8px', padding: '0.48rem 1.15rem', color: '#111', fontFamily: font, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 3px 12px rgba(255,179,0,0.25)', transition: 'transform 0.18s ease, box-shadow 0.2s ease', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,179,0,0.38)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(255,179,0,0.25)'; }}
                        >Schedule</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Maintenance Schedule List */}
          <section style={panelStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.3rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e8e8e8', margin: 0 }}>Maintenance Schedule List</h2>
              <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: c.amber, textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead><tr>
                  {['Schedule ID', 'Equipment Name', 'Mechanic Name', 'Scheduled Date', 'Priority', 'Status'].map(h => <th key={h} style={th}>{h}</th>)}
                  <th style={{ ...th, textAlign: 'right', paddingRight: '1.2rem' }}>Actions</th>
                </tr></thead>
                <tbody>
                  {schedules.map(s => (
                    <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ ...td, fontWeight: 600, color: 'rgba(200,200,215,0.75)', fontSize: '0.82rem' }}>#{s.id}</td>
                      <td style={td}><strong style={{ color: '#e4e4e8', fontWeight: 600 }}>{s.equip}</strong></td>
                      <td style={td}>{s.mechanic}</td>
                      <td style={td}>{s.date}</td>
                      <td style={td}><span style={priorityBadge(s.priority)}>{priorityLabels[s.priority]}</span></td>
                      <td style={td}><span style={statusBadge(s.status)}>{statusLabels[s.status]}</span></td>
                      <td style={{ ...td, textAlign: 'right', paddingRight: '1.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem' }}>
                          <button style={actBtnStyle} title="Edit" onClick={() => openEditModal(s.id)}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                          ><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                          <button style={actBtnStyle} title="Cancel"
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(211,47,47,0.12)'; e.currentTarget.style.color = '#ef5350'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                          ><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {showSchedule && <ScheduleModal equipName={schedEquip} onClose={() => setShowSchedule(false)} onConfirm={confirmSchedule} />}
      {editData && <EditScheduleModal data={editData} onClose={() => setEditData(null)} onSave={saveEdit} />}
    </div>
  );
}
