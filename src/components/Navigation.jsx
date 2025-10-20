import { useState, useEffect } from 'react';

const Navigation = ({ propertyId = 'squaredesign' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.nav-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navigationLinks = [
    { href: `/${propertyId}`, label: 'Sobre o Empreendimento' },
    { href: `/${propertyId}/galeria`, label: 'Galeria de Fotos' },
    { href: `/${propertyId}/plantas`, label: 'Plantas' },
    { href: `/${propertyId}/compre-ganhe`, label: 'Compre e Ganhe', isHighlighted: true }
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    
    // Handle anchor links
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="nav-container">
        {/* Desktop Navigation */}
        <div className="nav-desktop">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${link.isHighlighted ? 'nav-link-highlighted' : ''}`}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div className="nav-overlay">
            <div className="nav-mobile">
              <div className="nav-mobile-header">
                <h3 className="nav-mobile-title">Menu</h3>
                <button
                  className="nav-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </div>
              
              <div className="nav-mobile-links">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-mobile-link ${link.isHighlighted ? 'nav-mobile-link-highlighted' : ''}`}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                      }
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              
              <div className="nav-mobile-cta">
                <a
                  href="https://wa.me/5511990111592?text=Olá! Quero receber informações sobre o Square Design Residence Alphaville."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-mobile-whatsapp whatsapp-button"
                  data-whatsapp-action="get_info"
                  data-whatsapp-location="navigation_mobile"
                  onClick={(e) => {
                    // Track WhatsApp click
                    if (typeof window.dataLayer !== 'undefined') {
                      window.dataLayer.push({
                        event: 'whatsapp_click',
                        whatsapp_action: 'get_info',
                        whatsapp_location: 'navigation_mobile',
                        whatsapp_url: e.target.href
                      });
                    }
                    
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'whatsapp_click', {
                        event_category: 'WhatsApp',
                        event_label: 'navigation_mobile_get_info',
                        value: 1
                      });
                    }
                    
                    console.log('WhatsApp click tracked:', {
                      event: 'whatsapp_click',
                      action: 'get_info',
                      location: 'navigation_mobile',
                      url: e.target.href
                    });
                    
                    setIsOpen(false);
                  }}
                >
                  📱 Falar no WhatsApp
                </a>
                
                <a
                  href="tel:+5511990111592"
                  className="nav-mobile-phone"
                  onClick={() => setIsOpen(false)}
                >
                  📞 Ligar Agora
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-container {
          position: relative;
        }

        /* Desktop Navigation */
        .nav-desktop {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: #d1d5db;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          white-space: nowrap;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
        }

        .nav-link:hover {
          color: var(--c21-relentless-gold);
        }

        .nav-link-highlighted {
          background-color: var(--c21-relentless-gold);
          color: var(--c21-digital-black);
          font-weight: 600;
        }

        .nav-link-highlighted:hover {
          background-color: var(--c21-digital-dark-gold);
          color: var(--c21-digital-black);
        }

        /* Mobile Menu Button */
        .nav-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .hamburger {
          position: relative;
          width: 24px;
          height: 18px;
        }

        .hamburger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: var(--c21-relentless-gold);
          border-radius: 1px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
        }

        .hamburger span:nth-child(1) {
          top: 0px;
        }

        .hamburger span:nth-child(2) {
          top: 8px;
        }

        .hamburger span:nth-child(3) {
          top: 16px;
        }

        .hamburger.active span:nth-child(1) {
          top: 8px;
          transform: rotate(135deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
          left: -60px;
        }

        .hamburger.active span:nth-child(3) {
          top: 8px;
          transform: rotate(-135deg);
        }

        /* Mobile Navigation Overlay */
        .nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 100;
          animation: fadeIn 0.3s ease;
        }

        .nav-mobile {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 320px;
          height: 100vh;
          background: var(--c21-obsessed-grey);
          border-left: 1px solid var(--c21-digital-medium-grey);
          animation: slideInRight 0.3s ease;
          overflow-y: auto;
        }

        .nav-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--c21-digital-medium-grey);
        }

        .nav-mobile-title {
          color: var(--c21-relentless-gold);
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .nav-close {
          background: none;
          border: none;
          color: #d1d5db;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          line-height: 1;
        }

        .nav-mobile-links {
          padding: 1rem 0;
        }

        .nav-mobile-link {
          display: block;
          color: #d1d5db;
          text-decoration: none;
          padding: 1rem 1.5rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .nav-mobile-link:hover {
          color: var(--c21-relentless-gold);
          background: rgba(190, 175, 135, 0.05);
          border-left-color: var(--c21-relentless-gold);
        }

        .nav-mobile-link-highlighted {
          background: var(--c21-relentless-gold);
          color: var(--c21-digital-black);
          font-weight: 600;
          border-left-color: var(--c21-digital-dark-gold);
        }

        .nav-mobile-link-highlighted:hover {
          background: var(--c21-digital-dark-gold);
          color: var(--c21-digital-black);
          border-left-color: var(--c21-digital-dark-gold);
        }

        .nav-mobile-cta {
          padding: 1.5rem;
          border-top: 1px solid var(--c21-digital-medium-grey);
          margin-top: auto;
        }

        .nav-mobile-whatsapp,
        .nav-mobile-phone {
          display: block;
          text-align: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .nav-mobile-whatsapp {
          background-color: var(--c21-relentless-gold);
          color: var(--c21-digital-black);
        }

        .nav-mobile-whatsapp:hover {
          background-color: var(--c21-digital-dark-gold);
        }

        .nav-mobile-phone {
          background-color: var(--c21-digital-link-blue);
          color: white;
          margin-bottom: 0;
        }

        .nav-mobile-phone:hover {
          background-color: var(--c21-digital-link-light-blue);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .nav-desktop {
            display: flex;
          }

          .nav-toggle {
            display: none;
          }

          .nav-link {
            font-size: 0.875rem;
          }
        }

        @media (min-width: 1024px) {
          .nav-desktop {
            gap: 2rem;
          }
          
          .nav-link {
            font-size: 0.9rem;
          }
        }

        @media (min-width: 1200px) {
          .nav-desktop {
            gap: 2.5rem;
          }
          
          .nav-link {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
