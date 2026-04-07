import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AddUserModal from '../components/modals/AddUserModal';

const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const c = { bg: '#0d0f14', panel: '#151720', panel2: '#1a1c26', border: 'rgba(255,255,255,0.06)', amber: '#ffb300', white: '#fff', muted: 'rgba(255,255,255,0.45)', text: 'rgba(255,255,255,0.75)' };

const initialUsers = [
    { name: 'Carrick', role: 'Admin', status: 'Active' },
    { name: 'Ranpo', role: 'Mechanic', status: 'Active' },
    { name: 'Heeseung', role: 'Operator', status: 'Inactive' },
];

const roleBadge = (role) => {
    const map = { Admin: { bg: 'rgba(255,152,0,0.18)', color: '#ff9800', border: 'rgba(255,152,0,0.35)' }, Mechanic: { bg: 'rgba(33,150,243,0.15)', color: '#42a5f5', border: 'rgba(33,150,243,0.3)' }, Operator: { bg: 'rgba(76,175,80,0.15)', color: '#66bb6a', border: 'rgba(76,175,80,0.3)' } };
    const t = map[role] || map.Operator;
    return { display: 'inline-block', padding: '0.25rem 0.85rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.02em', background: t.bg, color: t.color, border: `1px solid ${t.border}` };
};

const statusBadgeStyle = (status) => {
    const active = status === 'Active';
    return {
        wrap: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.85rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, background: active ? 'rgba(76,175,80,0.12)' : 'rgba(158,158,158,0.12)', color: active ? '#66bb6a' : '#9e9e9e', border: `1px solid ${active ? 'rgba(76,175,80,0.28)' : 'rgba(158,158,158,0.28)'}` },
        dot: { width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', background: active ? '#66bb6a' : '#9e9e9e' },
    };
};

const actBtn = { width: '34px', height: '34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', padding: 0 };

export default function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [roleFilter, setRoleFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);

    const filteredUsers = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const th = { background: c.panel2, padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: c.muted, textTransform: 'uppercase', borderBottom: `1px solid ${c.border}` };
    const td = { padding: '0.9rem 1rem', fontSize: '0.82rem', color: c.text, borderBottom: '1px solid rgba(255,255,255,0.04)' };

    return (
        <div style={{ background: c.bg, minHeight: '100vh', fontFamily: font, color: c.white }}>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <main style={{ flex: 1, padding: '1.4rem 2rem 2.5rem', overflowY: 'auto', boxSizing: 'border-box' }}>
                    <Topbar title="User Management" />

                    {/* Filter Bar */}
                    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.4rem' }}>
                        <div style={{ position: 'relative', flex: '0 1 480px' }}>
                            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: c.muted, pointerEvents: 'none' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="search" placeholder="Search users by name..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                                style={{ width: '100%', boxSizing: 'border-box', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '10px', border: searchFocused ? `1px solid ${c.amber}` : '1px solid rgba(255,255,255,0.12)', background: c.panel2, color: '#eef2ff', fontFamily: font, fontSize: '0.85rem', outline: 'none', boxShadow: searchFocused ? '0 0 0 3px rgba(255,179,0,0.12)' : 'none', transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ appearance: 'none', WebkitAppearance: 'none', background: c.panel2, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.6rem 2.4rem 0.6rem 1rem', color: '#d4d4d4', fontFamily: font, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', outline: 'none' }}>
                                    <option value="all">All Roles</option><option value="Admin">Admin</option><option value="Mechanic">Mechanic</option><option value="Operator">Operator</option>
                                </select>
                                <svg style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: c.panel2, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.6rem 1.1rem', color: '#d4d4d4', fontFamily: font, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#252830'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = c.panel2; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                                Filter
                            </button>
                            <button onClick={() => setShowModal(true)}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'linear-gradient(135deg,#ffbe0b,#f5a623)', border: 'none', borderRadius: '10px', padding: '0.65rem 1.2rem', color: '#111', fontFamily: font, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,179,0,0.25)', transition: 'transform 0.2s ease, box-shadow 0.25s ease', whiteSpace: 'nowrap' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,179,0,0.4)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,179,0,0.25)'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Add New User
                            </button>
                        </div>
                    </section>

                    {/* Users Table */}
                    <section>
                        <div style={{ background: c.panel, borderRadius: '14px', overflow: 'hidden', border: `1px solid ${c.border}` }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead><tr><th style={th}>USER NAME</th><th style={th}>ROLE</th><th style={th}>STATUS</th><th style={{ ...th, textAlign: 'right', paddingRight: '1.4rem' }}>ACTIONS</th></tr></thead>
                                <tbody>
                                    {filteredUsers.map((u, i) => {
                                        const sb = statusBadgeStyle(u.status);
                                        return (
                                            <tr key={u.name + i} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#2a2c36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', flexShrink: 0 }}>{u.name.charAt(0)}</div>
                                                        <span style={{ fontWeight: 600, color: '#e0e0e0' }}>{u.name}</span>
                                                    </div>
                                                </td>
                                                <td style={td}><span style={roleBadge(u.role)}>{u.role}</span></td>
                                                <td style={td}><span style={sb.wrap}><span style={sb.dot} /> {u.status}</span></td>
                                                <td style={{ ...td, textAlign: 'right', paddingRight: '1.4rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                                                        <button style={actBtn} title="Edit"
                                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                                        ><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                                                        <button style={actBtn} title="Disable"
                                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                                        ><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg></button>
                                                        <button style={actBtn} title="Reset Password"
                                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                                        ><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>

            {showModal && <AddUserModal onClose={() => setShowModal(false)} onCreate={(user) => { setUsers([...users, user]); setShowModal(false); }} />}
        </div>
    );
}
