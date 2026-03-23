// Next.js Runtime Core
(function() {
  // React 18 + Next.js 14
  const React = require('react');
  const ReactDOM = require('react-dom/client');
  
  // App Router Components
  const App = () => {
    const [scrollY, setScrollY] = React.useState(0);
    
    React.useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
      <div className="app">
        <Navbar />
        <main>
          <HeroSection />
          <MarqueeSection />
          <FeaturesSection />
        </main>
      </div>
    );
  };
  
  // Navbar Component
  const Navbar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    
    React.useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-wrapper">
            <a href="/" className="logo">
              <img src="/static/icons/icon.svg" alt="Codex" width={32} height={32} />
              <h2>Codex</h2>
            </a>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/windows">Windows</a></li>
              <li><a href="/ios">iOS</a></li>
              <li><a href="/android">Android</a></li>
              <li><a href="https://discord.codex.lol">Discord</a></li>
            </ul>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M2.5 2.5H17.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/windows">Windows</a></li>
              <li><a href="/ios">iOS</a></li>
              <li><a href="/android">Android</a></li>
              <li><a href="https://discord.codex.lol">Discord</a></li>
            </ul>
          </div>
        )}
      </nav>
    );
  };
  
  // Hero Section with Windows download
  const HeroSection = () => {
    return (
      <section className="hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-content">
              <h1>
                Download Codex for{' '}
                <span className="text-gradient">Windows</span>.
              </h1>
              <p>
                Supported low-end PCs and let you enjoy the stable and smooth. 
                Unleashes your graphics performance with exclusive graphics technology, 
                supports high frame rate and 4K-quality graphics. New keyboard & mouse 
                plan restores the PC experience for you. Take control in the game with ease.
              </p>
              <div className="download-buttons">
                <a href="/windows">
                  <button className="primary-button">
                    Download for Windows
                    <WindowsIcon />
                  </button>
                </a>
              </div>
              <div className="discord-link">
                <a href="https://discord.codex.lol" target="_blank">
                  <DiscordIcon />
                  Discord
                </a>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <MobileDownloadSection />
          </div>
        </div>
      </section>
    );
  };
  
  // Mobile Download Section
  const MobileDownloadSection = () => {
    return (
      <div className="mobile-downloads">
        <header>
          <h1>
            Download Codex for{' '}
            <span className="text-gradient">Mobile</span>.
          </h1>
          <p>
            Codex stands out as the premier Roblox script executor, providing 
            unparalleled functionality to effortlessly run scripts for your 
            preferred Roblox games.
          </p>
        </header>
        <div className="mobile-buttons">
          <a href="/android">
            <button className="mobile-btn">
              <AndroidIcon />
              <caption>Android</caption>
            </button>
          </a>
          <a href="/ios">
            <button className="mobile-btn">
              <iOSIcon />
              <caption>iOS</caption>
            </button>
          </a>
        </div>
      </div>
    );
  };
  
  // Marquee Animation
  const MarqueeSection = () => {
    React.useEffect(() => {
      const marquee = document.querySelector('.marquee-track');
      if (marquee) {
        let position = 0;
        const animate = () => {
          position -= 1;
          marquee.style.transform = `translateX(${position}px)`;
          requestAnimationFrame(animate);
        };
        animate();
      }
    }, []);
    
    return (
      <section className="marquee-section">
        <div className="parallax">
          <div className="scroller">
            {Array(25).fill('Codex').map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  // Features Section with scroll animations
  const FeaturesSection = () => {
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.3 }
      );
      
      document.querySelectorAll('.feature').forEach(feature => {
        observer.observe(feature);
      });
      
      return () => observer.disconnect();
    }, []);
    
    return (
      <section className="features-section">
        <div className="features-container">
          <div className="features-left">
            <div className="feature">
              <div className="feature-icon">
                <GlobeIcon />
                <h2>Unrivaled execution.</h2>
              </div>
              <p>
                Codex boasts exceptional support for a wide array of essential libraries and scripts, 
                ensuring smooth development and gameplay. Focus on what matters most - having a great time!
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <ShieldIcon />
                <h2>Exclusive Script Hub.</h2>
              </div>
              <p>
                Our regularly updated Script Hub provides a vast selection of games and scripts, 
                saving you the trouble of searching through third-party sites. With Codex, enjoy 
                one-stop access to everything you need.
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <LayersIcon />
                <h2>Cross-Platform Compatibility.</h2>
              </div>
              <p>
                Our products are designed to work seamlessly across various platforms, allowing you 
                to transition from Android & iOS to PC without missing a beat.
              </p>
            </div>
          </div>
          <div className="features-right">
            <img 
              src="/assets/ios.webp" 
              alt="Codex preview" 
              className="red-shadow"
              width={600} 
              height={400}
            />
          </div>
        </div>
      </section>
    );
  };
  
  // Icon Components
  const WindowsIcon = () => (
    <svg width="19" height="19" viewBox="0 0 448 512">
      <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/>
    </svg>
  );
  
  const AndroidIcon = () => (
    <svg viewBox="0 0 576 512">
      <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
    </svg>
  );
  
  const iOSIcon = () => (
    <svg viewBox="0 0 384 512">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
  
  const DiscordIcon = () => (
    <svg width="15" height="15" viewBox="0 0 16 16">
      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
    </svg>
  );
  
  const GlobeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="url(#red-gradient)">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
  
  const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="url(#red-gradient)">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
  
  const LayersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" stroke="url(#red-gradient)">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  );
  
  // Analytics Tracking
  const initAnalytics = () => {
    if (typeof gtag !== 'undefined') {
      // Track page views
      gtag('config', 'G-1PR3KL1NPC');
      
      // Track all button clicks
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => {
          gtag('event', 'click', {
            event_category: 'engagement',
            event_label: el.textContent || 'unknown'
          });
        });
      });
      
      // Track Discord clicks specifically
      document.querySelectorAll('a[href*="discord"]').forEach(el => {
        el.addEventListener('click', () => {
          gtag('event', 'join_discord', {
            event_category: 'community'
          });
        });
      });
    }
  };
  
  // AdSense initialization
  const initAdSense = () => {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch(e) {
      console.log('AdSense not loaded');
    }
  };
  
  // Render App
  const root = ReactDOM.createRoot(document.getElementById('root') || document.body);
  root.render(<App />);
  
  // Initialize after load
  window.addEventListener('load', () => {
    initAnalytics();
    initAdSense();
  });
  
})();
