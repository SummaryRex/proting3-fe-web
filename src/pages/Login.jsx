import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const inputStyle = (focused) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 46px 11px 14px',
    borderRadius: '8px',
    border: focused
      ? '1px solid #ffb300'
      : '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(12,14,22,0.7)',
    color: '#eef2ff',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(255,179,0,0.18)' : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  });

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/mining.jpg') no-repeat center/cover`,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Center wrapper */}
      <div style={{ textAlign: 'center', width: 'min(100%, 1000px)', margin: '0 auto' }}>

        {/* Card */}
        <div
          style={{
            background: 'rgba(10,12,18,0.82)',
            border: '1.5px solid rgba(255,179,0,0.45)',
            borderRadius: '18px',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
            padding: '2.4rem 2rem 1.6rem',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <h1
            style={{
              fontSize: '1.65rem',
              lineHeight: 1.25,
              margin: '0 0 1.8rem 0',
              fontWeight: 800,
              letterSpacing: '0.01em',
              color: '#fff',
            }}
          >
            Welcome Back Coworkers!
          </h1>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div style={{ marginBottom: '1.15rem', textAlign: 'left' }}>
              <label
                htmlFor="username"
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'rgba(220,190,120,0.92)',
                  textTransform: 'uppercase',
                }}
              >
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  required
                  style={inputStyle(usernameFocused)}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.15rem', textAlign: 'left' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'rgba(220,190,120,0.92)',
                  textTransform: 'uppercase',
                }}
              >
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  style={inputStyle(passwordFocused)}
                />
                {/* Toggle Eye Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255,200,80,0.75)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ffb300'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,80,0.75)'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </>
                    )}
                  </svg>
                </span>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: '0.6rem',
                background: 'linear-gradient(135deg, #ffbe0b, #f5a623)',
                color: '#111',
                border: 'none',
                borderRadius: '10px',
                padding: '15px 0',
                fontFamily: 'inherit',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(255,179,0,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.25s ease, background 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(255,179,0,0.5)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffc929, #ffb300)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,179,0,0.35)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffbe0b, #f5a623)';
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,179,0,0.3)';
              }}
            >
              SIGN IN
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </button>
          </form>

          {/* Helper Links */}
          <div
            style={{
              marginTop: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.82rem',
            }}
          >
            <a
              href="#"
              style={{ color: 'rgba(215,220,240,0.8)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffb300'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(215,220,240,0.8)'}
            >
              Forgot Password?
            </a>
            <a
              href="#"
              style={{ color: 'rgba(215,220,240,0.8)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffb300'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(215,220,240,0.8)'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '5px' }}>
                <path d="M18 16.016c1.245.529 2 1.223 2 1.984 0 1.657-3.582 3-8 3s-8-1.343-8-3c0-.76.755-1.456 2-1.984" />
                <circle cx="12" cy="11" r="5" />
                <path d="M9 11a3 3 0 0 1 6 0" />
                <path d="M7 8.5C7 6 9.239 4 12 4s5 2 5 4.5" />
              </svg>
              Technical Support
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}