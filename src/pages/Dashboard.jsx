import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Dashboard() {
    const font = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    // ── Styles ──────────────────────────────────────────────
    const s = {
        mainContent: { flex: 1, padding: '1.4rem 2rem 2.5rem', overflowY: 'auto', boxSizing: 'border-box' },
        greetingBanner: { background: 'linear-gradient(135deg, #3a301a 0%, #2b230d 100%)', border: '1px solid rgba(175,160,76,0.25)', borderRadius: '14px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.6rem' },
        greetingIcon: { fontSize: '1.8rem', flexShrink: 0 },
        greetingH2: { fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 },
        greetingP: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', margin: '0.15rem 0 0' },
        sectionHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.2rem' },
        sectionTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 },
        sectionSubtitle: { fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', margin: '0.2rem 0 0' },
        btnExport: { display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: '#1a1c24', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.55rem 1.1rem', color: '#d4d4d4', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' },
        statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.4rem' },
        statCard: { background: '#151720', border: '1px solid rgba(255,179,0,0.18)', borderRadius: '14px', padding: '1.2rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' },
        statTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
        statLabel: { fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: '#ff9800', textTransform: 'uppercase', lineHeight: 1.35 },
        statValue: { fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1 },
        chartRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.6rem' },
        panel: { background: '#151720', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1.3rem 1.2rem' },
        panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
        panelH3: { fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 },
        panelSub: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: '0.2rem 0 0' },
        metricVal: { fontSize: '1.15rem', fontWeight: 800, color: '#fff' },
        metricSm: { fontSize: '0.72rem', fontWeight: 500, color: 'rgba(255,255,255,0.45)' },
        metricChangeDown: { display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#f44336', marginTop: '0.1rem' },
        metricChangeUp: { display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#4caf50', marginTop: '0.1rem' },
        barChart: { display: 'flex', alignItems: 'flex-end', gap: '0.55rem', height: '160px', padding: '0 0.3rem', marginTop: '0.5rem' },
        barCol: () => ({ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }),
        barSpan: (active) => ({ fontSize: '0.68rem', color: active ? '#fff' : 'rgba(255,255,255,0.45)', marginTop: '0.4rem', fontWeight: active ? 700 : 500 }),
        tableHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' },
        tableH3: { fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 },
        viewAll: { color: '#4caf50', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 },
        tableWrap: { background: '#151720', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' },
        th: { background: '#1a1c26', padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' },
        td: { padding: '0.9rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(255,255,255,0.04)' },
        tdLast: { padding: '0.9rem 1rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' },
    };

    const statusStyle = (type) => {
        const map = {
            pending: { bg: 'rgba(255,179,0,0.15)', color: '#ffb300', border: 'rgba(255,179,0,0.3)', label: 'Pending' },
            progress: { bg: 'rgba(33,150,243,0.15)', color: '#42a5f5', border: 'rgba(33,150,243,0.3)', label: 'In Progress' },
            critical: { bg: 'rgba(244,67,54,0.15)', color: '#ef5350', border: 'rgba(244,67,54,0.3)', label: 'Critical' },
            resolved: { bg: 'rgba(76,175,80,0.15)', color: '#66bb6a', border: 'rgba(76,175,80,0.3)', label: 'Resolved' },
        };
        const t = map[type];
        return { style: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, background: t.bg, color: t.color, border: `1px solid ${t.border}` }, label: t.label };
    };

    const bars = [
        { day: 'Mon', h: '30%', active: false }, { day: 'Tue', h: '38%', active: false },
        { day: 'Wed', h: '34%', active: false }, { day: 'Thu', h: '42%', active: false },
        { day: 'Fri', h: '85%', active: true }, { day: 'Sat', h: '22%', active: false },
        { day: 'Sun', h: '15%', active: false },
    ];

    const reports = [
        { id: '#REP-8092', equip: 'Excavator EX-04', operator: 'Andre Taulani', date: 'Today, 09:41 AM', status: 'pending' },
        { id: '#REP-8091', equip: 'Loader WL-12', operator: 'Gita Gutawa', date: 'Yesterday, 14:20', status: 'progress' },
        { id: '#REP-8090', equip: 'Haul Truck #42', operator: 'Joko Widodo', date: 'Oct 24, 2026', status: 'critical' },
        { id: '#REP-8089', equip: 'Drill Rig DR-02', operator: 'Anies Baswedan', date: 'Oct 23, 2026', status: 'resolved' },
    ];

    return (
        <div style={{ background: '#0d0f14', minHeight: '100vh', fontFamily: font, color: '#ffffff' }}>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <main style={s.mainContent}>
                    <Topbar title="Dashboard Admin" />

                    {/* Greeting */}
                    <section style={s.greetingBanner}>
                        <div style={s.greetingIcon}>👋</div>
                        <div>
                            <h2 style={s.greetingH2}>Good Morning, Windah!</h2>
                            <p style={s.greetingP}>Let's manage, what's new today!</p>
                        </div>
                    </section>

                    {/* Section header */}
                    <div style={s.sectionHeader}>
                        <div>
                            <h2 style={s.sectionTitle}>Mining Maintenance Overview</h2>
                            <p style={s.sectionSubtitle}>Real-time equipment status and reports.</p>
                        </div>
                        <button style={s.btnExport}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Export to PDF
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <section style={s.statGrid}>
                        {[
                            { label: 'TOTAL EQUIP', value: '152', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9800" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                            { label: 'UNDER\nMAINTENANCE', value: '25', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff9800" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> },
                            { label: 'ACTIVE', value: '120', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
                            { label: 'PENDING DMG', value: '7', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
                        ].map((card) => (
                            <article key={card.label} style={s.statCard}>
                                <div style={s.statTop}><span style={s.statLabel}>{card.label}</span><span>{card.icon}</span></div>
                                <strong style={s.statValue}>{card.value}</strong>
                            </article>
                        ))}
                    </section>

                    {/* Charts Row */}
                    <section style={s.chartRow}>
                        <article style={s.panel}>
                            <div style={s.panelHeader}>
                                <div><h3 style={s.panelH3}>Equipment Downtime</h3><p style={s.panelSub}>Weekly hours overview</p></div>
                                <div style={{ textAlign: 'right' }}><span style={s.metricVal}>120 <small style={s.metricSm}>hrs</small></span><span style={s.metricChangeDown}>↓ 5% vs last week</span></div>
                            </div>
                            <div style={s.barChart}>
                                {bars.map(b => (
                                    <div key={b.day} style={s.barCol(b.active)}>
                                        <div style={{ width: '70%', maxWidth: '36px', height: b.h, background: b.active ? '#ffb300' : 'rgba(255,179,0,0.35)', borderRadius: '4px 4px 0 0' }} />
                                        <span style={s.barSpan(b.active)}>{b.day}</span>
                                    </div>
                                ))}
                            </div>
                        </article>
                        <article style={s.panel}>
                            <div style={s.panelHeader}>
                                <div><h3 style={s.panelH3}>Maintenance Activities</h3><p style={s.panelSub}>Monthly tasks completed</p></div>
                                <div style={{ textAlign: 'right' }}><span style={s.metricVal}>45 <small style={s.metricSm}>tasks</small></span><span style={s.metricChangeUp}>↑ 12% vs last month</span></div>
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>
                                <svg viewBox="0 0 360 140" style={{ width: '100%', height: '140px' }} preserveAspectRatio="none">
                                    <defs><linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffb300" stopOpacity="0.35" /><stop offset="100%" stopColor="#ffb300" stopOpacity="0.02" /></linearGradient></defs>
                                    <path d="M0,120 C30,115 50,110 60,105 C80,95 100,100 120,90 C140,80 160,85 180,75 C200,65 220,70 240,50 C260,35 280,40 300,25 C320,15 340,10 360,5" fill="none" stroke="#ffb300" strokeWidth="2.5" />
                                    <path d="M0,120 C30,115 50,110 60,105 C80,95 100,100 120,90 C140,80 160,85 180,75 C200,65 220,70 240,50 C260,35 280,40 300,25 C320,15 340,10 360,5 L360,140 L0,140 Z" fill="url(#lineGrad)" />
                                </svg>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.4rem' }}>
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (<span key={m} style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{m}</span>))}
                                </div>
                            </div>
                        </article>
                    </section>

                    {/* Table */}
                    <section>
                        <div style={s.tableHeader}><h3 style={s.tableH3}>Latest Damage Reports</h3><a href="#" style={s.viewAll}>View All</a></div>
                        <div style={s.tableWrap}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead><tr>{['REPORT ID', 'EQUIPMENT NAME', 'OPERATOR', 'REPORT DATE', 'STATUS'].map(col => (<th key={col} style={s.th}>{col}</th>))}</tr></thead>
                                <tbody>
                                    {reports.map((r, i) => {
                                        const st = statusStyle(r.status);
                                        const tdStyle = i === reports.length - 1 ? s.tdLast : s.td;
                                        return (<tr key={r.id}><td style={tdStyle}>{r.id}</td><td style={tdStyle}>{r.equip}</td><td style={tdStyle}>{r.operator}</td><td style={tdStyle}>{r.date}</td><td style={tdStyle}><span style={st.style}>{st.label}</span></td></tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}