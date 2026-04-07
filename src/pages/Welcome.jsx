import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: "url('/mining.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          zIndex: 1,
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'fadeInUp 1s ease-out',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            marginBottom: '0.15rem',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          <span style={{ color: '#ffffff' }}>DJATI</span>
          <span style={{ color: '#f5a623' }}>MINING</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.45rem)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.88)',
            letterSpacing: '0.06em',
            marginBottom: '1.2rem',
          }}
        >
          Mining Equipment Maintenance System
        </p>

        {/* Sign-in Button */}
        <button
          id="btnSignIn"
          onClick={() => navigate('/login')}
          style={{
            display: 'inline-block',
            minWidth: '380px',
            padding: '1rem 3.5rem',
            background: 'linear-gradient(180deg, #ffbe0b 0%, #f5a623 100%)',
            color: '#111',
            border: 'none',
            borderRadius: '6px',
            fontFamily: 'inherit',
            fontSize: '1.15rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            boxShadow: '0 6px 32px rgba(255,179,0,0.4), 0 0 80px rgba(255,179,0,0.15)',
            transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(255,179,0,0.55), 0 0 120px rgba(255,179,0,0.22)';
            e.currentTarget.style.background = 'linear-gradient(180deg, #ffc929 0%, #ffb300 100%)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 32px rgba(255,179,0,0.4), 0 0 80px rgba(255,179,0,0.15)';
            e.currentTarget.style.background = 'linear-gradient(180deg, #ffbe0b 0%, #f5a623 100%)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,179,0,0.3)';
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* Keyframe animation injected via style tag */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}