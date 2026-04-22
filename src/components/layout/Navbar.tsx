import { useState, useEffect } from 'react';
import { Home, Eye, Handshake, Mail } from 'lucide-react';
import { getPath } from '../../utils/paths';

const navItems = [
  { href: '/',              label: 'Home',     icon: Home      },
  { href: '/about',         label: 'Vision',   icon: Eye       },
  { href: '/partner-with-us', label: 'Partner', icon: Handshake },
  { href: '/contact',       label: 'Contact',  icon: Mail      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    // Determine active path (strip base path for GH Pages etc.)
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    setActivePath(path);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    const resolved = getPath(href).replace(/\/$/, '') || '/';
    return activePath === resolved || (href !== '/' && activePath.startsWith(resolved));
  };

  return (
    <>
      {/* ─── Top Bar (desktop) ─────────────────────────────────── */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(248, 250, 252, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        padding: scrolled ? '1rem 0' : '2rem 0',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand */}
          <a href={getPath('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
              <span style={{ color: 'var(--primary)' }}>Farm</span>Work.
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href={getPath('/about')} className="nav-link">VISION</a>
            <a href={getPath('/partner-with-us')} className="nav-link">PARTNER WITH US</a>
            <a href={getPath('/contact')} className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>CONTACT</a>
          </nav>
        </div>
      </header>

      {/* ─── Bottom Tab Bar (mobile only) ──────────────────────── */}
      <nav className="mobile-bottom-nav">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <a
              key={href}
              href={getPath(href)}
              className={`bottom-tab${active ? ' active' : ''}`}
            >
              <span className="bottom-tab-icon">
                <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
              </span>
              <span className="bottom-tab-label">{label}</span>
              {active && <span className="bottom-tab-dot" />}
            </a>
          );
        })}
      </nav>

      <style>{`
        /* ── Top bar nav links ── */
        .nav-link {
          font-weight: 600;
          color: var(--text-primary);
          transition: opacity 0.2s ease;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .nav-link:hover { opacity: 0.55; }

        /* ── Hide mobile bottom nav on desktop ── */
        .mobile-bottom-nav { display: none; }

        /* ── Mobile: hide desktop nav, show bottom bar ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }

          .mobile-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom));
            justify-content: space-around;
            align-items: stretch;
            box-shadow: 0 -4px 24px rgba(0,0,0,0.06);
          }

          .bottom-tab {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: #94a3b8;
            position: relative;
            flex: 1;
            transition: color 0.2s ease;
            min-width: 0;
          }

          .bottom-tab.active {
            color: var(--primary);
          }

          .bottom-tab-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 32px;
            border-radius: 10px;
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .bottom-tab.active .bottom-tab-icon {
            background: color-mix(in srgb, var(--primary) 10%, transparent);
            transform: translateY(-1px);
          }

          .bottom-tab-label {
            font-size: 0.65rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            line-height: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }

          .bottom-tab-dot {
            position: absolute;
            top: 0.35rem;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: var(--primary);
          }

          /* Push content above bottom bar */
          body {
            padding-bottom: calc(72px + env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 480px) {
          .bottom-tab { padding: 0.4rem 0.5rem; }
          .bottom-tab-label { font-size: 0.6rem; }
          .bottom-tab-icon { width: 36px; height: 28px; }
        }
      `}</style>
    </>
  );
}
