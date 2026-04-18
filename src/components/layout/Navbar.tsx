import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      background: scrolled ? 'rgba(248, 250, 252, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      padding: scrolled ? '1rem 0' : '2rem 0',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
            Farm<span style={{ color: 'var(--primary)' }}>Work.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          <a href="/about" className="nav-link">Vision</a>
          <a href="/features" className="nav-link">Platform</a>
          <a href="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>Join Waitlist</a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'var(--bg-color)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            height: '100vh'
          }}>
            <a href="/about" className="nav-link" style={{ fontSize: '2rem', fontWeight: 800 }}>Vision</a>
            <a href="/features" className="nav-link" style={{ fontSize: '2rem', fontWeight: 800 }}>Platform</a>
            <a href="/contact" className="nav-link" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Join Waitlist</a>
          </div>
        )}
      </div>
      <style>{`
        .nav-link {
          font-weight: 600;
          color: var(--text-primary);
          transition: opacity 0.2s ease;
        }
        .nav-link:hover {
          opacity: 0.6;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
