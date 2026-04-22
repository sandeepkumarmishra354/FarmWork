import { useState, useEffect } from 'react';
import { Menu, X, Home, Eye, Handshake, Mail, ArrowRight } from 'lucide-react';
import { getPath } from '../../utils/paths';

const navItems = [
  { href: '/',                label: 'Home',          icon: Home,        desc: 'Back to start'          },
  { href: '/about',           label: 'Vision',        icon: Eye,         desc: 'What we\'re building'  },
  { href: '/partner-with-us', label: 'Partner With Us', icon: Handshake, desc: 'Join the ecosystem'     },
  { href: '/contact',         label: 'Contact',       icon: Mail,        desc: 'Get in touch'           },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onResize(); // run once on mount
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    setActivePath(path);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const isActive = (href: string) => {
    const resolved = getPath(href).replace(/\/$/, '') || '/';
    return activePath === resolved || (href !== '/' && activePath.startsWith(resolved));
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      {/* ─── Top Bar ─────────────────────────────────────────── */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(248, 250, 252, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        padding: scrolled
          ? '0.875rem 0'
          : isMobile ? '0.875rem 0' : '2rem 0',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Brand */}
          <a href={getPath('/')} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--primary)' }}>Farm</span>Work.
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href={getPath('/about')} className="nav-link">VISION</a>
            <a href={getPath('/partner-with-us')} className="nav-link">PARTNER WITH US</a>
            <a href={getPath('/contact')} className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>CONTACT</a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: '1.5px solid rgba(0,0,0,0.12)',
              borderRadius: '10px',
              cursor: 'pointer',
              padding: '0.5rem 0.6rem',
              lineHeight: 0,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
          >
            <Menu size={22} color="var(--text-primary)" />
          </button>
        </div>
      </header>

      {/* ─── Backdrop ────────────────────────────────────────── */}
      <div
        className={`drawer-backdrop${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ─── Right Drawer ─────────────────────────────────────── */}
      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`} role="dialog" aria-modal="true">

        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--primary)' }}>Farm</span>Work.
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--surface-border)',
              borderRadius: '10px',
              cursor: 'pointer',
              padding: '0.5rem',
              lineHeight: 0,
              transition: 'background 0.2s',
            }}
          >
            <X size={20} color="var(--text-primary)" />
          </button>
        </div>

        {/* Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map(({ href, label, icon: Icon, desc }) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={getPath(href)}
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.1rem',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  background: active ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
                  border: active ? '1px solid color-mix(in srgb, var(--primary) 20%, transparent)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--surface-color)';
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {/* Icon bubble */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: active ? 'var(--primary)' : 'var(--surface-color)',
                  border: '1px solid var(--surface-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}>
                  <Icon size={19} color={active ? '#ffffff' : 'var(--text-secondary)'} strokeWidth={active ? 2.5 : 1.75} />
                </div>

                {/* Label + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: active ? 'var(--primary)' : 'var(--text-primary)', lineHeight: 1.2 }}>
                    {label}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {desc}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight size={16} color={active ? 'var(--primary)' : 'var(--text-secondary)'} style={{ flexShrink: 0, opacity: active ? 1 : 0.4 }} />
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer CTA */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
          <a
            href={getPath('/contact')}
            onClick={() => setDrawerOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', padding: '1rem' }}
          >
            Get in Touch <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </a>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.5 }}>
            Building India's agricultural operating system.
          </p>
        </div>
      </div>

      <style>{`
        .nav-link {
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          transition: opacity 0.2s ease;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .nav-link:hover { opacity: 0.55; }

        /* ── Backdrop ── */
        .drawer-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 149;
          background: rgba(0, 0, 0, 0);
          backdrop-filter: blur(0px);
          transition: background 0.35s ease, backdrop-filter 0.35s ease;
          pointer-events: none;
        }
        .drawer-backdrop.open {
          display: block;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(4px);
          pointer-events: all;
        }

        /* ── Drawer panel ── */
        .nav-drawer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(85vw, 340px);
          z-index: 150;
          background: #ffffff;
          box-shadow: -8px 0 40px rgba(0,0,0,0.12);
          padding: 1.5rem 1.25rem;
          padding-top: calc(1.5rem + env(safe-area-inset-top));
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        .nav-drawer.open {
          transform: translateX(0);
        }

        /* ── Mobile: show toggle + drawer, compact header ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .nav-drawer { display: flex; }
          .drawer-backdrop { display: block; }
        }
      `}</style>
    </>
  );
}
