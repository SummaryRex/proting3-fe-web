export default function Topbar({ title }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.3rem',
    }}>
      <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h1>
    </header>
  );
}
