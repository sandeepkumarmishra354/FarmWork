import { useState, useEffect } from 'react';
import { Menu, X, Sprout } from 'lucide-react';

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
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--surface-border)' : '1px solid transparent',
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.03)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sprout color="var(--primary)" size={28} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Farm<span style={{ color: 'var(--primary)' }}>Work</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/features" className="nav-link">Solutions</a>
          <a href="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Join Waitlist</a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle btn-outline" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ padding: '0.5rem', borderRadius: '8px', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderBottom: '1px solid var(--surface-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/features" className="nav-link">Solutions</a>
            <a href="/contact" className="btn btn-primary" style={{ textAlign: 'center' }}>Join Waitlist</a>
          </div>
        )}
      </div>
      <style>{`
        .nav-link {
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
